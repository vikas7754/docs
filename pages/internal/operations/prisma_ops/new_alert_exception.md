---
layout: default
title: "Alert Suppression Procedure"
parent: Prisma Ops
grand_parent: Operations
has_children: true
nav_order: 3
---
## Alert Suppression Procedure

 - Step 1 - Open an ITDirect ticket for Alert Exception Approval
 - Step 2 - Make a ticket for alert suppression on the Multi-Cloud JIRA


### Step 1
 - Open an ITDirect ticket for Alert Exception Approval
Use the following link to create the ticket: [Alert Exception Ticket](https://fiorilaunchpad.sap.com/sites#Help-Create&/create)

 - Use Category ID: **SRAS_SEC_APPROVAL** | Category Description: **Security Architecture Advisory by Global Security** | Summary: Please include ‘Exception Request’ along with information on the alert and assets in scope. E.g.: ‘Exception Request for AWS S3 Bucket has Global GET Permissions enabled via bucket policy’

- Please include the following in the description: Alert Signature, Description of the alert, AWS Account ID(s), and Affected assets.

- Also, Kindly include the business case for the exception, including -

   Business/technical reason for vulnerability cannot be fixed
Factors already in place that reduce the vulnerability’s risk
Long-term plan for addressing the risk of the vulnerability
Upon receiving the exception approval from SGS, please follow Step 2

### Step 2
- Make a ticket for alert suppression on the Multi-Cloud JIRA
Use the following link to create the ticket: [Alert Supression Ticket](https://servicedesk.multicloud.int.sap)

 - Select the **‘PrismaCloud'** request type and then the **‘Customization Request’** option
 - Line of business should correspond to the service that the alert suppression is being requested for
 - Please include in the description - The ITDirect ticket number along with the approval and the details (Alert Signature, Description of the alert, AWS Account ID(s), and Affected assets)
 - Please submit the ticket.

   Multi-Cloud Team will update you once the exception is in place.

For particular high policies, LOBs are empowered to grant exceptions and suppress the alerts on their own (meaning the service owner or security officer). Please see the following link for more details:

<https://wiki.wdf.sap.corp/wiki/display/itsecurity/Prisma+Cloud+Exception+Handling+Process#:~:text=for%20Storage%20%26%20Network-,2.4.1%20Affected%20HIGH%20policies,-For%20some%20special>

For low and medium policies, LOBs are empowered grant exceptions and to suppress the alerts on their own (meaning the service owner or security officer). Please see the following link for more details:

<https://wiki.wdf.sap.corp/wiki/display/itsecurity/Prisma+Cloud+Exception+Handling+Process#PrismaCloudExceptionHandlingProcess-3.ExceptionsforLOW-andMEDIUM-ratedPrismaPolicies>
