---
layout: default
title: GCP Bucket Overview
parent: Chef Ops
grand_parent: Operations
has_children: true
---
# Buckets
Below is a brief summary of production buckets at present. As any buckets are added or removed, this document should be updated.


| **GCP Bucket Name** | **Description** | 
| ------------------|---------|
|**account-config-terraform-prod**| This bucket holds account configuration customizations and default settings.| 
|**elastic-data-archive-bucket**| This bucket is where the data exports are stored. This is crucial for Prisma and Minerva exports for weekly reports that are sent to LOBs via email.|
|**elastic_repository_dev2021**| This bucket is used for elastic backup and recovery activities |
|**eu\.artifacts\.sap-mcsec-inspec-prod\.appspot\com**| This bucket is the container repository.|
|**mcsec-elastic-state-prod**| This bucket is used for Terraform activities for Elastic cluster.|
|**mcsec-inspec-state-prod**| This bucket is used for Terraform activities for Inspec cluster.|
|**sap-mcsec-inspec-prod-bucket-logging**| This bucket is for access logging.|
|**sap-mcsec-inspec-prod-elastic-snapshots**| This bucket is used for Elastic back up and recovery.|
|**sap-mcsec-inspec-prod\.appspot\com**| This bucket was created for Fire Store POC.|
|**staging.sap-mcsec-inspec-prod\.appspot\com**| This bucket was created for Fire Store POC.|

