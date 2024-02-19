---
layout: default
title: Orca Ops Runbook - Orca Service Continuity
parent: Common Tasks
grand_parent: Orca Ops Runbook
nav_order: 1
has_children: false
---

# Orca Ops Runbook - Orca Service Continuity

This documentation will cover any rotational tasks for service continuity (e.g. PAT rotation, key rotation)

# GCP Key Rotation

In Secret Manager, check the following to check the current version of
the keys in place:

_sap-mcsec-orca-operations_ project \> **Security** \> **Secret Manager**
\> _orca-alert-publisher-dev_

_sap-mcsec-orca-operations_ project \> **Security** \> **Secret Manager**
\> _orca-alert-publisher-prod_

_sap-mcsec-orca-operations_ project \> **Security** \> **Secret Manager**
\> _onboarding-verification_

_sap-mcsec-orca-operations_ project \> **Security** \> **Secret Manager**
\> _onboarding-verification2_

_sap-mcsec-orca-operations_ project \> **Security** \> **Secret Manager**
\> _orca-security-service_

_sap-mcsec-orca-operations_ project \> **Security** \> **Secret Manager**
\> _orca-security-service-testing_

Let's update the keys to the new version.

For example, _sap-mcsec-orca-operations_ project \> **Security** \>
**Secret Manager** \> _orca-security-service-testing_ \> click on **Versions** \>
**New Version** \> paste text into secret value box and click on **Add
New Version**

![gcp_rotation_3](/assets/docs-images/orca_ops_runbooks/gcpversions.PNG)

# Azure_CN Key Rotation

In Secret Manager, check the following to check the current version of the keys in place:

_sap-mcsec-orca-operations_ project \> **Security** \> **Secret Manager**
\> _azurecn-cdc-list-accounts_

_sap-mcsec-orca-operations_ project \> **Security** \> **Secret Manager**
\> _azurecn-sap-list-accounts_

For example, _sap-mcsec-orca-operations_ project \> **Security** \>
**Secret Manager** \> _azurecn-cdc-list-accounts_ \> click on **Versions** \>
**New Version** \> paste text into secret value box and click on **Add
New Version**

We need to create 2 new secrets for SAP & CDC Orca Apps, then store new secret in secret manager under GCP project "sap-mcsec-orca-operations"

- For CDC:

  - [**svc-orca-cdc**](https://portal.azure.cn/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Credentials/appId/8fc160e8-84e9-40aa-9ee4-8d3621bb0e8d/isMSAApp~/false)

- For SAP:
  - [**svc-orca-sap**](https://portal.azure.cn/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Credentials/appId/1da0448b-d509-4858-8a7d-4828c6b2fd3d/isMSAApp~/false)

GCP Secrets created for Azure_CN accounts:

- [**azurecn-cdc-list-accounts**](https://console.cloud.google.com/security/secret-manager/secret/azurecn-cdc-list-accounts?authuser=1&project=sap-mcsec-orca-operations)

- [**azurecn-sap-list-accounts**](https://console.cloud.google.com/security/secret-manager/secret/azurecn-sap-list-accounts?authuser=1&project=sap-mcsec-orca-operations)

After new secrets are created, please create meeting invite as reminder for 15 days before new expiry date.
Terraform changes or deployment is not required since we are using 'latest' version in the service.
