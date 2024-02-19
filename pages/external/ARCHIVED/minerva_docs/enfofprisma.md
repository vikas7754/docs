---
layout: default
title: "[ARCHIVE] Prisma is retiring on Q2/2022 (1st of April 2022)"
parent: "[ARCHIVE] Minerva Docs"
nav_order: 3
grand_parent: ARCHIVED
has_children: false
---

# Prisma is retiring

TL/DR: Prisma is retiring by 28th of February and shut down by 1st of April 2022. - Please switch to [Minerva](minerva.md)

### What happens

We are switching to [Minerva](minerva.md), a Chef Inspec based solution which allows it to be more flexible and also to provide the option for every account owner to perform own scans on one or several accounts across all major Hyperscalers currently used in SAP.
So far, Minerva is supporting: 

- Alibaba Cloud
- Amazon Web services
- Microsoft Azure
- Google Cloud Platform

## Sunset of Prisma

Prisma is still operational and our main source of monitoring. Newly created Accounts will still be onboarded and monitored. 

Starting 1st of January 2022 there will be no more new users onboarded to Prisma. Currently there will be no more new user requests accepted and the current requests will be worked on. Accounts are still onboarded, but not assigned to specific user groups.

On 28th of February 2022, Prisma will be completely replaced as source of monitoring data by Minerva. From 1st of March 2022, Prisma is officially "retired". From this point on, there will no onboardings for new accounts and Prisma will be decomissioned.

Prisma is available until 31st of March 2022. After this date, SAP does no longer maintain or operate on Prisma, and the SAP Instance of Prisma will go offline.

From 1st of March 2022, you will receive your weekly reporting emails by Minerva directly. If you want to have daily or hourly reports, you can always generate them by yourself, running your own local Minerva container.