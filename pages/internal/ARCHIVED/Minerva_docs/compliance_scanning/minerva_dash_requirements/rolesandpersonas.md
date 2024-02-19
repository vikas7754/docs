---
layout: default
title: "[ARCHIVE] Roles and Personas"
parent: "[ARCHIVE] Minerva Dashboarding Requirements"
grand_parent: "[ARCHIVE] Minerva - Compliance Scanning"
has_children: false
---

# Roles and Personas
When it comes to users for Minerva Dashboarding, we can distinguish between a large number of different organizational functions and roles, ranging from SGS leadership, compliance functions, as well as security incident response, threat detection and policy teams; to board area delegates that are not particularly technical or security experts as well as BISOs who often are both, security experts fragmented through the organization, or other functions such as Security Validation, One Strike Q-Gate Validators, or other current and future and compliance functions.

>Note: these requirements cover specifically HS Portal-based Minerva Dashboarding, and not API access to alerts or Minerva consumer container users

When you abstract the specific *purpose* of why a particular user should have access down to what that means, it currently seems to break down to just two main Personas:

1. Global Viewers
2. Account-specific Viewers

Each example of the functions in the first paragraph appear to break down to one of the two. While it is certainly true that many Global Viewers will be primarily interested in a particular board area (Board Area Delegates) or Business Unit (BISOs and L1 Global Vice Presidents and/or their COO Office), I am not convinced that therefore their access should be *restricted* to that level. There is value in allowing board areas and business units to measure themselves against each other - and with many teams in SAP Product Engineering and other board areas often dependent on Technology & Innovation platforms and infrastructure, it seems reasonable to provide also such users insight in how they look compared to others in the company.

>Note: See the Usability section in [Dashboard Views](dashboardviews.md) for handling the board-area or LoB specific use case

## Global Viewers
>*Quis custodiet ipsos custodes?*

Global Viewers get to see the entire dataset, aggregated down to the organizational level that is practical. I see no immediate need for reporting for these users to go down to a *named individual level*, even if use cases can be conceived for individual account level, which may also facilitate potential data privacy issues and make the size of aggregated data sets more manageable. Note that account metadata access is already available via the Accounts section in HS Portal. Their role in the organization is to watch and follow up on those responsible for individual cloud accounts. Account Owners are accountable for the compliance status of the cloud accounts in their name (and are typically not the admins actually responsible for remediation), and therefore need to make remediation a priority. 

They are overseen by the Global Viewers performing a compliance or security role of some kind - whether as board area delegate, BISO, or those with cross-board area responsibilities, such as SGS or various compliance roles in the company.

>Arguably, Global Viewers and Account-specific Viewers in the LoBs also oversee us and SGS Defensive Architecture, through their follow-up and review of alert scans in their landscapes

## Account-specific Viewers
Account-specific Viewers are viewers that are in some way associated with specific cloud accounts, either as Account Owners, Security Officers and Infrastructure Owners, as well as potentially Security Contacts (including DLs?) and Cost Center Owners. That is, they are somehow named directly in an HSDB field for any particular cloud accounts.

The number of cloud accounts monitored by a particular individual varies widely, from just one or a handful, to potentially thousands.

Data queries for these users should be filtered down to the cloud accounts they are responsible for.
>Note: I would not consider Account-specific Views to be part of MVP release but for v1 release scheduled for end of Q2/22.

### Should Account-specific Viewers also see the Global View - additional functionality?
My feeling is that the Account-specific Viewer is an *additional* role or feature, rather than an either/or exclusive one. Similarly to board area delegates and BISOs being able to measure themselves against each other - would that not also go for Account-specific Viewers? Especially since the data exports already provide the data in raw form to anyone on the Office Hours distribution list.

Therefore, ideally Global Views are the default - with additional access granted to Account-specific Viewers for filtered views. 

Ideally, Account-specific Viewers should be able to drill down to individual accounts. Arguably, so may eventually certain Global Viewers.

## Question: Is there a real difference between a Global Viewer and Account-specific Viewer
There are other ways to consider the roles and personas. Perhaps there is no real difference in data access - but the abillity to query individual accounts is simply a feature all users should have? 

That is, is this mostly a question of usability/UX and what a particular user might be most interested in? That is, *user preference*?

## Future Additions?
As elsewhere in these requirements, any header with a ? indicates an aspirational goal, but may also be a feature that is never implemented once discussed. They are not requirements (necessarily) for either MVP or v1 release, or even 2022.

### "Show me this particular account" Users (as subset of Global Viewers)?
As is the case during security incident response already, there is often a need to check the particular security and compliance posture of a particular account. It is therefore good to plan for an ad-hoc query capability that returns the alerts data for only that particular cloud account.

### "Scan Now" Users?
There has been discussion before for users to potentially be able to kick off an ad-hoc scan based on their role in the HSDB from the HS Portal, rather than through the consumer container. Demand for such a feature has primarily come from colleagues whose role in the organization is more in the oversight area, and tend to not have or easily get access to an API key/secret for a cloud account - or may not even be technical enough to know how to run a docker container command line.

### LoB requested personas (Office Hours feedback, etc.)?
After the release of the MVP (and potentially before that in early previews) it is likely that new use cases emerge directly from LoBs, board area delegates or BISOs. It would be good to have a process to collect feature requests (simply via github?).
