---
layout: default
title: "[ARCHIVE] Policy Management"
nav_order: 2
parent: "[ARCHIVE] Exception Process"
grand_parent: ARCHIVED
has_children: false
---
# [ARCHIVE] Policy Management
```
Status RELEASED
Document owner Herre, Thorsten
Document substitute Erler, Andre
Version^28
Last Modified 16.04.
```
# Table of Contents

1. Policy Review & Maintenance
2. Policy Change Request
   2.1. Difference between Policy Exception handling and Policy Change Process
   2.2. Change request for HIGH polices
   2.3. Change request for LOW and MEDIUM policies
3. Custom SAP Prisma Policies

## 1. Policy Review & Maintenance

```
The following chapter uses Prisma specific terms like 'Standard', 'Policy' and 'Alert Rule'. Please refer to
the Prisma Public Cloud End User Guide for the explanation of these terms in the Definitions section.
```
```
Policy reviews, policy updates and policy maintenance are done by SGS Security Architecture team the
following way:
```
```
Policies changes or new custom policies will run through different Standards in Prisma:
SAP Global Security Research Standard
```
```
This Standard will be used for special policy development and research by
SGS.
This Standard has it's own Alert Rule, which only includes the 3 hyperscaler
accounts owned by SGS Defensive Architecture.
The Alerts of this Standard cannot be seen by any LoB, but only the SGS
Defensive Architecture team.
This Standard is not used for the SCD weekly reporting.
SAP Global Security Test Standard
This Standard will be used to test Policy Changes or new Custom Policies
across all Hyperscalers.
All Policies that are added to this Standard will get the "[TEST]" Prefix.
```
```
e.g. [TEST] GCP IAM service account with owner/editor privileges.
The Test Standard is applied to all SAP hyperscaler accounts.
Therefore, the new TEST Standard will get its own Alert Rule: SGS Test Alert
Rule.
```
```
This also means that every LoB sees the alerts produced by this
Standard.
These alerts will be marked with the [TEST] Policyprefix and it is
highly appreciated to provide feedback to SGS.
This Standard will not be included in the SCD weekly reporting.
Alerts produced by this Standard do not need to be fixed by the LoB.
SAP Global Security Hyperscaler Productive Standards:
```
```
SAP Global Security AWS Standard
SAP Global Security Azure Standard
SAP Global Security GCP Standard
```
```
These 3 Standards are the foundation for the alerts in Prisma. Every
LoB must apply to the policies within these Standards.
Each Standard has it's own Alert Rule.
This Standard consists of a subset of all policies inside the Prisma
tool. This subset represents the important and necessary policies
from a security point of view including default and custom policies.
These 3 Standards must be used for the SCD weekly reporting.
Alerts of this Standard must be fixed by the LoB.
```
```
Policy Changes include:
```
```
Related Documents and Links
```
```
no related documents
```

#### 2.

#### 4.

Activation or deactivation of policies
Changes to the query of a policy
Changes to the severity of a policy
Creation or deletion of policies
```
```
Approach:
```
```
PHASE 1: When a new custom policy gets created or an existing policy needs to be
adjusted, this policy will be added to the SAP Global Security Research Standard.
```
```
The policy will be tested and validated until the alert shows exactly what it is
supposed to.
PHASE 2: If the policy is validated, it will be moved from the Research Standard to the
Test Standard.
The Test Standard ensures that the policy works if applied to all SAP
hyperscaler accounts.
A Policy will remain in the Test Standard for 1 month.
This month can be used by the LoB to provide feedback to SGS.
At the end of the month, the policy can be moved back to the Research
Standard, if further adjustments are necessary.
PHASE 3: After being validated in the Test Standard, the policy can be moved to the
respective productive Standard within the next Prisma Update Cycle.
```
```
The Prisma Update Cycle is 1 month.
This includes updates from SGS side or any requested policy changes by the LoB.
Incomming requests by the LoB are firstly reviewed by SGS, and need to be
confirmed to be processed further.
All updates are collected in a special JIRA issue in the "Prisma - Hyperscaler Security
(REDROLL)" project.
This JIRA issue is named as follows: "Prisma Policy Changes [Month]"
All Prisma policy changes are documented as comments in this issue.
After 1 month, the issue will be closed and a new issue will be created for the
next month.
In the third week, the Hyperscaler team is informed about the changes, to
enable communication of changes to the LoBs.
After the communication of the changes has happened, the policies are updated.
```
## 2. Policy Change Request

Prisma policies are in general aligned with the SAP Security standards and security procedure wikis for
the various Hyperscalers, which fits most corporate or cloud use cases within SAP. The Global Security
Team ensures that the policies work as intended and reflect our security rules and criticality ratings. In
case the per default delivered PRISMA policies by the vendor Palo Alto Network do not meet these
requirements, we may customize, extend, change the rating or even deactivate the policy in the tool.
In case the SAP LoB’s or Cloud units working with Prisma detect that the policies do not work as
intended or need to be adjusted to reflect additional SAP business cases to prevent broad false positives,
we have defined a change request process to allow such requests targeting either Global Security or
being forwarded to the vendor Palo Alto for general fixing.
SAP global Security has for that reason a dedicated SecJira PRISMA Project created to collect these
requests (jira issues). The vendor Palo Alto Network has also access to this Jira to work on those feature
requests or policy change requests.

### 2.1. Difference between Policy Exception handling and Policy

### Change Process

It is important the realize which process needs to be used for which kind of Prisma policy issue or
request. The following definition will give guidance to the teams when to trigger the Exception handling
process outlined in the corresponding wiki page and when to use the overall policy change request
process as defined in this document.

The Prisma Exception Handling Process is used if:

```
You don’t want to change the actual Prisma Policy/Check because it works as intended.
You want instead to exclude or ignore it in the Prisma alerting only for your accounts / account
group.
You think the policy and corresponding security configuration (therefore Security Procedure Wiki
requirement) is not applicable for your business
You do not want to request an policy exception for the whole SAP Company.
```
The Prisma Policy Change Request is triggered if:

```
You think the Prisma Policy is not working properly; does provide wrong results;
You need to change the policy for the whole company to reflect certain SAP specific conditions
and exclusions
You need a completely new check/policy that is not existing yet
You want to delete the whole policy for the company SAP or at least change the policy rating.
```

### 2.2. Change request for HIGH polices

In case the affected Prisma policy is rated HIGH in the Prisma tool, the following steps need to be
applied:

```
Use the feedback button on this wiki page to request the Prisma related policy change via email.
Please be specific which Prisma policy needs to be changed / adjusted.
The request will be assigned to SAP Global Security CAB (Change Approval Board) to decide if
this change will be implemented and does not violate corporate polices or generates additional
risks for the company. SAP Global Security may modify the change request to address this risk.
If the change is approved, the change request is assigned to the Prisma vendor to modify or
create a prisma policy
If the change is not approved, feedback & reasoning is given to the requestor.
```
### 2.3. Change request for LOW and MEDIUM policies

In case the affected Prisma policy is rated MEDIUM or LOW in the Prisma tool, the following steps need
to be applied:

```
Use the feedback button on this wiki page to request the Prisma related policy change via email.
Please be specific which Prisma policy needs to be changed / adjusted.
If the change related to change in policy rating: The request will be assigned to SAP Global
Security CAB (Change Approval Board) to decide and implement.
If the change related to change in policy behavior: The request will be assigned to Prisma
vendor directly for implementation.
```
## 3. Custom SAP Prisma Policies

SAP Global Security may change the default prisma policies/checks provided by the vendor Palo Alto
Networks if the check does not reflect the settings outlined and required by the SAP IT security standard,
the SAP Hyperscaler reference architecture or the various Hyperscaler specific security procedure. For
example the default password policy checks provided by Palo Alto Network do not reflect the password
complexity or validity settings of the SAP corporate password policy as defined in the SAP Global
Security Policy and standards. In such cases the default policies by Palo Alto are copied and modified by
SAP Global Security team. The name of the modified policy is changed by appending "SAP:" in front of
the policy title. Therefore all checks in Prisma with the syntax "SAP:<policy name>" were modified by
SAP Global security.

If a Prisma user or LoB/Cloud team thinks that those modifications are either incomplete, incorrect
according to the SAP global policies or ineffective to achieve the desired goals, the team may open a
change request as desribed in chapter 2 of this wiki page.



This is a offline tool, your data stays locally and is not send to any server!
Feedback & Bug Reports
