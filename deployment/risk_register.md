# Risk Register (Top 10)

| # | Risk | Likelihood | Impact | Mitigation Strategy |
|---|------|------------|--------|---------------------|
| **1** | **False positive** (non-emergency vehicle triggers preemption) | High | High | Multi-modal fusion (min 2 modalities); confidence threshold 0.7; 2-week shadow mode; 2-week advisory mode; tiered confidence → advisory vs full override |
| **2** | **Legacy controller incompatibility** (non-standard phase wiring) | High | Medium | Pre-deployment survey of all junctions; custom adapter boards per controller type; vendor partnership for wiring diagrams; bench test on spare controller |
| **3** | **Two-wheeler occlusion → missed detection** | High | Medium | P2 detection head for small objects; multi-camera coverage overlap; track interpolation (2-5 frames); height-based filtering (<1.8m = 2-wheeler) |
| **4** | **Network failure → signal stuck in override** | Medium | Critical | Hardware watchdog on relay board (5s timeout → revert); local autonomous fallback at edge; UPS on all edge devices; auto-revert if edge unreachable >30s |
| **5** | **Liability: AI error causes accident** | Medium | Critical | Comprehensive audit log (TimescaleDB); insurance requirement for city; clear SOP: AI as advisory until proven; shadow → advisory → full control progression |
| **6** | **DPDP Act 2023 compliance failure** (CCTV facial, GPS, location) | Medium | High | Data minimization: process at edge, discard frames; anonymization pipeline; consent framework for citizen app; DPO appointment; retention limits |
| **7** | **Traffic police resistance** (perceived threat to role) | High | Medium | Position as "augmenting, not replacing"; dashboard gives override authority; training + incentives; co-design workshops from Week 1 |
| **8** | **108 GPS API unavailability/downtime** | Medium | Medium | Graceful degradation to visual+audio only; cache last known position; MoU with EMS with SLA guarantees (99.5% uptime) |
| **9** | **Budget overrun** (Smart Cities funding delayed) | Medium | High | Phased investment; modular architecture allows pause/resume; demonstrate ROI at pilot to unlock next phase; contingency 10% |
| **10** | **Private ambulance non-compliance** (no GPS, no siren) | High | Medium | Regulatory push via Health Ministry; incentivize compliance (priority at signals); visual detection as fallback (light bar + shape) |

## Additional Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| 11 | **Model drift** (new ambulance liveries, seasonal changes) | Medium | Medium | Continuous shadow-mode logging; monthly drift metrics; retraining pipeline with active learning queue |
| 12 | **Citizen alert fatigue** (uninstalls, ignored alerts) | High | Medium | Relevance scoring (ETA <90s); quiet hours; max 3 alerts/day; opt-in granularity |
| 13 | **Multi-agency priority conflicts** (ambulance vs fire vs VIP) | Medium | Medium | Explicit priority hierarchy in orchestrator config; tie-break by ETA; logged decisions for audit |
| 14 | **Cyberattack on signal control** | Low | Critical | Zero-trust architecture; network segmentation; relay board isolated; hardware watchdog failsafe |
| 15 | **Extreme weather** (monsoon, dust, fog) | High | Medium | All-weather camera enclosures; IR illuminators; synthetic data training for rain/fog; audio fusion compensates |

## Risk Monitoring Cadence

| Frequency | Activity | Owner |
|-----------|----------|-------|
| Daily | Health dashboard review (latency, detection rate, override count) | DevOps |
| Weekly | False positive review (manual audit of all preemptions) | ML Engineer + Traffic Police |
| Bi-weekly | Drift metrics (precision/recall on held-out recent data) | ML Engineer |
| Monthly | Retraining cycle (active learning → annotation → fine-tune → validate → OTA) | ML Engineer |
| Per incident | 24h review + 7d resolution (per SOP) | System Admin + Police |