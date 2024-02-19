---
layout: default
title: Major Incident Management
parent: Pager Duty
grand_parent: Incident Management
nav_order: 3
has_children: true
---
# Security Operations: Incident Response 

SGS Global Security Operations (also known as security incident response or SGSIR) and the Multi Cloud SecDevOps have agreed to partner together and collaborate jointly on security incident response (SIR) in hyperscalers. The two operations teams will work SIR tickets together as One Team. 

This allows HS SecDevOps to bring their cloud expertise to bear in security incidents, as well as our ability to access cloud accounts for investigation and provide context using the metadata in our Multi Cloud Database. It also helps streamline processes between the two teams and collaborate on automation procedures based on threat detection from the central Splunk SIEM environment.

## Incident Definitions
### Rating
- **P1** – Highest possible category. This is an immediate threat to SAP as a whole and needs to be taken care of ASAP. A P1 is a threat to SAP itself and can cause serious damage to SAP as a company. P1 incidents could be leaked credentials, cracked accounts with customer or confidential data or breaches which allow access to the internal network of SAP. 

- **P2** – Serious problem which needs a fast response to prevent further damage to LoBs or Customer infrastructure. P2 incidents can be cryptominers, spammers or other malicious code which runs on a compromised Instance. P2 incidents are a serious problem but don’t require to ring someone out of bed.

- **P3** – Priority 3 incidents are indicents like denial of service or distributed denial of service attacks, or abused SAP ressources with no real “breach” of security. Priority 3 incidents are a threat if they are not taken care of, but no immediate threat to SAP or the LoB. 

- **P4** – ‘Random’ attacks like ssh or RDP bruteforce attempts, port scans and other ‘preperation’ attacks.

### Priority

| Priority  | Impact  | Definition  | Initial Response Time  |
| ------------ | ------------ | ------------ | ------------ |
| P1  | Business-Critical Service Down  | A service failure. The business is at risk. Critical functions are unavailable within a revenue-impacting, production service.  | 15 Mins.  |
| P2  | Production Service Severely Impaired / Non-Production Service Down  | A partial service failure or significant degradation. Customer is able to access some, but not all business resources. Non-production instance of the service is unavailable. Bug creating significant impact to existing service.  | 1 Hour  |
| P3  | Service Partially Impaired  | Minor service impact. Non-critical functions behaving abnormally. Customer is able to access almost all business resources. Time-sensitive requirement or development question.  | 4 Hours  |
| P4  | Service Usable  | Question about features or development. Requesting access or feature enhancement. Customer is able to access all business resources.  | 8 Hours  |

### Resources Available

| No. | Resource | Website |
| --- | --- | --- |
| R1 | Hyperscaler Account Database | https://db.multicloud.int.sap/admin/ |
| R2 | Prisma | https://prisma.tools.sap |
| R3 | SAP Employee database | https://people.wdf.sap.corp |
| R4 | SGS Incident Emergency Management | https://portal.wdf.sap.corp/go/incident-reporting |

## Notifications
- Manual notification via email (DL_5FA91E5D1DFE00027E55AD91@global.corp.sap) from Slack.
- Automated Information from the hyperscaler to the given email address (Root account email with AWS accounts, service email with Google and Azure)
- Additional notifications may come in from SGS IR, SGS GSO (Global Security Operations)(via AWS Guard Duty, splunk, etc.), Attack Surface Reduction (ASR)

## On-Call: Duty Manager

### Pager Duty
Being on-call means that you are able to be contacted at any time in order to investigate and fix issues that may arise for the system you are responsible for. For example, if you are on-call for your service at PagerDuty, should any alarms be triggered for that service, you will receive a "page" (an alert on your mobile device, email, phone call, or SMS, etc.) giving you details on what is broken and how to fix it. You will be expected to take whatever actions are necessary in order to resolve the issue and return your service to a normal state. The current 24/5 duty manager has to answer, analyze and rate incoming reports. After the weekend, it\'s the duty of the next person in scheduled to go through email and look for possible open alarms.

### Incident Categorization 

#### External Incident Response
This encompasses discovered incidents on LoBs systems. The on-call manager is accountable for contacting the responsible security contact(s), informing SGS IR and/or SGS GSO, and delegating tasks to the rest of the team to see the incident resolution. 

#### Internal Incident Response
These incidents are internal insofar as the team is concerned. These are incidents, vulnerabilities or otherwise on our own systems for which the on-call manager must assign themselves or someone within the team to address the incident itself. 

### Actions for Security Incidents:
1. Rate the Incident into a P1 to P4 incident
2. Lookup the account in question, note down all relevant information:
	1. Account owner
	2. Technical Responsible Person
	3. (If available) Security contact
	4. Hyperscaler
	5. Line of Business
	6. Your rating and why
	7. Affected Ressources (Account/Landscape/Instance)
	8. If available: 
3. Further steps according to the the rating
4. Answer to the incoming Alarm email, so the Colleagues know the status.


### Coverage
On-call coverage currently rotates in 5-6 hour shifts across EU, US East and US West. This will keep all on-call personel only responsible for during the work day outages. The on call coverage has been localized to each of the timezones below. 

#### Edinburgh, London (UTC++00:00)

| UK | US East | US West |
| ------------ | ------------ | ------------ |
| 09:00-14:00 | 14:00-20:00 | 20:00-01:00 |

#### Eastern Time (US & Canada)(UTC-5:00)

| UK | US East | US West |
| ------------ | ------------ | ------------ |
| 04:00-09:00 | 09:00-15:00 | 15:00-20:00 |

#### Pacific Time (US & Canada)(UTC-8:00)

| UK | US East | US West |
| ------------ | ------------ | ------------ |
| 01:00-06:00 | 06:00-12:00 | 12:00-17:00 |

