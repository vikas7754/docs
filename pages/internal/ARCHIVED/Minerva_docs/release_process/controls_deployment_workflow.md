---
layout: default
title: "[ARCHIVE] Minerva Release WorkFlow"
parent: "[ARCHIVE] Release Process"
grand_parent: "[ARCHIVE] Internal Minerva Docs"
has_children: false
---

# Minerva Release Workflow

## Overview:

This document describes detailed workflow of a Minerva release lifecycle. Minerva release cycle is of 2 weeks and will run through the course of entire sprint. Each Minerva release will be referenced by a unique global city name.

## General Development:

All the tasks/features will be worked on individual feature branches, once development work is complete the changes are merged in develop through a Pull request that will require approval from at-least 2 team members. These feature branches will be created based on the `develop` branch.

## Release Initiation:

This describes the process to initiate a release which includes release branch creation, naming convention and cut-off time for the updates to be included in the release.

- Release branch is created on Monday, start of the sprint at 12 PM PST.
- The release branch will be created based on the latest state of develop branch.
- The name of branch should be in this format: `release-city_name`.
- All the PR's/changes that are planned to be in the release must be merged into develop before the time mentioned.
- No other changes will be included in the release after that time unless its a high priority.
- This release branch is pushed to remote.
- A PR is created to merge this release branch into main.
- Title for PR will be in this format: `Release-City_name`.
- `Release-City_name` PR description needs to be updated based on format [here](minerva_release_notes_format.md)

## Pre-Production Release:

This section describes how a Pre-Production release workflow is followed. This includes details related to format of version bumps and also explains high level working of CD pipelines with detailed steps for manual deployments if necessary.

- First deployment to Pre-Prod will be done on the Monday, start of the release cycle.
- create new branch out of `release-city_name` branch.
- Version bumps will be done for hyperscalers that have the changes in the release. For instance if Alicloud has no changes in the release, the version bumps will just be done for AWS, Azure and GCP. Alicloud version remains the same.
- Increment the version in following files:
  - service/consumer-`hyperscaler`/inspec.yml. (e.g. 4.10.0-rc1 bumps up to 4.11.0-rc1)
  - deploy/values.preprod.yaml (e.g. 4.10.0-rc1 bumps up to 4.11.0-rc1)
- Create a PR for these version bumps to be merged back into `release-city_name` branch.
- This PR will again require approvals from 2 team members.
- As soon as the version bumps PR is merged into `release-city_name` branch, CD pipeline will trigger.
- Manual approval will be required for the pipelines. This can be given by Justin, Rohit or Carmelo.
- The pipline stages will build and push the images, deploy all the workloads for relevant hyperscalers to the Pre-Prod project.
- At the moment we have following workloads:
  - inspec cluster: aws, azure, gcp, aws-concur, azure-accenture
  - inspec-cluster-sg: alicloud, aws-cn, azure-cn
- For any reason, if the pipelines are not running or pipelines have failed we will have to do the manual deployment. This step-by-step guide can be found [here](/internal/dev_workflow/release_process/release_documentation)

## Pre-Production release results verification:

Once the Pre-Production release is completed, before moving forward withe the Production the result needs to analysed and verified. Any outliers found in the results needs to be justified. There are various parameters that will require an overview and verification which included number of accounts scanned, overall error rate, etc. and if needed detailed analysis for any of the components.

- The Pre-Prod deployment results can be verified following Wednesday.
- Following parameters should be mainly looked at from the Controls Error reporting dashboard which is already created:
  - Total number of records.
  - Overall Error rate, Individual hyperscaler error rate, total number of errors, number of controls affected.
  - Total number of accounts scanned for each hyperscaler.
  - Total number of alerts for High's and Medium's -> These numbers should pretty much tally up with expected impact of numbers based on the control updates included in the release.
  - These numbers should be more or less similar to the previous scans -> any outliers should be justified with a reason.

## Second Pre-Prod release (Optional):

Second PreProd release is optional depending on what the results are for first scan. If there are any additional updates/fixes these are first merged in the relase branch through a PR and second Pre-Production release is done in the following way:

- This will be done on following Thursday if necessary.
- If there are any errors discovered from the first pre-prod scan results, these errors will be fixed. PR will be created to merge that fix back into the release branch.
- There should just be one commit for the fix.
- Commit of this fix should have `[skip ci]` at its end. This is done as we don't want the pipelines to trigger before updated version bumps. Adding `[skip ci]` at the end of commit will prevent the pipelines from triggering.
- The PR is merged into release branch with 'rebase and merge' strategy.
- Version bumps:
  - service/consumer-`hyperscaler`/inspec.yml. (e.g. 4.11.0-rc1 bumps up to 4.11.0-rc2)
  - deploy/values.preprod.yaml (e.g. 4.11.0-rc1 bumps up to 4.11.0-rc2)
- From this point same process will be followed as it was done during the first one and results will be verifed on the following Monday (second half of sprint).

## Production release:

This section describes detailed steps for final Production release.

- CM ticket will be created. One example is mentioned [here](https://zenhub.tools.sap/workspaces/cloud-compliance-60a3a28e5f55a70faa8379c1/issues/mce/cloud-compliance/1930)
- Version bumps for Prod release:
  - service/consumer-`hyperscaler`/inspec.yml. (e.g. 4.11.0-rc1 bumps up to 4.11.0)
  - deploy/values.prod.yaml (e.g. 4.10.0 bumps up to 4.11.0)
- These version bumps will be done only for those hyperscalers that were part of Pre-Prod release.
- This should be merged back into the release branch through a PR. This PR should just have one commit for version bumps.
- Commit of these version bumps should have `[skip ci]` at its end to prevent from the pipelines re-triggering for Pre-Prod again.
- The release PR will require two approvals one from Jay and other from one team member.
- Once the PR is approved it should be merged in `main` branch.
- At this point the pipeline will trigger to complete the deployment or if manual deployment needs to be done, step-by-step guide can be found [here](/internal/dev_workflow/release_process/release_documentation).

## Post-Production release tasks:

Once deployment to production is complete, all the necessary version bump commits and fixes/updates if any from the current release needs to be included back in the `develop` branch. New release needs to be created, tagged and release notes must be updated. This section describes how this process is carried out.

- Switch to main -> Do 'git pull'
- Switch to develop -> Do 'git pull'
- Create a new branch out of develop -> do 'git merge origin/main'
- Push the branch and create new PR to merge this into develop.
- This PR will again require approvals from 2 team members.
- Once this PR is merged into develop, develop branch should be up-to-date with main.
- Create new release [here](https://github.tools.sap/mce/cloud-compliance/releases) and tag it at the latest commit in main branch. The tag should follow `vCity_name` as naming convention.
- Release notes should be updated in this release. The release PR description should be taken as reference.

## Documentation Update:

The end-user documentation has to be updated in our GitHub pages. This process is documented in this section.

- Switch to main branch in cloud comliance repo -> make sure it is up-to-date
- The DevSecOps docs repo needs to be cloned since all the control details will be updated there.
- Navigate to that relevant hyperscaler controls folder in cloud comliance repo:
  - service/consumer-`hyperscaler`
  - inspec json . > 'local path to root of DevSecOps docs repo'/docs/\_data/sap-`hyperscaler`.json
- Update the consumer versions for hyperscaler that are part of release in the docs repo -> devsecops-docs/docs/\_data/release-metadata.yaml
- Create a PR to merge that into main in docs repo. This will update the documentation.

## Public facing Artifactory update:

The updated ad-hoc images from the current release will have to be pushed to the remote artifactory.

- Update the image names as per the hyperscaler and its corresponding version in the release as follows:
  - docker tag eu.gcr.io/sap-mcsec-inspec-prod/inspec/sap-`hyperscaler`:`tag` mcsec.common.repositories.cloud.sap/inspec/profiles/sap-`hyperscaler`:`tag`
- Finally push the images.
  - docker push mcsec.common.repositories.cloud.sap/inspec/profiles/sap-`hyperscaler`:`tag`
