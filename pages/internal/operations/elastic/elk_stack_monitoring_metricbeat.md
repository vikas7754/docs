---
layout: default
title: "ELK stack self monitoring with metricbeat documentation"
parent: Elastic
grand_parent: Operations
nav_order: 4
has_children: false
---

# ELK stack self monitoring with metricbeat documentation

This page documents important information about the process of the ELK stack monitoring, as well as some technical components that need to be maintained.

## Installation process:

Installation process of metricbeat is to be done via rake tasks utilizing its respective helm chart, similar to any other component that is under /helm directory.  
 Pre-requisite configuration:

- Metricbeat requires a user with special permissions of `kibana_admin, monitoring_user,remote_monitoring_agent` in order to be able to send and retrieve metrics.
- This user must be created before installation of metricbeat.
- Username and password of this user must be encoded to base64.
- A k8s secret with the following details must be created with the data `username` and `password` as seen below:
  ```
    apiVersion: v1
    kind: Secret
    metadata:
      namespace: elastic-system
      name: elk-monitoring-credentials
    type: Opaque
    data:
      elk-monitoring-user: User-please_encode_me_as_base64
      elk-monitoring-password: Password-please_encode_me_as_base64
  ```

## Post Installation Process:

After installing metricbeat and its underlying components(kube-state-metrics), there are 2 main tasks that need to be completed/checked:

- Navigate to **Stack Management > Rules and Connectors**, in Kibana, and make sure that all the following rules are configured and enabled.
  <p align="center">
     <img width="" height="" align="center" src="/assets/docs-images/elk-monitoring/rules.png">
  </p>

- Navigate to **Stack Management > Index Lifecycle Policies**, and create a retention policy for metricbeat data, to be deleted after 35 days.
   <p align="center">
     <img width="" height="" align="center" src="/assets/docs-images/elk-monitoring/retention-policy.png">
   </p>

## Monitoring process:

- Due to lack of a premium license, we could not integrate connectors that ship alerts via email, slack or teams, therefore monitoring is to be done **every 1 month** by a colleague (this is to be decided by the team, who and when), by checking the violated rules, under **Stack Management > Rules and Connectors**.
- Additionally, some of the security settings are enabled via our codebase, therefore during this check, the colleague should take a look on the PR-s on the devsecops-infra repo, and observe any change on the ELK stack.
