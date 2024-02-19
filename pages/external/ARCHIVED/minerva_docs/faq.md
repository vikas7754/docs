---
layout: default
title: "[ARCHIVE] Frequently asked questions"
parent: "[ARCHIVE] Minerva Docs"
nav_order: 7
grand_parent: ARCHIVED
has_children: false
---

**Q**: What are these "Your export of all open alerts" Mails about?
**A**: These mails only contain the rated "HIGH" and "Medium" Security issues. "HIGH" means every Alert in this email is a direct violation of SAP Security compliance while Medium alarms are still a thread and should be taken care of. These emails are a part of the global Security awareness and improvement project called [Secure Cloud delivery](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/dAY6wK9SYreihZJMxhow16).

**Q**: Why do I get these emails?
**A**: You get these eMails because you are listed as the owner of these accounts. If you moved to a different team or if you are not responsible for these Accounts anymore, you can always change the ownership of this account via a [Servicedesk Ticket](changeownership.md). 

**Q**: How can I get access to Prisma?
**A**: You can't anymore. [Prisma is retiring](edofprisma.md). Please switch to [Minerva](minerva.md)

**Q**: I have an alert which I can't solve because there IS no solution. The Policy needs to be changed!
**A**: Please read the "[Exception Handling Process](https://wiki.wdf.sap.corp/wiki/display/itsec/Procedure+Exception+Handling+Process)" page of SGS - They can help you with this issue. (You need a VPN connection)

**Q**: Where can I get some basic informations about security on hyperscalers in general?
**A**: On the [Hyperscaler Security](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/S4HS1GsL3GMtO4uEPvVjn7) Jam Page and the [Cloud Hardening advices](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?spaceKey=itsec&title=Multi+Cloud+Infrastructure+-+Hardening) by SGS (VPN needed).

**Q**: I do not need my account anymore. Can I just delete it?
**A**: To change the metadata (Costcenter, technical responsible, owner, etc) or to DELETE an account, please create a ticket on your Servicedesk. If you delete the account by yourself, you will still be listed as owner on our database, the account still counts as "active" and you will be charged for it.

**Q**: I already requested my accounts to be deleted. Why am I still getting these emails?
**A**: It usually takes some time to delete an account completely. However if your request of account deletion is marked as "closed", please reopen it and add "This account is still alerting in prisma, please remove this acount". - The reason why your account is still not fully closed is most likely because the last billing cycle is not completely finished and your account still cumulated some expenses before the deletion request was triggered. However. If your account was requested for deletion month ago, and you are still receiving alarms, please email the deletion ticket ID and a short note to Jan.Hook@sap.com.

**Q**: I don't have access to my account. How can I get access to it?
**A**: If you received an email about the open alerts, this means you are the owner of this account. You have full ownership and full responsibility. This means, all you have to do is open a ticket in our servicedesk and request access to the account you are responsible for.

**Q**: How do I get help in resolving my open alerts?
**A**: Every Cloud Provider has a very detailed documentation. SGS provides a detaile overview about cloud hardening, their policies and how things should be configured. GCS SRRC Hyperscaler Security also has a team of cloud architects which can help you with your infrastructure.

**Q**: I have an old alert (older than 3 month) - Is it still valid?
**A**: Yes. If you do your own scanning with Minerva and an alarm shows up, this means the alarm is not solved.

**Q**: I disabled faulty/misconfigured firewall rules, why am I still getting alerts?
**A**: Disabled firewall rules are still present and could be reactivated by accident. (Script, malicious code, etc) It's mandatory to DELETE these Rules or ALTER them to not allow 0.0.0.0/0 in the "allowed IP" ranges. 