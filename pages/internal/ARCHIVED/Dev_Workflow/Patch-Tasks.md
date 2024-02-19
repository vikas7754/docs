---
layout: default
title: "[ARCHIVE] Patch Tasks"
parent: "[ARCHIVE] Dev WorkFlow"
grand_parent: ARCHIVED
has_children: false
---

# Patch Tasks - Overview

This document breaks down the tasks to be carried out by the patch Duty Manager. Unless otherwise stated, patch tasks should be carried out daily.
The Duty Manager for a given period will be in line with the Pager Duty Rota i.e. the person who is the Primary that week on Pager Duty will be the patch Duty Manager that week too.
More information on the general Patch Management Process for the team can be found in the [Patch Management Process document](/internal/dev_workflow/patch-management#weekly-vulnerability-check).
Unless other stated, patch tasks should be carried out **every week**.

The primary tasks of the patch Duty Manager are:

1. Carry out patch reviews in line with guidance provided below.
2. Raise any tickets in Zenhub and notify the team on the _mc_devsecops_developer_ slack channel a ticket has been raised for a patch task. Please make sure any patch tickets raised are tagged with the _patch_ label.

NB Please note any changes required for our Production environment should adhere to our [Change Management process](/internal/dev_workflow/change-management)

## Authenticating in to Dev/Pre-Prod/Prod

Assuming you already have the [gcloud cli installed](https://cloud.google.com/sdk/docs/install), you can authenticate in to Dev/Pre-Prod/Prod using the following gcloud commands from Terminal (Mac) or PowerShell (Windows):

```
gcloud auth login
```

You can change your project to Dev/Pre-Prod/Prod by running:

```
gcloud config set project PROJECT_ID
```

# Patch Tasks

## Contents

- [Cyber Defence CVE Bulletins](#cyber-defence-cve-bulletins)
- [GCR CleanUp](#container-images)
- [GKE Update](#gke-updates)
- [UAM review](#uam-review)
- [Versioning review](#versioning-review)

### Cyber Defense CVE Bulletins

The Cyber Defense and Design team has a tool that provides security bulletins for various applications and services based on recent CVEs. As part of the patching duties, the patch Duty Manager should review any emails on a daily basis. The shared mailbox name is _SAP GCS MC DSOPS_. Please contact John Conway if you have access issues with this mailbox.

Before raising a task, you should do some checks on our infrastructure to see if the security bulletin is applicable. Primarily, you should check our code repositories for:

1. The container images we use in our Dev/Pre-Prod/Prod environments.
2. Any Docker or Rake files we use in our Dev/Pre-Prod/Prod environments.
3. Any code versions for languages we use in our team (if applicable).

### Container Images

From the GCP console, go to _GCR - Container Images - Inspec_ Only the 3 most recent versions of Inspec should be there. For reference, check the [release notes](https://github.tools.sap/mce/cloud-compliance/releases) to see the release history.

### GKE Updates

Run the GKE Update script in the _gke-patch-check_ script in the [Devsecops Utils repo](https://github.tools.sap/mce/devsecops-utils). This will show what version of GKE our clusters have what the latest version available is. If the latest version and our installed version is out of sync, please create a ticket.

### UAM Review

UAM review should be **conducted every 90 days instead of each week**. Currently UAM review is scheduled for the following dates:

- 2nd August 2022
- 31st October 2022
- 29th January 2023

Please raise a UAM ticket at the start of each week for UAM review and notify the team in the team _mc_devsecops_developer_ slack channel.

### Versioning Review

Versioning review relates to the software versions we use on our stack. The check for updates of vulnerable versions we may have is partially covered by the Cyber Defence CVE Bulletin process discussed above.

The remainder of the check involves checking the _mc_devsecops_cicd_notifications_ slack channel and reviewing Trivy detections for failed builds. Click on the build that failed in the slack channel, and it will bring you to our Azure DevOps pipeline where Trivy should identify any known versions of software that have security patches available. Where there are patches available, create a ticket.
