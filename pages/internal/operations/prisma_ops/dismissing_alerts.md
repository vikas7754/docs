---
layout: default
title: "Runbook: Alert Dismissal and Policy Snooze/Dismissal"
parent: Prisma Ops
grand_parent: Operations
has_children: true
---

# Runbook: Alert Dismissal and Policy Snooze/Dismissal

## Document Control

The document control section describes the revision history and summary of changes made in the document. It will serve as the version control
for the contents of the document.

## Revision History

```
Revision Number Revision Date Summary of Change Changed By
1.0 05.04.2020 Initial Draft Hyperscaler DevSecOps
```

- [Policy](#policy)
- [Required Information](#required-information)
- [Alert Types](#alert-types)
  - [False Alert > Suspicious Login](#false-alert---suspicious-login)
  - [False Policy Trigger > Open TCP Ports and Services](#false-policy-trigger---open-tcp-ports-and-services)
- [Operational Procedures: <span style="color:red">Dismissing an Incident Alert</span>](#operational-procedures----span-style--color-red--dismissing-an-incident-alert--span-)
  - [STEP 1 >> Select **Settings** > **Alert ID** and click + Search Box](#step-1------select---settings-------alert-id---and-click---search-box)
  - [STEP 2 >> Enter your **Alert ID** > and click the Policy Name](#step-2------enter-your---alert-id-----and-click-the-policy-name)
  - [STEP 3 >>](#step-3----)
- [Operational Procedures: <span style="color:red">Dismissing a Policy Alert</span>](#operational-procedures----span-style--color-red--dismissing-a-policy-alert--span-)
  - [STEP 1 >> Select **Settings** > **Alert ID** and click + Search Box](#step-1------select---settings-------alert-id---and-click---search-box-1)

## Policy

No alerts or policies shall be dismissed without prior authorization from SGS.
Refer requests to these instructions: [SGS Exception Request Documentation](https://wiki.wdf.sap.corp/wiki/display/itsecurity/Exception+Handling+Process)

Snooze vs Dismissal

## Required Information

Alert ID: P-xxxxxxxx

Cloud Account Number:

```
AWS 12-digit Numeric Account Number: xxxxxxxxxxxx
Azure 32 AlphaNumeric Subscription ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
GCP 12-digit Numeric Project Number: xxxxxxxxxxxx
```

Account Name:

Account Owner:

Account Security Contact:

Requester Name:

Line of Business:

Example Alert Number:

### Precheck Authorization Conditions

Verify it is a Service Desk Request inside the Jira Ticket.

<p align="center">
  <img width="300" height="500" align="center" src="/assets/docs-images/dismissing_alerts/exception_request_authorization_step_1.png">
</p>

Click on the link inside below the request

<p align="center">
  <img width="300" height="500" align="center" src="/assets/docs-images/dismissing_alerts/exception_request_authorization_step_2.png">
</p>

Note the exception period for the alert.

Ticket **<ins>MUST</ins>** be approved by SGS

<p align="center">
  <img width="" height="500" align="center" src="/assets/docs-images/dismissing_alerts/exception_request_authorization_step_3.png">
</p>

## Alert Types

### False Alert > Suspicious Login

```
* Perform an [Arin Lookup](https://arin.net) on the IP addresses in Question.
  - Verify the IPs are in line with the request.
*
```

### False Policy Trigger > Open TCP Ports and Services

## Operational Procedures: <span style="color:red">Dismissing an Incident Alert</span>

### STEP 1 >> Select **Settings** > **Alert ID** and click + Search Box

  <p align="center">
    <img width="300" height="500" align="center" src="/assets/docs-images/dismissing_alerts/alert-dismissal_step_1.png">
  </p>

### STEP 2 >> Enter your **Alert ID** > and click the Policy Name

  <p align="center">
    <img width="" height="" align="center" src="/assets/docs-images/dismissing_alerts/alert-dismissal_step_2.png">
  </p>

### STEP 3 >>

  <p align="center">
    <img width="" height="" align="center" src="/assets/docs-images/dismissing_alerts/alert-dismissal_step_3.png">
  </p>

## Operational Procedures: <span style="color:red">Dismissing a Policy Alert</span>

### STEP 1 >> Select **Settings** > **Alert ID** and click + Search Box

## Troubleshooting

#### TBD

## About This Document

This document identifies and details the process to be followed when adding a new user to Prisma Cloud. This document outlines the process for Tier 1 support to complete ticket requests for access.

## Approval

```
Status: Pending Approval
Reviewed By:
Validated By:
Approved By:
```

## Document Conventions

### Abbreviations

```
Abbreviation Definition
LOB Line of Business
```

### Document History

```
Comment Name Date
Initial Draft
```
