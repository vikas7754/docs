---
layout: default
title: "[ARCHIVE] HELP! - I have no Idea what to do"
parent: "[ARCHIVE] Minerva Docs"
nav_order: 5
grand_parent: ARCHIVED
has_children: false
---

Hi.

If you are reading this, you most likely got one of our emails about "High" or "medium" rated alarms in one of your aloud accounts.

First of all. We would like to give you the best advice someone can give you:

![help](/assets/docs-images/Weekly_Reporting_eMail_KB/help.png)

If you receive one of those emails, this is more or less a "friendly reminder" that there is some work to do. You own an account with a cloud provider. This can be with Amazon Web Services (AWS), Microsoft Azure, Google Cloud (GCP) or Alibaba. Currently the report contains only alarms with AWS, Azure and GCP. These reports GCS SRRC Hyperscaler Security team is sending out are meant for creating an awareness to have an eye on security and the policies everyone has to follow within SAP.

Cloud accounts are not like SAP datacenters. Cloud providers don't to everything for you. A cloud Account IS more or less a datacenter for you. You can scale up to one with one click - if you do your homework. But this also leaves you with the work to provide for everything. You need to do your networking, your firewalls and your security stuff all by yourself. And the reports we send out are the big sign on your screen saying "Hey, there is a problem you should fix before it turns into a disaster".

Please also have a look at the FAQ: [Frequently asked Questions](faq.md)

If you have no clue what to do, never heard of this, and don't know who to ask... Here are some first steps you should do:

## 1.) Get familiar with Minerva!

Minerva is our security and compliance scanning tool. You might have heard about "Prisma" or you already have an account, but please be aware: [Prisma is retiring!](endofprisma.md)!
It gets replaced by [Minerva](minerva.md) which allows you to perform your own scans whenever you want and need it. Instead of waiting for prisma to update after you fixed an error, you can simply perform your own scan and see if your problem got fixed.

There is a [step-by-step tutorial](minerva.md) on how to get minerva to run on your machine, but we strongly suggest to get some sort of unix machine up and running. Best would be a virtual linux machine on your own SAP hardware, but you can literally run minerva on every platform that is capable of running docker containers.

## 2.) Fixing alarms:

Please read the mail I sent you. Please Read the F.A.Q on the first page. Please read this whole page. - I get tons of emails with Questions which can easily be answered by simply reading the material provided.

Infos about the triggered alarms can be found in the [SGS Wiki](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?spaceKey=itsec&title=Multi+Cloud+Infrastructure+-+Hardening). You will need a VPN connection to access it.

Every Cloud Provider provides an excellent documentation on how their services work:

- [Alibaba Cloud Dokumentation](https://www.alibabacloud.com/help)
- [Amazon Web Services Documentation](https://docs.aws.amazon.com/index)
- [Microsot Azure Documentation](https://docs.microsoft.com/en-us/azure/)
- [Google Cloud Platform Documentation](https://cloud.google.com/docs/)

We also suggest to have an eye on the internal Cloud Services, Cloud management and operstions in SAP:

- [Hyperscaler Operations](https://jam4.sapjam.com/groups/Xq7fmuDlqMzAFsZtSI23Ih/overview_page/tyT74zxB4wlUm4bNRm8sWi)
- [Hyperscaler Security](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/S4HS1GsL3GMtO4uEPvVjn7)

### Alarm exceptions

Nobody is perfect. If you need an exception from an alarm because it was triggered by accident or can't be solved, feel free to ask for an exception from this rule. You can do this by contacting SGS. The whole process can be found by clicking on the "[Exception handling Process (VPN needed)](https://wiki.wdf.sap.corp/wiki/display/itsec/Procedure+Exception+Handling+Process)" in the main menu.

### Getting additional Help

If you still need help with your architecture, you can contact the Hyperscaler Architecture Team via Ticket:

1. [To the Servicedesk](https://sap.service-now.com/sp?id=sc_category&catalog_id=09a3ed6a1b2f80d020c8fddacd4bcb02&sys_id=705c37d31ba07850d9c921fbbb4bcb4c)
2. Click on "GCS Additional Services"
3. Select "GCS - HS - Solution Architecture and Security Consulting"

If you don't know if your Project is a part of "One Strike", select yes.

Be as detailed about your problem as possible.
