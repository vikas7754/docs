---
layout: default
title: Orca Ops Runbook - Orca to HSDB Integration
parent: Service Build Information
grand_parent: Orca Ops Runbook
nav_order: 4
has_children: false
---

# Orca Ops Runbook - Orca to HSDB Integration

This documentation covers the build of Orca to HSDB integration.

## Orca Alerts to HSDB Integration

HSDB contains cloud accounts information and provides API and portal access to its database.
Orca alerts are sent from Orca automation rules via GCP Pub/Sub to HSDB for access by LOBs.

The following diagram shows the general flow of the Orca alerts to HSDB.
<img align="center" src="/assets/docs-images/orca_ops_runbooks/orca_alert_to_mcdb_integration_flow.jpg">

1. As part of Orca custom controls deployment, the [Orca automation rules](#orca-automation-rules-for-alert-notification) are created or updated where applicable.
2. The Orca automation rules notify/publish the alerts to [GCP Pub/Sub](#alert-egress-service).
3. HSDB subscribes to the [GCP Pub/Sub with subscription "orca-alert-subscription-{environment}"](https://console.cloud.google.com/cloudpubsub/subscription/detail/orca-alert-subscription-prod?project=sap-mcsec-orca-operations&authuser=1) to get the alerts and adds to its database.
4. LOBs can query the [HSDB via API](/mce/devsecops-docs/external/compliance_scanning/orca/hsdb_api.md) to get the alerts.

### Orca Automation Rules for Alert Notification

Automation rules have been setup in Orca as part of Orca custom controls deployment.

- These automation rules track custom controls and notify/publish their alert updates to GCP Pub/Sub, provided by the [Alert Egress Service](#alert-egress-service).
- There is 1 automation rule per cloud provider, with the naming convention as "{cloud_provider}-automation".
- When Orca custom controls are deployed for a cloud provider, the automation rule for that cloud provider is created if it does not exist. If the automation rule already exists, its list of custom controls gets updated where applicable (such as adding/removing controls).
- When there are updates to the alerts of these custom controls, the corresponding automation rule gets triggered and publishes the alert updates to GCP Pub/Sub.

### Alert Egress Service

This [Alert Egress Service](https://github.tools.sap/SAE/orca/tree/main/services/alert_egress) is implemented in GCP project "sap-mcsec-orca-operations".

- This service provides the [GCP Pub/Sub topic](https://console.cloud.google.com/cloudpubsub/topic/detail/orca-alert-target-topic-prod?project=sap-mcsec-orca-operations) with the naming convention as "orca-alert-target-topic-{environment}".
- It receives custom control alert updates from Orca automation rules.
- It allows HSDB to subscribe and get the alert updates.

### Troubleshooting

If alerts are not updated in HSDB, some troubleshooting steps (not in sequence) to try as follows:

- Check GCP Pub/Sub subscription queue if it's subscribing alerts or the number of messages doesn't change, if it doesn't change it might be possible something is broken at HSDB end and need to contact HSE team to investigate.
- To verify new alerts pushed to HSDB, check [GCP Pub/Sub topic](https://console.cloud.google.com/cloudpubsub/topic/detail/orca-alert-target-topic-prod?project=sap-mcsec-orca-operations) if new alerts were pushed to topic or not.
- If alert_type is not updated to automation rule in Orca, therefore leads to not ingesting the alerts to HSDB, check GCP cloud build logs if there was any issue with deployment.
- If Orca or HSDB alert schema is changed, check if alerts need to be re-synced from Orca.
- If alert is not available in Orca, alert will not be updated in HSDB. Remove it from HSDB if required.
- Manually trigger an alert from Orca and monitor its journey through the entire pipeline (Orca automation rules, GCP Pub/Sub, HSDB). This can help pinpoint where the issue might be occurring.
