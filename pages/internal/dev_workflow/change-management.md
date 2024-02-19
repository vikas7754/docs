---
layout: default
title: Change Management process
nav_order: 2
parent: Dev WorkFlow
grand_parent: Internal Documentation
---
# Change Management process
## Process context
This **Change Management** process is based on the Hyperscaler **Change
Management** process, which can be found
[here](https://wiki.multicloud.int.sap/display/SAP/Change+Management). However,
it is not the same as some modifications have been applied to make it more
relevant for the DevSecOps team.

## Definitions
A **change** is defined as any modification on hardware, software or objects
within a cloud project. A **Change Management** (CM) process aims to understand
and minimize risks of doing changes to an IT *productive* system. Therefore,
appropriate plan, review and approval must be in place.

Each **change** needs to be:
- documented
- classified and prioritized
- risk assessed
- approved
- notified to relevant parties where relevant

### Change classification
In terms of change classifications, there are 3 classes of changes:
- **Standard**: this is a low-risk change that can be done quickly and has low
  impact on the IT system
- **Important**: this is a change that impacts the running system and takes
  dedicated time in order to be implemented, e.g., updating a service, a
  cluster, applying a security patch. This type of change needs to be planned
  appropriately.
- **Urgent**: this change concerns security or business critical changes, for
  example because of a P1 or P2 incident ticket. This only applies if an
  immediate action is required, otherwise an **Important** change should be
  raised instead. In case of P1 incidents, a problem management ticket must be
  raised.

### Risk classification
As for risk classification, there are 3 classes of risks:
- **Low**: this is a change that has low impact on the system, normally a minor
  change, e.g., fixing a bug, or updating a configuration
- **Minor**: this change can potentially impact the running system, e.g.,
  deploying a new feature, in which case it is required to:
  - communicate to relevant parties (if applicable)
  - create a rollback plan (if applicable)
- **High**: this change has significant impact on the running system and highly
  affects business operations, for example in case of a significant change to a
  core service. In this case it is required to:
  - communicate to relevant parties (if applicable)
  - create a rollback plan

### Risk score
The table below allows to quantify a risk score which will determine the risk
type for the change.

| **Description** | **Value/Quantity** | **Score** |
| ----------------|--------------------|-----------|
| Outage time | 0 mins | 0 |
| Outage time | 0 to 15 mins | 3 |
| Outage time | 15+ mins | 6 |
| Affected user base | None | 0 |
| Affected user base | Kibana/API users | 1 |
| Affected user base | Single Cloud | 3 |
| Affected user base | 2 or more Clouds | 6 |
| Service modification (pod, OS, etc.) | per component | 2 |
| Critical service modification (K8s, ELK, etc.) | per component | 5 |
| Change time (to complete the change) | 0 to 30 mins | 0 |
| Change time (to complete the change) | 30+ mins | 3 |
| Rollback time | 0 to 30 mins | 0 |
| Rollback time | 30+ mins | 3 |

## Documenting a change
In order to document a **change** a github ticket needs to be created using the
CM template in zenhub. The following fields as well as the risk assessment need
to be filled appropriately:

```
Description:
Justification:
Validity of change (if applicable):
```

### Risk assessment
Normally CM tickets are created by admins as normal work routine on production
system. In this case they need to make the risk assessment described below. In
the rare case that a CM ticket is created by a non-admin person, the approver
needs to make the risk assessment.

The risk assessment is done by calculating the associated risk score, after
filling the following fields in the ticket description:

```
Estimated Outage:
Affected user base:
Service(s) modifications:
Change time:
Rollback time:
Total score:
```

Once the risk assessment is done, the risk can be classified as:

| **Score** | **Risk** |
| ----------------|----|
| 0 to 4 | Low |
| 4 to 9 | Medium |
| 10+ | High |

## Plan and execution
After the risk being classified a task can be scheduled according to the
necessary time needed to be carried out and its urgency. A plan can also be
worked out depending on the risk class of the change, e.g.:
- Schedule a time to carry out the change
- Inform relevant parties (if applicable)
- Create a detailed rollback plan
- Create or check backups (if necessary)

The plan and any relevant information should be recorded in the CM ticket,
i.e., adding comments as necessary.

## Change management approvers
Following is a list of approvers for change management requests:

| **Name** | **I-number** | **Time zone** | **Role** | **System** |
| ---------|--------------|---------------|----------|------------|
| Andrea Edwards | I866863 | Central Standard Time | Admin | ELK |
| Justin Nikles | I506539 | Eastern Standard Time | Admin | ELK, GCP |
| Carmelo Ragusa | I069103 | Greenwich Mean Time | Admin | ELK, GCP |
| Rohit Prasad Joshi | I539556 | Pacific Standard Time | Admin | GCP |
| James Yan | I355896 | Singapore Time | Admin | GCP |
| Jatin Rajpura | I500686 | China Standard Time | Admin | GCP Singapore |

Each request needs 2 approvals.
