---
layout: default
title: "[ARCHIVE] Azure Devops Naming Conventions"
parent: "[ARCHIVE] CI/CD"
grand_parent: "[ARCHIVE] Internal Minerva Docs"
has_children: false
---

# Azure Devops Naming Conventions
All information on Azure DevOps naming conventions for our team can be found here.

## Pipeline Naming
Each pipeline configured in our Azure Pipelines should be given a name which allows a user to quickly identify its scope. For this reason, the following attributes, separated by dashes wrapped in spaces, should be included in the pipeline name when applicable in the following order:

- Relevant Hyperscaler in Scope - for instance, if the pipeline is specific to the Azure dispatcher, the Hyperscaler in scope would be Azure
- Relevant topic area - a current list of relevant topics can be seen below
    
    Controls
    
    Dispatcher

- GCP project to deploy to
- Cluster to deploy to

Here is an example pipeline name for Azure controls being deployed to the inspec-cluster on the sap-devsecops GCP account
Azure - Controls - sap-devsecops - inspec-cluster

## yml File Naming
YML files should be included in a folder under cicd which makes sense. For example, all CD pipelines for a specific GCP project should be included under a folder named after that project - all templates should be included under templates - if a pipeline needs a new category, create a new folder under cicd. YML files should be named in all lowercase and include the following, separated by underscores, in the specified order:
- Relevant Hyperscaler in Scope
- Relevant topic area
- ci or cd
- Cluster to deploy to

Here is an example yml file name for deployment of azure controls to the inspec-cluster on the sap-devsecops project

azure_controls_cd_sap-devsecops_inspec-cluster.yml

When possible, create a template pipeline in the cicd/templates folder with the following, separated by dashes, in the specified order:
- Relevant topic area
- ci or cd

For the above example, it would make sense to create a template pipeline which is agnostic to hyperscalers, GCP projects, and clusters. This would allow for hyperscaler specific configurations to be configured in files like 

azure_controls_cd_sap-devsecops_inspec-cluster.yml

aws_controls_cd_sap-devsecops_inspec-cluster.yml

gcp_controls_cd_sap-devsecops_inspec-cluster.yml

alicloud_controls_cd_sap-devsecops_inspec-cluster-sg.yml

azure-cn_controls_cd_sap-devsecops_inspec-cluster-sg.yml

aws-cn_controls_cd_sap-devsecops_inspec-cluster-sg.yml

While the majority of the deployment definition is specified in the template controls_cd.yml


## Variable Group Naming

Variable groups are a convenient way to specify environment-specific variables in a single group. Variable group names should include the following elements in the specified order when relevant, separated by an underscore

- Relevant Hyperscaler in Scope
- Relevant topic area
- Relevant GCP Project
- Relevant Cluster
- Relevant Namespace

Here is an example for the above described scenario
azure_controls_sap-devsecops_inspec-cluster 

If the variable group is relevant for an entire project or entire cluster, omit the other elements of the name, and you will have sap-devsecops or sap-devsecops_inspec-cluster


## Kubernetes Service Connections

When creating a kubernetes service connection in Azure DevOps, please include the following in the specified order:

- Relevant GCP Project
- Relevant Cluser
- Relevant Namespace
