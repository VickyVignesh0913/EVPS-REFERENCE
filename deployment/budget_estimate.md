# Budget Estimate — 5-Signal Pilot

## CAPEX (One-Time)

| Category | Item | Qty | Unit Cost (₹) | Total (₹) |
|----------|------|-----|---------------|-----------|
| **Edge Hardware** | Jetson Orin NX 16GB dev kit | 5 | 1,20,000 | 6,00,000 |
| | Industrial enclosure + cooling | 5 | 15,000 | 75,000 |
| | UPS battery (30 min backup) | 5 | 8,000 | 40,000 |
| **Signal Interface** | Custom relay board (assembled) | 5 | 10,100 | 50,500 |
| **Networking** | 4G SIM cards + data plans (1 yr) | 5 | 3,600 | 18,000 |
| | Network switch (junction cabinet) | 5 | 5,000 | 25,000 |
| **ML Development** | GPU server for training (cloud/on-prem) | 1 | 3,00,000 | 3,00,000 |
| | Dataset annotation (350K images) | - | - | 45,00,000 |
| | CARLA simulation setup | 1 | 8,00,000 | 8,00,000 |
| **Software Licenses** | OR-Tools, Kafka, K8s, Flutter, FCM | - | Free | 0 |
| **Mobile App** | Flutter development (3 months) | - | - | 6,00,000 |
| | Apple Developer account | 1 | 12,000 | 12,000 |
| | Google Play account | 1 | 2,500 | 2,500 |
| **Total CAPEX** | | | | **₹1,03,73,000** (~₹1.04 Cr) |

## OPEX (Annual)

| Item | Monthly (₹) | Annual (₹) |
|------|-------------|------------|
| Cloud infrastructure (ICCC K8s allocation) | 50,000 | 6,00,000 |
| 4G data plans | 1,500 | 18,000 |
| Edge device maintenance | 10,000 | 1,20,000 |
| ML model retraining + active learning | 25,000 | 3,00,000 |
| DevOps + ML engineer (2 FTE) | 3,00,000 | 36,00,000 |
| Data annotation (ongoing) | 50,000 | 6,00,000 |
| Support + on-call | 25,000 | 3,00,000 |
| **Total OPEX/year** | **₹4,66,500** | **₹55,98,000** (~₹56L/year) |

## Total 2-Year Cost: ~₹1.6 Cr (pilot, 5 signals)

## Scaling Economics

| Scale | 2-Year Cost | Cost/Signal | Notes |
|-------|-------------|-------------|-------|
| 5 signals | ₹1.6 Cr | ₹32L | Pilot, high fixed ML/data costs |
| 20 signals | ₹3.5 Cr | ₹17.5L | ML amortized, volume discounts |
| 200 signals | ₹18 Cr | ₹9L | Economies of scale, centralized ops |

### Key Cost Drivers at Scale
- **Edge hardware**: Linear with signals (₹1.5L/signal incl. relay + networking)
- **ML development**: Largely fixed (amortized over all signals)
- **Dataset**: Fixed cost (one-time build, then active learning)
- **Personnel**: Sublinear (centralized ops team)
- **Signal interface boards**: Volume discount at 100+ units (~₹7,000/unit)

## Funding Sources (India Context)

| Source | Potential | Notes |
|--------|-----------|-------|
| Smart Cities Mission (MoHUA) | High | Aligns with ICCC + AMRUT 2.0; require KPI dashboard |
| State Health Mission / NHM | Medium | 108 response time improvement = health outcome metric |
| MeitY / Startup India Grants | Medium | AI/ML innovation category; need prototype + IP |
| CSR (Tata, Mahindra, Reliance, etc.) | High | Ambulance fleet tech, road safety alignment |
| Municipal Corporation Budget | Medium | Requires council approval; show pilot ROI first |
| NHAI (if corridor includes NH) | Low-Medium | Separate MoU; highway-focused |

## ROI Argument for Stakeholders

```
Assumptions (5-signal corridor):
- 10 emergency vehicles/day × 365 = 3,650 runs/year
- Avg. signal delay without EVP: 4 min = 240 sec
- Avg. signal delay with EVP: 30 sec
- Time saved per run: 210 sec = 3.5 min
- Total time saved/year: 3,650 × 3.5 = 12,775 min ≈ 213 hours

Valuation:
- Ambulance: 1 hour saved ≈ ₹5,000-10,000 (fuel, crew, outcome)
- 213 hours × ₹7,500 = ₹16L/year direct value
- Lives saved / outcomes improved: immeasurable but real

Break-even: CAPEX ₹1.04 Cr recovered in ~6.5 years at pilot scale
At 20 signals: 4× runs → break-even ~1.5 years
```