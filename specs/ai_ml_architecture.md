# AI/ML Architecture Deep Dive

## Detection Pipeline

### Small Object Detection at 50-100m
- **Tiled Inference**: 3840x2160 CCTV → 1280x1280 tiles with 256px overlap
- **Enhanced Neck**: Add P2 detection head (1/4 scale) for ambulances at 50-80m
- **Latency**: ~120ms/frame on Jetson Orin NX (within 200ms budget)

### Indian Vehicle Classes
| Class | Description |
|-------|-------------|
| `ambulance_108` | Govt 108 fleet, distinctive yellow-green |
| `ambulance_private` | Varied livery, often white/red cross |
| `fire_tender` | Red, large, distinctive shape |
| `police_vehicle` | White/blue livery, varies by state |
| `police_bike` | Escort, often with beacon |
| `emergency_other` | DG response, NDRF, etc. |

### Occlusion Handling (Two-Wheeler Problem)
1. ByteTrack: high confidence threshold (0.5) but keep low-score detections (0.1) in track buffer
2. Tracklet interpolation during short occlusion (2-5 frames)
3. Multi-camera handoff at junctions
4. Height estimation via camera calibration → filter 2-wheelers (<1.8m)

## Training Dataset Strategy

| Phase | Method | Volume | Cost |
|-------|--------|--------|------|
| Base | COCO + Indian datasets (IIIT-D) | 50K images | ₹5-10L |
| Synthetic | CARLA (Indian vehicles, weather, occlusion) | 200K frames | ₹8-12L |
| Real-world | City partnerships + 108 operator crowdsourcing | 100K frames | ₹15-20L |
| Active Learning | Shadow mode → low-confidence → human review → retrain | Ongoing | ₹3-5L/yr |

## Multi-Modal Fusion

### Three Independent Streams
```
Stream 1: Visual (YOLOv11) → confidence_v, bbox_v, class_v, track_id_v
Stream 2: Audio (YAMNet + Siren) → confidence_a, direction_a, siren_type
Stream 3: GPS (108/102 API) → lat, lon, speed, heading, vehicle_id
```

### Fusion Logic (Rule-Based + Bayesian)
```
IF visual AND GPS agree (50m + 30° heading):
    HIGH CONFIDENCE → immediate preemption

IF visual AND audio agree (siren + lights):
    MEDIUM CONFIDENCE → preemption with reduced lead time

IF GPS only (private ambulance):
    MEDIUM CONFIDENCE → trigger at next junction

IF visual only:
    LOW CONFIDENCE → advisory, verify at next junction

MINIMUM TRIGGER: 2 of 3 modalities OR GPS + 1 other
```

### Bayesian Weights (ChatGPT)
- Visual: 0.55
- GPS: 0.25
- Audio: 0.15
- History: 0.05

## Handling Unmarked/Private Ambulances (30% of fleet)
1. Mandate GPS transponder via NHA/EMS Rules
2. Visual-only: light bar + shape classification
3. Siren detection as mandatory backup
4. Partner with aggregators (Dial4242, Apollo) for GPS feeds