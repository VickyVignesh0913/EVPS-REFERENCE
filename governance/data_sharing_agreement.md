# Data Sharing Agreement Framework

## Parties
- **Data Controller**: [City Smart City SPV]
- **Data Processor**: [EVP System Operator]

## Key Terms

### 1. CCTV Footage
- Processed at edge; frames discarded after detection
- Only metadata retained: vehicle class, position, timestamp, confidence
- **Raw footage NEVER transmitted to cloud**

### 2. GPS Data (from 108/102)
- Shared via API, real-time only
- Not stored beyond session
- Used solely for trajectory prediction
- Vehicle IDs anonymized in logs

### 3. Signal Logs
- Shared by Traffic Police / SCATS vendor
- Override requests + acknowledgments with timestamps
- Retained 1 year for audit

### 4. Citizen App Data
- User location processed **on-device**
- Server receives only geofence zone checks (boolean)
- No continuous location history stored

### 5. Anonymized Analytics
- Aggregated data (response times, preemption counts, delay distributions)
- May be shared with researchers/media under Open Data Policy

### 6. DPDP Act 2023 Compliance
| Requirement | Implementation |
|-------------|----------------|
| Purpose Limitation | Data used ONLY for EVP |
| Data Minimization | Collect minimum necessary |
| Storage Limitation | Per retention schedule above |
| Security | AES-256 at rest, TLS 1.3 in transit |
| Breach Notification | Within 72 hours to Data Protection Board |
| User Rights | App users can delete account + all data |

## Data Flow Diagram
```
CCTV Camera → Edge (Jetson) → Detection Metadata → Kafka → ICCC
                    ↓
              Frames Discarded (real-time)

108 GPS API → Edge/Corridor → Trajectory Prediction → Orchestrator
                    ↓
              Position Cached (session only)

Citizen App → On-device Geofence → Boolean Check → Alert Service
                    ↓
              No Location History Stored
```

## Audit & Compliance
- Quarterly DPDP compliance audit by independent auditor
- Annual penetration test (certified CERT-In empaneled)
- Data Processing Addendum (DPA) signed before any data exchange
- Record of Processing Activities (ROPA) maintained per DPDP Section 10