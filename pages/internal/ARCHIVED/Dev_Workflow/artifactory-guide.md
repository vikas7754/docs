---
layout: default
title: "[ARCHIVE] Guide to Artifactory"
parent: "[ARCHIVE] Dev WorkFlow"
grand_parent: ARCHIVED
has_children: false
---
# Guide to Artifactory
This guide provides how to integrate with [SAP artifactory](https://int.repositories.cloud.sap/).

As per SGS guidelines, artifactory has to be used where possible to push and
pull external toolings, e.g. images, helm charts, etc.

The `security-cloud-compliance` artifacts repository has been set, and currently
holds the following helm charts:
- eck-operator
- falco
- gatekeeper

The process is, therefore, to download the public helm charts and push them to a
dedicated artifactory repository.

## Pre-requisites
In order to be able to upload or download an artifact, the user needs to be
added to the repository. The user can be added only if at least one login to
artifactory website has been done. Login is SSO based.

If a user needs to be added to the repo, a request in the team slack
`mc_devsecops_developer` channel should be made.

## Add an artifactory repo to local helm
In order to add a repo in helm, run the following:

`helm repo add sap-security-cloud-compliance https://int.repositories.cloud.sap/artifactory/security-cloud-compliance --username <i-number>`

## Pull a public helm chart
To download a public helm chart, run the following:

`helm pull elastic/eck-operator`

Note that the `elastic/eck-operator` string is a combination of the public
repository `elastic` and the chart `eck-operator`.

After the command is run a local file as e.g. `eck-operator-2.4.0.tgz` is
downloaded.

## Push a chart to the artifactory helm repository
To upload a chart to the artifactory helm repository, run the following:

`curl -H "X-JFrog-Art-Api:<personal artifactory API key>" -T eck-operator-2.4.0.tgz "https://int.repositories.cloud.sap/artifactory/security-cloud-compliance/eck-operator-2.4.0.tgz"`

where the `<personal artifactory API key>` can be retrieved (or generated if not
yet available) from artifactory by editing the personal profile from the up
right account button with the i-number.

## Update local helm repository
To update the local helm repository, run the following:

`helm repo update`

## Test a helm chart
To test a helm chart, check if rake command is available and run the following:

`rake dry_run_deploy_eck_operator`

If not, use the helm command that rake wraps:

`helm upgrade --dry-run --install elastic-operator sap-security-cloud-compliance/eck-operator -n elastic-system`

and verify that the version is correct.
