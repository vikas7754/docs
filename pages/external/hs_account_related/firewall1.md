---
layout: default
title: Fixing the overly permissive Firewall rule
parent: Hyperscaler Account Related
nav_order: 3
grand_parent: External Documentation
has_children: false
---

<span style="color:red">### __*IF THE DEFAULT RULES ARE THERE, THE ALARM GETS TRIGGERED!*__</span>

The hierarchy or other rules which overrule the default rules are not *fully* considered. So please check your alarms carefully!

Alarms about remote access ports open to the internet or whole networks exposed to the internet are some of the most triggered ones.

Te remediate this alarm, you need to specify which IPs and IP Ranges are allowed to connect to these 'Admin Ports'.

First of all, you need to know which IP Addresses or IP Address Ranges you need to allow. The easiest way here is to lookup which public IP you are using and allow this range.

## Get your SAP Public IP

Getting the IP Range for your SAP VPN Endpoint (Also works on converged Cloud Servers)
Connect to SAP VPN, use the Endpoint you usually use (Walldorf, Sydney, Tel Aviv, Palo Alto, etc)

If you are on Linux or on Mac, open a console and run:

`curl -k https://ip4only.me/api/ | cut -d "," -f 2`

If you are on Windows:

Open the website "[ip4.me](https://ip4.me)" - This website will tell you which SAP Public IP Address you are using:

![ip4me.png](/assets/docs-images/Weekly_Reporting_eMail_KB/ip4me.png)

Login to the [NIP TOOL](https://nip.wdf.sap.corp), click on "Networking" in the top menu and scroll down to "Public Office Network IP Addresses"

![nip1.png](/assets/docs-images/Weekly_Reporting_eMail_KB/nip1.png)

![nip2.png](/assets/docs-images/Weekly_Reporting_eMail_KB/nip2.png)

In the overview, scroll to the right until you see "ext. CIDR" and enter the first 3 digits of your public IP:

![nip3.png](/assets/docs-images/Weekly_Reporting_eMail_KB/nip3.png)

## Getting the IP for your SAP Office

You can use the [NIP Tool](https://nip.wdf.sap.corp/) Filters to get the IP address (ranges) for the different offices. Just filter for "Country" and "Location".

## Convert to CIDR notation
The shown IP Addresses are the ones you need to allow in your Firewall Rules or security Groups, but you need the official CIDR Notation to define these ranges.

193.16.224.0/28 and 193.16.224.32/28 

This can be done by using a [subnet calculator](https://www.subnet-calculator.com/cidr.php)

Enter the first IP Address and then switch through the CIDR Netmask option until the CIDR Address Range matches.

![subcalc.png](/assets/docs-images/Weekly_Reporting_eMail_KB/subcalc.png)

## Fix Firewall Rule in GCP

Login to your GCP Console and switch to "Networking" --> VPC network -->Firewalls

![gcp-fw.png](/assets/docs-images/Weekly_Reporting_eMail_KB/gcp-fw.png)

On the next screen click the Firewall route which triggers your alarm. Klick on the actual NAME of this Rule. Maybe it's not visible, but the name is the link you need:

![gcp-fw2.png](/assets/docs-images/Weekly_Reporting_eMail_KB/gcp-fw2.png)

On the next screen, you can edit the rule:

![gcp-fw3.png](/assets/docs-images/Weekly_Reporting_eMail_KB/gcp-fw3.png)

Scroll down to "Source" and enter the new IP Range you want to allow:

![gcp-fw4.png](/assets/docs-images/Weekly_Reporting_eMail_KB/gcp-fw4.png)

## Fix Security Group in AWS

Login to your AWS cloud Console and switch to "Security Groups" in the EC2 Function:

![aws-fw.png](/assets/docs-images/Weekly_Reporting_eMail_KB/aws-fw.png)
![aws-fw2.png](/assets/docs-images/Weekly_Reporting_eMail_KB/aws-fw2.png)

On the next screen, search for the rule which triggers your alarm:

![aws-fw3.png](/assets/docs-images/Weekly_Reporting_eMail_KB/aws-fw3.png)

Click on the Security Group you want to edit.
On the next screen, click on "Edit inbound rule"

![aws-fw4.png](/assets/docs-images/Weekly_Reporting_eMail_KB/aws-fw4.png)

At "Source" enter the IP Address Range you want to allow access:

![aws-fw5.png](/assets/docs-images/Weekly_Reporting_eMail_KB/aws-fw5.png)

Simply press Enter if you need to add another range. Once you added all ranges, remove the "Everyone from everywhere has access" range:

![aws-fw6.png](/assets/docs-images/Weekly_Reporting_eMail_KB/aws-fw6.png)

Hit the Save button.

![aws-fw7.png](/assets/docs-images/Weekly_Reporting_eMail_KB/aws-fw7.png)

