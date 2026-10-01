# Liability Allocation Matrix

| Scenario | Primary Liability | Notes |
|----------|-------------------|-------|
| AI fails to detect ambulance → no preemption | City/SPV | System is augmentative, not primary safety system; police retain judgment |
| AI false positive → unnecessary preemption → accident | City/SPV (system error) | Insurance covers; system logs determine root cause |
| Relay board malfunction → stuck green | Hardware vendor (warranty) + City (maintenance SLA) | Vendor warranty + City maintenance contract |
| Ambulance driver ignores green signal | Ambulance operator | Not system liability; driver training issue |
| Citizen distracted by alert → accident | App disclaims liability | Advisory only (same as Google Maps/Waze) |
| Network failure → system offline, no preemption | Acceptable risk | Edge-first design reverts to normal, not dangerous state |
| Cyberattack on system | City + System Operator (shared) | Per DPDP Act security requirements; incident response plan |

## Key Principle
> **System is ADVISORY/AUGMENTATIVE, not primary safety system. Traffic police maintain override authority.**

This framing limits liability while building trust.

## Insurance Requirements
- Professional indemnity: ₹5 Cr minimum
- Cyber liability: ₹2 Cr minimum  
- Public liability: ₹10 Cr minimum (city requirement)
- Product liability (hardware): Vendor responsibility

## Incident Response Escalation

```
Level 1 (Auto-resolved): Watchdog revert, no traffic impact
    → Log only, review in daily standup

Level 2 (Police intervention): Manual override needed
    → 15-min notification to System Admin
    → Root cause analysis in 24h

Level 3 (Safety incident): Near-miss or collision
    → 1h notification to Police Commissioner + SPV CEO
    → Independent audit within 72h
    → System paused pending audit clearance

Level 4 (Cyber/data breach): DPDP Act trigger
    → 72h notification to Data Protection Board
    → Forensic investigation
    → Affected user notification (if PII involved)
```