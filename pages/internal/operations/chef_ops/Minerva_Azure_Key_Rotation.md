---
layout: default
title: Minerva Azure Key Rotation
parent: Chef Ops
grand_parent: Operations
has_children: true
---

# Minerva Azure Key Rotation

This document outlines the steps and considerations needed for Azure Key rotation for the Minerva project. HS Azure team are available for any questions about key expiration for the accounts we use, but the onus is on the HS DevSecOps team to monitor our keys and rotate them regularly.  

## Preflight check

You will need to have access to the master account for Azure that Minerva uses. 

## Steps for key rotation.

1. Log in to our Azure Master account. From the Azure console, go to _Directories + subscriptions_. There are 2 tenants we have that should both be listed here:

~~~
SAP SE
SAP Shared Tenant
~~~

2. Assuming both tenants are there, go to Azure Active Directory next. From the left hand pane, select _App Registrations_. The app that is used for Minerva should be listed here and is called:

~~~
azrspn-MC-ChefCompute
~~~

3. Under the _Certificates & Secrets_ heading you can see if the key is set to expire or not. The setting should be _Current_ with a green status indicator, but if key expiration is imminent, the status indicator will be amber or red. 

4. To view expiration information about the key, click on _azrspn-MC-ChefCompute_ and then click on _Certificate & secrets_ from the left hand menu. This will show you details about the current key, including the expiration date. Click on _New Secret_ to create a new key, and set it to expire in **3 months**. 

5. Login to the GCP account for each environment (e.g. dev, pre-prod and prod) and go to _Security_ then _Secret Manager_. From the list of secrets, find:

~~~
azure-inspec-client-secret
~~~

6. Click on the above secret, got to _Versions_ and you will see the versions of the keys. Add the new key created in Azure here. This will give you a new version number.

7. You will then need to update the consumer code with the new version number. To do this, from the _cloud-compliance_ repo go to _infra/helm/sap-inspec-consumer/values.(environment).yaml_ and under the update the _Azure Configuration_ section update the _mainSecretVersion_ value to whatever the latest version is you created in Part 6. Do the same for _infra/helm/sap-inspec-dispatcher/values.(environment).yaml_ also under the _Azure Configuration_ heading and update _mainSecretVersion_ here too. 

