# System Architecture Overview

## 5-Layer Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CENTRAL ORCHESTRATION (ICCC)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  AI/ML       │  │  Signal      │  │  Notification        │  │
│  │  Inference   │──│  Orchestrator│──│  Service (Mobile)    │  │
│  │  Engine      │  │  (MILP/RL)   │  │  (FCM/APNs + Geo)    │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────────────────┘  │
│         │                 │                                       │
│         ▼                 ▼                                       │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │              MESSAGE BUS (Kafka/RabbitMQ)                   │   │
│  └────────────────────────────────────────────────────────────┘   │
└──────────────────────────┬────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│  Junction A   │  │  Junction B   │  │  Junction N   │  ← Edge nodes
│  (CCTV +      │  │  (CCTV +      │  │  (CCTV +      │     per signal
│   Controller) │  │   Controller) │  │   Controller) │
└───────────────┘  └───────────────┘  └───────────────┘
```

## Layer Responsibilities

| Layer | Components | Responsibility |
|-------|------------|----------------|
| **Edge** | Jetson Orin, YOLOv11+ByteTrack, Siren Classifier, Local MQTT | Detection, tracking, local signal override (fail-safe) |
| **Corridor** | Aggregation Server, Trajectory Predictor, RabbitMQ | Multi-junction prediction, corridor-level optimization |
| **Cloud/ICCC** | Kafka, Central Orchestrator, MILP/RL Optimizer, TimescaleDB | City-scale coordination, analytics, model management |
| **Citizen** | Flutter App, Tile38 Geofencing, FCM/APNs | Geofenced yield alerts, multilingual TTS |
| **Stakeholder** | 108 GPS API, Police CAD, Fire Dispatch | External data feeds, manual override authority |

## Key Design Principles

1. **Edge-First**: Full detection→control at edge; cloud enhances, never enables
2. **Graceful Degradation**: Hardware watchdog (5s) → auto-revert to fixed-time
3. **Zero-Hardware Retrofit**: Existing CCTV + mic + 108 GPS = any ambulance "connected"
4. **Multi-Modal Fusion**: Vision (0.55) + GPS (0.25) + Audio (0.15) + History (0.05)
5. **Predictive Green Corridor**: 2-3 junction lookahead, not single-junction reactive