---
layout: default
title: "[ARCHIVE] Control Explanation and Remediation Steps"
parent: "[ARCHIVE] L2 Minerva Runbooks"
grand_parent: "[ARCHIVE] Internal Minerva Docs"
has_children: false
---

# Contents

- [Introduction](#introduction)
- [HyperScaler Detective Controls and Remediations](#hyperscaler-detective-controls-and-remediations)
- [SGS Policy](#sgs-policy)

## Introduction

This part of the runbook will provide links to the detective controls Minerva has implemented. The links will provide a high level overview of the controls for each HyperScaler. These links list the current controls, give a high level overview of what the control does, and also provide remediation steps.

## HyperScaler Detective Controls and Remediations

If a user asks for information about a particular control and how to fix it, make sure the control reference is in the SNOW ticket. The format will be _HyperScaler + Policy Number + Control title_. For example:

_AWS 4.1 - AWS S3 buckets do not have server side encryption_

_Azure 3.1 - Export Activity Log_

Once the control is in the SNOW ticket, signpost the user to the correct HyperScaler Control and remediation steps.

- [AliCloud Controls and Remediation](/external/compliance_scanning/minerva_alicloud_controls)
- [AWS Controls and Remediation](/external/compliance_scanning/minerva_aws_controls)
- [Azure Controls and Remediations](/external/compliance_scanning/minerva_azure_controls)
- [GCP Controls and Remediations](/external/compliance_scanning/minerva_gcp_controls)

## SGS Policy

SGS HyperScaler hardening policy is what informs the detective controls Minerva uses. SGS hardening policies for each HyperScaler can be found in the following locations:

[AliCloud SGS Hardening Policy](https://wiki.wdf.sap.corp/wiki/display/itsec/Alibaba+Cloud+-+Hardening)
[AWS SGS Hardening Policy](https://wiki.wdf.sap.corp/wiki/display/itsec/Amazon+Web+Service+-+Hardening)
[Azure SGS Hardening Policy](https://wiki.wdf.sap.corp/wiki/display/itsec/Microsoft+Azure+-+Hardening)
[GCP SGS Hardening Policy](https://wiki.wdf.sap.corp/wiki/display/itsec/Google+Cloud+-+Hardening)

If a user wishes to raise a question about an SGS policy, they should contact SGS directly. The user should be signposted to the [SGS Security Procedures, Good Practices and Prod. Standard Sec. Requirement feedback form](https://securityjira.wdf.sap.corp/secure/CreateIssue.jspa?pid=16506&issuetype=10000) to raise a policy question, by selecting _Hardening Procedures_ from Document Category, them the HyperScaler (for example, Amazon Web Services) under Document Name.

 <p align="center">
      <img width="" height="" align="center" src="/assets/docs-images/runbooks/sgs_policy.png">
 </p>
