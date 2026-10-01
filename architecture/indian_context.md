# Indian Context vs US/EU Adaptations

| Dimension | US/EU | India | Our Adaptation |
|-----------|-------|-------|----------------|
| **Traffic Density** | Moderate, structured lanes | Extreme, mixed, chaotic | Multi-camera coverage, occlusion-robust tracking |
| **Vehicle Mix** | Cars dominant | 2-wheelers 40-60%, autos, carts | Height-based filtering (<1.8m = 2-wheeler), P2 detection head |
| **Signal Controllers** | NTCIP standard, digital | 80% fixed-time, no digital interface | Relay board retrofit (₹10,100/signal) |
| **Emergency Vehicles** | Standardized livery, GPS on all | 30% private, varied livery, no GPS | Multi-modal fusion + unmarked detection |
| **Connectivity** | Reliable 4G/5G/fiber | Intermittent, especially at junctions | Edge-first, zero cloud dependency for control |
| **Regulatory** | Clear federal standards (MUTCD) | State-level, fragmented | MoU-based, pilot-first approach |
| **Funding** | Municipal budgets | Smart Cities Mission, convergence | Leverage ICCC infra, Smart City SPV |
| **Traffic Police** | Automated systems common | Manual control preference | Advisory mode first, human-in-loop |
| **Language** | English | 22 official languages + English | Multi-language app, local TTS voice alerts |
| **Infrastructure** | Dedicated fiber to signals | Fiber at ICCC, 4G at junctions | Hybrid connectivity, local processing |
| **Privacy** | GDPR (mature) | DPDP Act 2023 (new) | Conservative: edge processing, metadata-only upstream |