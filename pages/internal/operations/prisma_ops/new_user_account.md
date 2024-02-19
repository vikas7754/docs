---
layout: default
title: "Runbook: Adding New Users to Prisma Cloud"
parent: Prisma Ops
grand_parent: Operations
has_children: true
---

# Runbook: Adding New Users to Prisma Cloud

## Document Control

The document control section describes the revision history and summary of changes made in the document. It will serve as the version control
for the contents of the document.

## Revision History

```
Revision Number Revision Date Summary of Change Changed By
1.0 04.28.2020 Initial Draft Hyperscaler DevSecOps
```

- [STEP 1 >> Select Settings > Users and click + Add New.](#step-1------select-settings---users-and-click---add-new)
- [STEP 2 >> Enter First Name, Last Name, and Email of the user.](#step-2------enter-first-name--last-name--and-email-of-the-user)
- [STEP 3 >> Assign a Role to the user.](#step-3------assign-a-role-to-the-user)
- [STEP 4 >> Specify a Time Zone for the user and click Save.](#step-4------specify-a-time-zone-for-the-user-and-click-save)
- [STEP 5 >> Decide whether to enable API Access.](#step-5------decide-whether-to-enable-api-access)
- [STEP 6 >> After you add a user, you can edit or delete the user.](#step-6------after-you-add-a-user--you-can-edit-or-delete-the-user)

## Operational Procedures

### STEP 1 >> Select Settings > Users and click + Add New.

<p style="text-align: center;">
  <img width="" height="400" align="center" src="/assets/docs-images/new_user_account/add_user_first_image.png">

</p>

### STEP 2 >> Enter First Name, Last Name, and Email of the user.

<p style="text-align: center;">
  <img width="" height="400" align="center" src="/assets/docs-images/new_user_account/add_new_user.png">
</p>

### STEP 3 >> Assign a Role to the user.

Prisma Cloud Administrator Roles can be System Admin, Account Admin, Account Read Only, and Cloud Provisioning Admin.
Each Line of Business (LOB) has a unique role assignment.

<p style="text-align: center;">
  <img width="" height="400" align="center" src="/assets/docs-images/new_user_account/select_group.png">
</p>

- Default setting should be LOB Read-Only.
- Alert Creation requires the LOB Power-User Role.

### STEP 4 >> Specify a Time Zone for the user and click Save.

<p style="text-align: center;">
  <img width="" height="" src="/assets/docs-images/new_user_account/timezone.png">
</p>

- Lookup user in the [User Directory](https://people.wdf.sap.corp/#/)
- Set User Time to the indicated timezone.

### STEP 5 >> Decide whether to enable API Access.

- To add API rights search for the user and click on their email address.
- Once the user is opened just check mark the box that says API access.

<p style="text-align: center;">
  <img width="" height="" src="/assets/docs-images/new_user_account/add-new-admin-complete.png">
</p>

### STEP 6 >> After you add a user, you can edit or delete the user.

- To edit the details of an user, click the record and change any details.
- To disable an user, toggle the Status of the user.

<p style="text-align: center;">
  <img width="" height="" align="center" src="/assets/docs-images/new_user_account/manage-users.png">
</p>

## Troubleshooting

#### TBD

## About This Document

This document identifies and details the process to be followed when adding a new user to Prisma Cloud. This document outlines the process for Tier 1 support to complete ticket requests for access.

## Approval

```
Status: Pending Approval
Reviewed By:
Validated By:
Approved By:
```

## Document Conventions

### Abbreviations

```
Abbreviation Definition
LOB Line of Business
```

### Document History

```
Comment Name Date
Initial Draft
```
