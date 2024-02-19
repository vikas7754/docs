---
layout: default
title: Orca Controls Release Management
nav_order: 1
parent: Release Information
grand_parent: External Documentation
has_children: true
---

# Orca Controls Release Management

## Table of Contents

1. Introduction
   - 1.1 WHAT?
   - 1.2 WHY?
2. Orca Release Process
   - 2.1 Release Cadence
   - 2.2 Orca controls overview
   - 2.3 Release components
   - 2.4 Release Process
3. Important links

## Introduction:

### 1.1 WHAT?

SAP uses so called "**Detective Controls**" to monitor the security configuration of ALL SAP Hyperscaler Accounts (e.g. Aws, GCP, Microsoft Azure & Alibaba Cloud) towards the SAP Hyperscaler Security Reference Architecture and configuration standards. These security configuration requirements are defined by SAP Global Security and published in the Security Policy Framework / Wiki. These can be found here [Alicloud](https://wiki.wdf.sap.corp/wiki/x/XLjGe), [AWS](https://wiki.wdf.sap.corp/wiki/x/-0JAc), [Azure](https://wiki.wdf.sap.corp/wiki/x/Ckc3c), [GCP](https://wiki.wdf.sap.corp/wiki/x/9Ik-cg)

The detective controls are divided by their ratings (HIGH, MEDIUM), which reflect the SAP Global Security mandatory baseline and additional requirements for critical cloud business:

- HIGH rated control = **MUST** / Baseline requirement in Security Wiki
- MEDIUM rated control = **SHOULD** requirement in Security Wiki

### 1.2 WHY?

These set of controls are being updated dynamically as per the security standards. This includes addition of new controls, updating existing ones as per specific use-cases, etc. Considering this, it is important to have a process and track all the changes being made. Following a release process will also enable smooth adoption for the LoB's to all the control changes.

## Orca Release Process

### 2.1 Release Cadence

- Release for Orca controls will be done every month
- Releases follow the [Semantic Versioning Specification](https://semver.org/spec/v2.0.0) as e.g. `release-1.0.x`

### 2.2 Orca controls overview

- All the policies defined by SGS are implemented in Orca
- These policies are converted into code called `controls`. These controls are developed by GCS SRRC Hyperscaler Security Engineering and Operations (HSEO) team
- Orca controls are written in the form of sonar query using orca built-in query language

### 2.3 Release components

- The release will mainly consists of two parts:

  1. Main release -> This will include the following:

     - new controls
     - deletion of controls
     - exisiting controls updates
     - SHOULD i.e. Medium severity controls bug fixes
     - MUST i.e. High severity controls buf fixes if they are not covered in off-cycle release
     - control severity changes

  2. Off-cycle ad-hoc release -> This will include the following:
     - Updates to existing controls that will include bug fixes or changing the control severity to informational
     - If a controls is changed to informational it is removed from the list and added to the subsequent release

- Release changes are implemented via:
  - Change requests by SGS.
    - Based on these requested changes, control for that policy is modified accordingly.
  - Feedback on the controls received from LOBs.

### 2.4 Release Process

Each release process will be of one month and will include following:

- SGS provides a list of new controls and control updates which will be developed throughout the month
- The controls implemented and ready to be released, will be initially released as informational for at least 1 month. The controls release as informational will be a continuous process
- Controls that were informational over the past at least one month, will be updated as High/Medium
- The updates to existing controls, deactivation of controls will also be part of the release process

## Important Links

- With completion of release, release notes will be published here: [Orca release Notes](https://github.tools.sap/SAE/orca/releases)
- Orca control details can be found here: [AWS](/external/compliance_scanning/orca_aws_controls), [Azure](../compliance_scanning/orca_azure_controls.mdx), [GCP](../compliance_scanning/orca_gcp_controls.mdx), [Alicloud](../compliance_scanning/orca_alicloud_controls.mdx)
