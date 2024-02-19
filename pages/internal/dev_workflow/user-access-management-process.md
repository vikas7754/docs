---
layout: default
title: User Access Management process
nav_order: 2
parent: Dev WorkFlow
grand_parent: Internal Documentation
---
# User Access Management process
This document describes the **User Access Management** (UAM) process to handle
user access and revocation to the Security Cloud Compliance Scanning Framework
production systems such as GCP **sap-mcsec-inspec-prod** project and ELK. This
concerns user onboarding and offboarding, as well as temporary permissions to
carry out a specific task.

A UAM request falls under a Change Management (CM) request, for which the [CM
process](./change-management.md) must be followed. The majority of UAM requests
should be a standard low risk change. However, for users offboarding the CM
ticket should have a **HIGH** priority.

The following roles have been identified:

| **Role** | **System** | **Permissions** | **Usage** |
| ---------|------------|-----------------|-----------|
| Owner | GCP | All | Don't miss important notifications |
| Admin | GCP, ELK | Read and write on all resources | Administration and management of the system |
| UAM admin | GCP, ELK | Read and write of users | Administration and management of users |
| Editor | ELK | Read and write of dashboard resources | Administration and management of dashboards |
| Viewer | GCP, ELK | Read resources | - team members and sgs people to see kibana dashboards<br>- team members when on patch management duty to check GCP production system status|

During onboarding the standard role should be viewer for
most users. If a user needs temporarily elevated permissions to perform some
specific task, a justification must be provided in the ticket request.

A zenhub ticket using the CM template is used to create UAM tickets. As UAM is
just a special case of Change Management, the ticket creator needs to add *UAM*
in the ticket title prefix.

**Note**: as zenhub is only available to the SecOps team, tikets from external
requests can only be added by a team member.

## Offboarding Process

After a team member has left the team, a UAM ticket should be created to offboard the user from all necessary team accounts and communications. 

Offboarding should include:

1. Removal from any Hyperscaler or ECK accounts the team uses.
2. Removal from any pipeline access the team uses.
3. Removal from any mailing lists the team is part of. 
4. Removal from any private team slack channels.
5. Notify Github adminstrators the person is no longer in the team. 
6. Knowledge Transfer task should be completed. 
7. Removal from any exisiting tasks.
8. Remove user from any team documentation. 

### TRU or Security Officer for cloud account leaving
Where the person leaving is a TRU or Security officer for a team account, it should be agreed before hand who is taking over as the TRU or Security Officer within the team and this should be updated in the UAM ticket. 

### Knowledge transfer
Defined areas of knowledge transfer should be included in the ticket, and be updated with progress before the team member leaves. 

### Removing users from existing tasks
When removing a departing team member from a ZenHub task, make sure the task is still valid, and if so, is either placed in to backlog if it is low priority, or has another team member assigned to it. 

## UAM approvers
Following is a list of approvers for UAM requests. Normal approvals for UAM
tickets are done by UAM admins. In exceptional cases (e.g. when a UAM admin is
not available) a normal Admin can also approve the request.

Each request needs 2 approvals.


| **Name** | **I-number** | **Time zone** | **Role** | **System** |
| ---------|--------------|---------------|----------|------------|
| John Conway | I552669 | Greenwich Mean Time | UAM Admin | ELK |
| Joshua Bowman | I541354 | Eastern Standard Time | UAM Admin | ELK |
| Usman Rajput | I551248 | Greenwich Mean Time | UAM Admin | GCP |
| Justin Nikles | I506539 | Eastern Standard Time | UAM Admin | GCP |
| Maoliang Gu | I561497 | China Standard Time | UAM Admin | ELK, GCP |
|=============|=========|=====================|===========|==========|
| Andrea Edwards | I866863 | Central Standard Time | Admin | ELK |
| Justin Nikles | I506539 | Eastern Standard Time | Admin | GCP |
| Carmelo Ragusa | I069103 | Greenwich Mean Time | Admin | GCP, ELK |
| Rohit Prasad Joshi | I539556 | Pacific Standard Time | Admin | GCP |
| James Yan | I355896 | Singapore Time | Admin | GCP |
| Jatin Rajpura | I500686 | China Standard Time | Admin | GCP Singapore |

