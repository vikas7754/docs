---
layout: default
title: "[ARCHIVE] Infrastructure Release WorkFlow"
parent: "[ARCHIVE] Release Process"
grand_parent: "[ARCHIVE] Internal Minerva Docs"
has_children: false
---

# Infrastructure Release Workflow

## Overview:

This document describes detailed workflow of Infrastructure release lifecycle. Infrastructure release is done **monthly for preprod on Wednesdays starting at CET 10:00 AM, and for prod 1 week after on Tuesday CET 10:00 AM.** Each infrastructure release will be referenced by its version number following [Semantic Versioning](https://semver.org/). We use [release-please](https://github.com/googleapis/release-please) to generate the changelogs, therefore the [conventional commits pattern](https://www.conventionalcommits.org/en/v1.0.0/) must be followed on commit messages. A pipeline runs before each merge on `develop` branch, which enforces such commit message patterns.

In case some issue is observed the respective person should be informed, or a message in #mc_devsecops_developer slack channel should be posted.

## General Development:

All the tasks/features will be worked on individual feature branches, once development work is complete the changes are merged in develop through a PR that will require approval from at least 2 team members. These feature branches will be created based on the `develop` branch.

## Release Initiation:

This section describes the process to initiate a release, which includes release branch creation, naming convention and cut-off time for the updates to be included in the release.

- Release or release candidate branch is created 1 day before the release (Tuesdays for preprod and Mondays for prod).
- The release branch will be created based on the latest state of `develop` branch.
- The name of branch should be in this format: `release-vX.X.X-rc` for release candidates or `release-vX.X.X`. Release manager can find out the exact followup release version by running a dry run of the `release-please` tool. [See here](#dry-run-for-release-please) for instructions on how to run the dry-run command for releases.
- All the PRs/changes that are planned to be in the release must be merged into `develop` before the time mentioned.
- No other changes will be included in the release after that time unless its a high priority.
- For preprod: A release candidate branch of format `release-vX.X.X-rc` is created out of develop.
- For prod: A release branch of version `release-vX.X.X` should be created from the `release-vX.X.X-rc`, then a PR is created to merge the `release-vX.X.X` branch into `main`.
- In the case of needing to deploy a HOTFIX, a `hotfix-vX.X.X` branch should be created from `release-vX.X.X` and then merged to `main` AND `develop` through a PR process.
- Title for these PRs will be in this format:`Merge *branch* into main` or `Merge *branch* into develop`.
- For each process in the release chain, involving a "PR", IT IS MANDATORY TO USE A MERGE COMMIT instead or REBASE AND MERGE. [MORE INFO BELOW](#important-info-to-consider)
- When merging any PR into the `main` branch, a pipeline is triggered and utilizes the `release-please` tool. This tool opens automatically a PR targeting the `main` branch, and updates the CHANGELOG.MD file, with all the changes coming up to this version.
- On the changelog, should be explicitly specified which of the directories (cicd, helm, k8s, terraform) has had changes, together with the commit message. This is achieved by strictly following the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), but also appending the folder name on the commit message.

## Important info to consider:

_WHEN MERGING A HOTFIX OR RELEASE THROUGH A PR, WHETHER IT IS MAIN OR DEVELOP, PLEASE USE A MERGE COMMIT INSTEAD OF A REBASE AND MERGE_
(Doing a rebase and merge will give that specific commit a new hash on `main` or `develop`, and on the subsequent release, this particular commit will be identified again as a new feature by `release-please`)

_WHEN WRITING THE COMMIT MESSAGES (AFTER THE MESSAGE HEAD), STARTING WITH A BLANK SPACE AND LOWER CASE LETTERS IS MANDATORY._

```
   EXAMPLE:
   git commit -m "type(folder):<one_blank_space>this commit message always starts with a lowercase letter"
```

Compliant commit message examples:

      git commit -m "feat(cicd): feature1 #issue_number"

      git commit -m "feat(helm): feature2 #issue_number"

      git commit -m "feat(k8s): feature3 #issue_number"

      git commit -m "feat(terraform): feature4 #issue_number"

Release-please would produce CHANGELOG file that looks like this:

**Features**

cicd: feature1 (ISSUE_NUMBER_HYPERLINK)(COMMIT_HYPERLINK)

helm: feature2 (ISSUE_NUMBER_HYPERLINK)(COMMIT_HYPERLINK)

k8s: feature3 (ISSUE_NUMBER_HYPERLINK)(COMMIT_HYPERLINK)

terraform: feature4 (ISSUE_NUMBER_HYPERLINK)(COMMIT_HYPERLINK)

## Deployment process:

As mentioned above, in this repository there are 4 main folders where different build commands and approaches are used. Depending on the folder, where updates are made, the following steps must be followed:

_It is important to mention that we do not have a central management solution for secrets. Whenever you deploy any changes that have to do with creation/deletion/update of secrets: please make sure to cross check if that is a shared secret, update the value or version on [Secret Manager](https://console.cloud.google.com/security/secret-manager), and bump also the Version property on `.values` file on each service that the secret is being used._

_Please start deploying your newly developed features beginning with **/terraform** folder. Since terraform is at the core of our infrastructure, it needs to be deployed first, so other components such as k8s and helm do not have unmet dependencies._

## /cicd

As per current state, CI/CD folder is in its initial stages and only performs terraform checks and some pipelines for running the release-please tool. This documentation will be updated according to upcoming changes.

## /helm

1.  Open terminal and cd into the respective folder:

    ```
    cd /devsecops-infra/helm/sap-compliance-reporting
    ```

    or

    ```
    cd /devsecops-infra/helm/stackdriver-metrics-adapter
    ```

2.  Authenticate with `sap-mcsec-inspec-preprod` or `sap-mcsec-inspec-prod` GCP project:
    Use this terminal command to login via your SAP linked google account:
    ` gcloud auth login`
    When logging in for the first time:

    - Navigate to [Google Cloud Console](https://console.cloud.google.com/).
    - Make sure you are on the right project depending on the release(preprod or prod).
    - Navigate to _Kubernetes Engine -> Clusters_.
    - On the column of elastic-cluster, click on three dots, that should open the tab with instructions to gain access on the cluster.

       <img align="center" src="/assets/docs-images/release_process/infra-repository/connect-cluster.png" width="65%" height="65%">

    - Download the **kubeconfig file** for the respective elastic cluster, and check if you are performing operations in the correct cluster by verifying via these commands:
      `    kubectl config get-contexts`
      or
      `   kubectl get pods -n <namespace> 
EXAMPLE: kubectl get pods -n elastic-system`
      When you already have downloaded the config file before:

    - To get the different projects that you already have access to:

      ```
      kubectl config get-contexts
      ```

      then run the following command without need to go the google cloud console:

      ```
      kubectl config use-context <cluster-name>
      EXAMPLE: kubectl config use-context gke_sap-mcsec-inspec-prod_europe-west4_elastic-cluster
      ```

      \*please note that you have to be connected to the SAP VPN to perform kubectl operations.

3.  Check the available commands with:
    ```
    rake -T -A
    ```
4.  Always perform a `rake dry_run_command[env]` and cross check the changes that will be applied or any error occurring. For example:
    ```
    rake dry_run_deploy_elastic[env]
    ```
5.  Upon completion of step 4, apply the changes. Example:
    ```
    rake deploy_elastic[env]
    ```
6.  Explore other rake tasks with the commands from step 4, in case of need.
7.  Follow the steps defined [here](#post-release-checks), to verify that changes are applied correctly, and have not affected existing infrastructure.

## /k8s

1.  Open terminal and cd into the respective folder:

    ```
    cd /devsecops-infra/k8s/gatekeeper
    ```

    or

    ```
    cd /devsecops-infra/k8s/network-policies
    ```

2.  Make sure you have access to the cluster, if that is not the case follow step 2 [here](#helm).

3.  In case you are making changes on the `/gatekeeper` folder:
    \*You might need clusterrolebinding access (you may not be able to install CRD-s in case these rights do not exist):

    - Check the available rake commands commands and their explanation with:
      ```
      rake -T -A
      ```
    - Run the following command to create clusterrolebinding (in case permission is not previously granted):
      ```
      rake install:clusterrolebinding[your_email_address]
      ```
    - Run the following command to install/uninstall all CRD-s:
      ```
       rake install:crds
       rake uninstall:crds
       rake install:specific_crd[crd_folder_name]
       rake uninstall:specific_crd[crd_folder_name]
      ```
    - Check if the install/uninstall has been completed successfully by running:

      ```
      kubectl get constraints
      ```

      In case you are making changes on the `/network-policies` folder:

    - Check the available rake commands and their explanation with:
      ```
      rake -T -A
      ```
    - Run the following commands to install and uninstall network policies :
      ```
      rake install:net_policies_<respective-cluster>
      rake uninstall:net_policies_<respective-cluster>
      ```

4.  Follow the steps defined [here](#post-release-checks), to verify that changes are applied correctly, and have not affected existing infrastructure.

## /terraform

Currently, terraform state is saved into a GCP bucket. This bucket is particularly important, because is a single point of failure for the whole infrastructure.
Terraform structure is due to changing for the infrastructure repository, however, the following guide is relevant in deploying changes, as per current repository state.

1. Open terminal and cd into the respective folder:

   ```
   cd /devsecops-infra/terraform
   ```

2. Navigate [Google Cloud Console](https://console.cloud.google.com).

   - Make sure you are on the correct project(preprod or prod).
   - Navigate to `Cloud Storage/Buckets section` to confirm the bucket name that holds the terraform state for the infrastructure you want to deploy.
     <img align="center" src="/assets/docs-images/release_process/infra-repository/buckets-search.png" width="65%" height="65%">

   There are different buckets depending on the cluster and environment.

   For PREPROD these buckets are used:

   - mcsec-inspec-state-preprod
   - mcsec-elastic-state-preprod

   For PROD these buckets are used:

   - mcsec-elastic-state-prod
   - mcsec-inspec-state-prod

3. Check the available rake commands and their description with:
   ```
   rake -T -A
   ```
4. Initiate terraform in the current directory by running:
   ```
   rake init[gcp_project,<cluster>,<bucket>]
   ```
   ```
   EXAMPLE: rake init[sap-mcsec-inspec-preprod,elastic-cluster,mcsec-elastic-state-preprod]
   ```
5. In case you have initiated terraform before, run this command to get the latest state, as someone might have changed it lately:
   ```
   rake refresh[gcp_project_name,env,<cluster>]
   ```
6. Run a terraform plan, to cross check what are the resources that are to be modified/deleted/created and observe whether that is aligned with the changes associated to the PRs:
   ```
   rake plan[gcp_project_name,env,<cluster>]
   ```
7. If checks for step 6 are passed successfully, apply the changes using this command:
   ```
   rake apply[gcp_project_name,env,<cluster>]
   ```
8. If you run into the errors where terraform is complaining about resources already existing, you have to sync the terraform state with the resources existing on the infrastructure.
   Identify the resource name, and initiate import with this command:
   `    cd /<folder_of_the_cluster>`  
    `    terraform import  -var-file=<environment>.tfvars -var='project_id=<your_project_id>' <resource-type> <resource-name>`
9. Follow the steps defined below, to verify that changes are applied correctly, and have not affected existing infrastructure.

## Post Release Checks:

After completing the applying the changes, it is **very important** to perform the following checks in order to verify that the changes are applied correctly and the systems are up and running with no errors.
After the release, the infra team members in each region, should constantly monitor to make sure no disruption of services occurs.

1. Navigate [Google Cloud Console/Clusters preprod](https://console.cloud.google.com/kubernetes/list/overview?project=sap-mcsec-inspec-preprod) or [Google Cloud Console/Clusters prod](https://console.cloud.google.com/kubernetes/list/overview?project=sap-mcsec-inspec-prod), and make sure no visible errors exist on the clusters, from the web interface.
2. Navigate [Google Cloud Console/Services preprod](https://console.cloud.google.com/kubernetes/discovery?project=sap-mcsec-inspec-preprod) or [Google Cloud Console/Services prod](https://console.cloud.google.com/kubernetes/discovery?project=sap-mcsec-inspec-prod), and make sure no visible errors exist on the services, from the web interface.
3. Navigate [Google Cloud Console/Workloads preprod](https://console.cloud.google.com/kubernetes/workload/overview?project=sap-mcsec-inspec-preprod) or [Google Cloud Console/Workloads prod](https://console.cloud.google.com/kubernetes/workload/overview?project=sap-mcsec-inspec-prod), and make sure no visible errors exist on the workloads, from the web interface.
4. Click on the specific workloads that changes are made, observe the logs, notice any causalities.
5. In case there were updates on the `/k8s/gatekeeper` make sure:
   - The desired CRD-s are installed/uninstalled, with this command:
     ```
     kubectl get constraints
     ```
   - Check the Total Violations of the installed CRD-s whether existing workload have failed the compliance checks that this CRD enforces:
     ```
     kubectl describe <constraint_kind> <constraint_name>
     ```
6. Login to Elastic, check and verify that old data exists.

## Failure Mitigation Strategy:

1.  In case of failures in `/helm` directory:

    - perform a helm rollback with the commands provided by rake file.

      ```
      cd /devsecops-infra/helm/sap-compliance-reporting
      rake -T -A
      ```

      or

      ```
      cd /devsecops-infra/helm/stackdriver-metrics-adapter
      rake -T -A
      ```

2.  In case of failures in `/terraform` directory:
    - Navigate to the artifacts of the [last stable release](https://github.tools.sap/mce/devsecops-infra/releases).
    - Change directory into the right folder:
      ```
      cd /devsecops-infra/terraform
      ```
    - explore commands with `rake -T -A ` and apply (you can also follow steps from [here](#terraform))
3.  In case of failures in `/k8s` directory:
    - Change directory into the right folder:
      ```
      cd /devsecops-infra/k8s/gatekeeper
      ```
      or
      ```
      cd /devsecops-infra/k8s/network-policies
      ```
    - explore commands with `rake -T -A ` and apply the respective uninstall command to remove the module that is failing.
4.  In case of a failure with ELK stack, where elastic has to be redeployed and data is lost, check [Data Recovery Documentation](/internal/compliance_scanning/elastic_data_backup_and_recovery/elastic_data_backup_and_recovery_automation).

## Post Deployment Release Process:

After the successful release, where all the steps above have been completed successfully, a documentation update should be followed.

1. For each merge into the `main` branch, a pipeline is triggered running `release-please` which opens another PR against main, adding automatically the changes mentioned above. Release manager, should followup and make sure that this PR is approved and merged to main.
2. When the `release-please` PR from step 1 is merged, another pipeline is triggered, and it automatically creates a release, with a bumped version accordingly, creates a tag, and links the artifacts.

## Dry Run for release-please:

This tool could not be run against a local branch. Therefore, to be able to perform a `--dry-run` and generate the exact upcoming release version, this CLI tool must target a new remote branch (example:`version-of-next-release`) that is a merge of the current `main` and latest `develop`.

To create this branch and push it to remote:

```
git checkout develop
git pull
git checkout -b version-of-next-release
git merge origin/main
git push origin HEAD
```

To run `release-please` against this branch and get the next release version number:

```
release-please release-pr \
--token=YOUR_GITHUB_TOKEN \
--config-file=cicd/release-please-config.json \
--manifest-file=cicd/.release-please-manifest.json \
--repo-url=mce/devsecops-infra \
--api-url=https://github.tools.sap/api/v3 \
--graphql-url=https://github.tools.sap/api/v3 \
--target-branch=version-of-next-release \
--dry-run
```

After user has noted the version number, this branch must be deleted locally and remote:
Locally:

```
git branch -d version-of-next-release
```

Remote:

```
git push origin --delete version-of-next-release
```
