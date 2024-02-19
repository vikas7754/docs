---
layout: default
title: Orca Ops Runbook - Orca Pipelines
parent: Service Build Information
grand_parent: Orca Ops Runbook
nav_order: 1
has_children: false
---
# Orca Ops Runbook - Orca Pipelines
This documentation covers all pipelines that are used for any Orca Ops

# Orca Pipelines
Orca Pipelines and service accounts are used test, build and deploy ORCA related code. It makes use of Github Actions, Github Service Accounts, GCP Code Build and Trigger.

## Prerequisites
[Github Status Check Before Merging ](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-status-checks-before-merging): Mainly there are three type of rules for PR check STRICT, LOOSE & DISABLED. This logic is used to enforce checking for PR.

[Creating and managing build triggers](https://cloud.google.com/build/docs/automating-builds/create-manage-triggers#:~:text=A%20Cloud%20Build%20trigger%20automatically,changes%20that%20match%20certain%20criteria.) - This provides a basic idea on how code build and triggers works.

## ORCA Pipelines
Orca Pipelines are running on GCP Code Build and make uses of GCP triggers to run pipelines for verify ORCA config, build ORCA and run python flake.

There are 2 GCP projects that runs pipelines

| GCP Project Pipelines | Description |
| :--- |    :----:   |
| [sap-mcsec-orca-operations](https://console.cloud.google.com/cloud-build/triggers;region=us-central1?referrer=search&project=sap-mcsec-orca-operations)  |Pipelines to Verify Custom Orca Controls, Apply controls for Prod and Test tenant, Deploy Services to Prod|
|  [sap-mcsec-dependencies](https://console.cloud.google.com/cloud-build/triggers;region=us-central1?project=sap-mcsec-dependencies)  |  Pipelines for Flake8 - PEP8 check pipeline for ORCA services and Python builder for dev-utils  |

## Pipelines in use for ORCA :
- **orca/administration/controls/deploy.yaml** - deploy hyperscaler controls to orca project

## Pipelines in use for ORCA services:
- **orca/services/account_fetching/deploy/deploy.yaml** - deploy account fetching service to orca project
- **orca/services/account_onboarding/deploy/deploy.yaml** - deploy account onboarder service to orca project
- **orca/services/alert_egress/deploy/deploy.yaml** - deploy alert egress infrastructure to orca project
- **orca/services/data_extractor/deploy/deploy.yaml** - deploy data extractor to orca project
- **orca/services/orca_mcdb_automation/deploy/deploy.yaml** - deploy orca HSDB automation to orca project
- **orca/services/orca_exceptions/deploy/deploy.yaml** - deploy the orca exceptions

## Pipelines in use for Flake8
- **orca/python-lint.yaml** - to check for PEP8 format when PR is created

## Pipelines for Python Utilies
- [cicd/py/build_packages.yaml](https://github.tools.sap/mce/devsecops-utils/blob/develop/cicd/py/build_packages.yaml) - build and reploy python-utilities

## ORCA Services Account for GITHUB
There are 2 service accounts in Github to send webhooks from github to GCP trigger.

Services accounts can be managed using [Github Service User Management](https://technical-user-management.github.tools.sap/).

| Service Account | Description |
| :--- |    :----:   |
| mc-secdevops-serviceuser              | Used for ORCA repo      |
| mcsec-cloud-compliance-serviceuser    | Used for mcsec-cloud-compliance       |

## ORCA Services Accounts for GCP Code Build.
Each trigger in respective GCP Trigger has services accounts that is having role **Cloud Build Service Account**.