---
layout: default
title: "[ARCHIVE] Minerva - Do your own security scans whenever you want"
parent: "[ARCHIVE] Minerva Docs"
nav_order: 1
grand_parent: ARCHIVED
has_children: false
---

# Minerva - Self scans for SAP Hyperscaler Accounts

# What is Minerva?

Minerva is a SAP owned product, developed and maintained by the Hyperscaler DevSecOps Team.
Minerva combines ChefInspec together with a few other open Source tools into a docker container which allows you to perform your own security compliance scans on one or several of your hyperscaler accounts.

## How to operate Minerva

Minerva runs in a docker container, and needs a few prerequisites to work properly:

- [Docker](docker.md) installed and running
- [A service account with a special set of permissions in your account(s)](minervaserviceaccount.md)
- an active internet connection (obviously)
- an active VPN connection (if you need to work with AliCloud)

Minerva delivers you a HTML/JSON or JUNIT file file, containing it's findings.

1. Login at https://common.repositories.cloud.sap/ui/login/ using SSO

![minerv1](/assets/docs-images/Weekly_Reporting_eMail_KB/minerv1.png)

2. Go to the drop-down list on the top right and click "Edit Profile"

![minerv2](/assets/docs-images/Weekly_Reporting_eMail_KB/minerv2.png)

3. In the edit profile screen, click "Generate API Key" - this will be used as your password when authenticating to the repository

![minerv3](/assets/docs-images/Weekly_Reporting_eMail_KB/minerv3.png)

4. login to the repository via docker CLI (On Linux systems, be sure your user is part of the "docker" group):

`docker login mcsec.common.repositories.cloud.sap`

you will get asked for username and password. Your username is your userID (i012345), your password is the generated API token from step 3.

Once you are authenticated, you can pull the container with the following command:

docker pull <container url>

URL can be:

- {{site.data.release-metadata.sap-alicloud-current-container-link}}
- {{site.data.release-metadata.sap-aws-current-container-link}}
- {{site.data.release-metadata.sap-gcp-current-container-link}}
- {{site.data.release-metadata.sap-azure-current-container-link}}

More information about running ad-hoc scans can be found [here](/external/compliance_scanning/on_demand/running_adhoc_scan)
