---
layout: default
title: "[ARCHIVE] Applying Pipeline Configurations"
parent: "[ARCHIVE] CI/CD"
grand_parent: "[ARCHIVE] Internal Minerva Docs"
has_children: false
---

# Applying Pipeline Configurations

In addition to defining a pipeline in a yaml file, Azure Pipelines requires a pipeline build definition to be configured. In the past, we've configured these build definitions in the Azure Pipelines UI. There are a few downsides to using the UI to do this:
1. Build definitions are given many default configurations by the platform for which the user is not prompted for
2. Creating build definitions in the UI requires users to have elevated permissions in some cases
3. Build definitions that are created and changed in the UI are not traceable
4. It's cumbersome work when you have to create multiple build definitions for a single piece of work.
5. Configuring build definitions in the UI is separate from our regular git workflow, and isn't subject to any review

Because of this, we've made use of the [Azure DevOps terraform provider](https://registry.terraform.io/providers/microsoft/azuredevops/latest/docs) combined with a pipeline to track and automatically apply these changes through code. This documentation will cover any background required, as well as the process to add/change/remove a build definition.


### Implementation
In each GitHub repository, you will find the directory `cicd/build-definitions` containing the following files:

##### main.tf
This file defines the required version of the azuredevops provider, the connection to the terraform state bucket, and the instantiation of the azuredevops_build_definition resource. The azuredevops_build_definition resource is created for each pipeline object in the pipeline variable in the tfvars file listed below.

##### variables.tf
Defines the required variables and variable structure in use by `main.tf`

##### \<repository-name\>.tfvars
This file contains the variable assignments of the variables defined in `variables.tf`. The pipelines variable is a list of all pipelines within the relevant repository. Here is an example pipeline configuration:

```terraform
{
        pipeline_name = "GCP_Controls_sap-mcsec-compliance-dev_inspec-cluster"
        yml_path = "cicd/sap-mcsec-compliance-dev/gcp_controls_cd_inspec-cluster.yml"
        az_devops_folder_path = "\\cloud-compliance\\deployment-pipelines\\sap-mcsec-compliance-dev"
        source_branch = "develop"
        development = true
        ci_trigger = {
            use_yaml = true
        }
        pull_request_trigger = {
            initial_branch = "develop"
            use_yaml       = true
            forks = {
                enabled       = true
                share_secrets = false
            }
        }
    }
```
Most blocks and variables within the object can be easily mapped to their counterpart in the build definition terraform resource, which is thoroughly documented [here](https://registry.terraform.io/providers/microsoft/azuredevops/latest/docs/resources/build_definition). There are a few variables that are not part of the resource, and their documentation and explanation can be found here. 

`source_branch` - this variable is used to determine the branch which the build definition should look for the pipeline's yaml file. Often, this variable is the `develop` branch, but situations exist where this is not the case, such as `main` for a product build
`az_devops_folder_path` - this is directly related to the [path](https://registry.terraform.io/providers/microsoft/azuredevops/latest/docs/resources/build_definition#path) variable of the build definition resource, but we should make specific mention of it here. This variable is a great way to keep things organized in Azure Pipelines, as it allows us to view build definitions in a structured way. Put your build definition in a folder that makes sense, and if one doesn't exist, it should be created.
`development` - this variable is a boolean - set to either true or false. This should not be used to indicate the target environment, but rather the lifecycle state of the pipeline you are working on. When this option is set to true, '_dev' will be appended to your build definition name. If you are making changes to a pipeline that already exists in our Azure Pipelines setup, you should make a copy build definition which is marked with `development = true`. You can also point your copied build definition to your working branch, so that you can test your changes as they are made. Here is an example:

Existing Pipeline:
```terraform
{
        pipeline_name = "GCP_Controls_sap-mcsec-compliance-dev_inspec-cluster"
        yml_path = "cicd/sap-mcsec-compliance-dev/gcp_controls_cd_inspec-cluster.yml"
        az_devops_folder_path = "\\cloud-compliance\\deployment-pipelines\\sap-mcsec-compliance-dev"
        source_branch = "develop"
        ci_trigger = {
            use_yaml = true
        }
        pull_request_trigger = {
            initial_branch = "develop"
            use_yaml       = true
            forks = {
                enabled       = true
                share_secrets = false
            }
        }
    }
```
Pipeline Used for Testing and Development:
```terraform
{
        pipeline_name = "GCP_Controls_sap-mcsec-compliance-dev_inspec-cluster"
        yml_path = "cicd/sap-mcsec-compliance-dev/gcp_controls_cd_inspec-cluster.yml"
        az_devops_folder_path = "\\cloud-compliance\\deployment-pipelines\\sap-mcsec-compliance-dev"
        source_branch = "MY_WORKING_BRANCH"
        development = true
        ci_trigger = {
            use_yaml = true
        }
        pull_request_trigger = {
            initial_branch = "MY_WORKING_BRANCH"
            use_yaml       = true
            forks = {
                enabled       = true
                share_secrets = false
            }
        }
    }
```

Notice, the name of the build definition in the object remains that same, but by adding `development = true` this will automatically append _dev to the build definition in Azure DevOps. Additionally, `MY_WORKING_BRANCH` was added as the source_branch and the intial branch of the PR trigger. This is just an example of how you can carry out testing on your feature branch without affecting the existing build definition.

Once you are done testing, open a PR to have your changes merged, and remove the object defining your testing pipeline.

##### apply-build-definitions.yml
This is a pipeline that automatically applies changes to the build definition list upon merge to `develop`. A service account called `azdevops-automation` was created through Thycotic to apply these changes. The personal access token for this user and azure devops organization url are set in the AzurePipelinesConfigurationAPI variable group.


### Development Flow
Now that this process is integrated into our git workflow, you can simply raise a PR to add or remove a build definition from Azure DevOps. Here is an example of how one might go about developing a new pipeline:
1. A feature branch is created to develop the new pipeline, called `adding-new-az-pipeline`
2. An initial commit is made to the pipeline to create the pipeline definition yaml file - called `new-pipeline.yml`
3. A PR is opened, wherein a new build definition is added to the list in `cloud-compliance.tfvars`. This build definition points to the `new-pipeline.yml` file in the `adding-new-az-pipeline` branch, and is marked as a development pipeline with `development = true`
4. The PR is approved and merged, and the build definition is automatically created in Azure Pipelines. Testing and development can begin.
5. Once testing and development is completed, the developer creates a PR to merge their pipeline to the `develop` branch, removes `development = true` from their build definition, and points the build definition to the `develop` branch instead of `adding-new-az-pipeline`
6. Once the PR is merged, the new build definition will be automatically updated, and the pipeline is live.


### Service Account Applying Pipeline Changes
A service account called `azdevops-automation@global.corp.sap` was created through Thycotic to apply changes to the build pipelines. This is because we would not want to use an regular user's personal access token to programmatically apply changes in a pipeline. The personal access token for the service account user and azure devops organization url are set in the AzurePipelinesConfigurationAPI variable group. 

#### Managing the PAT
To create a new personal access token, a user who is dedicated as an account owner in Thycotic will have to login as the user. To do this, you should use an incognito/InPrivate session in your browser, and access the service account's credentials in Thycotic. You can then create a PAT for the user, or disable old PATs. This should be the **only** type of work done when logged in with this user through the UI. 
Note: some operating systems may still try to sign you in via certificate in an incognito browser session. You'll have to click the "Sign in with other options" button before the certificate is used to authenticate your personal user. 