---
layout: default
title: HSDB API for Orca compliance alerts
nav_order: 1
parent: Orca
grand_parent: Compliance Scanning
has_children: false
---

# How to use the HSDB API for Orca compliance alerts
This document outlines how to connect and use the HSDB API for Orca enriched
compliance alerts.

A service account for API can be requested through a SNOW ticket as shown in the
`How can I get a service account for Hyperscaler API?` of the documentation
[page](https://docs.multicloud.int.sap/infra/faq#how-can-i-get-a-service-account-for-multicloud-api)

The endpoint address is `https://db.multicloud.int.sap/compliance/orca`. Use the
GET command to retrieve alert data. In order to do a full export of the alerts,
use the information in the response metadata:

```
"count": 1,
"next": "https://db.multicloud.int.sap/compliance/orca/?page=2",
"previous": null
```

The count gives the number of alerts returned by the API query, while the `next`
and `previous` give next and previous page. A script can then be created to loop
over the `next` value until it's `null`.

If the CSV format is needed, this can be converted from the JSON API
response. All languages support this. An example for Python can be checked at
https://blog.enterprisedna.co/python-convert-json-to-csv/

## Orca alert API v1 format sample
Below is a sample output of the API:

```JSON
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "alert_id": "orca-111111",
            "type_string": "2_02_azure_subscription_role_overly_permissive",
            "subject_type": "AzureRoleDefinition",
            "rule_id": "ur506c2992f9",
            "category": "Best practices",
            "recommendation": "",
            "alert_labels": "[]",
            "asset_category": "Users and Access",
            "account": {
                "detail": "https://db.multicloud.int.sap/creator/accounts/111111",
                "cloud_id": "806fda3e-480f-11ee-a857-00155da6aeed",
                "type": "AZR",
                "name": "acme"
            },
            "asset_name": "SF Contributor Custom Role (No NSG, No Delete RG)",
            "asset_type": "AzureRoleDefinition",
            "asset_labels": "None",
            "description": "2_02_azure_subscription_role_overly_permissive",
            "details": "2.2 - Azure Subscriptions with custom roles should not be overly permissive\n\n        SGS Wiki Link: https://wiki.wdf.sap.corp/wiki/x/Ckc3c",
            "orca_score": "5.00"
            "created_at": "2023-06-21T11:55:37Z",
            "last_seen": "2023-06-21T11:55:37Z",
            "last_updated": "2023-06-21T11:55:37Z",
            "status": "open",
            "severity": "imminent compromise",
            "risk_level": "medium"
        }
   ]
}
```

`**NOTE:** This is v1 format of the API results`

For filters and complex API queries, please visit the documentation
[page](https://docs.multicloud.int.sap/infra/api/ComplianceAPI/Orca)

## Minerva to Orca API data mapping
Below is a mapping of the Minerva to Orca data models:

|**Minerva**|**Orca**|**Notes**|
|---|---|---|
|   |alert_id|Identify the alert in orca, no equivalent in Minerva|
|control_id|type_string|control identifier|
|   |subject_type|refers to the subject of the alert, which in almost every case is the Asset and therefore should match the asset_type|
|   |rule_id <br> e.g. ur506c2992f9|Orca rule identifier. However, Minerva control_id is not directly mapped into the orca one. Orca rule_id is an internal string|
|   |category <br> e.g. Best practices|Orca alert category|
|   |recommendation|Orca recommendation for alert resolution|
|   |alert_labels|   |
|   |asset_category <br> e.g. Users and Access|Orca asset category|
|account|account|Hyperscaler account details|
|   |asset_name|Name of the asset|
|resource_class|asset_type|Resource type identifier|
|   |asset_labels|   |
||description|In most cases same as `type_string`|
|control_impact|orca_score|Orca score maps to a factor of 10 to the minerva one|
|control_title|details|Long control description|
|start_time|   |Minerva control scan star time|
|resource_param|   |Parameters specific to the resource|
|   |created_at <br /> e.g. 2023-06-21T11:55:37Z|Alert creation time|
|   |last_seen <br /> e.g. 2023-06-21T11:55:37Z|Last time of when alert was seen|
|   |last_updated <br /> e.g. 2023-06-21T11:55:37Z|Last time of when alert was updated|
|status <br /> e.g. passed, failed, skipped|status <br />e.g. Open, Closed, Dismissed|This field is used differently in Minerva and Orca|
||severity|Orca legacy score|
||risk_level <br /> e.g. High, Medium, Low, Informational|Orca score indicating how critical the alert is|

## Orca alert API v2 format sample
In v2, the following additional fields have been added:
- `sec_attrs` with `security_officer` and `environment`
- `cost_object` with `CC` and `l4` to `l9` levels
- `tech_resp_user`

```JSON
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "alert_id": "orca-1064060636",
            "type_string": "2_02_azure_subscription_role_overly_permissive",
            "subject_type": "AzureRoleDefinition",
            "rule_id": "ure85283814b",
            "category": "Best practices",
            "recommendation": "",
            "alert_labels": "[]",
            "asset_category": "Users and Access",
            "account": {
                "detail": "http://127.0.0.1:8000/creator/accounts/0160c384-e418-4a0c-8c20-4656a2c5dd89/",
                "sec_attrs": {
                    "security_officer": {
                        "inum": "C0000987",
                        "first_name": "Name 0",
                        "last_name": "Surname 0",
                        "mail": "name.surname0@sap.com"
                    },
                    "environment": "PROD"
                },
                "cost_object": {
                    "l4_name": "l4-name",
                    "l5_name": "l5-name",
                    "l6_name": "l6-name",
                    "l7_name": "l7-name",
                    "l8_name": "l8-name",
                    "l9_name": "l9-name",
                    "type": "CC",
                    "code": "10100000",
                    "name": "co-billing-1",
                    "verified": true
                },
                "cloud_id": "sap2-account3-azure4-id1",
                "type": "AZR",
                "name": "sap-account-azure",
                "tech_resp_user": {
                    "inum": "C0000987",
                    "first_name": "Name 0",
                    "last_name": "Surname 0",
                    "mail": "name.surname0@sap.com"
                }
            },
            "asset_name": "asset_name",
            "asset_type": "AzureRoleDefinition",
            "asset_labels": "None",
            "description": "2_02_azure_subscription_role_overly_permissive",
            "details": "2.2 - Azure Subscriptions with custom roles should not be overly permissive\n\n        SGS Wiki Link: https://wiki.wdf.sap.corp/wiki/x/Ckc3c",
            "orca_score": "5.00",
            "created_at": "2023-07-14T09:12:42Z",
            "last_seen": "2023-07-14T09:12:42Z",
            "last_updated": "2023-07-14T09:12:42Z",
            "status": "open",
            "severity": "hazardous",
            "risk_level": "medium"
        }
    ]
}
```

## Orca alert API v3 format sample
In v3, the following additional fields have been added:
- `asset_vendor_id`: (optional) asset identifier
- `asset_tags_info_list`: (optional) asset tags
- `asset_regions`: (optional) asset regions

These fields are alert attributes from the point of alert notifications from Orca. These are not real-time from hyperscalers and hence may not always reflect the latest values in hyperscalers.

```JSON
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "alert_id": "orca-3333333333",
            "type_string": "5_04_azure_storage_account_object_versioning",
            "subject_type": "AzureStorageAccount",
            "rule_id": "ur0fd4638f9b",
            "category": "Best practices",
            "recommendation": "",
            "alert_labels": "[]",
            "asset_category": "Storage",
            "account": {
                "detail": "http://127.0.0.1:8000/creator/accounts/0160c384-e418-4a0c-8c20-4656a2c12345/",
                "sec_attrs": {
                    "security_officer": {
                        "inum": "C0000987",
                        "first_name": "Name 0",
                        "last_name": "Surname 0",
                        "mail": "name.surname0@sap.com"
                    },
                    "environment": "PROD"
                },
                "cost_object": {
                    "l4_name": "l4-name",
                    "l5_name": "l5-name",
                    "l6_name": "l6-name",
                    "l7_name": "l7-name",
                    "l8_name": "l8-name",
                    "l9_name": "l9-name",
                    "type": "CC",
                    "code": "10100000",
                    "name": "co-billing-1",
                    "verified": true
                },
                "cloud_id": "sap2-account3-azure4-id1",
                "type": "AZR",
                "name": "sap-account-azure",
                "tech_resp_user": {
                    "inum": "C0000987",
                    "first_name": "Name 0",
                    "last_name": "Surname 0",
                    "mail": "name.surname0@sap.com"
                }
            },
            "asset_name": "asset_name",
            "asset_type": "AzureStorageAccount",
            "asset_labels": "None",
            "description": "5_04_azure_storage_account_object_versioning",
            "details": "5.4 - Azure Storage accounts object versioning should be enabled\n\n        SGS Wiki Link: https://wiki.wdf.sap.corp/wiki/x/Ckc3c",
            "orca_score": "5.00",
            "created_at": "2023-07-14T09:12:42Z",
            "last_seen": "2023-07-14T09:12:42Z",
            "last_updated": "2023-07-14T09:12:42Z",
            "status": "open",
            "severity": "hazardous",
            "risk_level": "medium",
            "asset_vendor_id": "asset1-azure2-id4", 
            "asset_tags_info_list": "['tag1Name|example-tag1', 'tag2Name|example-tag2']",
            "asset_regions": "['centralus', 'westeurope']"
        }
    ]
}
```
