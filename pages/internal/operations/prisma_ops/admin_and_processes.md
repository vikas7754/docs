---
layout: default
title: "Administration & Processes"
parent: Prisma Ops
grand_parent: Operations
nav_order: 1
has_children: true
---

## Administration & Processes

- Administration
- Onboard Cloud Account onto Prisma Monitoring
- Onboard SAP Cloud Account Owner/User onto Prisma Monitoring
  - User Roles and Permission Groups
- User Single Sign-On

### # Administration

Prisma Cloud platform is currently administered and managed by SAP Multi-Cloud DevSecOps Team.

With respect to current implementations and platform limitations, the following is managed:

### # Onboard Cloud Account onto Prisma Monitoring

1. Onboard SAP AWS Public Cloud Accounts

- If the cloud account is part of the SAP Multi-Cloud Organization (Part of GCS), it'll be onboard Prisma as part of security services.
- In case you're unable to find your account in Prisma, please request access through Multi-Cloud Servicedesk by providing the following details:

  - Cloud Account ID, Name and Type
  - Cloud Account Owner
  - Cloud Account associated SAP Team, Line of Business and Board Area

- If the cloud accounts are outside SAP Multi-Cloud then you can onboard Prisma via putting in a cloud account onboard request through Multi-Cloud Servicedesk. In order to onboard cloud accounts, the following details are required:
- For AWS, you’ll have to deploy the necessary AWS role (link below) in your AWS accounts outside HS Organization as done with Evident.IO and provide the following details in a csv or json file:

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

- Currently, Prisma doesn’t support very flexible access control. You cannot give single person access over accounts in 2 different teams. Prisma platform team is expecting to deliver this feature by March 2020. We can then create account segregation by teams and with scoped privileged access eventually explore some remediation capabilities of the tool in a year. For now, we suggest keeping everything under a single team and giving everyone authorized on your team access to it.

Onboard SAP Cloud Account Owner/User onto Prisma Monitoring
User Roles and Permission Groups
Users are assigned a Role-based on their requirements for visibility to accounts. The process for users is as follows:

Each Cloud Account is assigned to an Account Group. For larger visibility, one of the Account Groups here (AG1) includes every account within the LOB. Then, a Role is created that represents the scope of visibility. This visibility is limited based on the Cloud Account within the Account Group that is assigned to the Role. Each Role inherits a Permissions Group. For each user, the correct Role is assigned to them based on their need for visibility of Cloud Accounts. Only one Role may be assigned to each user. By this process, any combination of permissions and visibility may be granted to a user.

All users are provisioned as needed. When an account is on-boarded, our process validates if the "Technical Owner" is already in the Prisma system. Each account is on-boarded to a "Team" Account Group as described below in Account Concepts." Each technical owner serves to become the "authority" in approving users to be added to an Account Group Role as described above. Any number of users may be added with any level of visibility so long as the visibility can be defined around accounts.

User Single Sign-On
As Cloud Accounts are on-boarded, the associated Technical Owners get provisioned an account within Prisma. Prisma does not support "Just In Time" user accounts (currently out of scope for our project). Each user is pre-provisioned and assigned the appropriate Role. When the user attempts to sign-in, they are redirected to SAP IDP to authenticate and then returned to the Prisma portal.

Locally created user accounts are provisioned on an as-needed basis only.

After you have requested user access through the Multi-Cloud Servicedesk and the provided the necessary details, you can login to PrismaCloud via SSO using the following URL:

http://prisma.tools.sap
