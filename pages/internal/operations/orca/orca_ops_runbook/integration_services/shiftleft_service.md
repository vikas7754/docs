---
layout: default
title: Orca Ops Runbook - Orca ShiftLeft service
parent: Integration Services
grand_parent: Orca Ops Runbook
nav_order: 4
has_children: false
---
# Orca Ops Runbook - Orca ShiftLeft service
This documentation covers support steps to provide the Orca ShiftLeft service to
LoBs.

## Orca ShiftLeft
Orca provides ShiftLeft service for 3 different areas:
1. Containers images (CI)
2. Infrastructure as Code (IaC)
3. Code security (CS)

More details in the [official Orca ShiftLeft
documentation](https://docs.orcasecurity.io/docs/shift-left-security).

Below are the steps required by both LoB and Operation Engineer to enable the
LoB to use the ShiftLeft service:

1. LoB creates a
   [ticket](https://itsm.services.sap/sp?id=sc_cat_item&sys_id=ada60b961bd09150341e11739b4bcb65&sysparm_category=cbe15fd61b549150341e11739b4bcb8a&catalog_id=09a3ed6a1b2f80d020c8fddacd4bcb02)
   to request ShiftLeft service enablement
2. LoB requests [ShiftLeft CAM profile](...)
3. LoB communicates `project-key` to Engineer as per
   [documentation](https://docs.orcasecurity.io/docs/orca-cli-configuration-file)

   **Note**: sign in to Orca [here](https://eu.sap.app.orcasecurity.io) via SSO
   and selecting Documentation from the Question Circle Icon on the top right of
   the dashboard before the documentation can be seen

4. LoB creates ShiftLeft one or more ShiftLeft policies and communicates the
   name(s) to Engineer
5. Engineer creates ShiftLeft project using `project-key` and policies from
   LoB. Then name of the project must be in the format
   `<LoB_acronym-scope_1-scope_2>` (please note the use of `-` to separate the 3
   diferent parts of the name), where `scope_1` is one of `[CI, IaC, CS]`, and
   `scope_2` can be decided by the LoB (in case they need additional scoping),
   e.g. `isbn-CI-best_practices`
6. Engineer provides the project name to LoB
7. LoB creates an API token as per
   [documentation](https://docs.orcasecurity.io/docs/obtaining-an-api-token-for-shift-left)
