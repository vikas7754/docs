---
layout: default
title: Orca Ops Runbook - Alert and Troubleshooting
parent: Alert Playbook
grand_parent: Orca Ops Runbook
nav_order: 1
has_children: false
---
# Orca Ops Runbook - Alert and Troubleshooting
This documentation will cover orca alerts and how to troubleshoot them

## Alert Types
1.	Patching Alerts - These alerts are associated with system updates and modifications, and should be covered by the Orca team.
2.	Alerts that Require Exception - These alerts can be categorized into two distinct types: 
- Self-Service Tags-Based Exception 
- Accounts that Require Exceptions on Specific Controls

## Self-Service Tags-Based Exception 
Self-service tags-based exceptions can be directly applied by Lines of Business (LoBs) to cloud assets with approved tags as per SGS Wiki. The implemented system already has the capability to exclude assets where the approved tag matches the SGS wiki.
If a ticket from LoBs is received where an issue has been raised that the self-service tag is already in place but an alert was still triggered, verification must include the following:
1.	Check the account status: If offline, most cases will relate to the old alerts.
2.	Confirm the alert discovery and last seen time: If older than 2 days, most likely it's an old alert.
3.	Verify the applied tag at the cloud asset in the hyperscaler account using a cloud admin account, ensuring it's the correct tag and validate it with SGS wiki approved tags. Check in the SAE/Orca repository that the control has tag exclusion applied. If any changes are needed, create a PR for it.

## Accounts that Require Exceptions on Specific Controls
Troubleshooting should include checking at least the following information:
1.	Determine the account status: If offline, most cases it's an old alert.
2.	Verify when the alert was discovered and last seen: If it's older than 2 days, it is likely an old alert.
3.	For High severity control, check the provided SEMP ticket to determine if it has already expired or had its validity extended recently. For Medium severity control, verify the validity of the exception in Exception CSV. Communicate any required changes with the exception processor.
Note: For exceptions already expired, direct LoBs to raise a new exception ticket for both High and Medium severity controls.
4.	If all above conditions are correct, look up in Orca -> Automations with Ticket-ID under the Description field to see the current rule. Discuss any required changes with the exception processor.



