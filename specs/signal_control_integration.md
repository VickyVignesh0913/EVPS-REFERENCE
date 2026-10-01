# Signal Control Integration

## Legacy Fixed-Time Controller Retrofit (80% of Indian Signals)

### Architecture
```
AI System ──HTTP/MQTT──> Edge Gateway (ESP32-S3)
                              │
                    ┌─────────▼─────────┐
                    │  Interface Board  │
                    │  (Custom PCB)     │
                    │                   │
                    │  - ESP32-S3 MCU   │  ₹800
                    │  - 8-ch Relay     │  ₹600
                    │  - PC817 x8       │  ₹200
                    │  - 12V 5A + UPS   │  ₹2,500
                    │  - SIM7600 4G     │  ₹3,000
                    │  - IP65 Box       │  ₹1,500
                    │  - PCB Fab        │  ₹500
                    │  - Assembly       │  ₹1,000
                    └─────────┬─────────┘
                              │ Physical relay to
                              │ controller phase inputs
                    ┌─────────▼─────────┐
                    │ EXISTING CONTROLLER│
                    │ (Fixed-Time)      │
                    └───────────────────┘

TOTAL PER SIGNAL: ₹10,100
5-Signal Pilot: ₹50,500
```

### Safety Protocol (CRITICAL)
1. **NEVER** force red on conflicting approach simultaneously
2. Only EXTEND GREEN on emergency approach, or SKIP to next phase
3. Maximum override: 120 seconds
4. Minimum cross-traffic green: 15 seconds (pedestrian safety)
5. All overrides logged: timestamp, camera snapshot, justification
6. Manual override button at junction for traffic police
7. **Auto-revert to fixed-time if**:
   - Edge server unreachable > 30 seconds
   - Relay board watchdog timeout (5 seconds)
   - Emergency vehicle passed (detected clear)
   - Maximum override time reached
8. **Physical failsafe**: Relay defaults to pass-through (signal normal) when power lost

## SCATS/SCOOT Integration (Adaptive Controllers)

### SCATS (Delhi, Mumbai, Bengaluru)
- Interface via SACS API or Regional Computer data exchange
- DETU (Detection Extension Unit) API for priority requests
- Phase/offset modification via CORDET
- Requires vendor NDA for API documentation

### SCOOT (Hyderabad, Pune)
- Interface via SCOOT MOVA or Priority module
- Uses UTC/ATC protocol
- Similar priority request pattern

## Hardware Watchdog Design
```
┌─────────────────────────────────────┐
│      RELAY BOARD MCU (ESP32-S3)     │
├─────────────────────────────────────┤
│  Heartbeat LED: 1Hz blink = alive   │
│  Watchdog Timer: 5 seconds          │
│                                     │
│  IF no heartbeat from AI edge > 5s: │
│    → Drop all relays                │
│    → Controller reverts to native   │
│    → Log event + alert ICCC         │
└─────────────────────────────────────┘
```