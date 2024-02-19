---
layout: default
title: "[ARCHIVE] Patch Management"
parent: "[ARCHIVE] Dev WorkFlow"
grand_parent: "[ARCHIVED]"
has_children: false
---
# Patch Management process
The security patch management aims to address any identified vulnerabilities in
the shortest amount of time. Different elements have to be updated regularly or
when a vulnerability is found.

- **Infrastructure**: Cloud Managed Kubernetes Clusters, deployments, Operating
  Systems, IAM
- **Reporting**: ELK
- **Services**: Patching of services themselves
- **Services dependencies**: Dependencies and Libraries used by any of the
  deployed services

## Roles
### Duty Manager
This role is assigned to a dedicated person who is responsible to review any
security open tickets or create new ones, categorize them and assign them
according to their priority. A rota is to be set up by the operations team for
this role, so that it is spread across people and it is fully resourced.

A Duty manager needs to have a technical understanding of the systems to be
reviewed and their reported vulnerabilities. He/she doesn't need to work on the
task, but can if has the bandwidth. On a major incident it is strongly advised
that the Duty manager does not try to resolve the issue, if they do, they
should first seek someone to cover the Duty manager role. The Duty manager may
have to take on the role of managing a major incident, either initially or
finding someone to cover that role.

## Patch Activities
Patches may be required due to different reasons, which require a different
process.

| **Patch Requirement** | **Summary** | **Next step** |
| ------------------|---------|-----------|
|**Regular maintenance**| A regular meeting item at operations team meeting. A nominated person will have task to check for patches.| Raise change ticket, then update the system. |
|**Security Incident**| Due to Security Incident an emergency patch might be required. Might be zero-day vulnerability or process failure.| Raise emergency change as part of the security incident, patch management will be only a component of the Security Incident and managed there.|
|**Infrastructure: Vulnerability Notification**| Either by a scan, an email, alert by SAP security, cloud provider, 3rd party vendor.| Raise Incident and if a high risk issue a Security Incident. Then raise change ticket to apply patch.|
|**Reporting**| Either by a scan, an email, alert by SAP security, cloud provider, 3rd party vendor.| Raise Incident and if a high risk issue a Security Incident. Then raise change ticket to apply patch. These are tools that the Compliance Security system does not require to run and the possibility of shutting down systems is possible to quick patch the issues.|
|**Services: New Vulnerability, library or Regression**| Deployed code (or dependencies) contains a new vulnerability or a vulnerability that has been previously fixed.| Raise Incident and if a high risk issues a Security Incident. Raise high priority Bug with software team. Then raise change ticket to apply patch.|

## Operations Vulnerability review
The SAP VAS team provides a tool to subscribe to different technologies
vulnerability updates:

- [NGT tool](https://cdrc-tools-ngt.wdf.global.corp.sap/)
- [Documentation](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=2446640712)

A **SAP Global Cloud Compliance** group has been created with subscriptions to:
  - CERT.Kubernetes
  - CERT.Ubuntu
  - CERT.Elastics

To avoid each operations team member subscribes individually to the group above,
a shared mailbox will be created from
[here](https://sapintsupport.service-now.com/itsupport?id=kb_article&sys_id=303120fadb3ab0d0b9bc0bf5f3961941).
The shared mailbox can be then configured with the proper filters and folders,
so that notifications can be easily classified and everyone has the same view.
All team admins should then access or setup the shared inbox with their outlook.

The NGT tool will have to be configured with the shared mailbox
account. However, this is currently not supported in the NGT tool at the
moment. Meanwhile admins should subscribe to the group as follow:

From the NGT main page:
- click **Join Profile**
- in the new page select **SAP Global Cloud Compliance** group
<!-- one of the following group and the relevant profile, -->
<!--   and then **Join** -->
<!--   - CERT.Kubernetes -->
<!--   - CERT.Ubuntu -->
<!--   - CERT.Elastics -->
<!-- - repeat for all the groups above -->

Outlook filters should be set up for High, Medium and Low, e.g.:
```
- Name: Received from CERT - High
- From contains: listserv.sap.corp
- Subject Contains: --High
- Move to Folder: Cert/High
```

### Additional sources
- The US Cert national advisory:
  - https://www.kb.cert.org/vuls/
- Cloud vendors:
  - https://cloud.google.com/compute/docs/security-bulletins
  - https://www.microsoft.com/en-us/msrc/technical-security-notifications?rtc=1
  - https://aws.amazon.com/security/security-bulletins/
  - https://www.alibabacloud.com/help/product/35474.htm
- SAP software:
  - https://wiki.scn.sap.com/wiki/display/PSR/The+Official+SAP+Product+Security+Response+Space

## Maintenance Patches/Upgrades
OS / Cloud suppliers and Software vendors will regularly release maintenance
patches, these should be reviewed and planned. These are not usually required
immediately unless they are the only source of a fix. At bare minimum this
should be done one a year under a change process. Enabling automatic security
updates should be implemented.

## Weekly Vulnerability check
At the weekly meeting a patch review should be done. The Duty manager (see
roles above) for that week is responsible for ensuring that necessary
vulnerabilities check is performed:

1. review releases of vulnerable patches and upcoming maintenance requirements
2. scan all sources for vulnerabilities
   1. Emails from VAS subscriptions
   2. Emails from GKE clusters notification or in GCP console
   3. Slack **#mc_devsecops_cicd_notifications** channel notifications from
      Trivy scans or in Trivy console
   4. Sort patches into high, medium low and N/A in outlook (using filters as
      the example above)
      1. use outlook category colours to mark out:
         - Red for Required
         - Green for N/A
         - Yellow for follow-up
   5. Dependencies notifications in [github](https://github.tools.sap/mce/cloud-compliance/network/dependencies)
   <!-- 6. **TBC** GCP container registry images scanning -->
3. Take a screenshot for evidence purposes and add it to the Teams patch
   evidence folder(**link TBA**)
4. Use table above to create relevant zenhub tasks
5. Check if base images update in gcr are needed in all environments vs the artifactory one:

| **Artifactory** | **gcr** |
|-----------------|---------|
| [Python](https://int.repositories.cloud.sap/artifactory/securityapprovedbaseimages/python/) | <ul><li>eu.gcr.io/sap-mcsec-inspec-prod/securityapprovedbaseimages.int.repositories.cloud.sap/python</li><li>eu.gcr.io/sap-mcsec-inspec-preprod/securityapprovedbaseimages.int.repositories.cloud.sap/python</li><li>eu.gcr.io/sap-mcsec-compliance-dev/securityapprovedbaseimages.int.repositories.cloud.sap/python</li></ul> |

6. IAM Review of accounts on Production for ECK and GCP. Review IAM on ECK and GCP Production services on a weekly basis, and create tickets for ECK/GCP UAM admins to review roles and accounts as necessary. 
7. Once a month check if keys rotation is needed. Any items that require changes to be addressed are reported at next weekly meeting.

## Implementation
Using Zenhub ticketing system, there are the following levels of priority that
dictate the time frame in which the tickets should be implemented.

| **Priotity** | **Resolution time** |
|--------------|---------------------|
| Low/lowest | To be done once bandwidth permits|
| Medium | Aim to be done within a month |
| High | Aim to be done within two weeks |
| Very High | Aim to be done within 5 days |

## Very High Patches
On the event of receiving an email with a very high patch rating, members of the
devsecops team will be notified immediately. A rule has to be configured on the
shared inbox that checks if the new email contains a very high topic, if it does
then the email has to be sent to each member of the ops team immediately. When
the email is received the ops team should convene as soon as possible and
investigate whether or not the patch is applicable. If the patch is applicable
then the highest priority ticket should be created and should be addressed
within 5 days.

## Monthly Keys rotation
As part of the HS security controls GCP Keys need to be rotated once a month. The
duty manager should check for any preventative controls notifications email and
create a ticket to rotate the keys in preprod, prod and cicd deployments.

## Base image update
As currently trying to build directly from the approved artifactory image is not
working, in order to update the python base image the team member assigned to
the task should use the workaround below:

- Get base image
  - wget --no-parent -r
    https://int.repositories.cloud.sap/artifactory/securityapprovedbaseimages/python/3.10.0-slim-bullseye/
- Create tgz file
  - tar czf 3.10.0-slim-bullseye/ 3.10.0-slim-bullseye.tgz
- Import locally
  - docker import ./3.10.0-slim-bullseye.tgz
    securityapprovedbaseimages.int.repositories.cloud.sap/python/3.10.0-slim-bullseye
- Logout from artifactory
  - docker logout securityapprovedbaseimages.int.repositories.cloud.sap
- Build, push image and test. This needs to be done for all environments prod,
  preprod and dev

## Rollback plan
Before a patch is to be executed, a rollback plan needs to be in defined. The
responsible team member in charge of working on the patch needs to create such a
plan in advance and add in the comment of the ticket.
