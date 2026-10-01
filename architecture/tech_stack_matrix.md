# Tech Stack Decision Matrix

| Component | Primary Choice | Alternative | Rationale for Indian Context |
|-----------|----------------|-------------|------------------------------|
| **Edge Hardware** | NVIDIA Jetson Orin Industrial (64GB) | x86 Industrial PC, Jetson Orin NX (16GB) | 85°C thermal tolerance for uncooled cabinets; 25W power fits UPS backup; proven in Indian traffic cams |
| **Detection Model** | YOLOv11-nano/small + TensorRT INT8 | RT-DETR-L, YOLOv8x | Best Pareto frontier for speed vs accuracy at edge; FP16/INT8 optimization mature |
| **Tracking** | ByteTrack | BoT-SORT, DeepSORT | Lightweight; preserves identity via low-confidence boxes (critical for two-wheeler occlusion) |
| **Trajectory Prediction** | Kalman + HD Map Match | Transformer (VectorNet/MTR) | Deterministic, explainable (legal requirement); map-match constrains to road network |
| **Audio Detection** | YAMNet (TFLite) + Custom Siren Classifier | YCK-Siren, VGGish | <10ms on edge; two-tone Indian siren has distinct spectral signature |
| **Signal Fusion** | Feature-level fusion (learned weights) | Score-level (Bayesian), Early fusion | Balances modalities; late fusion (OR) too simple; early fusion needs aligned features |
| **Signal Optimization** | OR-Tools MILP (pilot) → PPO RL (production) | Fixed priority preemption | MILP = explainable, safe, auditable; RL for city-scale multi-corridor coordination |
| **Legacy Controller Interface** | Relay GPIO + Vendor SDK (SCATS/SCOOT) | NTCIP (rare in India) | 80% signals are fixed-time with no digital interface; relay = universal retrofit |
| **Message Bus** | Apache Kafka (city) / RabbitMQ (edge-corridor) | MQTT | Kafka: durability + replay (forensics); RabbitMQ: lighter for edge |
| **Database** | TimescaleDB + PostgreSQL + Redis | InfluxDB | SQL-native, audit trails, DPDP retention policies; PostGIS for geospatial |
| **Mobile App** | Flutter | React Native | Single codebase; better background geofencing plugin maturity; large Indian dev community |
| **Push Notifications** | FCM (Android) + APNs (iOS) | Firebase only | APNs required for iOS reliability; FCM covers 95%+ Indian Android |
| **Geofencing** | Tile38 (server) + Client-side zones | PostGIS, Redis Geohash | 50k+ concurrent pings/sec; hybrid saves battery + handles dynamic zones |
| **Cloud/K8s** | On-prem K8s at ICCC + Hybrid | Pure cloud | DPDP Act data sovereignty; ICCC has existing K8s/fiber under Smart Cities |
| **Simulation** | CARLA (visual AI) + SUMO (traffic flow) | SUMO only | CARLA for detection training; SUMO for flow optimization |
| **Observability** | Prometheus + Grafana + Loki | ELK Stack | Lower footprint; better K8s integration; Loki = log search without ES overhead |

## Edge Compute Selection Detail

```
Jetson Orin Industrial 64GB
├── 2048 CUDA cores + 64 Tensor cores
├── 64GB LPDDR5 (204 GB/s)
├── 25W typical, 60W max
├── Operating temp: -25°C to +85°C
├── 8K video decode (H.264/H.265)
└── TensorRT 8.x native support

Estimated inference latency (YOLOv11-nano, 1280x1280):
├── Preprocess: ~5ms
├── Inference: ~45ms (INT8)
├── Postprocess: ~8ms
├── ByteTrack: ~12ms
└── Total: ~70ms/frame (well under 200ms budget)
```