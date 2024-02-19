---
layout: default
title: "[ARCHIVE] Minerva API User Guide"
parent: "[ARCHIVE] Minerva Docs"
nav_order: 6
grand_parent: ARCHIVED
has_children: false
---

# [ARCHIVE] Minerva Overview

Minerva is a service that uses a scan engine (using Chef Inspec) to provide security control compliance information for hyperscaler accounts within Multi Cloud.

In addition to Minerva, the team has developed a number of solutions and made them available to help with hyperscaler security compliance scanning data:

- [On-Demand Scans](/external/compliance_scanning/on_demand/running_adhoc_scan)
- [Mailer](/external/reporting_emails/Report_Compliance_Mailer)
- Minerva End user API

**Please note Minerva API access can only be granted in exceptional circumstances where a legitimate business need cannot be fulfilled by the On-Demand Scans or the Mailer lists.**

For any questions about any of these tools please contact us via our slack channel #sap-hyperscaler-security

# Requesting Minerva API access

If you have tried the On-Demand Scans, and still feel your project needs cannot be fulfilled by this solution or Minerva Dashboards or Mailer either, please submit a request for API access using the following template. Please note, for Minerva end user API access you will need the approval of the Security Officer or TRU for a specific cloud account, or Business Information Security Office (BISO) for a range of accounts in a LOB.

**Please answer all questions below.**

Please have a legitimate business reason for requesting API access for Minerva/Chef Inspec Data. Share why this access is needed and what it will be used for:

---

---

Please consider AdHoc Scanning for your accounts/resources: [Adhoc Scanning Documentation.](/external/compliance_scanning/on_demand/running_adhoc_scan) Confirm that you've reviewed the Adhoc Scanning option:

---

---

If you can not use the Adhoc Scanning option, please provide a reason:

---

---

Estimated number of accounts (and resources) that will be accessed via API? Please share an estimate:

---

---

Has approval been given from the TRU/BISO for API access? Please attach the approval:

---

---

How often will you be using the API? Explain the frequency you expect to be using the API:

---

---

What's the estimated time frame would you like access? Please share the an estimated time range:

---

---

# Minerva End User API

Should approval be granted, the HS DevSecOps team will send you an API key via an ephemeral link. Please note this link will **expire after 48 hours** after being issued, so you should make sure you store the API key in a secure manner compliant with SAP policy. Please also be aware the API key lasts for 90 days from the date it is issued. If you would like a further key issued after 90 days, please apply for another key using the same process described above.

Also note that API access is only currently possible via the SAP VPN (BIG-IP) in the following VPN locations:

- Waldorf
- Philidelphia
- Palo Alto
- Singapore

If you are using Global Protect, please note that only Waldorf will allow you access at present.

## API useful fields

Below is a list of useful query fields for the Minerva API.

### Cloud_ID

Cloud ID is the unique ID for each cloud account:

```
mcdb_record.cloud_id
```

### Cost Objects

Relates to the various HSDB cost objects against cloud accounts. There are a couple of ways to query the cost objects (ID or name). The below examples use L4 but this can be changed to any viable Cost Object (e.g. L1, L2, L7):

```
mcdb_record.cost_object.l4_id
```

```
mcdb_record.cost_object.l4_name
```

### LOB Name

LOB name as it is recorded against the HSDB:

```
mcdb_record.cost_object.lob.name
```

## API Example Queries

The end point for the Minerva API is api.minerva.multicloud.int.sap:9200/_inspec_/, and there are some sample API queries provided below. It is recommended that users should consider Postman for running these queries. For any questions on PostMan in SAP, please consult the PostMan slack channel #sap-tech-postman

### API request for single account

Replace the _CLOUD_ID_ field with the cloud ID of the account you wish to check, and replace _YOUR_API_KEY_ with the API key you were sent.

```
GET 'https://api.minerva.multicloud.int.sap:9200/*inspec*/_search?q="mcdb_record.cloud_id”:”<CLOUD_ID>”&q=status:failed&size=10' --header 'kbn-xsrf: true'  --header 'Content-Type: application/json' --header 'Authorization: ApiKey <YOUR_API_KEY> --data-raw '{"sort": { "timestamp": "desc" }}'
```

### API request for accounts in an LOB

Replace the _LOB_NAME_ field with the LOB of the accounts you wish to check, and replace _YOUR_API_KEY_ with the API key you were sent.

```
GET 'https://api.minerva.multicloud.int.sap:9200/*inspec*/_search?q="mcdb_record.cost_object.lob.name”:”<LOB_NAME>”&q=status:failed&size=10' --header 'kbn-xsrf: true'  --header 'Content-Type: application/json' --header 'Authorization: ApiKey <YOUR_API_KEY> --data-raw '{"sort": { "timestamp": "desc" }}'
```

### API request with time series (PostMan format)

If you do run queries with PostMan, below is an example of time series data using a PostMan format.

```
Request Type:GET
Request URL: https://api.minerva.multicloud.int.sap:9200/*inspec*/_search?q="mcdb_record.cost_object.lob.name

{
 “size”: 5000,
  “query”: {
      “bool”: {
        “must”: [
            { “match”: { “status”: “failed” }},
            { “match”: { “mcdb_record.cloud_id” : “0"}},
            { “match”: { “mcdb_record.status” : “ACTIVE”}}
         ],
“filter” : [
{“range” : {“timestamp”: {
“gte” : “2022-01-30T10:30:00.000Z”,
“lte” : “2022-02-22T23:30:00.000Z”,
“relation” : “within” }}}
        ]
    }
  }
}
```

Your query should look similar to this:

(/docs/assets/docs-images/Minerva_API_User_Guide/sample_query.png)

# Additional API Guidance

Minerva uses Elastic and Kibana for end user APIs. Further relevant API guidance can be found under Elastic's [Search API](https://www.elastic.co/guide/en/elasticsearch/reference/7.16/search-search), [Search your data](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-your-data) and [Access the API using a REST Application](https://www.elastic.co/guide/en/cloud/current/ec-restful-api-client-app) documentation.

Minerva also uses Chef Inspec and useful documentation from Chef includes the [Inspec overview](https://docs.chef.io/inspec/) [control impact scores](https://docs.chef.io/inspec/dsl_inspec/) used in Minerva, and details of the [Inspec DSL](https://docs.chef.io/inspec/dsl_inspec/).
