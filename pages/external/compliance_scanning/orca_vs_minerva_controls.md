---
layout: default
title: "Orca v/s Minerva controls"
parent: Compliance Scanning
grand_parent: External Documentation
has_children: false
nav_order: 5
---
# Orca v/s Minerva controls

## WHO: (Target Audience)

The document is intended for all the LoB's using Orca.

## WHAT: (Document Overview)

- This document provides an overview of the key differences between Minerva and Orca scan results. The scope covers controls that are currently implmented in Orca

## WHY: (Reasoning for this document)

There are many significant differences between how Orca and Minerva scan. The goal of this document is to help all Orca stakeholders understand those differences to take full advantage of the deeper scan results. This will ensure SAP and its customers are protected and enable a greater degree of visibility for LoBs.

## HOW: (Process followed)

- The tool custodians (GCS SRRC yperscalers Security Engineering & Operations team) followed a rigorous methodology to develop full control parity between Minerva and Orca. All new control development was done in Orca for 6 months prior to the transition. Key controls were tested and validated to identify any large discrepancies in data. When gaps were identified, they were investigated, and either the query was updated or the new findings were documented
- This validation includes comparing the total number of alerts and control implementation
- Following steps were performed in order to do the validation:
  - Get alerts report from Orca
  - Get alerts report from Minerva
  - Get list of common accounts and controls between Orca and Minerva. Having list of common accounts in necessary for doing the numbers comparison
  - Find delta in the number of alerts for each control. Sort that from largest to smallest. At the same time, it is necessary to have context to the numbers in terms of percentage. The percentage difference in number of alerts is calculated using this formula: ```abs(orca - minerva)/min(orca,minerva)*100```
  - The criteria for controls validation was if it is present in top 10 sorting based on percentage or if the absolute delta in the number of alerts was greater than or equal to 1,000
  - If a certain control is present in top 10 based on percentage however, if the numbers of alerts in the first itself are very low, it won't be impactful when considered over a big scale. In such cases, that control is skipped for validation. 

## Justifcation for differences: (Explanations for why and where the differences are)

Following are some high level reasoning for top controls where the difference in number of alerts is expected:

- There are some differences between the implementation in Orca and Minerva.
  - The base model for Orca and Minerva is different hence, it is not possible to achieve same results. For instance, for AWS cloudfront distribution control (```8_05_cloudfront_access_log_enabled```) has different presentation of results. minerva subject: distribution ID. Orca subject: domain. This was result in far less number of alerts in Orca than Minerva

- Minerva control producing false negatives due to incorrect implementation
  - In this case, the Orca query was verified for the results and was unchanged since it gave more accurate results

- Following are some top controls where the differences in the number of alerts are expected:
  - 5.4 - (GCP) Storage log buckets should have object versioning enabled (GCP) -> The minerva control was checking for just the logging buckets but due to updated policy decision from SGS the Orca control is checking for all the buckets.
  - 6.1.5 - (All hyperscalers) must not allow traffic on Telnet port (23) or RSH port (514) -> The minerva control was checking just for port 23 and restricting traffic just from internet and ingress. Due to updates SGS policy decision, orca control is also checking for RSH port i.e. 514 and retricting traffic from any direction irrepective whether that is from internet or not.

- Addition of new controls in Orca:

| Cloud Provider | Control title |
| -------------- | ------------- |
AWS | 3.6 - AWS secrets that have not been accessed for 90 days must be removed from secret manager
AWS | 3.6 - It must be ensured that in AWS only dedicated users/groups/roles have full kms:* permissions
AWS | 4.5 - AWS EC2 instances launched using auto scaling group launch configurations must not have public IP addresses assigned by default
AWS | 4.7 - AWS EC2 instances must have IMDSv2 enabled
AWS | 5.1 - AWS Glacier lock policy principal permission must not be overly permissive
AWS | 5.2 - AWS Systems Manager (SSM) should have encryption at rest enabled
AWS | 5.4 - AWS S3 buckets object versioning should be enabled
AWS | 6.2 - AWS Subnets must have "auto-assign public IPv4 address" disabled
AWS | 6.5 - AWS Transit Gateways "AutoAcceptSharedAttachments" must be turned off, to ensure that only authorized VPC attachment requests are accepted (not automatically accept VPC attachment requests).
AWS | 8.1 - AWS Elasticache Redis cluster software must be still supported with security patches (no active use of End of Life versions)
AWS | 8.1 - AWS Elasticache Memcached cluster software must be still supported with security patches (no active use of End of Life versions)
AWS | 8.2 - AWS underlying cluster software (e.g. elasticsearch) should always be updated to the latest stable release
AWS | 8.3 - AWS RDS instances or clusters should not use the default VPC
AWS | 8.3 - AWS DMS replication instances must not be publicly accessible
Azure | 4.1 - Azure VMs must use encrypted protocols
Azure | 4.2 - Azure IP Forwarding should not be enabled
Azure | 4.5 - Azure Virtual Machine Scale Sets must not have public IP addresses assigned by default
Azure | 5.1 - Azure VM Images must use SAP owned machine images and they must not be made public
Azure | 5.1 - Azure snapshots must not be publicly accessible
Azure | 5.4 - Azure Storage accounts object versioning should be enabled
GCP | 4.2 - GCP IP Forwarding should not be enabled
GCP | GCP Machine Images MUST NOT be made publicly available
GCP | 7.9 - GCP Kubernetes Engine Clusters should have Network Policy enabled
GCP | 7.13 - GCP “Shielded GKE” nodes should be enabled
GCP | 8.1 - GCP Caching Software (Memcached) must be still supported with security patches (no active use of End of Life versions)
Alicloud | 8.3 - Alibaba Cloud ApsaraDB RDS instances should not use the default VPC