---
layout: default
title: "[ARCHIVE] Repositories"
parent: "[ARCHIVE] Dev WorkFlow"
grand_parent: ARCHIVED
has_children: false
---

# Repositories

This page provides information on how the repositories for the SecDevOps Team
are organised.

The approach taken is based on the separation of concerns which has been
implemented by separating services and specifc areas into different
repositories.

Also, all repositories are prefixed with `devsecops-` with the exception of the
`cloud-compliance` repository which contains the consumers services and is the
most customer facing repository of the lot.

## cloud-compliance

This repo is for the consumers, which are the services that scan the different
cloud providers.

The `service` folder contains the service code for each cloud provider
separated into their own folders. The `deploy` folder contains the helm charts
used for deploying each hyperscaler consumer. This is because all hyperscalers
consumers share the same deploy process.

<img align="center"
src="/assets/docs-images/repositories/cloud-compliance_folder-structure.jpg"
width="50%" height="50%">

Finally, the `cicd` folder contains pipelines divided per landscape, i.e. dev,
preprod and prod. It also contains a `scripts` folder with scripts used by the
various pipelines. Finally, the `templates` folder maintains templates which are
used by the pipeline scripts.

## devsecops-dispatcher

This repo is for the dispatchers, which are services that gather individual
cloud accounts information.

Similarly to the **cloud-compliance** repo, there is the `service` folder
containing the service code for each cloud provider separated into their own
folders and the `deploy` folder contains the helm charts used for deploying
each hyperscaler dispatcher. This is because all hyperscalers dispatchers share
the same deploy process.

## devsecops-mailer

This repo is for the mailer services, which report scan results to relevant
people through emails, as well as stats on undelivered emails to the SecDevOps
Team.

Each of the mailer service is separated into its own folder that contains a
`service` and `deploy` folder respectively.

The `cicd` folder contains hadolint docker tests used in the relevant CICD PR
validation pipeline.

## devsecops-data-archiver

This repo is for the data-archiver services, which creates elastic data backups
and stores them into buckets or restore backups into elastic.

Each of the data-archiver service is separated into its own folder that contains
a `service` and `deploy` folder respectively.

The `cicd` folder contains hadolint docker tests used in the relevant CICD PR
validation pipeline.

## devsecops-relay

This repo is for the relay service, which fetch scan results and push them into
elastic.

The repo has `service` and `deploy` folders, for the service code and
deployment respectively.

The `cicd` folder contains hadolint docker tests used in the relevant CICD PR
validation pipeline.

## devsecops-3p-services

This repo is for third party services used in the infrastructure, which we
modify for our needs. Each of the services have `service` and `deploy` folders,
for the service code and deployment respectively.

Currently the repo hosts [Falco](https://falco.org/) for runtime container
monitoring for vulnerabilities, and **stackdriver-metrics-adapter** that
provides HPA for various services.

## devsecops-infra

This repo is for the infrastructure related code and services. The `terraform`
folder contains terraform files to create GCP infrstructure resources, e.g. GKE
clusters, secrets, pubsub topics, etc.

The `helm` folder contains services that are not modified, but only deployed,
specifically, **sap-compliance-reporting**, which has charts to deploy ECK.

The `k8s` folder contains native kubernetes deployment files that cannot use
helm, which are `gatekeeper` for admission control, and `network-policies`
for pods ingress/egress rules.

Finally, the `cicd` folder that contains terraform validation scripts for the
PR validation pipeline.

## devsecops-utils

This repo is for utils and scripts used for different scopes within the
SecDevOps Team.

The structure of each util differs depending on the code is organised, but a
README file should always be present.

## devsecops-docs

This repo contains the documentation and code to generate the GHpages available
[here](/)

The `docs` folder contains the documents that are created and maintained by
team members, while the `scripts` contains the code to automatically generate
the GHpages each time a PR is merged.

## Minerva_Public

This repo maintains the Minerva roadmap available

[here](https://github.tools.sap/mce/Minerva_Public/projects/1)
