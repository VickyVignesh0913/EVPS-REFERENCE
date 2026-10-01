# Kafka Topic Structure

## Topic Naming Convention
```
evp.{event_type}.{corridor_id}.{junction_id}
```

## Core Topics

| Topic | Schema | Partitions | Retention | Consumers |
|-------|--------|------------|-----------|-----------|
| `evp.detections.{corridor}.{junction}` | DetectionEvent | 8 | 7 days | Corridor Aggregator, Audit |
| `evp.predictions.{corridor}` | PredictedArrival | 4 | 3 days | Signal Optimizer, Orchestrator |
| `evp.signal.request.{junction}` | SignalPhaseRequest | 1 | 1 day | Signal Gateway, Audit |
| `evp.signal.ack.{junction}` | PhaseAck | 1 | 30 days | Orchestrator, Dashboard |
| `evp.alerts.{corridor}` | CitizenAlert | 4 | 1 day | Mobile Push Service |
| `evp.system.health.{edge_server}` | HealthHeartbeat | 1 | 1 day | Monitoring, Alerting |
| `evp.audit.all` | (all events) | 16 | 1 year | Forensics, Compliance |

## Partition Strategy
- **Detections**: Partition by `junction_id` (co-locates same junction)
- **Predictions**: Partition by `track_id` (orders per vehicle)
- **Signal requests**: Single partition per junction (ordering critical)
- **Alerts**: Partition by `geofence_zone` (localized delivery)

## Security
- SASL_SSL authentication
- ACLs: Edge producers → write only; Cloud consumers → read only
- Schema Registry: Confluent/Apicurio with backward compatibility

## Monitoring
- Consumer lag alerts (>1000 messages)
- Throughput: target <50ms p99 produce-to-consume
- Dead letter queue for schema validation failures