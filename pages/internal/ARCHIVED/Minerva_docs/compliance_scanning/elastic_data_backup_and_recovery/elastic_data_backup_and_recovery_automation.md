---
layout: default
title: "[ARCHIVE] Elastic Data Backup and Recovery Automation"
parent: "[ARCHIVE] Minerva - Compliance Scanning"
grand_parent: "[ARCHIVE] Internal Minerva Docs"
has_children: false
---

# Elastic data backup and recover

There are two mechanisms in place that backup data for Minerva. The first one is
based on the elastic native **Snapshot and Restore** feature. The second is a
custom data archiving service which is implemented to create LoBs reports.

## Elastic Snapshot and restore

The [snapshot and
restore](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore)
feature from elastic has been setup to create snapshots of data and
configurations in elastic on a daily basis. The scheduling policy was done in
the **Stack Management --> Snapshot and Restore --> Policies** page in kibana. A
repository was setup as a GCP bucket to hold the snapshots in **Stack Management
--> Snapshot and Restore --> Repositories**. In order to get access to the
bucket, a plugin was needed in elastic. This has been setup in the elastic helm
chart in the file **/elastic/templates/elastic.yaml** as:

```
- name: plugin
  command: ['sh', '-c', 'bin/elasticsearch-plugin install --batch repository-gcs']
```

Finally, elastic needs to have read and write permissions to the bucket to
create the snapshots and restore them if needed. This has been done through a
gcp secret that holds a service account key called **elastic-bkp-secret**
managed through Terraform, which is then mapped into a K8s secret called
**gcs-credentials**. A **secureSettings** configuration for elastic was then
created in the elastic helm chart in values files as:

```
secureSettings:
  - secretName: "gcs-credentials"
```

The restore process can be started from each snapshot and can be monitored in
the **Stack Management --> Snapshot and Restore --> Restore Status** page.

## Custom data archiving

Minerva data in Elastic is archived in a GCP storage bucket for backup
purposes. The backup process is performed by the data archiver service which
runs in prod and preprod environments. The archiving frequency can be controlled
by configurations in the cloud scheduler which determines when the data archiver
would run. It is best to configure the data archiver to run only when the scans
are completed and fully ingested into Elastic. Usually, no additional effort is
required to make the archiver service run as it is handled by the cloud
scheduler.

The data archiver is programmed to archive data from the previous day whenever
it runs. For example, if the archiver runs on a Tuesday (16.08.2022), it
automatically formulates the index to archive based on the previous day's
date. So in this case, it would try to archive data from (15.08.2022). Of
course, these are logics embedded in the archiver code and can be adapted to
suite any current requirements. The backup files produced are categorized
according to severity (highs and mediums), and the mediums are categorized based
on important board areas (PE, TI, others). All backup files are in json format
and can be re-imported into Elastic through the data recovery process. The data
archiver needs adequate access and permissions to the Elastic instance and GCP
bucket. It is important to note that aside from performing backup operations,
the data archiver also produces xlsx report outputs used for executive
reporting.

### Custom data recovery

Backed up data in GCP bucket can be restored to Elastic using the data recovery
service. The data recovery service is an adhoc service that should only be
deployed for data recovery use cases. Same project or cross project data
recovery can be performed by the data recovery service. For same project
recovery, the GCP storage bucket containing the backup data and the Elastic
instance where data is to be recovered are in the same project. Cross project
recovery refers to recovering data to an Elastic instance in a project different
from the project of the GCP bucket containing the backup data. The correct
variables should be provided in the values file of the helm chart before
deploying. Recovery time is largely dependent on how much backup data is
available. Currently (16.08.2022), about 8 months worth of data was recovered
during test in about 15 hours. The recovery operation requires data recovery
service access to the Elastic instance and GCP bucket.

### Terminology

The user needs to know the below terminologies, that are used by the service to
run recovery steps.

- [project](https://github.tools.sap/mce/devsecops-data-archiver/blob/develop/elastic-data-recovery/deploy/values.preprod.yaml#L10):
  project where the elastic service is running that needs to be recovered.
- [project_with_bucket](https://github.tools.sap/mce/devsecops-data-archiver/blob/develop/elastic-data-recovery/deploy/values.preprod.yaml#L11):
  project with bucket where elastic data is archived actively.
- [bucket_name](https://github.tools.sap/mce/devsecops-data-archiver/blob/develop/elastic-data-recovery/deploy/values.preprod.yaml#L21):
  bucket name where elastic data resides.

#### Deploying Recovery Service

To deploy the recovery service, use the Rake file in the **deploy** folder in
[Data Recovery
Service](https://github.tools.sap/mce/devsecops-data-archiver/tree/develop/elastic-data-recovery/deploy).

1. For testing in DEV, to use data from preprod then values.dev.yaml file needs
   to contain project: **sap-mcsec-compliance-dev** , project_with_bucket:
   **sap-mcsec-inspec-preprod**, bucket_name:
   **elastic-data-archive-bucket-preprod**
2. For recovery in PreProd and Prod, the user needs to check that the values
   **project**,**project_with_bucket**, and **bucket_name** are set properly in
   values.{ENV}.yaml. In this case, both project and project_with_bucket must be
   the same.

Once the above values are added, then deploy using the rake file.

#### Steps to Trigger Data Recovery

1. To run the data recovery service, push a message **{}** to the Topic where
   the subscription is attached, **data-recovery-trigger**.
2. Once the message is picked from the queue, the recovery service will pick
   data from **project_with_bucket** and inject it to elk in that same project.
