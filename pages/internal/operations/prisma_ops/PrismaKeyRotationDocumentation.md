---
layout: default
title: "Prisma Key Rotation Documentation"
parent: Prisma Ops
grand_parent: Operations
has_children: true
---

# Prisma Key Rotation Documentation

In GCP \> change project to
**_sap-devsecops_**.

![prismarotation_1](/assets/docs-images/Prisma_Key_Rotation/prismarotation_1.jpg)

Navigate to **Secret Manager** \> look for _prisma_onboarder_key_.

In another tab, in GCP \> go to Cloud Functions \> click on
_prismacloud_api_updater_ \> click on edit \> click on dropdown for
_Runtime, Build and Connection Settings_ to check _prisma_key_version_ and
_prisma_key_id_.

![prismarotation_2](/assets/docs-images/Prisma_Key_Rotation/prismarotation_2.jpg)

In another tab, in GCP \> go to **Cloud Functions** \> click on
_prismacloud_api_updater_ \> click on **_Edit_** \> click on dropdown
for _Runtime, Build and Connection Settings_ to check
_prisma_key_version_ and _prisma_key_id_.

Once you've checked the above -- go back to the main **Cloud Function**
screen and click on **_onboard_account_** \> click on **_Edit_** \>
click on dropdown for _Runtime, Build and Connection Settings_ to check
_prisma_key_version_ and
_prisma_key_id_.

![prismarotation_3](/assets/docs-images/Prisma_Key_Rotation/prismarotation_3.jpg) ![prismarotation_4](/assets/docs-images/Prisma_Key_Rotation/prismarotation_4.jpg)

In the tab with the **Secret Manager** open \> click on
_prisma_onboarder_key_ \> click on **_New Version_** \> paste key that
you've created in Prisma (in [Prisma](prisma.tools.sap) \>
**_Settings_** \> **_Access Keys_** \> **_Add Access Key_** and set
expiration date\*) \> click on **_Add New Version_**.

\*_If you look at the \"prismacloud_api_updater\" code base, you\'ll see
that aside from deleting expired keys, it also makes sure that the max
expiration length is \~90 days so as long as an expiration date is set,
the key manager will always make sure that all the access keys are
within compliance._

![prismarotation_5](/assets/docs-images/Prisma_Key_Rotation/prismarotation_5.jpg)![prismarotation_6](/assets/docs-images/Prisma_Key_Rotation/prismarotation_6.jpg)

Back in the **_Cloud Functions_** tab, for the onboard_account function
\> update the _prisma_key_version_ and change the _prisma_key_id_ (which
is from Prisma; in
[Prisma](prisma.tools.sap) \>
**_Settings_** \> **_Access Keys_** \> The new key you've created \> ID)
\> Click on **_Next_** \> Click on **_Deploy_**.

![prismarotation_7](/assets/docs-images/Prisma_Key_Rotation/prismarotation_7.jpg) ![prismarotation_8](/assets/docs-images/Prisma_Key_Rotation/prismarotation_8.jpg)

Wait for the _onboard_account_ function to deploy successfully (or not).

![prismarotation_9](/assets/docs-images/Prisma_Key_Rotation/prismarotation_9.jpg)

Once successfully deployed, let's move on and update the
_prismacloud_api_updater_ with the same info.

Go to **_Cloud Functions_** \> click on _prismacloud_api_updater_ \>
click on **_Edit_** \> click on dropdown for _Runtime, Build and
Connection Settings_ \> update _prisma_key_version_ and _prisma_key_id_
with the same values you updated the onboard_account function with \>
Click on **_Next_** \> Click on **_Deploy_**.

![prismarotation_10](/assets/docs-images/Prisma_Key_Rotation/prismarotation_10.jpg) ![prismarotation_11](/assets/docs-images/Prisma_Key_Rotation/prismarotation_11.jpg)

![prismarotation_12](/assets/docs-images/Prisma_Key_Rotation/prismarotation_12.jpg)

Go to [Prisma](prisma.tools.sap) \>
**_Settings_** \> **_Access Keys_** \> Check to see if the expired
key(s) are gone from the UI.
