---
layout: default
title: Azure Preventive Controls Exceptions
parent: Preventive Controls Exceptions
grand_parent: Exceptions
---

# Azure Preventive Controls Exceptions

This document outlines the steps for applying exceptions to Azure preventive controls.

## Pre-requisites

1. [Cloud Admin Account](/internal/onboarding/onboarding#provisioning-a-cloud-admin-account)
2. _Policy Contributor_ role in [Azure AD Privileged Identity Management (PIM)](https://portal.azure.com/#view/Microsoft_Azure_PIMCommon/ActivationMenuBlade/~/azurerbac)

## Login to Azure portal

Login to https://portal.azure.com/ with your [cloud admin account](/internal/onboarding/onboarding#provisioning-a-cloud-admin-account)

## To locate the subscription

1. Go to _Subscriptions_
2. Change all active filters (_Subscriptions/My role/Status_ etc.) to show **all** (e.g. _Subscriptions == **all**_)
3. In the _Search for any field_ search bar, search by subscription name or subscription ID

Note: You may have to switch between tenants in order to locate the subscription

## To switch between tenants

1. Click on user profile menu (top right-hand corner) -> _Switch directory_
2. Click on **Switch** button to switch between tenants

## Elevate privileges

Once the subscription has been located, follow these steps to activate _Policy Contributor_ role in Privileged Identity Management (PIM)

1. Go to _Azure AD Privileged Identity Management_ -> _My roles_ -> _Azure resources_
2. Under _Action_ field, click on **Activate** for the _Policy Contributor_ role
3. Enter ticket system type in _Ticket system_ field (e.g. https://securityjira.wdf.sap.corp)
4. Enter SEP number(s) in _Ticket number_ field (e.g. SEP-1234, SEP-1235)
5. Enter reason for activation in _Reason_ field (e.g. Add exceptions)
6. Click on **Activate**

Once approved, proceed to apply exception for the subscription.

## Apply exception for subscription

1. In the subscription, go to _Policies_ -> _Assignments_ -> (Assignment name) -> _Edit_
2. Under _Exclusions_, click on **...** button to launch scope selector
3. Click on _Please choose a Subscription_ field to expand dropdown list, enter subscription name, check the box next to subscription name to select it, then click on **Add to Selected Scope**
4. Confirm that the selected subscription has been added to the list _SELECTED SCOPE_, then click on **Save**, **Review + save**, **Save**
5. Once policy assignment has been updated successfully, you should see a notification stating _Updating policy assignment succeeded_ appear in the corner of the window
