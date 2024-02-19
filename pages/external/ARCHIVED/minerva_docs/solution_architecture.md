---
layout: default
title: "[ARCHIVE] Compliance Scanning Architecture"
parent: "[ARCHIVE] Minerva Docs"
nav_order: 2
grand_parent: ARCHIVED
has_children: false
---

# [ARCHIVE] Compliance Scanning Architecture

The compliance scanning solution is designed to help report the security
compliance posture of all cloud accounts within SAP. It provides a centralized
reporting platform as the lowest barrier-to-entry for security compliance
scanning with LoBs (Line Of Business). The scanning service has the ability to
gather all the LoBs cloud accounts across all the hyperscalers and deliver
compliance reports against security controls based on SGS (SAP Global Security)
Hardening [guidelines](https://wiki.wdf.sap.corp/wiki/x/1CWZc). LoBs then have
the information to act on those reports results to make their accounts
compliant. Additionally, as new accounts are added to the hyperscalers, the
scanning service is able to gather for them seamlessly without manual
intervention. Additionally, charts and statistical analysis are provided through
elastic for overall reporting to high management in SAP. Finally, the solution
is integrated with the HS portal which allows access and visibility of the scan
results to all LoBs.

<img align="center" src="/assets/docs-images/solution_architecture/mcsec_compliance_framework_data_flows_noprocesses_v11.jpg" width="65%" height="65%">

The system is deployed in the Google Cloud Platform and is composed of 2
different GKE (Google Kubernetes Cluster) clusters, one for the scanning and the
other for reporting. Following are the components with a short description of
their functionality:

- **Dispatcher**: retrieves individual hyperscaler accounts information
- **Consumer**: performs controls checks and tranformations
- **Relay**: publishes scan results to elastic
- **Elastic**: provides reporting capabilities
- **Kibana**: provides frontend to elastic for analytics
- **Elastic data archiver**: creates daily data backups, formats to json and
  excel, and stores them into a bucket
- **Mailer**: aggregates elastic user data, and emails it to TRU (Technical
  Responsible User) and SO (Security Officer) with an excel attachment of user
  data. It also analyses rejected emails which are reported to secops team for
  visibility

A typical flow starts from the **cloud scheduler** that signals the
**Dispatchers** to start a scanning cycle. In order to do so, a dedicated
dispatcher instance for each hyperscaler (GCP, AWS, Azure and Alicloud) reaches
the relative cloud provider as well as the HSE database (**HSDB**). Once
each dispatcher gathers the hyperscaler details, it bundles them together and
pushes to a dedicated **pub/sub topic**. The **consumer**, which is subscribed
to that topic, sees the message and after retrieving control exceptions, it
starts the scans on each hyperscaler by creating multiple parallel jobs. This
allows to get good performance on this intensive task. When scans are completed,
results breaks are broke down into individual elements to allow easier mining in
**elastic**. The individual elements are pushed again to different **pub/sub
topics**, one for consume of the **relay** which forward them to **elastic**,
and another for the **HS portal** integration. At this point the result are
available in **elastic** for any analytics as well as the **HS
Portal**. Dashboards are avaialble in **Kibana** and in the **HS Portal** for
such purpose.

Below is a more detailed flow:

1. Cloud Scheduler publishes message to Dispatcher topic
2. Dispatcher gets hyperscaler org reader and HSDB credentials from secrets
   manager
3. Dispatcher gets all account IDs from each hyperscaler
4. Dispatcher gets hsdb record using IDs through the HSDB API
5. Dispatcher builds message and publishes to consumer topic
6. Consumer subscription receives message
7. Consumer gets hyperscaler org reader credentials
8. Consumer gets exceptions from firestore
9. Consumer performs scan
10. Consumer publishes each data element to relay topic
11. Relay subscription receives message
12. Data stream to HS Portal for Minerva dashboard reporting
13. Relay gets elastic api credentials from secret manager
14. Relay pushes message to elastic
15. Data archiver retrieves data from elastic
16. Data archiver stores data (JSON and Excel) into GCP bucket for backup and
    reporting respectively
17. Mailer reads elastic user data
18. Mailer sends emails to TRU(Technical Responsible User)/SO(Security Officer)

## Mailer system architecure

The Mailer service provides aggregated reports to LoBs as well as failed
delivery stats to the devsecops team.
The are three components to this service:

- **Aggregator**: aggregates last scan data from elastic
- **Distributor**: sends the aggregated data to LoBs TRU/SO and list of rejected
  emails to devsecops team. It also build large customer excel files and store
  them in a dedicated bucket
- **Analyser**: analyses distributor sent logs to gather list of rejected emails

<img align="center" src="/assets/docs-images/solution_architecture/mcsec_compliance_mailer_framework_data_flows_noprocesses_v2.jpg" width="65%" height="65%">

Below is a detailed flow:

1. Aggregator reads data from Elastic
2. Aggregator publishes aggregated data to pubsub
3. Distributor pulls aggregated data
4. Distributor sends aggregated data to TRU/SO
5. Aggregator builds large customer excel file and pushes to
   Bucket
6. Distributor pulls excel file from bucket
7. Distributor sends excel file in email to large customers
8. Distributor logs into GCP logging
9. Distributor logs routed to pubsub
10. Analyser pulls logs from pubsub and produces list of rejected
    emails and s tats as output
11. Analyser pushes rejected emails and delivery stats to pubsub
12. Distributor pulls analyser output
13. Distributor sends mail to cost center owners about rejected emails, sends
    delivery stats to secops team
