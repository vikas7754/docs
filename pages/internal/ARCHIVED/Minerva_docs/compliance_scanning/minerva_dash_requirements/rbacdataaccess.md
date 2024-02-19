---
layout: default
title: "[ARCHIVE] RBAC and Data Access"
parent: "[ARCHIVE] Minerva Dashboarding Requirements"
grand_parent: "[ARCHIVE] Minerva - Compliance Scanning"
has_children: false
---

# RBAC and Data Access -> HS API Mediation

While this requirement is ordered higher up in the list, for context it is good to also read [HS Portal Integration](hsportalintegration.md) to get a better sense of what is meant by "HS API mediation".

## RBAC and HSDB
In order to provide access to Minerva Dashboarding, a user should have a role within the HSDB, either as a Global Viewer or Account-Specific Viewer as described in [Roles and Personas](rolesandpersonas.md). For Account-specific Viewers their access should may (or perhaps even should) include Global Views, but have the ability to see analytics based on their existing roles in HSDB - as already maintained through the [CALM processes](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/L1SDpSx7aeAY5uOFshC2bK). 

Rather than try to replicate this in ELK, or in a separate API, mediating requests through the HS API gives us the RBAC we require that is already maintained in HSDB. And whether through the CALM processes or through existing HSDB global roles for additional new users, we do not require a separate onboarding process for Minerva Dashboarding access. With all cloud accounts already automatically onboarded to scanning, Minerva Dashboarding access should be similarly automatic - short of a process of adding new Global Viewers (check with HS Engineering - a process for this clearly already exists given our own global access, as well as SGS GSO).

## HS API Mediation
Given the ability to leverage infrastructure that already exists, and the Multi Cloud strategy for Central Multi Cloud Data Access Enablement as described in [HS Portal Integration](hsportalintegration.md), RBAC and Data Access should be mediated through the HS API, in collaboration with HS Engineering.
