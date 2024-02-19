---
layout: default
title: "[ARCHIVE] Minerva - Setup the GCP service account"
parent: "[ARCHIVE] Minerva Docs"
nav_order: 10
grand_parent: ARCHIVED
has_children: false
---

# Setup the GCP serviceaccount for Minerva

## Create the custom role

You need a custom role for the minerva scans.
Login to your GCP project and select IAM & Admin --> Roles

![gcp-crole1](/assets/docs-images/Weekly_Reporting_eMail_KB/gcp-crole1.png)

If you are there, create a new role by clicking on the "+ CREATE ROLE" Button:

![gcp-crole2](/assets/docs-images/Weekly_Reporting_eMail_KB/gcp-crole2.png)

On the next Window, name your service account:

![gcp-crole3](/assets/docs-images/Weekly_Reporting_eMail_KB/gcp-crole3.png)

After clicking the "Add Permissions" Button you need to search the following roles and activate them:

`compute.firewalls.get
compute.firewalls.list
compute.networks.get
compute.networks.list
compute.regions.list
compute.sslPolicies.get
compute.subnetworks.list
compute.zones.list
resourcemanager.projects.get
storage.buckets.getIamPolicy`

![gcp-crole4](/assets/docs-images/Weekly_Reporting_eMail_KB/gcp-crole4.png)

Click the "Add Buton" and have a look at the summarized service account request. if everything is ok, click the "Create" button.

![gcp-crole5](/assets/docs-images/Weekly_Reporting_eMail_KB/gcp-crole5.png)

Now we need to create a new service account and attach this rols together with the [basic viewer role](https://cloud.google.com/bigquery/docs/access-control-basic-roles) to that account.

## Create the service account

TBD
