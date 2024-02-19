---
layout: default
title: "Runbook: Adding/Changing Routes to a Router"
parent: Prisma Ops
grand_parent: Operations
has_children: true
---

# Runbook: Adding/Changing Routes to a Router

## Document Control

The document control section describes the revision history and summary of changes made in the document. It will serve as the version control
for the contents of the document.

## Revision History

```
Revision Number Revision Date Summary of Change Changed By
1.0 15 Oct 2019 Initial Draft Aaron McConnell
```
## Application Description

Occasionally, tickets will appear on the queue where a LoB cannot achieve communications because an on-prem router is not configured to
forward their traffic properly. This can be observed in ticket SPC ticket 1106200161 (and in derived ticket MCO-20473). This ticket was originally
related to a PCI setup, but a subsequent comment in the ticket makes an extra request: "Add route for the new prefix 10.238.209.0/24 to rt-ext-
rot1-01 and rt-ext-wdf51-02". This request is outside of the operational remit of the DevNetOps team.

## Operational Procedures

1: Examine the request for keywords which indicate that routers to be changed are on-prem. The requestor may use the words "on-prem" or "on
premise", or refer to the geographical location of the router, e.g., Walldorf. Conversely, the requestor may specifically state the cloud project ID
or cloud platform in which a cloud-side change should be made. In this case, a route may be have to be added (or changed) by the DevNetOps
team on the cloud-side.
2: If the request is for a change to an on-prem router then:
2.1: If there is a SPC ticket:
Add a comment to both the Jira ticket and to the SPC ticket: "This is an on-prem request. Assigning the ticket to the
correct queue "ITI NETWORK IDC L2 - Network - Internal Data Center Level 2 Support".
Assign the SPC ticket to the "ITI NETWORK IDC L2 - Network - Internal Data Center Level 2 Support" queue.
Resolve the Jira ticket with type "Declined". Add a resolution comment of:"This is an on-prem request. SPC ticket has been
assigned to the correct queue "ITI NETWORK IDC L2 - Network - Internal Data Center Level 2 Support".

2.2 If there is no SPC ticket:

Add a comment to the Jira ticket: "This is an on-prem request. Please raise a SPC ticket with "ITI NETWORK IDC L2 - Network -
Internal Data Center Level 2 Support".
Resolve the Jira ticket with type "Declined". Add a resolution comment of: "This is an on-prem request. Requestor has been advised
to open a SPC ticket with "ITI NETWORK IDC L2 - Network - Internal Data Center Level 2 Support".
3: If the ticket is for a cloud-side change then escalate the ticket to L3.
4: If the request is not clear, i.e., you are not sure where the ticket should be directed to, then escalate the ticket to L3.

## Troubleshooting

#### TBD

## About This Document

This document identifies and details the process to be followed when attempting to resolve "Adding/changing routes to a router" tickets. This
document aims to help the Ops engineer to classify the ticket and assign it to the correct queue.


## Approval

```
Status: Pending Approval
Reviewed By: Colm McKenna
Validated By:
Approved By:
```
## Document Conventions

### Abbreviations

```
Abbreviation Definition
PCI Public Cloud Interconnect
SPC (SAP) Service Provider Cockpit
```
### Document History

```
Comment Name Date
Initial Draft Aaron McConnell 10/15/
```
