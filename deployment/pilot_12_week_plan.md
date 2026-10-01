# 12-Week Pilot Project Plan (5 Signals)

## Phase 0: Foundation (Weeks 1-2)

### Week 1
- [ ] Stakeholder kickoff: Traffic Police, 108, ICCC, Smart City SPV
- [ ] Site survey: 5 junctions on 1 corridor (identify CCTV coverage gaps)
- [ ] Legal: MoU drafting, DPDP compliance review
- [ ] Team setup: 2 ML engineers, 2 embedded engineers, 1 Flutter dev, 1 PM

### Week 2
- [ ] CCTV inventory: RTSP stream access, resolution, coverage angles
- [ ] Signal controller survey: fixed-time vs adaptive, wiring diagrams
- [ ] Edge hardware procurement: 5× Jetson Orin NX + relay boards
- [ ] Dataset: download existing Indian traffic datasets, begin annotation
- [ ] Architecture finalization (this document → living design doc)

## Phase 1: Build (Weeks 3-6)

### Week 3-4: ML Pipeline
- [ ] Fine-tune YOLOv11 on Indian emergency vehicle dataset
- [ ] Set up tiled inference pipeline on Jetson (1280×1280 tiles, 256px overlap)
- [ ] ByteTrack integration + track management
- [ ] Siren audio classifier training (YAMNet + custom head)
- [ ] Initial testing on recorded CCTV footage (offline metrics)

### Week 4-5: Edge + Signal Integration
- [ ] Relay board PCB design + fabrication (JLCPCB, 5 pcs)
- [ ] ESP32-S3 firmware: MQTT client, relay control, 5s watchdog
- [ ] Edge server: detection → trajectory → signal request pipeline
- [ ] Kafka setup (edge → corridor)
- [ ] Legacy controller interfacing at 1 test junction

### Week 5-6: Orchestration + App
- [ ] Corridor aggregation server
- [ ] Signal optimization module (OR-Tools MILP)
- [ ] TimescaleDB event logging
- [ ] Flutter app: geofencing, push notifications
- [ ] ICCC dashboard (basic)
- [ ] End-to-end pipeline test (1 junction)

## Phase 2: Test (Weeks 7-9)

### Week 7: Shadow Mode Deployment
- [ ] Deploy edge servers at 5 junctions
- [ ] Connect CCTV streams
- [ ] Run detection + prediction in shadow mode (NO signal control)
- [ ] Log all events, compare with ground truth
- [ ] Measure: detection accuracy, latency, false positive rate

### Week 8: Controlled Testing
- [ ] Test with 108 ambulances on designated route
- [ ] Measure: detection time, ETA accuracy, signal override success
- [ ] Stress test: multiple simultaneous emergency vehicles
- [ ] Network failure simulation
- [ ] Relay board safety validation

### Week 9: Advisory Mode
- [ ] Enable signal preemption (advisory only — police can override)
- [ ] Traffic police dashboard training
- [ ] 108 operator training
- [ ] Citizen app beta testing (100 users)
- [ ] Collect feedback, iterate

## Phase 3: Pilot Launch (Weeks 10-12)

### Week 10: Soft Launch
- [ ] Enable full autonomous signal preemption
- [ ] 24/7 monitoring for first 72 hours
- [ ] Daily standup with Traffic Police + 108
- [ ] Incident response protocol activation

### Week 11: Optimization
- [ ] Tune detection thresholds based on real-world data
- [ ] Optimize signal timing for corridor
- [ ] Refine geofencing zones for app
- [ ] Address edge cases discovered in Week 10

### Week 12: Evaluation + Next Phase Planning
- [ ] KPI measurement (see below)
- [ ] Stakeholder review meeting
- [ ] Media demonstration
- [ ] Budget proposal for Phase 2 (20 signals)
- [ ] Documentation + handover to operations team

## Pilot KPIs

| KPI | Baseline (Before) | Target (After Pilot) | Measurement Method |
|-----|-------------------|----------------------|-------------------|
| Emergency vehicle avg. delay at signals | 3-5 min (108 logs) | < 30 seconds | 108 GPS + signal logs |
| Detection accuracy (precision) | N/A | > 95% | Shadow mode comparison |
| Detection latency (edge) | N/A | < 200ms | System logs |
| False positive rate | N/A | < 2% | Manual review of all preemptions |
| General traffic avg. delay increase | Baseline | < 15 seconds | Traffic counters |
| Citizen app active users | 0 | 500+ | App analytics |
| System uptime | N/A | > 99.5% | Monitoring dashboard |

## Exit Criteria for Phase 2 (20 Signals)
- [ ] All pilot KPIs met for 4 consecutive weeks
- [ ] Zero safety incidents attributable to system
- [ ] Traffic Police sign-off on SOP
- [ ] 108 EMS SLA for GPS feed formalized
- [ ] Funding committed for expansion