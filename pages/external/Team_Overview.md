---
title: Team Overview
---

# Hyperscalers Security Engineering & Operations (HSEO) Overview

Contents

1. [Security Solution Overview](/external/Team_Overview#1-security-solution-overview "Security Solution Overview")

   1.1 [Orca Deployment](/external/Team_Overview#11-orca-deployment "Orca Deployment")

   1.2 [Solution Security](/external/Team_Overview#12-solution-security "Solution Security")

   1.3 [Solution Costs](/external/Team_Overview#13-solution-costs "Solution Costs")

2. [Platform](/external/Team_Overview#2-platform "Platform")

   2.1 [Side Scanning](/external/Team_Overview#21-orca-side-scanning "Side Scanning")

   2.2 [Context Aware Security Intelligence](/external/Team_Overview#22-orca-context-aware-security-intelligence "Context Aware Security Intelligence")

   2.3 [Enablement](/external/Team_Overview#23-enablement "Enablement")

   2.4 [Integrations](/external/Team_Overview#24-integrations "Integrations")

   2.5 [UI](/external/Team_Overview#25-ui "UI")

3. [Hyperscaler Compliance](/external/Team_Overview#3-hyperscaler-compliance "Hyperscaler Compliance")

   3.1 [Hyperscaler Security Compliance Scans](/external/Team_Overview#31-multicloud-security-compliance-scans "Hyperscaler Security Compliance Scans")

   3.2 [Orca Compliance Scanning](/external/Team_Overview#32-orca-compliance-scanning "Orca Compliance Scanning")

   3.3 [Accessing Previous Scans](/external/Team_Overview#33-accessing-previous-scans "Accessing Previous Scans")

4. [Automation and Customization](/external/Team_Overview#4-automation-and-customization "Automation and Customization")

   4.1 [How to get alerts ](/external/Team_Overview#41-how-to-get-alerts "How to get alerts ")

   4.2 [API Documentation](/external/Team_Overview#42-api-documentation "API Documentation")

   4.3 [API Limits](/external/Team_Overview#43-api-limits "API Limits")

5. [Implementation](/external/Team_Overview#5-implementation "Implementation")

   5.1 [Orca Ownership](/external/Team_Overview#51-orca-ownership "Orca Ownership")

   5.2 [Hyperscalers Security Engineering & Operations (HSEO) Ownership](/external/Team_Overview#52-hyperscalers-security-engineering--operations-hseo-ownership "Hyperscalers Security Engineering & Operations (HSEO) Ownership")

   5.3 [Hyperscalers Security Engineering & Operations (HSEO) Support](/external/Team_Overview#53-hyperscalers-security-engineering--operations-hseo-support "Hyperscalers Security Engineering & Operations (HSEO) Support")

6. [Access to Orca](/external/Team_Overview#6-access-to-orca "Access to Orca")

   6.1 [Account Level View Access](/external/Team_Overview#61-account-level-view-access "Account Level View Access")

   6.2 [Group Level View Access](/external/Team_Overview#62-group-level-view-access "Group Level View Access")

   6.3 [HSDB Access](/external/Team_Overview#63-hsdb-access "HSDB Access")

   6.4 [Account Maintenance](/external/Team_Overview#64-account-maintenance "Account Maintenance")

7. [Control Details](/external/Team_Overview#7-control-details "Control Details")

   7.1 [AWS Compliance Scanning Control Details](/external/Team_Overview#71-aws-compliance-scanning-control-details "AWS Compliance Scanning Control Details")

   7.2 [Azure Complinace Scanning Control Details](/external/Team_Overview#72-azure-compliance-scanning-control-details "Azure Complinace Scanning Control Details")

   7.3 [GCP Compliance Scanning Control Details](/external/Team_Overview#73-gcp-compliance-scanning-control-details "GCP Compliance Scanning Control Details")

   7.4 [AliCloud Compliance Scanning Control Details](/external/Team_Overview#74-alicloud-compliance-scanning-control-details "AliCloud Compliance Scanning Control Details")

8. [Control Validation](/external/Team_Overview#8-control-validation "Control Validation")

9. [Reporting](/external/Team_Overview#9-reporting "Reporting")

   9.1 [ISO/SOC Audit Reports](/external/Team_Overview#91-isosoc-audit-reports "ISO/SOC Audit Reports")

   9.2 [Cloud Security Office Hours](/external/Team_Overview#92-cloud-security-office-hours "Cloud Security Office Hours")

   9.3 [Hyperdash](/external/Team_Overview#93-hyperdash "Hyperdash")

10. [Exceptions](/external/Team_Overview#10-exceptions "Exceptions")

    10.1 [How to request an exception](/external/Team_Overview#101-how-to-request-an-exception "How to request an exception")

11. [Public Content](/external/Team_Overview#11-public-content "Public Content")

## 1. Security Solution Overview

> Originating from the Multicloud Security team established in 2017, the Hyperscalers Security Engineering & Operations (HSEO) provides services that develop, deploy, and run workloads on hyperscalers to all SAP's Lines of Business. From development and testing to production, we are there every step of the way to enhance their journey to public cloud. It is our mission to engineer, deliver products, and solutions to maximize SAP cloud infrastructure agility, security, and cost efficiency across AWS, Azure, GCP, and AliCloud.

> The current back-end, Orca Security, offers a zero-touch approach to cloud security that eliminates the organizational friction and performance impact associated with traditional solutions. Orca SideScanning technology delivers security visibility and coverage across your entire cloud environment, while a context engine combines workload and cloud configuration details to build a unified data model and visual map of all your assets. The Orca agentless approach and robust capability set replaces many of the point solutions previously needed to secure your cloud estate and maintain regulatory compliance now and in the future. Implementation of the tool is done at org level by creating service accounts (AWS & GCP) or in the case of Azure approval of an Enterprise App.

> [Orca Further Reading](https://orca.security/resource/literature/orca-security-solution-overview/ "Further Reading")

### 1.1 Orca Deployment

> The immediate use case that drove the initial deployment was to support resource and software Asset Management, specifically on virtual machines and containers. However, the solution also provides vulnerability scans for both. Orca also provides insight into misconfigurations in the landscape that could impact risk severity ratings including Kubernetes clusters, indicators of compromise, known malware, as well as use cases around IP address management and domain name registration.

> The scope for Orca is all public cloud accounts in SAP, similar to the Minerva compliance scans. It does not provide coverage for Converged Cloud.
> SAP cloud accounts were onboarded at the org level with scans disabled. Scans were triggered according to deployment rings in the same fashion that preventative controls were rolled out.

### 1.2 Solution Security

> During the evaluation and approval process for the purchase of the tool, this topic was extensively discussed and deemed acceptable even for PCI-DSS certification relevant systems.

> The SAP implementation of Orca has been installed in cloud accounts owned by SAP. Since the deployment is entirely within SAP cloud accounts, data never leaves SAP. The deployment, maintenance and management of the accounts is done by Orca. In this way, SAP consumes Orca as a SaaS solution while having all the data and components in SAP EMEA.

> Orcas account access read-only. There is an added capability to create, read, and delete its own Orca tagged snapshots. Orca does not have permissions to make any changes to cloud accounts/landscapes. The solution does not have access to encrypted database files. If the scans detect PII data, it flags it for attention, but masks it in the results. Once onboarded, Orca reads account meta data and creates snapshots in the region of the originating instance of endpoints that are then scanned by Orca's SaaS platform. Once the scan is completed the snapshots are deleted.

### 1.3 Solution Costs

> There are minimal costs that the LoBs are accountable for. While normally a SaaS solution, Orca for SAP is deployed in SAP-owned dedicated cloud accounts operated by the Hyperscalers Security Engineering & Operations (HSEO) . Orca will create snapshots of running compute instances and transfer that to a scanner running in the same cloud region and same provider in the HSEO cloud account. All of the scanning occurs there, with the cloud run costs incurred by the HSEO team.

> License and operating costs for 2022 are already covered through the SCD2 budget. For 2023, there will be discussions about cross-charging, but the primary targets for those are stakeholder organizations for the resulting data, such as CCIR (SISM), SAM (ALM) and SGS, not the LoBs.

## 2. Platform

### 2.1 Orca Side Scanning

> Side scanning is based on the ability to take snapshots of cloud workloads and scan the snapshots.

> Orca SideScanning is an approach that addresses the shortcomings of agent-based solutions by collecting data from the workloads’ runtime block storage without requiring agents. Orca then reconstructs the workload file system – OS, applications, and data – in a virtual read-only view, and performs a full risk analysis with zero performance impact on the workloads themselves.

> [Further Reading](https://orca.security/platform/agentless-sidescanning/ "Further Reading")

### 2.2 Orca Context Aware Security Intelligence

> Unlike solutions that simply report on the severity of each siloed security issue, Orca's multi-dimensional approach considers three crucial factors to prioritize risk:

- Severity: How severe is the underlying security issue? For example, what type of threat is it, how likely is it to be exploited, and what is the CVSS score?
- Accessibility: How easy is it for an attacker to access the asset that contains this issue? For example, is the asset public facing, or is there lateral movement risk?
- Business impact: How would the business be impacted if this asset was exploited? For example, is this asset critical to the company’s business, does it contain sensitive PII, or is it adjacent to one that does?

> [Further Reading](https://orca.security/platform/context-aware-security-intelligence/ "Further Reading")

### 2.3 Enablement

> Once you have access to Orca, further documentation can be found in their resource library [docs.orcasecurity.io](https://docs.orcasecurity.io/ "docs.orcasecurity.io")

### 2.4 Integrations

> The following is a brief summary of some of the possible integrations with Orca. A full list can be found on [orcasecurity.io/integrations](https://eu.sap.app.orcasecurity.io/integrations "orcasecurity.io/integrations")

> **Orca API**

- GraphQL
- Orca API
- Swagger

> **Ticketing**

- Azure DevOps
- Jira Cloud
- Jira Server (on-prem)
- Service Now ITSM
- Service Now SIR

> **Notifications**

- AWS SNS
- AWS SQS
- GCP Pub/Sub
- Microsoft Teams
- PagerDuty
- Slack
- Webhook

> **SIEM/SOAR**

- Amazon Security Lake
- Anecdotes
- Splunk

> **Storage**

- Azure Blob
- GCP Bucket
- S3 Buckets

### 2.5 UI

> A brief introduction on the Orca UI can be found in their documentation: [Navigating the Orca User Interface](https://docs.orcasecurity.io/docs/navigating-the-orca-user-interface "Navigating the Orca User Interface")

## 3. Hyperscaler Compliance

> Hyperscaler compliance requires coverage via a unified, purpose-built platform. Unfortunately, solutions today that are poorly integrated or agent-based deployments lead to blind spots and significant work for security and compliance teams. Relying on tools that approach compliance on a per-asset basis results in gaps in coverage, increased cybersecurity risk, organizational friction, and failed audits.

> The compliance scanning solution is designed to help report the security compliance posture of all cloud accounts within SAP. It provides a centralized reporting platform as the lowest barrier-to-entry for security compliance scanning with LoBs (Line Of Business). The scanning service has the ability to gather all the LoBs cloud accounts across all the hyperscalers and deliver compliance reports against security controls based on SGS (SAP Global Security) Hardening [guidelines](https://wiki.one.int.sap/wiki/pages/viewpage.action?pageId=1889084884 "guidelines"). LoBs then have the information to act on those reports results to make their accounts compliant. Additionally, as new accounts are added to the hyperscalers, the scanning service is able to gather for them seamlessly without manual intervention. Additionally, charts and statistical analysis are provided through HS Portal or Hyperdash for overall reporting to high management in SAP. Finally, the solution is integrated with the HS portal which allows access and visibility of the scan results to all LoBs.

### 3.1 Hyperscaler Security Compliance Scans

> [Hyperscaler Security Compliance Scanning](https://sap.sharepoint.com/sites/127076/multicloud_security_management/SitePages/Multicloud-Security-Compliance-Scanning.aspx? "Hyperscaler Security Compliance Scanning") controls are mapped one-to-one to SGS security policies for hyperscalers, and the full landscape is currently scanned with Minerva weekly for compliance.

### 3.2 Orca Compliance Scanning

> Orca compliance scans are scheduled everyday. Scan duration is largely measured by the duration it takes for Orca to create the snapshot of the target account (approximately 15 minutes). Scans are performed on a daily basis and also based on detected changes in cloud logs. The full snapshot is only performed the first time and subsequent scans are based on detected changes, which reduces overall time. The solution does not have access to encrypted database files. If the scans detect PII data, it flags it for attention, but masks it in the results.

### 3.3 Accessing Previous Scans

> Previous Minerva scan data can be found in the [HS Secure Architecture & Engineering](https://sap.sharepoint.com/teams/MCSecureArchandEngineering/Shared%20Documents/Forms/AllItems.aspx?RootFolder=%2Fteams%2FMCSecureArchandEngineering%2FShared%20Documents%2FGeneral%2FWeekly%20Minerva%20Data%20Dumps&FolderCTID=0x012000BD28024DFDAF47468E69380606887991 "HS Secure Architecture & Engineering") sharepoint.

## 4. Automation and Customization

> Orca uses a simple, yet expressive query language that offers core capabilities including advanced querying and automation. Its capabilities include:

- Query data to filter or search for assets.
- Search and investigate security issues.
- Monitoring on compliance and standards violations, and other security issues.
- Ability to define asset/issue groups and assign them to IT and DevOps teams for remediation.
- Ticketing and reporting automation.

> [Further Reading](https://orca.security/platform/cloud-security-automation-customization/ "Further Reading")

### 4.1 How to get alerts

> For general alert UI information, when you select Alerts from the Orca menu on the left pane, the Alerts page opens showing you a range of useful information about alerts.
> On the Alerts page, you can:

- [View cumulative information on alerts](https://docs.orcasecurity.io/v1/docs/alerts-page "View cumulative information on alerts")
- [Configure alert views using filters, sorting, and grouping](https://docs.orcasecurity.io/v1/docs/configuring-alert-view "Configure alert views using filters, sorting, and grouping")
- [Manage the configured views](https://docs.orcasecurity.io/v1/docs/managing-views-and-sending-reports "Manage the configured views")
- [Drill down to an individual alert and view its properties](https://docs.orcasecurity.io/v1/docs/viewing-alert-properties "Drill down to an individual alert and view its properties")

> [Further Reading](https://docs.orcasecurity.io/docs/viewing-alerts "Further Reading")

#### To list the custom controls against which the hyperscaler account is getting scanned for

- Login into Orca portal -> Navigate to the menu -> Settings -> Modules -> Alerts Settings -> All the controls under "Custom Alerts" tab are SAP specific controls developed. [SAP Custom controls](https://eu.sap.app.orcasecurity.io/modules/alert-settings)

#### To get a list of all the alerts associated with the custom controls:

- Option 1: Navigate to "SGS-Custom-Alerts" View in "Alerts" page

  - Go to the "Alerts" page in Orca portal
  - In the top-left corner, click on "Current View"
  - Choose "SGS-Custom-Alerts" from the list of available shared views

- Option 2: Sonar query (Navigate to the menu -> Discovery -> Click on 'Switch to Sonar')
  - All the custom controls have been tagged with "sap" and "sap_hyperscaler" where hyperscaler value could be 'aws', 'gcp', 'azure' or 'alicloud'
  - You can retrieve alerts for all the custom controls using "sap" label or per hyperscaler using "sap_hyperscaler" label. E.g. "sap_gcp"
  - Run following Sonar query: `Alert with Labels containing "sap"` to fetch all the alerts related to all custom controls
  - Run following Sonar query: `Alert with Labels containing "sap_hyperscaler"` to fetch all the alerts related to all hyperscaler specific custom controls

### 4.2 API Documentation

> Information on how to connect and use the HSDB API for Orca can be found [here](/external/compliance_scanning/orca/hsdb_api "here").

> Orca's API documentation can be found [here](https://docs.orcasecurity.io/docs/orca-api "here").

### 4.3 API Limits

> There are some known UI export limits. These are the current limitations from UI exports.

```json
"ui_export_limits": {
            "alerts": 75000,
            "assets": 75000,
            "compliance": 75000,
            "sonar": 75000,
            "vulnerabilities": 75000
        }
```

## 5. Implementation

> With the additional capacity to generate, read, and delete its own Orca labeled snapshots, Orcas access to accounts is read-only. Orca is not authorized to alter any cloud accounts or landscapes. After being onboarded, Orca reads cloud account meta data and creates snapshots of endpoints in the region of the initial instance, which are then scanned by Orca's SaaS platform. The snapshots are erased after the scan is finished. An average snapshot's lifecycle for scanning is about 15 minutes at a time. Scheduled scans are carried out depending on changes found in cloud logs as well as on a configurable basis (the default is every 12 hours). This enables Orca to capture fleeting assets that it might otherwise overlook.

> The Orca stack will be set up in SAP-owned cloud accounts for the SAP implementation. Orca will handle the deployment, upkeep, and administration of the stack. In this method, SAP may continue to use the Orca stack as SaaS while still having complete control over all data and components in EMEA.

### 5.1 Orca Ownership

> Orca provides software updates, manages the infrastructure of the solution and all maintenance one would expect within a SaaS solution

### 5.2 Hyperscalers Security Engineering & Operations (HSEO) Ownership

> HSEO controls the cloud accounts' general IAM as well as the scan data, user, and API access for SAP staff and stakeholder teams. The cloud account owner in HSEO is still entirely in charge of ensuring that the cloud accounts follow SAP SGS security regulations and all other operational guidelines.

### 5.3 Hyperscalers Security Engineering & Operations (HSEO) Support

> To open a ticket with the HSEO team, one can do so through Service Now.

- [GCS - SRRC - Hyperscaler Security](https://itsm.services.sap/sp?id=sc_cat_item&sys_id=142b0e5c1be17890341e11739b4bcbfb&sysparm_category=b20df7171ba07850d9c921fbbb4bcbc2&catalog_id=09a3ed6a1b2f80d020c8fddacd4bcb02 "GCS - SRRC - Hyperscaler Security")
  Services related to security in public cloud
- [GCS - Hyperscaler - Minerva](https://itsm.services.sap/sp?id=sc_cat_item&sys_id=c3a3ed7bdb52411043b853cad3961906&sysparm_category=b20df7171ba07850d9c921fbbb4bcbc2&catalog_id=09a3ed6a1b2f80d020c8fddacd4bcb02 "GCS - Hyperscaler - Minerva")
  Services related to security compliance scanning through Minerva in compliance with SGS security policies and hardening procedures and associated account onboarding, compliance reporting and dashboarding, as well as the Chef InSpec self-scan container.
- [GCS - Hyperscaler - Orca](https://itsm.services.sap/sp?id=sc_cat_item&sys_id=ada60b961bd09150341e11739b4bcb65&sysparm_category=cbe15fd61b549150341e11739b4bcb8a&catalog_id=09a3ed6a1b2f80d020c8fddacd4bcb02 "GCS - Hyperscaler - Orca")
  Services related to security compliance scanning through Orca
- [SGS - Create Security Incident](https://sap.service-now.com/sp?id=sc_cat_item&sys_id=7ff2adbd1be4c510e17a759b9b4bcbc3&sysparm_category=e15706fc0a0a0aa7007fc21e1ab70c2f "SGS - Create Security Incident")
  Submit a request to investigate a potential cyber security incident/attack. A Security Incident Record will be created to track and document progress.
- We also have our [#sap-hyperscaler-security](https://sap-multi-cloud.slack.com/archives/C0122SCP6QN "#sap-hyperscaler-security") Slack channel if you want to pop in for questions

> Further information on how to get access and/or modify ServiceNow roles can be found in the Harmonized Customer Service Management (HCSM) documents page: [User Instruction on How to Request Authorization to ServiceNow Instances](https://workzone.one.int.sap/site#workzone-home&/groups/PPE8Am1JUbihkc5Hz5ZTrV/documents/idecpIkvyRqoqZ6xrU2dme/slide_viewer "User Instruction on How to Request Authorization to ServiceNow Instances")

## 6. Access to Orca

> You can log into Orca via SSO here ([Orca Login](https://eu.sap.app.orcasecurity.io/login "Orca Login")) after requesting the Multicloud_Orca_User Cloud Access Manager (CAM) profile. More information on requesting initial CAM profile can be found here ([Initial CAM Profile](https://sap.sharepoint.com/sites/127076/multicloud_security_management/SitePages/Orca_FAQ.aspx "Initial CAM Profile")).

> For initial access to Orca, you will need to request the following automatically approved CAM profile: Multicloud_Orca_User. This profile does not provide permissions in Orca but enables you to sign into Orca via SSO. You will have to periodically request this profile to have continued access to Orca. Beginning on December 21st, 2022, once a user has signed into Orca, their permissions will be automatically provisioned and updated based on the Hyperscaler Account roles and Hyperscaler Group roles. Prior to this point, all users with only the Multicloud_Orca_User CAM profile will have blank permissions and should not be able to view any account information in Orca.

### 6.1 Account Level View Access

> The following Hyperscaler account-level roles will grant a user Viewer access to the respective account in Orca:

> Technical Responsible User, Security Officer, and Additional User. More information about Hyperscaler Accounts can be found [here](https://docs.multicloud.int.sap/infra/creator/accounts-guide/ "here").

### 6.2 Group Level View Access

> The following Hyperscaler group-level roles will grant a user Viewer access in Orca to all accounts which fall under the group:

> Administrator, Power User, Editor, and Reader. More information about Hyperscaler Groups can be found [here](https://docs.multicloud.int.sap/infra/creator/groups/mc-groups-guide/ "here").

### 6.3 HSDB Access

> A Service Now request can be filed under [GCS-Hyperscaler-Onboarding/Offboarding Hyperscaler Employee](https://itsm.services.sap/sp?id=sc_cat_item&sys_id=6824449e1b4d3c10d9c921fbbb4bcb1e "GCS-Hyperscaler-Onboarding/Offboarding Hyperscaler Employee").

### 6.4 Account Maintenance

> To have your Hyperscaler Account modified or to have it deleted you can open a Service Now ticket under [GCS-Hyperscaler-Manage/Delete Account](https://itsm.services.sap/sp?id=sc_cat_item&sys_id=b64709911bc17850341e11739b4bcb0c&sysparm_category=2bdc7f571ba07850d9c921fbbb4bcb82 "GCS-Hyperscaler-Manage/Delete Account")

> Deletions can also be processed in HSDB.

> On the Orca side, automation looks at any account listed as "DELETED" in HSDB and will offboard the account 90 days after the initial deletion date. It's worth noting that any associated alerts with the cloud account will have been dismissed as soon as the deletion was processed in HSDB.

## 7. Control Details

### [7.1 AWS Compliance Scanning Control Details](/external/compliance_scanning/orca_aws_controls "7.1 AWS Compliance Scanning Control Details")

> Further Reading: [SAP Global Security (SGS) AWS - Hardening Guidelines](https://wiki.one.int.sap/wiki/display/itsec/Amazon+Web+Service+-+Hardening "SAP Global Security (SGS) AWS - Hardening Guidelines")

### [7.2 Azure Compliance Scanning Control Details](/external/compliance_scanning/orca_azure_controls "7.2 Azure Compliance Scanning Control Details")

> Further Reading: [SAP Global Security (SGS) Azure - Hardening Guidelines](https://wiki.one.int.sap/wiki/display/itsec/Microsoft+Azure+-+Hardening "SAP Global Security (SGS) Azure - Hardening Guidelines")

### [7.3 GCP Compliance Scanning Control Details](/external/compliance_scanning/orca_gcp_controls "7.3 GCP Compliance Scanning Control Details")

> Further Reading: [SAP Global Security (SGS) GCP - Hardening Guidelines](https://wiki.one.int.sap/wiki/display/itsec/Google+Cloud+-+Hardening "SAP Global Security (SGS) GCP - Hardening Guidelines")

### [7.4 AliCloud Compliance Scanning Control Details](/external/compliance_scanning/orca_alicloud_controls "7.4 AliCloud Compliance Scanning Control Details")

> Further Reading: [SAP Global Security (SGS) AliCloud - Hardening Guidelines](https://wiki.one.int.sap/wiki/display/itsec/Alibaba+Cloud+-+Hardening "SAP Global Security (SGS) AliCloud - Hardening Guidelines")

## 8. Control Validation

> The tool custodians (GCS SRRC Hyperscalers Security Engineering & Operations team) followed a rigorous methodology to develop full control parity between Minerva and Orca. All new control development was done in Orca for 6 months prior to the transition. Key controls were tested and validated to identify any large discrepancies in data. When gaps were identified, they were investigated, and either the query was updated or the new findings were documented.

> More information can be found in our [Orca vs. Minerva Controls](/external/compliance_scanning/orca_vs_minerva_controls "Orca vs. Minerva Controls") document.

## 9. Reporting

### 9.1 ISO/SOC Audit Reports

> A SOC report is an attestation by an independent auditor or Certified Public Accountant (CPA) firm that provides an overview of the compliance controls put in place by your vendors in regard to your outsourced functions.

> The risks of ignoring SOC reporting or ISO compliance can be detrimental to your business. When it comes to finance, data security and overall operations, you need to be able to outsource with confidence. Introducing vendors to your business inherently adds risk and SOC reports are one way of mitigating potential gaps.

> To make things more organized, accessible and secure, we have migrated our Security compliance reports repository to our Team Sharepoint. In order to obtain the Cloud Service Provider security compliance reports, please use the following link: [Confidential Documents](https://sap.sharepoint.com/teams/MC-DevSecOps/Shared%20Documents/Forms/AllItems.aspx?id=%2Fteams%2FMC%2DDevSecOps%2FShared%20Documents%2FCloud%20Service%20Provider%20Certifications&viewid=e313cb5f%2Da2de%2D4394%2D81b0%2Df3b6e8a42020 "Confidential Documents")

> A ticket to access this folder can be filed under [GCS - SRRC - Hyperscaler Security](https://itsm.services.sap/sp?id=sc_cat_item&sys_id=142b0e5c1be17890341e11739b4bcbfb&sysparm_category=b20df7171ba07850d9c921fbbb4bcbc2&catalog_id=09a3ed6a1b2f80d020c8fddacd4bcb02 "GCS - SRRC - Hyperscaler Security").

### 9.2 Cloud Security Office Hours

> Cloud Security Office Hours is a community of LoBs and SAP Security teams for cloud security related topics. The meetings occur weekly on Tuesdays at 14:00 GMT. The meetings are interactive and action oriented. The goal is to work collaboratively for a more secure SAP using surfaced vulnerabilities information for remediation next steps.
> The target audience: BISO, security engineers, Security Officers, and Technical Responsible Users

> The Cloud Security Office Hours DL has been made public and the meeting will be refreshed periodically to update the attendee list.

> For your convenience, here's a quick join directly: [Join DL Cloud Security Office Hours Distro (External)](https://profiles.wdf.sap.corp/groups/639b3e017b962d029ab9a580/users "Join DL Cloud Security Office Hours Distro (External)")

### 9.3 Hyperdash

> Project Hyperdash is a single-pane solution that streamlines the management of accounts across all Hyperscalers by consolidating data from multiple sources. It offers a centralized view of cost, compliance, and health of cloud infrastructure, enabling users to cut costs, maintain regulatory adherence, and verify cloud environments. Hyperdash promotes the use of existing SAP cloud management and cost optimization services by allowing users to access appropriate tools. Key features include a unified dashboard, cost management, compliance monitoring, vulnerability assessment, and competitive services. Hyperdash is divided into four main dashboards, each focusing on a specific topic. Two executive dashboards are available for specific users, providing a breakdown of cost by Hyperscalers, business units, and competitive services.

> **URL**: [https://pages.github.tools.sap/SAE/hyperdash/](https://pages.github.tools.sap/SAE/hyperdash/ "https://pages.github.tools.sap/SAE/hyperdash/")

#### 9.3.1 Hyperscaler Security Office Hours

> Cloud Security Office Hours is a community of LoBs and SAP Security teams for cloud security related topics.

> [This page](https://hyperdash.multicloud.int.sap/office-hours "This page") displays the data, used by this community to report on the alerts produced by Orca for compliance to SGS standards.

> While the graphs show a summary, a full data download can be done by clicking the **Data Downloads** button at the top.

> **URL**: [https://hyperdash.multicloud.int.sap/office-hours](https://hyperdash.multicloud.int.sap/office-hours "https://hyperdash.multicloud.int.sap/office-hours")

#### 9.3.2 SGS Policy Compliance Dashboard

> The aim of the [compliance page](https://hyperdash.multicloud.int.sap/compliance "compliance page") is to give you an overview of your alignment to SGS policies affecting hyperscaler resources.

> While the graphs show a summary, a full data download can be done by clicking the **Data Downloads** button at the top.

> **URL**: [https://hyperdash.multicloud.int.sap/compliance](https://hyperdash.multicloud.int.sap/compliance "https://hyperdash.multicloud.int.sap/compliance")

#### 9.3.3 Access

> Access controls in Hyperdash are managed through the HSDB, which automatically updates permissions based on your roles within accounts and groups on HSDB.

#### 9.3.4 Bug Reporting

> To report a bug in Hyperdash, you have two options:

> **GitHub Issue**: You can open an issue on the Hyperdash GitHub repository. You can do this by visiting the Hyperdash GitHub repository [here](https://github.tools.sap/SAE/hyperdash/issues "here") and creating a new issue with details about the bug you encountered. This is a formal way to report issues and allows for structured tracking and resolution.

> **Teams Channel**: Additionally, you can also post a message in the dedicated Teams channel for Hyperdash. You can access this channel [here](https://teams.microsoft.com/dl/launcher/launcher?url=%2F_%23%2Fl%2Fchannel%2F19%3AdyN0YYXe3GeoWVJm0kr63DBW-fUDlkVzf9MB6waAq6Q1%40thread.tacv2%2FGeneral%3FgroupId%3D642bb392-f459-4c25-97ee-ca393921f717%26tenantId%3D42f7676c-f455-423c-82f6-dc2d99791af7&type=channel&deeplinkId=4e5f0ab1-ea45-405a-b9aa-4450d0c98dbb&directDl=true&msLaunch=true&enableMobilePage=true&suppressPrompt=true "here"). This can be a more informal way to report issues or discuss them with the Hyperdash team and the community.

#### 9.3.5 Data Downloads and Backend

> With regards to how Hyperdash presents data, Hyperdash is pulling the data directly from the Orca APIs.

- There are a number of services run every day which refresh the data we hold.
- One of these services specifically reaches out directly to the Orca API endpoint for ‘Custom Rules’ which are the custom SGS policies which have been implemented in Orca.
- Each of these are then added to the asset for which the alert is present.
- Finally, when presenting the data, a query is run for each of the assets in a data lake with an SGS alert on it, then are batched into each level (eg. L4, L5, L6, L7, account, region, asset type) and then added to the report.
- (Additional Info) L4-L7 data can be retrieved from HSDB (https://portal.multicloud.int.sap/accounts)

## 10. Exceptions

> Exceptions are applied at the account level and all assets within the account are excluded for the policy in scope.

> Should such an exception be granted, the Hyperscalers Security Engineering & Operations (HSEO) will exclude the cloud accounts in scope of that exception from scanning. For Hyperscaler Security Exceptions, the usual security exception process applies, but is not yet required at this time, pending final confirmation from the SGS ASR team for vulnerability management, as well as container and K8s security, for which the evaluation is not yet completed. For vulnerability management with SGS ASR, which is furthest ahead and who we plan to integrate Orca data into the SGS SIEM with immediately once the scans flow, please contact Bill Vink.

> Exceptions will automatically be applied when switching from Minerva to Orca so exception requests will not need to be re-applied.

> SAP uses so called “Detective Controls” to monitor the security configuration of ALL SAP Hyperscaler Accounts (e.g. Aws, GCP, Microsoft Azure & Alibaba Cloud) towards the SAP Hyperscaler Security Reference Architecture and configuration standards. These security configuration requirements are defined by SAP Global Security and published in the Security Policy Framework / Wiki.

> The detective controls are divided by their ratings (HIGH, MEDIUM, LOW), which reflect the SAP Global Security mandatory baseline and additional requirements for critical cloud business:

- HIGH rated control = MUST / Baseline requirement in Security Wiki
- MEDIUM rated control = SHOULD requirement in Security Wiki
- LOW rated control = optional requirements in the Security wiki or even not mentioned.

> Furthermore to ensure a Secure-by-Default baseline throughout ALL SAP Hyperscaler Accounts, a policy-as-code deployment (Secure-by-Default controls) will be enforced centrally by the GCS SRRC Hyperscaler Security team. Target is, to get all SAP Hyperscaler Accounts on the same security level / denominator, independent which hyperscaler platform is used (AWS, GCP, MS Azure & Alibaba Cloud). These controls are mapped to their corresponding HIGH detective controls and act as a “preventive control” for SAP hyperscaler accounts.

> In general, Secure-by-Default Controls also known as preventive controls MUST be fulfilled by each LoB, independent if the hyperscaler scenario is considered as dev, test, “crash & burn” or as a productive hyperscaler scenario. The overall target with the enforcement of the Secure-by-Default Controls is, to setup a secure baseline across all SAP cloud environments.

> There might be critical technical or business reasons to delay the enablement of a Secure-by-Default control in a Cloud Area. In such limited cases there is the possibility to request an exception.

> This wiki defines HOW non-compliance / findings are managed between:

- the Hyperscaler Account Owners (e.g. SAP LoBs & CBGs),
- the SAP GCS SRRC Hyperscaler Security Team and SAP Global Security (SGS).

## 10.1 How to request an exception

> To request an exception for different severity levels in the Orca, you can use the following updated instructions:

### 10.1.1. High Severity (Orca Score: 8.0):

> For exceptions with a 'High' severity rating, which corresponds to an Orca score of 8.0, please follow these steps:

> Ensure that the exception request includes all necessary details:

- Account ids or HSDB group (ex. 1489138207353627 or HSDB group: ‘mcce’)
- Alert Name (ex. 2_01_aws_iam_ssh_key_rotation)

> Submit the exception through the SAP Global Security SGS [Security Exception Management Process (SEMP)](https://wiki.one.int.sap/wiki/x/IS_6jQ).

### 10.1.2. Medium or Lower Severity (Orca Score < = 5.0):

> For exceptions with a 'Medium' severity rating or any lower severity (Orca score < = 5.0), please use the following process:

> Ensure that the exception request includes all necessary details:

- Account ids or HSDB group (ex. 1489138207353627 or HSDB group: ‘mcce’)
- Alert Name (ex. 2_01_aws_iam_ssh_key_rotation)

> Submit a **Snow Ticket** to the GCS Hyperscaler Security Engineering & Operations Team. Ensure approval from either the organization’s BISO or the business unit’s L1, signifying acceptance of the risk at the business unit level. : [Snow Ticket](https://itsm.services.sap/sp?id=sc_cat_item&sys_id=ada60b961bd09150341e11739b4bcb65&sysparm_category=cbe15fd61b549150341e11739b4bcb8a)

### 10.1.3. There are certain Orca Alerts that support resource tag based exceptions, please find more information at [How to implement the tags](https://sap.sharepoint.com/sites/205584/SitePages/Hyperscaler-Exception-Handling-Process.aspx#2.3-self-tagging-exceptions-for-a-subset-of-controls)

> **Note**: These processes are applicable exclusively for Hyperscaler Custom Alerts on Orca.

## 11. Public Content

> We are aware there is high demand from our end customers for information on how SAP operates securely in public cloud. Below you can find publicly available material on public cloud security and cloud transformation:

- [Seven Ways SAP Helps Secure Technology Stacks on Public Clouds](https://www.sap.com/documents/2020/12/ced77ce9-c07d-0010-87a3-c30de2ffd8ff "Seven Ways SAP Helps Secure Technology Stacks on Public Clouds")

> **SAP Community site**:

- [Secure by default for SAP on public cloud infrastructure](https://blogs.sap.com/2020/12/28/secure-by-default-for-sap-on-public-cloud-infrastructure/ "Secure by default for SAP on public cloud infrastructure")
- [Preventative controls – using organizational policies to provide guardrails for SAP’s public cloud accounts](https://blogs.sap.com/2021/04/05/preventative-controls-using-organizational-policies-to-provide-guardrails-for-saps-public-cloud-accounts/ "Preventative controls – using organizational policies to provide guardrails for SAP’s public cloud accounts")
- [Public Cloud Infrastructure Compliance Scanning at SAP with Chef InSpec](https://blogs.sap.com/2021/04/28/public-cloud-infrastructure-compliance-scanning-at-sap-with-chef-inspec/ "Public Cloud Infrastructure Compliance Scanning at SAP with Chef InSpec")
- [Security Reporting and Analytics for Public Cloud Policy Compliance in SAP](https://blogs.sap.com/2021/09/26/security-reporting-and-analytics-for-public-cloud-policy-compliance-in-sap/ "Security Reporting and Analytics for Public Cloud Policy Compliance in SAP")
- [Hyperscaler Security Compliance Scanning: Compliance-as-Code and Operational Benefits](https://blogs.sap.com/2022/04/17/multicloud-security-compliance-scanning-compliance-as-code-and-operational-benefits/ "Hyperscaler Security Compliance Scanning: Compliance-as-Code and Operational Benefits")
