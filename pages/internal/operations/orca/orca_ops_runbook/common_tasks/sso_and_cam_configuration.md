---
layout: default
title: Orca Ops Runbook - SSO and CAM Configuration
parent: Common Tasks
grand_parent: Orca Ops Runbook
nav_order: 3
has_children: false
---

# Orca Ops Runbook - SSO and CAM Configuration

This documentation will cover the setup of Orca's SSO application and integration with CAM.

## SSO Setup and Configuration

The steps outlined in the Orca documentation for Azure SSO configuration were followed to setup SSO on Orca. This documentation can be found [here](https://docs.orcasecurity.io/v1/docs/integrating-azure-ad-sso-and-scim#configuring-integration).

As a result of the setup, we have created an enterprise application on Azure Active Directory with the name "SAP SE: Orca Security SSO" and the object ID 58e0ac77-029c-4987-a340-2d3497203389. This enterprise application can be found in the SAP SE tenant.

## Integration with CAM

When [creating a CAM profile](https://sap.service-now.com/sp?id=sc_cat_item&sys_id=18b5a0e51bdef454341e11739b4bcb97&sysparm_category=93cc7f571ba07850d9c921fbbb4bcb7d), there is an option to sync the CAM profile to Azure Active Directory. As long as this is done, a group will be created in Azure with the same name as the CAM profile that's been created. Users who have been approved as members of a CAM profile will be automatically added to the corresponding Azure AD group. The sync between CAM and Azure AD can sometimes take up to an hour.

    Some other options in CAM profile creation request:
    - Synchronize to GCP: Select this if using CAM profile for GCP project.
    - Profile Auto-Approve?: No if CAM profile requires approval.

When a CAM profile is created, it is not automatically included in the SSO application for Orca. To do this, one of the owners of the Azure SSO application should add the corresponding Azure AD group to the SSO application. As team members and administrators fluctuate, I will leave it up to the reader of the documentation to check who is an owner of the enterprise app. You can either do this by viewing the enterprise application yourself if you have permissions, or asking other members of the team.

Below, you can see the CAM profiles added to the SSO application:
<img title="OrcaAzureEnterpriseApp" alt="screenshot of the SSO application in Azure AD" src="/assets/docs-images/orca_ops_runbooks/SSO_enterprise_app.png">

After this initial setup, move on to the creation of the permissions group in Orca found below.

## Creating Permission Groups

Once a CAM profile and corresponding Azure AD group are created, a permission group must be created in Orca so that the users for your specific group can be assigned group-level permissions. To do this, follow Orca's documentation [here](https://docs.orcasecurity.io/docs/integrating-azure-ad-sso-and-scim#creating-a-user-group-in-orca)

## Troubleshooting Steps

If there are any issues with a user's SSO group-level permissions ask yourself the following questions and investigate:

1. Has the user requested the CAM profile? - if not ask them to request the CAM profile
2. Has the user been approved for the CAM profile? - if not ask them to wait for approval
3. Has the user waited up to an hour for the CAM->Azure AD sync to occur? - if not ask them to wait and check back in
4. Is the user included in the Azure AD group? (check azure AD) - if not there is an issue with the CAM->Azure AD sync, given that the sync-period was taken into consideration
5. Is the issue related to CAM permissions, or permissions that would be granted by the permissions automation? If it may be linked to the permissions automation, check if there have been any recent errors in the hourly run of the automation that may affect your case.
6. If all of the above options have been exhausted, open a ticket with Orca support as it is likely that there is an issue on the Orca side
