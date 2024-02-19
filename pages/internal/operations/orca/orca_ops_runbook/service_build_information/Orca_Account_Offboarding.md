---
layout: default
title: Orca Ops Runbook - Orca Account Offboarding
parent: Service Build Information
grand_parent: Orca Ops Runbook
nav_order: 7
has_children: false
---

# Orca Ops Runbook - Orca Account Offboarding

This documentation will cover the process of offboarding an account from Orca.

# **Orca Account Offboarding**

> The account offboarding service aims to remove accounts from ORCA once the same accounts are marked as deleted in HSDB. It consists of two different GCP functions:

- Alert Dismiss Offline
- Account Offboard

## **Alert Dismiss Offline**

1. Retrieve all deleted accounts in HSDB

- In this cloud function, we begin by retrieving all the deleted accounts from HSDB.

2. Compile deleted accounts into a list

- Subsequently, we compile a list of all the accounts currently present in ORCA. If we find accounts marked as deleted in HSDB that also exist in ORCA, we create a list of those accounts that need to be deleted within ORCA.

3. Transitioning Deleted Accounts to offline in Orca

- We first take these accounts offline and dismiss any associated alerts for each one.

4. Upload account object to GCP Storage bucket

- Additionally, we create an object with the account ID and upload it to the GCP storage bucket, which is configured with a lifecycle rule to delete objects after 90 days.

5. Account Sanity Check

- Lastly, we conduct a daily sanity check to identify if any accounts marked for deletion still have alerts present in ORCA.

6. Slack Notification

- If any such accounts are identified, we compile a list of problematic accounts and send notifications to #hs_orca_offboarder slack channel.

<p align="center">
      <img width="" height="" align="center" src="/assets/docs-images/account_offboarding/alert_dismiss_offline.png">
 </p>

## **Account Offboard**

1. GCP Buckets with deletion accounts

- Files uploaded by the preceding service are stored in the GCP storage bucket named "orca-account-offboarder."

2. Object Lifecycle rule reaches 90 days get deleted

- This bucket has object lifecycle enabled, and it follows a policy to automatically delete objects 90 days after their creation date.

3. Cloud event pickup

- When an object is deleted, a cloud event triggers the associated cloud function.

4. Account Delete Function

- This function receives metadata related to the deleted object and utilizes the ORCA delete API to remove the account from ORCA.

<p align="center">
      <img width="" height="" align="center" src="/assets/docs-images/account_offboarding/account_delete.png">
 </p>

## **Conclusion**

> The account offboarder service plays a crucial role in automating the account deletion process within ORCA. Its two GCP functions, "Alert Dismiss Offline" and the "Account Offboard," work in tandem to ensure the seamless removal of accounts and dismissal of relevant alerts.

> Additionally, to enhance transparency and communication, all notifications generated during the account offboarding process are sent to #hs_orca_offboarder slack channel. This ensures that relevant team members stay informed about the status of account deletions and any potential issues, enabling a smoother and more efficient account management workflow.
