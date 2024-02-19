---
layout: default
title: Cloud Account Lifecycle Management
parent: CALM
grand_parent: Operations
nav_order: 1
has_children: true
---

# Cloud Account Lifecycle Management

## Required Steps

There are 2 key requirements in CALM:

1. Verifying Security Attributes are correct
2. Extending the Account Lease

These must be verified at least once every 6 months. This can be done on either the Hyperscaler portal or using the Hyperscaler api.  
You will receive automated notification emails 30 days before the end of the 6 month cycle.

Please note that a decay cycle will start if this information goes stale.

### Using the UI

1. Go to the [Hyperscaler portal account listing](https://portal.multicloud.int.sap/accounts)
2. Click the lock icon in the account's row  
   <img title="Lock location" alt="lock location" src="/assets/docs-images/cloud_account_lifecycle_management/sec_attrs_lock_img.jpg">
3. Check all info is correct then hit confirm. This will do both: verify security attributes are correct and extend the account lease by 365 days  
   <img title="Lock location" alt="lock location" src="/assets/docs-images/cloud_account_lifecycle_management/sec_attrs_confirm_ui.jpg">

### Mass Updating Security Attributes

There's now the capability to mass update multiple accounts' security attributes at one time. For details, see the [Mass Security Attribute Update Guide](https://docs.multicloud.int.sap/portal/mass-updates-guide)

### Using the api

Please find the api help [here](./api.md)  
There is also a sample python script [here](./example.py)
