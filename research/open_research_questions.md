# Open Research Questions (Publishable / Patentable)

## Academic Publications (Target Venues)

### 1. Multi-Modal Emergency Vehicle Detection
**Title**: "Multi-Modal Emergency Vehicle Detection in Dense Indian Traffic: A Fusion Architecture"
- **Novelty**: Audio-visual-GPS fusion for unmarked vehicle detection
- **Target**: IEEE ITSC / TRB Annual Meeting
- **Dataset**: Release annotated Indian emergency vehicle benchmark

### 2. Green Wave Optimization Under Mixed Traffic
**Title**: "Green Wave Optimization Under Mixed Traffic: RL vs MILP for Emergency Vehicle Preemption in Developing Countries"
- **Novelty**: Compare PPO vs OR-Tools on Indian traffic simulation
- **Target**: Transportation Research Part C
- **Code**: Open-source SUMO + RL environment

### 3. Emergency Vehicle Detection Benchmark
**Title**: "Dataset and Benchmark for Emergency Vehicle Detection in South Asian Traffic Conditions"
- **Novelty**: First public dataset for Indian emergency vehicles with occlusion labels
- **Target**: NeurIPS Datasets & Benchmarks Track
- **Release**: 50K+ annotated frames, 6 emergency classes

### 4. Edge AI for Traffic Signal Preemption
**Title**: "Edge AI for Traffic Signal Preemption: Latency-Reliability Tradeoffs in Intermittent Connectivity Environments"
- **Novelty**: Edge-first architecture analysis with graceful degradation
- **Target**: IEEE IoT Journal
- **Metrics**: 200ms budget, 99.5% uptime without cloud

### 5. Citizen Engagement in EVP
**Title**: "Citizen Engagement in Emergency Vehicle Priority: Mobile Geofencing and Behavior Change in Indian Cities"
- **Novelty**: Alert fatigue curves, yielding compliance measurement
- **Target**: Accident Analysis & Prevention
- **Study**: 500+ user pilot with behavioral metrics

## Patentable Innovations

### 1. Multi-Modal Fusion with Unmarked Detection
**Title**: "Method and System for Multi-Modal Emergency Vehicle Detection Using Audio-Visual-GPS Fusion with Unmarked Vehicle Classification"
- **Claims**: Fusion engine + unmarked vehicle classification via shape/siren/behavior

### 2. Adaptive Green Wave with Safety Constraints
**Title**: "Adaptive Green Wave Generation for Emergency Vehicles Using Reinforcement Learning with Safety Constraints in Mixed-Traffic Environments"
- **Claims**: RL optimizer with MILP safety bounds, hard constraint encoding

### 3. Edge-First EVP with Hardware Watchdog
**Title**: "Edge-First Emergency Vehicle Priority System with Graceful Degradation and Hardware Watchdog for Signal Controller Safety"
- **Claims**: 5s hardware watchdog, auto-revert, zero-cloud-dependency control loop

### 4. Dynamic Geofencing with Relevance Scoring
**Title**: "Dynamic Geofencing System for Emergency Vehicle Alerts with Battery-Optimized On-Device Processing and Relevance Scoring"
- **Claims**: Client/server hybrid, heading-vector relevance, dynamic radius

### 5. Active Learning Pipeline for Shadow Deployment
**Title**: "Active Learning Pipeline for Emergency Vehicle Detection with Real-World Shadow Deployment and Human-in-the-Loop Annotation"
- **Claims**: Confidence-threshold sampling, FIFO buffer, monthly retrain cycle

## Technical White Papers (Internal → External)

| Topic | Audience | Format |
|-------|----------|--------|
| Relay Retrofit Design Guide | Signal vendors, integrators | PDF + schematics |
| Indian Emergency Vehicle Taxonomy | ML researchers, annotators | Labeling guide + examples |
| MILP Formulation for Signal Preemption | Traffic engineers, academia | Mathematical spec + OR-Tools code |
| DPDP Compliance for Smart City AI | Legal, policy makers | Compliance checklist |