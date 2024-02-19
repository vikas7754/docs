---
layout: default
title: Orca Ops Runbook - Orca Splunk Integration
parent: Integration Services
grand_parent: Orca Ops Runbook
nav_order: 4
has_children: false
---
# Orca Ops Runbook - Orca Splunk Integration
This documentation covers support steps to provide the Orca Integration to
Splunk for LoBs.

## Orca Integration for Splunk
Below are the steps required by both LoB and Operation Engineer to create the
Splunk integration and automation:

1. LoB creates a
   [ticket](https://itsm.services.sap/sp?id=sc_cat_item&sys_id=ada60b961bd09150341e11739b4bcb65&sysparm_category=cbe15fd61b549150341e11739b4bcb8a&catalog_id=09a3ed6a1b2f80d020c8fddacd4bcb02)
   to request Splunk integration
2. LoB requests [Multicloud_SecDevOps_OrcaSplunkUser CAM
   profile](https://spc.ondemand.com/sap/bc/webdynpro/a1sspc/cam_wd_central?item=request&profile=Multicloud_SecDevOps_OrcaSplunkUser)
3. Once CAM profile is approved, LoB creates the splunk integration in Orca as
   described in the
   [documentation](https://docs.orcasecurity.io/docs/integrating-splunk).

   **Note**: sign in to Orca [here](https://eu.sap.app.orcasecurity.io) via SSO
   and selecting Documentation from the Question Circle Icon on the top right of
   the dashboard before the documentation can be seen

   **Prerequisite**: the LoB needs to understand the type of Splunk integration
   requirements and create necessary setups in advance
4. LoB creates the Splunk integration in Orca and communicates the
   name to Engineer
5. LoB communiates the Query for the automation to the Engineer
6. Engineer creates Orca Automation using `Query` and `Splunk Integration` from
   LoB. Then name of the Automation must be in the format
   `<LoB_acronym>-Splunk-<scope>-automation` (please note the use of `-` to
   separate the diferent parts of the name), where `scope` is one optional and
   can be decided by the LoB if needed.  e.g. `ASR-Splunk-automation`,
   `GCS-Splunk-alerts-automation`
7. LoB to confirm that the data is flowing to Splunk.

   **Note**: some time might
   be required for the data to be visible in Splunk, in some cases this has been
   quick, while it took more than a day for others. Please reach out if you
   still do not see the data in Splunk after 2 days
