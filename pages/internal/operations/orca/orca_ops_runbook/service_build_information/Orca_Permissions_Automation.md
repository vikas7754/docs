---
layout: default
title: Orca Ops Runbook - Orca Permissions Automation
parent: Service Build Information
grand_parent: Orca Ops Runbook
nav_order: 3
has_children: false
---

# Orca Ops Runbook - Orca Permissions Automation

This documentation covers everything you need to know about the Orca Permissions Automation Solution

## Background

Cloud accounts are constantly being created and deleted within SAP. Along with changes in cloud accounts, we have personnel and organizational changes. All of these updates to accounts and our organization require permission changes in Orca. To do this manually would be a lot of work, as previously experienced with managing Prisma, and would likely become outdated very quickly. We've implemented an automated process based on self-service attributes in HSDB to handle organizational changes, personnel changes, and new cloud accounts.

## Implementation

This solution has been implemented in python and runs on Google Cloud Functions - for more information about the specific services in use, and how they are triggered, see the [architecture](#architecture) section.

This solution pulls information about [Hyperscaler Groups](https://docs.multicloud.int.sap/groups/mc-groups-guide#multicloud-groups-guide) and [Hyperscaler Accounts](https://docs.multicloud.int.sap/creator/accounts) from HSDB.

To map Hyperscaler Groups to accounts in Orca, the business unit feature in Orca was leveraged. There is a one to one relationship between Hyperscaler Groups and Orca business units. Each run of this solution pulls the accounts for every Hyperscaler Group and child group, and updates the business unit in Orca that coincides with the Hyperscaler Group. A business unit in Orca contains all of the accounts of a group and the accounts of all of its descendent groups. For every business unit in Orca, there is also a permissions group created. This permissions group gets viewer access on the related business unit, and the users in this permissions group are added if they are listed as a Reader, Administrator, Power User, or Editor on the group in HSDB.

To map Hyperscaler Account roles to permissions in Orca, the solution pulls information about every user in Orca. Then, the solution pulls the list of accounts from HSDB for which the user is listed as a Technical Responsible User, Security Officer, or Additional User. Then, Viewer access is granted to the user on the list of accounts.

The user's permissions are a summation of the business units that they are permitted to view, and the individual accounts that they are permitted to view.

## Architecture

<img title="OrcaAutomationArchitecture" alt="diagram showcasing Orca Automation architecture" src="/assets/docs-images/orca_permissions_automation/OrcaBusinessUnitAndAccessAutomationArchitecture.png">

**Retriever** - Pulls all groups and group tree (for parent-child relationships) from HSDB to get all current groups and lists blobs in cloud storage to get groups that have already been applied to Orca. Pulls all Orca users and writes to a metadata file. Pulls all cloud account ids belonging to an HSDB group and writes them to a metadata file. Both metadata files will be instantiated as python dictionaries for easy lookups in microservices which need to read the data. After looking up this data, the service sends each HSDB group uuid and each orca user uuid in a pubsub message to topics that trigger the group data collector and user data collector service respectively.

**Data Collector** - Both the group data collector and user data collector follow the same pattern. The service reads data from the metadata files and reads data from the state file for given uuid. There will be a state file for each HSDB group which contains data such as group name, group admins, accounts under the group, etc., and a state file for each orca user with the user's uuid, and a list of accounts that they should have access to in Orca. The diff calculator will rebuild the state object based on the metadata files pulled from HSDB, and then check if the newly built state object matches the existing state file's object. If it matches, the service will exit and do nothing. If it is different, it will write the updated object out to the state file. If a group is new, it will create a new statefile. If a group no longer exists in HSDB, it will mark the state file for deletion.

**Applier** - Both the group data applier and user data applier follow the same pattern. The service is triggered by create/update operations on each statefile, this service applies the HSDB group data, or user permissions to Orca. The group applier will create or update the orca business unit with the given data. It will then create or update a permissions group in orca which gives viewer access to the business unit. It will add the HSDB group admin/other group users to this permissions group. Finally, if a group/business unit is newly created the applier will update the metadata of the statefile to contain 2 tags, one of which is the uuid of the orca business unit, and the other is the uuid of the group. Similarly, the user applier will push permissions for individual users to Orca based on the statefile compiled by the data collector. A user's permissions will be a summation of their permissions from the groups and their individual permissions

## Contributing

All source code for this solution can be found in the [mce/devsecops-orca](https://github.tools.sap/mce/devsecops-orca) repository. Code changes merged to the main branch are automatically deployed using Google Cloud Build. All services required for this solution can be found in the same repository in the deploy folder. Unit tests for the solution are currently a work in progress.

## Local Testing

Local testing of the functions can be done using [functions-framework](https://github.com/GoogleCloudPlatform/functions-framework-python). This python package allows you to run both HTTP and event-based functions locally.

## Solution FAQ for Support Tickets

Below, you'll find a few canned responses that can be used to answer incoming tickets inquiring about Orca.

**How do I get access to Orca?**

> Access permissions on Orca are provisioned automatically based on attributes from Hyperscaler Database (HSDB). For initial access to Orca, you will need to request the following automatically approved Cloud Access Manager (CAM) profile: https://spc.ondemand.com/sap/bc/webdynpro/a1sspc/cam_wd_central?item=request&profile=Multicloud_Orca_User. This profile does not provide any permissions in Orca, but only provides the ability to sign into Orca via SSO. You will have to periodically re-request this profile to have continued access to Orca.

> Users with any of the following roles on an account in HSDB will be given Viewer access to that account in Orca: Technical Responsible User, Security Officer, and Additional Users

> Users with any of the following roles on a group in HSDB will be given Viewer access to the accounts under that group in Orca: Administrator, Power User, Editor, and Reader

> Once a user has signed into Orca, their permissions will be automatically provisioned and updated based on the Hyperscaler Account roles and Hyperscaler Group roles mentioned above. Permission updates may take up to 2 hours from your initial sign-in. Permissions will be regularly updated based on the Hyperscaler roles.

**Can you please add me to a specific LOB or account in Orca?**

> Access permissions on Orca are provisioned automatically based on attributes from Hyperscaler Database (HSDB) and are therefore self-managed by lines of business within SAP. For initial access to Orca, you will need to request the following automatically approved Cloud Access Manager (CAM) profile: https://spc.ondemand.com/sap/bc/webdynpro/a1sspc/cam_wd_central?item=request&profile=Multicloud_Orca_User. This profile does not provide any permissions in Orca, but only provides the ability to sign into Orca via SSO. You will have to periodically re-request this profile to have continued access to Orca.

> To gain permissions to view an account or LOB in Orca, please reach out to the Technical Responsible User of the account, or the Administrator of the group which you need access to.

> Users with any of the following roles on an account in HSDB will be given Viewer access to that account in Orca: Technical Responsible User, Security Officer, and Additional Users

> Users with any of the following roles on a group in HSDB will be given Viewer access to the accounts under that group in Orca: Administrator, Power User, Editor, and Reader

> Once a user has signed into Orca, their permissions will be automatically provisioned and updated based on the Hyperscaler Account roles and Hyperscaler Group roles mentioned above. Permission updates may take up to 2 hours from your initial sign-in. Permissions will be regularly updated based on the Hyperscaler roles.

> For access to specific groups, please use the [Hyperscaler Groups Application](https://portal.multicloud.int.sap/groups) to request reader access to the group or groups which you'd like to have access to.

**Where can I find more information about Orca?**

> More information can be found on our Orca FAQ workzone page [here](https://workzone.one.int.sap/site#workzone-home&/groups/rfjLPU42pSuICiflCl7pMp/overview_page/UmhcR1clwRTDXGeAfnZ3bK)

**I've requested the required CAM profile, but can't login**

> There are two cases that we've been running into. Once CAM profiles are approved, they can take some time to sync to Active Directory. Please wait an hour and try to login again. If you are still unable to login, it is likely because you do not have any permissions in Hyperscaler Database which would warrant access to Orca. Please see the "How Can I Get Access to Orca?" section of our [Orca FAQ](https://workzone.one.int.sap/site#workzone-home&/groups/rfjLPU42pSuICiflCl7pMp/overview_page/UmhcR1clwRTDXGeAfnZ3bK) for more information.
