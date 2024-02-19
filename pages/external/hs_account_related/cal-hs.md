---
layout: default
title: CAL Account vs. Hyperscaler Account - "What is this account, I never heard of it" 
parent: Hyperscaler Account Related
nav_order: 1
grand_parent: External Documentation
has_children: false
---

One Question we get asked quite often is, "I don't know anything about this account, how can I be the owner?".

If you use SAP CAL (Cloud Appliance Library) you most likely have any form of Hyperscaler Account (AWS, GCP, Azure). CAL is a webinterface which shall make it easier for you to deploy and run your Solutions in the cloud.

There are two versions of CAL: [external CAL](https://cal.sap.com), and [internal CAL](https://satint.hana.ondemand.com/console/). You most likely use the internal CAL. 

If you request a CAL account, you will also have any hyperscaler account which CAL manages. So if you get an email with lists you as Owner of a specific account which you never heard of, but you use SAP CAL - thats most likely your Hyperscaler CAL Account.

If you want to have a look whats running in your account even if CAL lists nothing active, you can request (web)console access to your account by creating a Ticket on our Servicedesk.

You can access your Account:

## AWS:

`https:// <your 12 digit account ID from your account>.signin.aws.amazon.com/console`
Like: https://000000000000.signin.aws.amazon.com/console/

## Azure:

[azure.microsoft.com](https://azure.microsoft.com/en-us/account/) - Click on "Sign in" on the top right corner. Use your SAP-Credentials (email/pasword) to log in. - On your first login you have to setup an MFA.

## GCP:

[console.cloud.google.com](https://console.cloud.google.com) - You will be forwarded to an SAP Authentication page once you entered your SAP email address.