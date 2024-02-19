---
layout: default
title: "[ARCHIVE] Release Documentation"
parent: "[ARCHIVE] Release Process"
grand_parent: "[ARCHIVE] Internal Minerva Docs"
has_children: false
---
# Version Bumps (with current release version):

- infra/helm/sap-inspec-consumer/Chart.yaml (appVersion)
- profiles/sap-aws/inspec.yml (version)
- profiles/sap-azure/inspec.yml (version)
- profiles/sap-gcp/inspec.yml (version)

# Deployment to Dev:

- Authenticate with 'sap-mcsec-compliance-dev' GCP project 
  - "gcloud auth login"

- Authenticate Docker with the project in order to push Docker images
  - "gcloud auth application-default login"
  - "gcloud auth configure-docker"

- Build and Push Docker Images:
  - cd cloud-compliance/profiles/sap-aws (directory)
    - "rake build:all[sap-mcsec-compliance-dev,<current_release_version]"
    - "rake push:all[sap-mcsec-compliance-dev,<current_release_version]"

  - cd cloud-compliance/profiles/sap-azure (directory)
    - "rake build:all[sap-mcsec-compliance-dev,<current_release_version]"
    - "rake push:all[sap-mcsec-compliance-dev,<current_release_version]"

  - cd cloud-compliance/profiles/sap-gcp (directory)
    - "rake build:all[sap-mcsec-compliance-dev,<current_release_version]"
    - "rake push:all[sap-mcsec-compliance-dev,<current_release_version]"

- Connect to the cluster:
  - "gcloud container clusters get-credentials inspec-cluster --region europe-west4 --project sap-mcsec-compliance-dev"

- Deploying consumers:
  - cd cloud-compliance/infra/helm/sap-inspec-consumer (directory)
    - kubectl config current-context -> This is used to verify if we are poiniting to correct cluster
    - kubectl config use-context <'name of context you need to switch to'> -> Used to switch context to Dev cluster
    - helm list -> This will display list of all the current deployments.
    - rake 'deploy[dev,aws]'
    - rake 'deploy[dev,azure]'
    - rake 'deploy[dev,gcp]'
  - Go to the console -> clusters -> workloads: verify if all the deployed pods are up and running

- To verify if deployment is successful ( This would be checked after the cron job is triggered)
  - Go to 'aws-scheduler-sub' subscription and verify if the graph raises and then falls eventually (this will verify its is able to workaway itself with the queue)
  - Go to 'azure-scheduler-sub' subscription and verify if the graph raises and then falls eventually (this will verify its is able to workaway itself with the queue)
  - Go to 'gcp-scheduler-sub' subscription and verify if the graph raises and then falls eventually (this will verify its is able to workaway itself with the queue)
  - Go to 'report-egress-sub' and verify if the graph is going up (this would verify its getting to the end of the queue)

# Deployment to Pre-Prod:

- Authenticate and switch to 'sap-mcsec-inspec-preprod' GCP project
  - "gcloud auth login"

- Authenticate Docker with the project in order to push Docker images
  - "gcloud auth application-default login"
  - "gcloud auth configure-docker"

- Build and Push Docker Images:
  - cd cloud-compliance/profiles/sap-aws (directory)
    - "rake build:all[sap-mcsec-inspec-preprod,<current_release_version]"
    - "rake push:all[sap-mcsec-inspec-preprod,<current_release_version]"

  - cd cloud-compliance/profiles/sap-azure (directory)
    - "rake build:all[sap-mcsec-inspec-preprod,<current_release_version]"
    - "rake push:all[sap-mcsec-inspec-preprod,<current_release_version]"

  - cd cloud-compliance/profiles/sap-gcp (directory)
    - "rake build:all[sap-mcsec-inspec-preprod,<current_release_version]"
    - "rake push:all[sap-mcsec-inspec-preprod,<current_release_version]"

- Connect to the cluster:
  - "gcloud container clusters get-credentials inspec-cluster --region europe-west4 --project sap-mcsec-inspec-preprod"

- Deploying consumers:
  - cd cloud-compliance/infra/helm/sap-inspec-consumer (directory)
    - kubectl config current-context -> This is used to verify if we are poiniting to correct cluster
    - kubectl config use-context <'name of context you need to switch to'> -> Used to switch context to Pre-prod cluster
    - helm list -> This will display list of all the current deployments.
    - rake 'deploy[preprod,aws]'
    - rake 'deploy[preprod,azure]'
    - rake 'deploy[preprod,gcp]'
  - Go to the console -> clusters -> workloads: verify if all the deployed pods are up and running

- To verify if deployment is successful ( This would be checked after the cron job is triggered)
  - Go to 'aws-scheduler-sub' subscription and verify if the graph raises and then falls eventually (this will verify its is able to workaway itself with the queue)
  - Go to 'azure-scheduler-sub' subscription and verify if the graph raises and then falls eventually (this will verify its is able to workaway itself with the queue)
  - Go to 'gcp-scheduler-sub' subscription and verify if the graph raises and then falls eventually (this will verify its is able to workaway itself with the queue)
  - Go to 'report-egress-sub' and verify if the graph is going up (this would verify its getting to the end of the queue)

# Deployment to Prod:

- Authenticate with 'sap-mcsec-inspec-prod' GCP project
  - "gcloud auth login"

- Authenticate Docker with the project in order to push Docker images
  - "gcloud auth application-default login"
  - "gcloud auth configure-docker"

- Build and Push Docker Images:
  - cd cloud-compliance/profiles/sap-aws (directory)
    - "rake build:all[sap-mcsec-inspec-prod,<current_release_version]"
    - "rake push:all[sap-mcsec-inspec-prod,<current_release_version]"

  - cd cloud-compliance/profiles/sap-azure (directory)
    - "rake build:all[sap-mcsec-inspec-prod,<current_release_version]"
    - "rake push:all[sap-mcsec-inspec-prod,<current_release_version]"

  - cd cloud-compliance/profiles/sap-gcp (directory)
    - "rake build:all[sap-mcsec-inspec-prod,<current_release_version]"
    - "rake push:all[sap-mcsec-inspec-prod,<current_release_version]"

- Connect to the cluster:
  - "gcloud container clusters get-credentials inspec-cluster --region europe-west4 --project sap-mcsec-inspec-prod"

- Deploying consumers:
  - cd cloud-compliance/infra/helm/sap-inspec-consumer (directory)
    - kubectl config current-context -> This is used to verify if we are poiniting to correct cluster
    - kubectl config use-context <'name of context you need to switch to'> -> Used to switch context to Prod cluster
    - helm list -> This will display list of all the current deployments.
    - rake 'deploy[prod,aws]'
    - rake 'deploy[prod,azure]'
    - rake 'deploy[prod,gcp]'
  - Go to the console -> clusters -> workloads: verify if all the deployed pods are up and running

- To verify if deployment is successful ( This would be checked after the cron job is triggered)
  - Go to 'aws-scheduler-sub' subscription and verify if the graph raises and then falls eventually (this will verify its is able to workaway itself with the queue)
  - Go to 'azure-scheduler-sub' subscription and verify if the graph raises and then falls eventually (this will verify its is able to workaway itself with the queue)
  - Go to 'gcp-scheduler-sub' subscription and verify if the graph raises and then falls eventually (this will verify its is able to workaway itself with the queue)
  - Go to 'report-egress-sub' and verify if the graph is going up (this would verify its getting to the end of the queue)
