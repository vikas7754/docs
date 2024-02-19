---
layout: default
title: "[ARCHIVE] Minerva Release Management"
nav_order: 1
parent: "[ARCHIVE] Release Information"
grand_parent: ARCHIVED
has_children: false
---

# Minerva Release Management

## Minerva controls maintenance are done by GCS SRRC Hyperscaler Security team in the following way:

- Release cycle for Minerva is 2 weeks.
- Each release will be addressed by a unique global city name.
- All the policies defined by SGS are written as Minerva controls.
- Minerva uses Chef Inspec as base engine for running the scans. Chef Inspec is a Open-source software and the details can be found here:
  [AWS](https://github.com/inspec/inspec-aws),
  [AZURE](https://github.com/inspec/inspec-azure),
  [GCP](https://github.com/inspec/inspec-gcp),
  [ALICLOUD](https://github.com/inspec/inspec-alicloud)
- These Minerva controls are developed by GCS SRRC Hyperscaler Security Operations (SecOps) team.
- Each Minerva release consists of control changes.
- Control changes are implemented via:

  - Change requests by SGS.
    - Based on these requested changes, control for that policy is modified accordingly.
  - Feedback on the controls received from LOB's.

- The following actions can be considered a control change:

  - Activation or creation of new controls.
  - Deactivation of controls.
  - Changes to the severity of a control.
  - Suggested changes to existing controls.

- The selected controls will then run through different stages in the release cycle.

  1. Receive updates/feedback from SGS or LOB's.

     - These controls changes will be developed and tested by SecOps team.

  2. These control changes will be reviewed by SGS if necessary for their approval and final sign off’.

     - These changes will be tested in Pre-Production.

  3. The control changes will be finally deployed to production and release will be completed.
     - The release notes will be published [here](https://github.tools.sap/mce/cloud-compliance/releases).
     - The ad-hoc containers will be pushed to the artifactory for LOB's to leverage it into their SDLC. Details can be found [here](/external/compliance_scanning/on_demand/running_adhoc_scan)
     - Updated documentation for the list of controls and remediations can be forund for [AWS](/external/compliance_scanning/minerva_aws_controls), [Azure](/external/compliance_scanning/minerva_azure_controls), [GCP](/external/compliance_scanning/minerva_gcp_controls) and [Alicloud](/external/compliance_scanning/minerva_alicloud_controls)
