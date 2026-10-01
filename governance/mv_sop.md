# Minimum Viable SOP (Standard Operating Procedure)

## 1. ACTIVATION
- **Automatic**: System activates when emergency vehicle detected (visual + audio/GPS fusion)
- **108 Fleet**: No manual activation required; GPS + vision auto-trigger
- **Private Ambulances**: Driver can activate via app (backup if no GPS/visual)
- **Fire/Police**: CAD dispatch integration triggers priority

## 2. SIGNAL CONTROL
- **Action**: AI extends GREEN on emergency approach
- **Max Override**: 120 seconds per junction
- **Min Cross-Traffic Green**: 15 seconds (pedestrian safety)
- **Auto-Revert Triggers**:
  - System failure (5s watchdog timeout)
  - Emergency vehicle passed (detected clear)
  - Max override time reached
  - Edge server unreachable >30 seconds
- **Police Override**: Available at all times via dashboard + physical button at junction

## 3. CITIZEN ALERTS
- **Trigger**: Push notification to app users within 500m geofence
- **Content**: Vehicle type, ETA, approach direction, recommended action (YIELD_LEFT/PULL_OVER/STOP)
- **Language**: User-selected (Hindi, Tamil, Telugu, Kannada, Bengali, English)
- **Privacy**: No personal data shared; vehicle ID anonymized
- **Opt-out**: User can disable alerts per vehicle type

## 4. INCIDENT HANDLING
- **AI causes traffic issue**: Police manual override immediately
- **Logging**: All incidents logged with camera snapshot + signal state
- **Review**: 24-hour incident review by system admin
- **Resolution**: 7-day target for all incidents
- **Escalation**: Critical (collision/near-miss) → 1h notification to Police + SPV

## 5. DATA RETENTION
| Data Type | Retention | Notes |
|-----------|-----------|-------|
| Detection events | 90 days | Protobuf metadata only |
| Camera footage | 30 days | Or until incident closed |
| Signal override logs | 1 year | Audit trail |
| Anonymized analytics | Indefinite | Aggregated, no PII |
| Citizen app location | Session only | Processed on-device |

## 6. ROLES & RESPONSIBILITIES

| Role | Responsibility |
|------|----------------|
| **System Administrator** | Monitors dashboard, resolves exceptions, manages OTA updates |
| **Traffic Police** | Override authority, incident response, manual control during issues |
| **108 EMS** | Ensure GPS devices operational; report issues via helpline |
| **Fire Department** | Follow Traffic Police protocol; provide vehicle livery data |
| **Smart City SPV** | Fund, govern, ensure DPDP compliance, own ICCC infra |

## 7. DEPLOYMENT PROGRESSION GATES

| Stage | Duration | Criteria to Advance |
|-------|----------|---------------------|
| **Shadow Mode** | Weeks 7-8 | >95% precision, <5% false positive |
| **Advisory Mode** | Weeks 9-10 | >90% police approval rate, zero safety incidents |
| **Supervised Autonomous** | Weeks 10-12 | 4 weeks continuous, <1% override rate |
| **Full Autonomous** | Month 4+ | Exception-based review only; cross-corridor enabled |