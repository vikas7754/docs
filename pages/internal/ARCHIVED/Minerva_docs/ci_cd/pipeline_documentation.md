---
layout: default
title: "[ARCHIVE] Pipeline Documentation"
parent: "[ARCHIVE] CI/CD"
grand_parent: "[ARCHIVE] Internal Minerva Docs"
has_children: false
---

# Pipeline Documentation
This page provides an overview of all pipelines in our landscape. All existing and new pipelines should be documented here with their background, purpose, and any caveats. 
If a single pipeline is used, please provide any relevant details, including, but not limited to:
- required variables
- pre-requisites for onboarding environments (if applicable)
- onboarding new environments. 

If a template is used, please provide any relevant details, including, but not limited to:
- an overview of what the template does
- required variables
- pre-requisites for onboarding environments (if applicable)
- onboarding new environments
- a list of pipelines which call the template with a brief description of the calling pipeline.

# Cloud-Compliance Pipelines

## cicd/templates/controls_cd.yml
### Background
Throughout 2021, our team put major efforts into developing a release process for Minerva which would allow for automated deployments to dev, pre-prod, and prod projects. This pipeline automates the build and deployment of the pubsub image to any onboarded kubernetes cluster.
### Implementation
Since each profile follows the same deployment process, a template was written which takes in variable groups as parameters. Any profile-specific configurations can be added in these variable groups.

#### Pipelines in use:
- sap-devsecops/aws_controls_cd_inspec-cluster.yml - deploys aws profile to sap-devsecops project
- sap-devsecops/azure_controls_cd_inspec-cluster.yml - deploys azure profile to sap-devsecops project
- sap-devsecops/gcp_controls_cd_inspec-cluster.yml - deploys gcp profile to sap-devsecops project
- sap-mcsec-compliance-dev/aws_concur_controls_cd_inspec-cluster.yml - deploys concur-specific aws profile to sap-mcsec-compliance-dev project
- sap-mcsec-compliance-dev/aws_controls_cd_inspec-cluster.yml - deploys aws profile to sap-mcsec-compliance-dev project
- sap-mcsec-compliance-dev/azure_controls_cd_inspec-cluster.yml - deploys azure profile to sap-mcsec-compliance-dev project
- sap-mcsec-compliance-dev/gcp_controls_cd_inspec-cluster.yml - deploys gcp profile to sap-mcsec-compliance-dev project


### Pre-requisites for Onboarding Environments
- GCR connection is created for each project
- Kubernetes connection is created

### Onboarding New Environments
The following inputs are required to onboard an environment to this pipeline:
- **profile-group** - the name of a variable group which provides inspec profile-specific variables
    - naming convention: PROVIDER_controls_PROJECT_CLUSTER
        - example: aws-concur_controls_sap-mcsec-compliance-dev_inspec-cluster
    - variables to provide:
        - app-version: the app version you are building (alicloudAppVersion, awsAppVersion, azureAppVersion, gcpAppVersion)
        - deploy-adhoc: true/false - whether to deploy the adhoc image or not (this isn't used in the pipeline yet)
        - deploy-pubsub: true/false - whether to deploy the pubsub image or not
        - profile: the inspec profile that you are building (sap-aws, sap-gcp, sap-alicloud, sap-azure)
        - provider: the provider that you are building for (aws, aws-concur, aws-cn, gcp, alicloud, azure, azure-cn)
- **cluster-group** - the name of a variable group which provides kubernetes cluster-specific variables
    - naming convention: PROJECT_CLUSTER_NAMESPACE
        - example: sap-devsecops_inspec-cluster_inspec-system
    - variables to provide:
        - container-registry: the name of the container registry service connection to use for building and deploying
        - deploy-env: the variables file deployment name (dev, dev2, preprod, prod)
        - deploy-ns: the namespace to deploy to (typically inspec-system)
        - image-name: the path to build the image with. Should usually be \$(project-name)/inspec/\$(profile)
        - kubernetes-connection: the name of the kubernetes service connection to deploy to (example: sap-devsecops_inspec-cluster_inspec-system)
        - release-name: the release name for the deployment. Should usually be sap-\$(provider)-\$(deploy-env)
        - values-file: the name of the values file to use. Should usually be values.\$(deploy-env).yaml
- **project-group** - the name of a variable group which provides project-specific variables
    - naming convention: PROJECT
        - example: sap-mcsec-compliance-dev
    - variables to provide:
        - project-name: the name of the GCP project to deploy to
 

# Devsecops-Dispatcher Pipelines

## cicd/templates/dispatcher_cd.yml
### Background
This pipeline automates the build and deployment of the dispatcher service Docker image to any onboarded kubernetes cluster.
### Implementation
Since each provider follows the same deployment process, a template was written which takes in variable groups as parameters. Any provider-specific configurations can be added in these variable groups.

#### Pipelines in use:
- sap-mcsec-compliance-dev/alicloud_dispatcher_cd_inspec-cluster.yml - deploys alicloud dispatcher to sap-mcsec-compliance-dev project
- sap-mcsec-compliance-dev/aws_cn_dispatcher_cd_inspec-cluster.yml - deploys aws-cn dispatcher to sap-mcsec-compliance-dev project
- sap-mcsec-compliance-dev/aws_concur_dispatcher_cd_inspec-cluster.yml - deploys concur-specific aws dispatcher to sap-mcsec-compliance-dev project
- sap-mcsec-compliance-dev/aws_dispatcher_cd_inspec-cluster.yml - deploys aws dispatcher to sap-mcsec-compliance-dev project
- sap-mcsec-compliance-dev/azure_cn_dispatcher_cd_inspec-cluster.yml - deploys azure-cn dispatcher to sap-mcsec-compliance-dev project
- sap-mcsec-compliance-dev/azure_dispatcher_cd_inspec-cluster.yml - deploys azure dispatcher to sap-mcsec-compliance-dev project
- sap-mcsec-compliance-dev/azure-accenture_dispatcher_cd_inspec-cluster.yml - deploys accenture-specific azure dispatcher to sap-mcsec-compliance-dev project
- sap-mcsec-compliance-dev/gcp_dispatcher_cd_inspec-cluster.yml - deploys gcp dispatcher to sap-mcsec-compliance-dev project


### Pre-requisites for Onboarding Environments
- GCR connection is created for each project
- Kubernetes connection is created

### Onboarding New Environments
For the cluster-group and project-group variable groups, many of the variables are shared between
the dispatcher and consumer cd template. In the cluster-group variable group, the image-name and
release-name are changed to be dispatcher-image-name and dispatcher-release-name.
The following inputs are required to onboard an environment to this pipeline:
- **profile-group** - the name of a variable group which provides provider-specific variables
    - naming convention: PROVIDER_dispatcher_PROJECT_CLUSTER
        - example: aws_concur_dispatcher_sap-mcsec-compliance-dev_inspec-cluster
    - variables to provide:
        - app-version: the app version you are building (alicloudAppVersion, awsAppVersion, azureAppVersion, gcpAppVersion)
        - profile: the dispatcher profile that you are building (sap-aws, sap-gcp, sap-alicloud, sap-azure)
        - provider: the provider that you are building for (aws, aws-concur, aws-cn, gcp, alicloud, azure, azure-cn, azure-accenture)
- **cluster-group** - the name of a variable group which provides kubernetes cluster-specific variables
    - naming convention: PROJECT_CLUSTER_NAMESPACE
        - example: sap-devsecops_inspec-cluster_inspec-system
    - variables to provide:
        - container-registry: the name of the container registry service connection to use for building and deploying
        - deploy-env: the variables file deployment name (dev, dev2, preprod, prod)
        - deploy-ns: the namespace to deploy to (typically inspec-system)
        - dispatcher-image-name: the path to build the image specific to devsecops-dispatcher with. Should usually be \$(project-name)/dispatchers/sap-\$(hyperscaler)-dispatcher-image
        - kubernetes-connection: the name of the kubernetes service connection to deploy to (example: sap-devsecops_inspec-cluster_inspec-system)
        - dispatcher-release-name: the release name specific for the devsecops-dispatcher deployment. Should usually be sap-\$(provider)-dispatcher-\$(deploy-env)
        - values-file: the name of the values file to use. Should usually be values.\$(deploy-env).yaml
- **project-group** - the name of a variable group which provides project-specific variables
    - naming convention: PROJECT
        - example: sap-mcsec-compliance-dev
    - variables to provide:
        - project-name: the name of the GCP project to deploy to