---
layout: default
title: "[ARCHIVE] Example CICD Integration"
nav_order: 1
parent: "[ARCHIVE] On Demand Scanning"
grand_parent: ARCHIVED
has_children: false
---

# [ARCHIVE] Chef Inspec On-Demand Scanning used in an Azure DevOps Pipeline

Context: A CI/CD pipeline allows both developers and operations professionals to work cohesively to build and deploy code to a development, staging, or production environment. The pipeline can include continuous integration and continuous deployment stages, allowing for each function to occur on an ongoing basis. Additionally, a pipeline can be designed to be triggered at the end of a previous software process, or it can initiate a process at the end of the pipeline using the data which it has produced.

## Controls in each scan

#### The controls for each hyperscaler can be seen via the following URLs:

**AWS**: [AWS Controls](/external/compliance_scanning/on_demand/running_adhoc_scan#aws)

**Azure**: [Azure Controls](/external/compliance_scanning/on_demand/running_adhoc_scan#azure)

**GCP**: [GCP Controls](/external/compliance_scanning/on_demand/running_adhoc_scan#gcp)

# Getting Started

## Writing the YAML file

- The first few lines in the yaml file will be setting up the trigger to start the pipeline, the variables to be used in the pipeline, and the agent pool which the pipeline will be run on.

```yaml
trigger: none
variables:
  - group: Azure-Adhoc-Scan-Vars
pool:
  vmImage: ubuntu-latest
```

- The next set of lines deal with pulling from the specified docker registry you wish to use, along with authenticating using the proper credentials if the docker registry is private.

```yaml
steps:
  - task: Docker@2
    inputs:
      containerRegistry: "josh-docker-registry"
      command: "login"
```

- To be able to login to Docker and pull the image in the pipeline, you must create a service connection. This is done by going to Project Settings(bottom left corner) -> Service connections, and then selecting New Service Connection.
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/example-pipeline-images/new-service-connection.png">
</p>
- Select Docker registry, enter the URL of the registry as well as your authentication information, create a service connection name (this will be used in the container registry line of the YAML file) and save the service connection.
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/example-pipeline-images/save-service-connection.png">
</p>

- The final lines in the YAML file create a temporary directory to store the output file, adding the user as the owner of the directory you write the log files to (or the pipeline will throw an error that it is not authorized to write to the file), and then run the docker image.

```yaml
- script: mkdir tmp
  displayName: Creating Directory for Output
- script: sudo chown 1000:1000 $(Build.SourcesDirectory)/tmp
- script: docker run --rm \
    -e AZURE_CLIENT_SECRET=$(AZURE-CLIENT-SECRET) -e AZURE_CLIENT_ID=$(AZURE-CLIENT-ID) \
    -e AZURE_TENANT_ID=$(AZURE-TENANT-ID) -e AZURE_SUBSCRIPTION_ID=$(AZURE-SUBSCRIPTION-ID) \
    -e JSON_OUT=/out/out.json -v $PWD/tmp:/out \
    mcsec.common.repositories.cloud.sap/inspec/profiles/sap-azure:$(IMAGE-VERSION)
```

- Of note, for the line
  `sudo chown 1000:1000 $(Build.SourcesDirectory)/tmp`

This adds the appuser in the docker container as an owner of whatever directory you're writing to. Since docker shares user ids, group ids, and permissions with its host, the appuser was trying to write to the host directory (in my case tmp), but since there was a volume mount the error was showing that it didn't have permissions to write to /out (when really this is just mounted to the host volume).

- For the final docker command, the syntax is taken from the [Adhoc Scan Documentation](/external/compliance_scanning/on_demand/running_adhoc_scan#example-run-with-html-reporting). An important note is to remove the **--it** flag, as it will throw an error if run in the pipeline since this argument is not supported by Azure Pipelines. **Additionally, the values for the docker command are stored in variables for the pipeline, so that they are not directly saved and commited to Github in cleartext.**

## Hyperscaler Variations.

- The example above is for a pipeline using the AWS Adhoc Image.

- For using the Azure Adhoc Image, everything should be the same, except the docker command can be found [here](/external/compliance_scanning/on_demand/running_adhoc_scan#example-run-with-json-reporting). It has the same caveat of needing the **--it** flag to be removed, as well as using variables for the values in the command.

- For using the GCP Adhoc image, the docker command can be found [here](/external/compliance_scanning/on_demand/running_adhoc_scan#example-run-with-xml-reporting). You will need to store the json creds file in secure files, which are found in the pipeline library.
