---
layout: default
title: "Elastic API Key Usage"
parent: Elastic
grand_parent: Operations
nav_order: 4
has_children: false
---

## Document Control

The document control section describes the revision history and summary of changes made in the document. It will serve as the version control
for the contents of the document.

# Elastic API Key Usage

- \*\*Minerva API access should only be granted in exceptional circumstances, and a requestor must provide business justification using the Minerva API request [template](/internal/compliance_scanning/email_templates/api_request_template), which is also included in the [external Minerva API user guide](/external/Minerva-API-User-Guide).
- Access Keys are a secure way to enable programmatic access to the Elastic Cloud API.
- You can create an API key to quickly and easily authenticate, and then use the API to create and manage deployments, configure remote clusters, set up traffic filters, manage extensions, and much more.
- By default, only a superuser has API access and can enable API access for other users.
- Further documentation can be found on the [Elastic API Documentation Page](https://www.elastic.co/guide/en/cloud/current/ec-restful-api)

Remember:

- Keys should be set to expire within 90 days (Maximum)
- Keys set to expire in a timeframe greater than 90 days will be modified by the System Admin to expire within 90 days of its created date.
- Once keys expire, you cannot reactivate an expired access key.
- If an access key expires and the approved user still needs an API key, the end user should make another ticket requesting another key.

# Part 1

## Verifying the TRU/Security Officer

### Step 1 >> Examine the ticket

1. In the ticket, either the user requesting API access is the TRU/Security officer, or they are requesting on behalf of the TRU/Security Officer. If the ticket does not specifically name another person who requires access, it should be taken that the author of the ticket is requesting access for themselves.

   1a. If the ticket is not requesting access on behalf of someone else, verify that the user who opened the ticket is the TRU/Security officer in HSDB.

   1b. If the ticket is requesting access on behalf of someone who is not the TRU/Security Officer, inform the person that they need the TRU/Security Officer to sign off on the ticket granting permission for the API key, then verify that the person who signed off is the TRU/Security Officer by checking the HSDB.

2. To check the TRU/SO on the HSDB, go to the [HSDB Account portal](https://portal.multicloud.int.sap/accounts) and enter the _Cloud ID_ for the account name. Then click on the padlock icon for the account to see further details:

<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/verify_mcdb_step1a.png">
</p>

3. You should scroll down and see the TRU and SO details for the account:
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/verify_mcdb_step2.png">
</p>

4. If the person requesting access wishes to have access to multiple accounts, they will need relevant [BISO approval](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=2473006238) for the LOB(s). Please consult the BISO listed in the aforementioned link or this additional list of [BISOs](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/RfXPzI5kdlRqIXZC3mxGyD).

# Part 2

## Generating the API Key

### Step 1 >> Create a user

1. Create a user account in [Elastic Dashboard](https://minerva.multicloud.int.sap:5601/app/home#/) for the person requesting API access. If the user who submitted the ticket already has an account, ensure that they have the correct role associated with their account (1b).

   1a. If the user does not have an account created, create one for them. On the home dashboard, click on the dropdown on the top left corner, and then scroll to the bottom and select 'Stack Management'. Then click on 'Users' in the management bar on the left side of the page.

   <p align="center">
     <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/step_2a_api_key.png">
   </p>
   - At the top right, choose the button that says "Create User"
   <p align="center">
     <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/select_create_user.png">
   </p>
   - You are then presented with the user profile. Fill out the fields, giving the user a username, password, and the correct role. **This role only have read-only permissions**. The role we have created for this is called 'APIKeyRole'.
   <p align="center">
     <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/create_user_profile.png">
   </p>
   - Click Create User at the bottom.

   1b. If the user already has an account, go to 'Stack Management' then 'Users' to see the page containing the user accounts. Find the user account either in page or in the search bar.
   <p align="center">
     <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/user_profile_search.png">
   </p>
   - Then select the user account, and at the bottom in the 'Roles' box, click and a dropdown will appear with a list of roles to add to the account. Either start typing to find the specific role you want, or search in the dropdown list for the specific role. **This role only have read-only permissions**. The role we have created for this is called 'APIKeyRole'.

### Step 2 >> Create the API Key for the user.

- On the home dashboard, click on the dropdown on the top left corner, and then scroll to the bottom and select 'Dev Tools'.
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/dev_tools.png">
</p>
- In the space available, enter in a post request to generate an API key, formatted as shown in the picture below. Values shown as &lt;VALUE&gt; are values attributed to the user who the API key is for. Click the triangle next to the wrench icon to run the query.
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/api_post_request.png">
</p>
- The response includes values &lt;id&gt; and &lt;api_key&gt;. These are used to generate the base64 value for the api key. Go to a console, and type

```
printf '<id>:<api_key>' | base64
```

- This should give some value, denominated as &lt;BASE64_API_KEY&gt;. This is the value that is used in the api request call. An example for the call, can be shown as

```
curl --location --request GET 'https://34.91.162.168:9200/*inspec*/_search?q="mcdb.cloud_id":"<CLOUD_ID>"&q=status:failed&size=10' --header 'kbn-xsrf: true'  --header 'Content-Type: application/json' --header 'Authorization: ApiKey <BASE64_API_KEY>' --data-raw '{"sort": { "timestamp": "desc" }}'
```

where &lt;CLOUD_ID&gt; is the id of the cloud account the query is being called for.

- If an ssl error is encountered with the curl command, rerun the curl request with the -k flag enabled.

An important note here is that anyone who is using the API will need to know what fields they are trying to query, in this request the query is "q=status:failed". If a user attempts to export the dashboard as a whole, you will only get visualizations for the dashboard, instead of useful data.

### Step 3 >> Securely share the API Key for the user.

- To send the Elastic password or API key securely you should use [SAP PassVault](https://password.wdf.sap.corp/passvault/#/home) to create an ad-hoc ephemeral link that can be shared _only_ with the authorized user in the ticket.
- Log on to [SAP PassVault](https://password.wdf.sap.corp/passvault/#/home) (if you have not logged on before you will be prompted to create a new password).
- You should be part of the MCS-Minerva UGMT Group. If you are not, please request access via the [UGMT](https://password.wdf.sap.corp/ugmt#).
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/ugmt.png">
</p>

- Once you are in the MCS-Minerva group, go to the PassVault [password creation tab](https://password.wdf.sap.corp/passvault/index#/create).
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/passvault_create.png">
</p>

- Complete and save the following details in the including the Username, any ticket reference and the API key file:
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/passvault_complete.png">
</p>

- Once the password has been created, go to the PasswordVault [password search tab](https://password.wdf.sap.corp/passvault/#/search) and find the credentials you just created. Click on the ellipsis to the far right of the credentials you just created, and click _Edit_:
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/passvault_edit.png">
</p>

- Click on _Ad hoc_ tab under the the Decrypt/ changing Authorization section (bottom right of screen) and then click the _Create new_ button:
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/passvault_adhoc.png">
</p>

- Set the _Validity duration_ to 48 hours and enter the user's staff number under _Read Authorization_ and add them. Save the changes:
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/passvault_id.png">
</p>

- Once this is completed successfully, you will be presented with an ephemeral link that will expire in 48 hours from it's creation that only the user can access. Copy the link:
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/passvault_id.png">
</p>

- Paste the link in to an encrypted e-mail to the user, and clearly state that the link is ephemeral and will expire in 48 hours.

### Step 4 >> Rotating and deleting API keys.

1. Rotating a key

- After 90 days an API key is expired, and a new API key must be created. Expired API keys cannot be renewed or reactivated. To rotate/request a new API key, the user must submit another ticket with a request for an API key, and the process from the beginning is restarted.

2. Deleting a key

- On the home dashboard, click on the dropdown on the top left corner, and then scroll to the bottom and select 'Stack Management'. Then click on 'Users' in the management bar on the left side of the page.
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/step_2a_api_key.png">
</p>

- Select the keys you wish to delete, and then click "Delete API Keys"
<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/elastic_api_key_generation/delete_key.png">
</p>

- Confirm that you want to delete the selected key. Once a key is deleted, it is permanently gone, and a new key must be created if desired.
