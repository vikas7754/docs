---
layout: default
title: Orca Ops Runbook - Orca Account Onboarding
parent: Service Build Information
grand_parent: Orca Ops Runbook
nav_order: 6
has_children: false
---
# Orca Ops Runbook - Orca Account Onboarding
This documentation will cover the process to onboard new organizations to Orca.

## GCP Onboarding
To onboard a new GCP organization to Orca, the following steps will need to be taken by admins in the respective organization:

1. A new project is created within your organization. Ideally, the project will follow the naming convention `sap-mcsec-orca-operations-<context>`. For example, a project was created in the SAP development organization with the following name: `sap-mcsec-orca-operations-dev`.
2. Create a service account with the name `Orca Security Service` and description `Account used for onboarding and scanning all accounts in <context about your organization> organization on the Orca Security tool`.
3. Give the `Project IAM Admin` role to the HS SecDevOps admin that you are working with.
4. Enable the cloudresourcemanager API for the project. 
5. Create an org-level role titled `orca-side-scanner-role` with the following permissions:

    ```
    compute.snapshots.setLabels
    compute.disks.createSnapshot
    compute.snapshots.create
    compute.snapshots.delete
    storage.buckets.getIamPolicy
    storage.objects.get
    compute.snapshots.setIamPolicy
    compute.snapshots.useReadOnly
    serviceusage.services.enable
    servicemanagement.services.bind
    resourcemanager.folders.list
    ```
6. Assign the `orca-side-scanner-role` at the organization level to the service account created in step 2.
7. Assign the following additional roles at the organization level to the serviec account created in step 2:

    ```
    Viewer
    Storage Object Viewer
    Security Reviewer
    Cloud KMS CryptoKey Encrypter/Decrypter
    ```

The remaining steps will be carried out by a member of the HS SecDevOps team:

1. Create a service account key for the service account previously created. 
2. Upload this service account key to Orca in the GCP Multiple account onboarding screen.
Note: Account discovery and onboarding can take up to 24 hours. Orca onboards accounts after an internal verification process - after this process the accounts will show up in batches.
