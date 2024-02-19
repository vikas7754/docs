---
layout: default
title: Prisma Public Cloud End User Guide
parent: Policies and Exception Handling
grand_parent: Prisma Ops
has_children: true
---

# Prisma Public Cloud End User Guide

```
Status RELEASED
```

```
Document owner Herre, Thorsten
```

```
Document substitute Schippers, Markus
```

```
Version^6
```

```
Last Modified 27.04.
```

## Table of contents

```
Definitions
1.0 Onboarding new account & user request
2.0 How to Login
3.0 How to navigate through Prisma Public Cloud
3.1 Dashboard: Central overview of scan results and resources
3.2 Investigate: Create your own security queries
3.3 Policies: Overview of all implemented policies
3.4 Compliance: Show implemented security reports
3.5 Alerts: Overview of all security findings
4.0 How you are supposed to use the tool
5.0 Prisma Public Cloud FAQ
```

## Definitions

```
Query
```

```
The Query Language of Prisma Public Cloud is a powerful and flexible tool that helps you gain
security and operational insights about your deployments in public cloud environments. You can use
RQL to perform configuration checks on resources deployed on different cloud platforms and to gain
visibility and insights into user and network events. (for further information see: https://docs.
paloaltonetworks.com/redlock/redlock-rql-reference/rql-reference/rql)
```

```
Policy
```

```
The Policy is the actual security check. It is based on a specific query and contains additional
information such as remediation steps and a short description. Prisma differentiates between different
policy types:
```

```
Config
Audit Event
Anomaly
```

```
The exception handling process and the policy management process do apply for all policy types.
```

```
Further information on anomaly policies can be found here, as their query can not be inspected inside
the Prisma tool:
https://docs.paloaltonetworks.com/prisma/prisma-cloud/prisma-cloud-admin/prisma-cloud-policies
/anomaly-policies
```

```
(Compliance) Standard
```

```
A (Complaince) Standard represents a set of policies.
```

```
Related Documents and Links
```

```
Alibaba Cloud Hardening
Procedure
Amazon Web Services
Hardening Procedure
Google Cloud Platform
Hardening Procedure
Microsoft Azure Hardening
Procedure
```

```
Alert Rule
```

```
The Alert Rule defines which Policies or Standard is assigned to which hyperscaler accounts. Based
on this assignment the alerts are generated in the Prisma tool.
```

```
Resource
```

```
Resource is used equivalent to asset in Prisma Public Cloud. In the hyperscaler context, a resource
includes VMs, storage buckets, loadbalancers, ...
```

## 1.0 Onboarding new account & user request

Your AWS, GCP or MS Azure account/project/subscription is per default monitored by Prisma Public
Cloud. To get access to the data, request an user for Prisma Public Cloud via the Hyperscaler JIRA (https:/
/jira.multicloud.int.sap/plugins/servlet/desk/portal/2).

## 2.0 How to Login

## 3.0 How to navigate through Prisma Public Cloud

After you logged in to Prisma Public Cloud you will find this navigation bar in the top-left corner of your
screen. This bar is used to navigate through the different features of the tool.

The 3 most important ones for you are circled in red:

```
The Dashboard section is used to get an overview of your hyperscaler resources and their
status
With the Investigate tab specific queries can be build to search for detailed events
In the Alerts section, all of the unresolved alerts are shown
```

For further information, refer to the dedicated sections below.

### 3.1 Dashboard: Central overview of scan results and resources

The Dashboard screen is used to get an overview of the resources of your hyperscaler accounts and
their status (Pass or Fail). Additionally the resources are structured into several categories.

```
If you click on the number in the 'TOTAL' or 'PASS' column, you will be redirected to the Investig
ate screen. This screen lists all resource names based on a specified query.
If you click on the number in the 'FAIL' column, you will be redirected to the Alerts screen. This
screen lists the names of the policies which are violated.
The sidebar on the left side can be fully customized wit individual filters. You can save these
filters if you need to use them again later.
```

### 3.2 Investigate: Create your own security queries

```
After you have requested a user and the onboarding is finished, you can login to PrismaCloud
via SSO using the following URL:
```

```
http://prisma.tools.sap
```

The Investigate feature can be used to build queries, which search for specific configurations of

hyperscaler resources.

```
Every policy is based on such a query.
You can use this section to build individual queries for your use case.
With the button on the right, you can download your results in a csv file
```

### 3.3 Policies: Overview of all implemented policies

The Policies screen shows all policies which are implemented in Prisma Public Cloud.

```
This feature is helpful, if you want to have any further details regarding a policy.
Just click on a policy, and you will see the query behind that policy and some
remediation steps for fixing.
Your hyperscaler accounts will be scanned based on a subset of policies. This subset is defined
by SAP Global Security.
```

### 3.4 Compliance: Show implemented security reports

The Compliance feature provides different compliance standards as ISO 27001 or CIS benchmarks, and
rates your accounts based on the implemented policies.

```
A compliance standard is a set of policies.
These compliance standards are not complete. What is displayed is only a estimation of Prisma
Public Cloud.
As on the Dashboard you see the 'TOTAL' assets divided in 'PASS' and 'FAIL'.
The sidebar on the left side can be fully customized wit individual filters. You can save these
filters if you need to use them again later.
The SAP standards implemented by SAP Global Security are the most important ones, because
these are the
These standards are based on the SAP Security Procedures: SAP Security Policy
Framework
```

### 3.5 Alerts: Overview of all security findings

#### 1.

#### 2.

#### 3.

```
a.
b.
c.
```

```
4.
```

```
a.
```

```
i.
ii.
iii.
b.
```

```
5.
```

#### 1.

The Alerts section is the most important section for you. The alerts for your hyperscaler accounts are
listed here. They are rated LOW, MEDIUM or HIGH based on the alert rules defined by SAP Global

Security

```
The severity is set based on the SAP Security Procedures (see: SAP Security Policy Framework)
The list of alerts provides an overview of which policies are violated and how severe the
violation is.
The sidebar on the left side can be fully customized wit individual filters. You can save these
filters if you need to use them again later.
By clicking on an entry of the list the following screen will show up:
```

```
On this page, a short description of the policy and the remediation steps are is provided
You can see a list on the bottom, which shows the affected resources, their related hyperscaler
accounts and regions
Based on this information, you should be able to fix the alert
In case you need further information please refer to the SAP Security Procedures for
AWS, GCP and Azure (see: SAP Security Policy Framework) or to the official Prisma
Public Cloud documentation (see: https://docs.paloaltonetworks.com/redlock)
```

## 4.0 How you are supposed to use the tool

The purpose of Prisma Public Cloud is to monitor your hyperscaler accounts and reveal security relevant
misconfiguration. A typical practice would be:

```
Login to Prisma Public Cloud
Navigate to the Alert section
Sort the list based on the severity
High rated alerts should be fixed within 30 days.
Medium rated alerts should be fixed within 90 days.
Low rated alerts are an optional recommendation by SAP Global Security with no
predefined fixing timeline.
To start the remediation of an alert just click on it, and a new screen shows up (see
chapter 3.5, second screenshot)
Now you should see additional information regarding the alert (description, remediation
steps, resources)
The description provides some more information around the policy
The remediation steps describe the actions to be done, to mitigate the alert
In the list on the bottom of the page, all affected resources are displayed
The easiest way to mitigate an alert is to follow the remediation steps provided by
Prisma Public Cloud
Repeat step 4 for all High and Medium findings
```

Repeat this procedure at least once every 2 weeks.

For the initial assessment please use the "All Time" filter in the sidebar.

## 5.0 Prisma Public Cloud FAQ

```
Do I have to pay for Prisma Public Cloud?
```

```
For any further information, please refer to the education video: https://video.sap.com/media/t
/1_ep2jazyl
```

#### 1.

```
a.
```

2.

```
a.
```

#### 3.

```
a.
```

4.  a.

5.  a.

```
No, Prisma Public Cloud is paid for by the SAP Global Security and the SAP Hyperscaler
Operations team.
How is the data transmitted to Prisma Public Cloud & what is the impact on my
resources?
Prisma Public Cloud is a SaaS solution, which pulls the configuration metadata from
the API. This means aswell, that Prisma Public Cloud does not consume any resources
in your hyperscaler accounts.
How often is the data pulled?
The data gets pulled multiple times per day. The requests are hereby distributed in a
way that the limitations of the hyperscaler API are not reached.
Is it possible to implement my own policies and reports?
Yes it is possible, but policy configuration is managed by SAP Global Security based
on the SAP Security Framework (SAP Security Policy Framework)
Do I have to consider any data protection requirements?
A Master Data Protection Agreement (MDPA) is signed by SAP Global Security.
```

This is a offline tool, your data stays locally and is not send to any server!
Feedback & Bug Reports
