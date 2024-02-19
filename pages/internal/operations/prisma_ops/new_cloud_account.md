---
layout: default
title: "Onboard Cloud Account onto Prisma Monitoring"
parent: Prisma Ops
grand_parent: Operations
has_children: true
nav_order: 2
---

### # Onboard Cloud Account onto Prisma Monitoring

1. Onboard SAP AWS Public Cloud Accounts

- If the cloud account is part of the SAP Multi-Cloud Organization (Part of GCS), it'll be onboard Prisma as part of security services.
- In case you're unable to find your account in Prisma, please request access through Multi-Cloud Servicedesk by providing the following details:

  - Cloud Account ID, Name and Type
  - Cloud Account Owner
  - Cloud Account associated SAP Team, Line of Business and Board Area

- If the cloud accounts are outside SAP Multi-Cloud then you can onboard Prisma via putting in a cloud account onboard request through Multi-Cloud Servicedesk. In order to onboard cloud accounts, the following details are required:
- For AWS, you’ll have to deploy the necessary AWS role (link below) in your AWS accounts outside MC Organization as done with Evident.IO and provide the following details in a csv or json file:

  - Name of the cloud account
  - Role ARN
  - Role External ID
  - Team Name/ Line of Business and Board Area \*

  Cross-Account Prisma Role Template link: https://s3.amazonaws.com/redlock-public/cft/rl-read-only.template

2. Onboard SAP's Azure Cloud Accounts & SAP GCP Cloud Accounts

If the cloud account is part of the SAP Multi-Cloud Organization (Part of GCS), it'll be onboard Prisma as part of security services.
If the cloud accounts are outside SAP Multi-Cloud then you can onboard Prisma via putting in a cloud account onboard request through Multi-Cloud Servicedesk. In order to onboard cloud accounts, please follow the steps described by Prisma Platform using the links below:
For Azure: https://docs.paloaltonetworks.com/prisma/prisma-cloud/prisma-cloud-admin/connect-your-cloud-platform-to-prisma-cloud/onboard-your-azure-account#id51ddadea-1bfb-4571-8430-91a1f54673d2
For GCP: https://docs.paloaltonetworks.com/prisma/prisma-cloud/prisma-cloud-admin/connect-your-cloud-platform-to-prisma-cloud/onboard-your-gcp-account#id9083908f-b803-4b6d-9ec2-3783cff2180f
