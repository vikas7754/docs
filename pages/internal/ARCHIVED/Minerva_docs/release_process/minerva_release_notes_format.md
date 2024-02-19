---
layout: default
title: "[ARCHIVE] Release Notes Format"
parent: "[ARCHIVE] Release Process"
grand_parent: "[ARCHIVE] Internal Minerva Docs"
has_children: false
---

```
#     Minerva Release Notes Format

# Release City_name

### Controls:

- AWS:
  - Control title for which there is a change
    - Specify what the change is and what the impact is.

- Azure:
  - Control title for which there is a change
    - Specify what the change is and what the impact is.

- GCP:
  - Control title for which there is a change
    - Specify what the change is and what the impact is.

- Alicloud:
  - Control title for which there is a change
    - Specify what the change is and what the impact is.

### Remediations:
- AWS: /external/compliance_scanning/minerva_aws_controls
- Azure: /external/compliance_scanning/minerva_azure_controls
- GCP: /external/compliance_scanning/minerva_gcp_controls
- Alicloud: /external/compliance_scanning/minerva_alicloud_controls

### Container image version for Boston release:

| Hyperscaler   | Consumer version           | Dispatcher version           |
| ------------- | -------------------------- | ---------------------------- |
|      AWS      |  Present Consumer version  |  Present Dispatcher version  |
|      GCP      |  Present Consumer version  |  Present Dispatcher version  |
|      Azure    |  Present Consumer version  |  Present Dispatcher version  |
|      Alicloud |  Present Consumer version  |  Present Dispatcher version  |

```
