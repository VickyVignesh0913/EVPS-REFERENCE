# EVPS - REFERENCE: Complete Document Index

```
EVPS - REFERENCE/
├── architecture/
│   ├── system_overview.md          # 5-layer architecture, design principles
│   ├── tech_stack_matrix.md        # Component-by-component decisions with India rationale
│   └── indian_context.md           # India vs US/EU comparison table
├── specs/
│   ├── ai_ml_architecture.md       # Detection, tracking, fusion, trajectory, optimization
│   └── signal_control_integration.md # Relay retrofit, SCATS/SCOOT, safety protocols
├── schemas/
│   ├── detection_event.proto       # Protobuf schema for detection events
│   ├── predicted_arrival.proto     # Trajectory prediction output
│   ├── signal_phase_request.proto  # Signal control commands
│   ├── phase_ack.proto             # Controller acknowledgments
│   ├── citizen_alert.proto         # Mobile push notifications
│   └── kafka_topics.md             # Topic structure, partitions, security
├── diagrams/
│   ├── system_architecture.mmd     # Mermaid: 5-layer system diagram
│   ├── deployment_timeline.mmd     # Mermaid: 12-week Gantt chart
│   └── stakeholder_map.mmd         # Mermaid: Influence vs Interest quadrant chart
├── deployment/
│   ├── pilot_12_week_plan.md       # Week-by-week plan with KPIs & exit criteria
│   ├── budget_estimate.md          # CAPEX/OPEX with scaling economics & ROI
│   └── risk_register.md            # Top 15 risks with likelihood/impact/mitigation
├── governance/
│   ├── mv_sop.md                   # Minimum Viable Standard Operating Procedure
│   ├── liability_framework.md      # Liability allocation matrix + insurance requirements
│   └── data_sharing_agreement.md   # DPDP-compliant data flow framework
└── research/
    ├── open_research_questions.md  # 5 papers + 5 patents + white papers
    └── innovation_opportunities.md # Near/Medium/Long-term roadmap
```

---

## Quick Navigation by Role

| Role | Start Here |
|------|------------|
| **Project Lead / PM** | `deployment/pilot_12_week_plan.md` → `deployment/budget_estimate.md` |
| **ML Engineer** | `specs/ai_ml_architecture.md` → `schemas/detection_event.proto` |
| **Embedded/Firmware Engineer** | `specs/signal_control_integration.md` → `schemas/signal_phase_request.proto` |
| **Backend/Cloud Engineer** | `architecture/system_overview.md` → `schemas/kafka_topics.md` |
| **Mobile Engineer** | `schemas/citizen_alert.proto` → `deployment/pilot_12_week_plan.md` (Week 11) |
| **Legal/Compliance** | `governance/data_sharing_agreement.md` → `governance/liability_framework.md` |
| **Traffic Police Liaison** | `governance/mv_sop.md` → `deployment/risk_register.md` |
| **Researcher / Academic** | `research/open_research_questions.md` → `research/innovation_opportunities.md` |
| **City Official / Funder** | `architecture/indian_context.md` → `deployment/budget_estimate.md` (ROI section) |

---

## Tri-AI Synthesis Source

This reference synthesizes recommendations from three AI analyses:
1. **ChatGPT** — Multi-modal fusion weights, hierarchical edge→corridor→ICCC, Bayesian confidence
2. **Gemini** — Jetson Orin Industrial, Tile38 geofencing, hardware watchdog, zero-hardware retrofit
3. **Claude Code** — Detailed relay board BOM (₹10,100/signal), MV SOP, liability matrix, DPDP framework

---

## Key Metrics at a Glance

| Metric | Target |
|--------|--------|
| Detection Precision | > 95% |
| Edge Latency | < 200ms |
| False Positive Rate | < 2% |
| Signal Override Success | > 99% |
| System Uptime | > 99.5% |
| Ambulance Delay Reduction | > 20% |
| Citizen App Active Users (Pilot) | 500+ |

---

## Next Actions

- [ ] Finalize MoU templates with Traffic Police / 108 / Fire
- [ ] Procure 5× Jetson Orin NX + relay board components
- [ ] Begin Indian emergency vehicle dataset collection (Phase 1: 50K images)
- [ ] Set up Kafka + TimescaleDB at ICCC test environment
- [ ] Build shadow-mode detection pipeline on recorded CCTV footage

---

*Generated: 2026-06-20*  
*Version: 1.0 — Modular Architecture Baseline*