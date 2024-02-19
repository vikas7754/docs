---
layout: "default"
title: "Orca Ops Runbook - Disaster Recovery Plan"
parent: Disaster Recovery Plan
grand_parent: Orca Ops Runbook
nav_order: 1
has_children: false
---

# Orca Ops Runbook - Disaster Recovery Plan
This documentation will cover Disaster Recovery Plans and procedure. 


## Orca Automation Rebuild/Recovery Plan
We have terraform for all services which can be used as redeployment

## Orca Data Pipelines

1. Backups:
Backups are performed on a daily basis, active standby for databases and full active redundancy for compute.

2. Retention:
Orca Team retain raw scan data for 30 days and the final scan reports (the data presented in the dashboard with Orca's inputs) for up to 12 months.

3. BCP and DR:
Orca Team perform an annual DRP test. 