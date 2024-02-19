---
layout: default
title: "[ARCHIVE] Exception Process & SEP Tickets"
parent: "[ARCHIVE] L2 Minerva Runbooks"
grand_parent: "[ARCHIVE] Internal Minerva docs"
has_children: false
---

# Contents

- [Introduction](#introduction)
- [Exception Process](#exception-process)
- [Requesting an Exception](#requesting-an-exception)
- [Checking an Exception Request and SEP Ticket](#checking-an-exception-request-and-sep-ticket)

## Introduction

SAP uses so called “Detective Controls” to monitor the security configuration of ALL SAP HyperScaler Accounts (e.g. Aws, GCP, Microsoft Azure & Alibaba Cloud) towards the SAP HyperScaler Security Reference Architecture and configuration standards. These security configuration requirements are defined by SAP Global Security and published in the Security Policy Framework / Wiki. While Minerva scans for these Detective Controls, LOBs can request **Exceptions** so they are excluded from certain detective controls.

## Exception Process

The [HyperScaler Exception Process](https://wiki.wdf.sap.corp/wiki/display/SGSCDDDA/Hyperscaler+Exception+Handling+Processs) is determined by SGS and describes the criteria for exceptions. If a SNOW ticket requests information on the Exception Process, please sign post the user to the SGS [HyperScaler Exception Process](https://wiki.wdf.sap.corp/wiki/display/SGSCDDDA/Hyperscaler+Exception+Handling+Processs) and SGS [Security Exception Management Process](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=2377789217).

## Requesting an Exception

If an LOB has a SNOW ticket asking for an exception, refer them to the [Exception Process](https://wiki.wdf.sap.corp/wiki/display/SGSCDDDA/Hyperscaler+Exception+Handling+Processs).
If the LOB needs to apply for a security exception, the exception **MUST** be submitted in the [SAP Global Security(SGS) -Security Exception Management Process (SEMP)](https://wiki.wdf.sap.corp/wiki/x/IS_6jQ)[.](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=2377789217)

[Exception Request](https://securityjira.wdf.sap.corp/login.jsp?permissionViolation=true&os_destination=/secure/CreateIssue!default.jspa?pid=16607&issuetype=10000&priority=3){: .btn .btn-purple .mx-auto }

## Checking an Exception Request and SEP Ticket

If a user is asking about an existing exception request they have put in, they should have an SEP ticket reference. This will normally have a format of SEP-(Number) e.g. _SEP-000_. If the SEP reference is not in the SNOW ticket, please ask the user for it.

To check if a user has a valid SEP exception ticket, please log in to the [Security Jira](https://securityjira.wdf.sap.corp/secure/Dashboard.jspa) and enter the SEP reference in to the search box in the upper right corner.

 <p align="center">
      <img width="" height="" align="center" src="/assets/docs-images/runbooks/search_exception.png">
 </p>

If a user does not have a ticket but feels they need an Exception, refer to [Requesting an Exception](#requesting-an-exception).
