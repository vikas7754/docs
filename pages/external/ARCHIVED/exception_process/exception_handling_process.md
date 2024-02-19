---
layout: default
title: "[ARCHIVE] Exception Handling Process"
nav_order: 1
parent: "[ARCHIVE] Exception Process"
grand_parent: ARCHIVED
has_children: false
---

# [ARCHIVE] Exception Handling Process

```
Status RELEASED
Document owner Herre, Thorsten
Document substitute Erler, Andre
Version 6
Last Modified 01.12.2021
```

## Table of Contents

1. Introduction
   - 1.1 Definitions
   - 1.2 How to use the Exception Process
2. Exceptions for preventive & detective hyperscaler security controls
   - 2.1 How to request an Exception
   - 2.2 SGS Review (risk & impact assessment)
   - 2.3 Self-tagging Exceptions for a subset of controls
     - 2.3.1 Affected HIGH controls
     - 2.3.2 Affected preventive controls (Secure-by-default controls)
   - 2.3.3 How to implement the tags
     - 2.3.3.1 AWS
     - 2.3.3.2 MS Azure
     - 2.3.3.3 GCP
     - 2.3.3.4 AliCloud

## 1. Introduction

### 1.1 Definitions

SAP uses so called "**Detective Controls**" to monitor the security configuration of ALL SAP Hyperscaler Accounts (e.g. Aws, GCP, Microsoft Azure & Alibaba Cloud) towards the SAP Hyperscaler Security Reference Architecture and configuration standards. These security configuration requirements are defined by SAP Global Security and published in the Security Policy Framework / Wiki.

The detective controls are divided by their ratings (HIGH, MEDIUM, LOW), which reflect the SAP Global Security mandatory baseline and additional requirements for critical cloud business:

- HIGH rated control = **MUST** / Baseline requirement in Security Wiki
- MEDIUM rated control = **SHOULD** requirement in Security Wiki
- LOW rated control = optional requirements in the Security wiki or even not mentioned.

Furthermore to ensure a **Secure-by-Default** baseline throughout ALL SAP Hyperscaler Accounts, a policy-as-code deployment (Secure-by-Default controls) will be enforced centrally by the Hyperscaler team. Target is, to get all SAP Hyperscaler Accounts on the same security level / denominator, independent which hyperscaler platform is used (AWS, GCP, MS Azure & Alibaba Cloud). These controls are mapped to their corresponding HIGH detective controls and act as a "preventive control" for SAP hyperscaler accounts.

In general, Secure-by-Default Controls also known as preventive controls **MUST** be fulfilled by each LoB, independent if the hyperscaler scenario is considered as dev, test, "crash & burn" or as a productive hyperscaler scenario. The overall target with the enforcement of the Secure-by-Default Controls is, to setup a secure baseline across all SAP cloud environments.

There might be critical technical or business reasons to delay the enablement of a Secure-by-Default control in a Cloud Area. In such limited cases there is the possibility to request an exception.

This wiki defines HOW non-compliance / findings are managed between:

- the Hyperscaler Account Owners (e.g. SAP LoBs & CBGs),
- the SAP Hyperscaler (HSO) Team and SAP Global Security (SGS).

### 1.2 How to use the Exception Process

It is not required to open a exception ticket for **every** alert, but tickets should be opened for groups of alerts. As an example, a ticket is opened for an exception on the following detective control: _" SAP: 1.10.13 - AWS S3 buckets are accessible to public"._ The exception request then covers all the alerts regarding public S3 buckets for the account or account group. This also implies that exceptions are granted on account level or account group level.

In addition to that, it is necessary to request exceptions for HIGH (detective & preventive) controls as well as MEDIUM (detective) controls. Regardless of the control severity, all HIGH and MEDIUM controls **SHOULD** be fixed in the first place, and exception **SHOULD** only be requested, if it's the only remaining option.

- HIGH are reflected by **MUST** requirements in the SAP Security Policy Framework and are mandatory requirements to implement. In the **_SGS Review (2.2)_**, these controls refer in most cases to a HIGH risk.
- MEDIUM are reflected by **SHOULD** requirements in the SAP Security Policy Framework. These state a requirement which under certain circumstances may not be implementable, but it is required though that if a requirement is not implemented, a valid reason for this exists and implications are understood. In the **_SGS Review (2.2)_**, these controls refer in most cases to a MEDIUM risk.
- LOW controls are reflected by OPTIONAL requirements and **MUST NOT** be submitted via exception Process. LoB can decide by their own if they want to comply to this requirement or not.

## 2. Exceptions for preventive & detective hyperscaler security controls

### 2.1 How to request an Exception

The exception **MUST** be submitted in the [SAP Global Security(SGS) -Security Exception Management Process (SEMP)](https://wiki.wdf.sap.corp/wiki/x/IS_6jQ)[.](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=2377789217)

<button className="btn btn-purple mx-auto">
  <a href="https://securityjira.wdf.sap.corp/login.jsp?permissionViolation=true&os_destination=/secure/CreateIssue!default.jspa?pid=16607&issuetype=10000&priority=3">
    Exception Request
  </a>
</button>

Make sure that every parameter mentioned in chapter 2.2 is filled out appropriate. Especially the **REASON** for the exception **MUST** be described in a comprehensive & understandable way, to finally make the evaluation of the exception faster and effective.

A detailed description of the **process steps** and a **workflow chart**, as well as an explanation for the **roles & responsibilitie**s and **guidance on how to request the exception** can be found on the [SEMP](https://wiki.wdf.sap.corp/wiki/x/IS_6jQ) [Wiki](https://wiki.wdf.sap.corp/wiki/x/IS_6jQ) page.

[SGS SEMP](https://wiki.wdf.sap.corp/wiki/x/IS_6jQf80d020c8fddacd4bcb02&sys_id=705c37d31ba07850d9c921fbbb4bcb4c){: .btn .btn-blue .v-align-middle }

**_Emergency Request: Disruption of productive business_**  
 _In case an exception for a detective or preventive control is needed **AND** the SGS Topic Owner and his/her substitutes are not available **AND** major business disruption could be caused, the Hyperscaler Ops team is empowered to grant an exception for 7 days without the acknowledgement from SGS. The LoB may then raise an Incident directly on the Multi Cloud Service Now for implementation of the exception:_

[GCS SNOW](https://sap.service-now.com/sp?id=sc_category&catalog_id=09a3ed6a1b2f80d020c8fddacd4bcb02&sys_id=705c37d31ba07850d9c921fbbb4bcb4c){: .btn .m-auto }

_Furthermore, if the expiration of an exception disrupts productive cloud business, the HSO team can extend the validity of the exception for four weeks. In this period the issue has to be fixed._

### 2.2 SGS Review (risk & impact assessment)

SGS DA Team functions as the SGS Topic Manager and is responsible for providing the **_SGS Review_** of the exception request. With the result, the LoB together with the Business Unit Security Officer are asked to proceed in the **_Business Unit Review_**.

For the **_Exception Acknowledgement_** the **_Response Plan_** **MUST** be documented and approved by the Business Unit Security Officer.

To facilitate the **_SGS Review_**, the following pre-requisites needs to be added to the Jira exception request:

- **Detective/Preventive control name:**
  < specifiy control name >
- **Hyperscaler Account name:**
  < specify Hyperscaler account/project/subscription name >
- **L1 Unit & Affected LoB:** < specify L1 Unit & LoB >
- **REASON FOR EXCEPTION:**
  < specify: e.g. false positive or not applicable because... >

Only with the filled out parameters, the **_SGS Review_** can be processed by SGS DAD team. SGS DA decides based on the provided reason, what kind of criticality the Impact level will have.

**IMPORTANT**: The result of the **_SGS Review_** does not mean, that an exception is approved. The SGS DAD team **DOES NOT** approve an exception overall!

Detailed information can be found here: [Exception Handling Process](https://wiki.wdf.sap.corp/wiki/display/itsec/Procedure+Exception+Handling+Process)

The Exeption handling Jira items will be processed by SGS DA team. Jira items will be processed/evaluated IRT = 3 days (IRT = Initial Reaction Time).

Exceptions are implemented by the SAP Hyperscaler team for the respective Account/Project/Subscription after the Impact Assessment result is provided by SGS DA team.

### 2.3 Self-tagging Exceptions for a subset of controls

#### 2.3.1 Affected HIGH controls

For some special HIGH controls, the LoB is empowered to implement the exception themselves, after the LoB went through the exception process.

The following controls have this feature enabled:

- **Amazon Web Services**
  - SAP: 1.40.01.05 - AWS Security Group does not restrict traffic to Telnet port from internet
  - SAP: 1.40.01.04 - AWS Security Group does not restrict traffic to File sharing ports from internet
  - SAP: 1.40.01.03 - AWS Security Group does not restrict traffic to Infrastructure ports from internet
  - SAP: 1.40.01.02 - AWS Security Group does not restrict traffic to Admin ports from internet
  - SAP: 1.40.01.01 - AWS Security Group does not restrict traffic to DB ports from internet
  - SAP: 1.10.13 - AWS S3 buckets are accessible to public
  - SAP: 1.10.13 - AWS S3 Bucket has Global GET Permissions enabled via bucket policy
  - SAP: 1.60.06 - AWS Amazon Machine Image (AMI) is publicly accessible
  - SAP: 1.50.01 - AWS EBS volumes are not encrypted
  - SAP: 1.50.02 - AWS S3 buckets do not have server side encryption
- **Google Cloud Platform**
  - SAP: 1.40.01.05 - GCP Firewall rule with Inbound traffic to Telnet port from the internet
  - SAP: 1.40.01.04 - GCP Firewall rule with Inbound traffic to blocklisted File sharing ports from internet
  - SAP: 1.40.01.03 - GCP Firewall rule with Inbound traffic to blocklisted Infrastructure ports from internet
  - SAP: 1.40.01.02 - GCP Firewall rule with Inbound traffic to blocklisted Admin ports from internet
  - SAP: 1.40.01.01 - GCP Firewall rule with Inbound traffic to blocklisted DB ports from internet
  - SAP: 1.40.07 - GCP Storage buckets are publicly accessible to all users
- **Microsoft Azure**
  - SAP: 1.40.01.05 - MS Azure Network Security Group does not restrict traffic to Telnet port from internet
  - SAP: 1.40.01.03 - MS Azure Network Security Group does not restrict traffic to Infrastructure ports from internet
  - SAP: 1.40.01.02 - MS Azure Network Security Group does not restrict traffic to Admin ports from internet
  - SAP: 1.40.01.01 - MS Azure Network Security Group does not restrict traffic to DB ports from internet
  - SAP: 1.40.01.04 - MS Azure Network Security Group does not restrict File sharing ports from internet
  - SAP: 1.40.05 - Azure storage accounts has blob container(s) with public access
  - SAP: 1.40.05 - Storage Accounts without Secure transfer activated
- **Alibaba Cloud**
  - SAP: Alibaba Cloud Security Group allow internet traffic to blocklisted Telnet port
  - SAP: Alibaba Cloud Security Group allow internet traffic to blocklisted database ports
  - SAP: Alibaba Cloud Security Group allow internet traffic to blocklisted admin ports
  - SAP: Alibaba Cloud Security Group allow internet traffic to blocklisted infrastructure ports
  - SAP: Alibaba Cloud Security Group allow internet traffic to blocklisted file sharing ports

#### 2.3.2 Affected preventive controls (Secure-by-default controls)

The following preventive controls can also be excepted by implementing the tags:

- Security groups shall not contain Internet ingress 0.0.0.0/0 rules for blacklisted ports.
- API Logging central storage location must not be public accessible (AWS CloudTrail, Azure Activity Logs, GCP Cloud Admin logs).
- Non-encrypted buckets are per default not allowed (only for AWS and Azure).
- Public buckets are per default not allowed (newly created buckets).

### 2.3.3 How to implement the tags

SAP Global Security is monitoring the use of this label and will randomly review the exceptions done this way, by confirming the LoBs/CBGs use case / business reason for the exceptions.

#### 2.3.3.1 AWS

The exception must be implemented by tagging the affected resources. Resources with this tag will be excluded from the alerts automatically. The tag has to be implemented as follows:

1. For tags mentioned for the following security group polices, the key will be: "**sec-by-def-network-exception**". The exception will be done on port-level and this will be defined in the value. So the value may be "SSH" or "RDP" if you want an exception for either one port, or "SSH, RDP" if both ports should be excepted.

   An example may look like as follows: **[sec-by-def-network-exception: SSH, RDP]**

   ![AWS_Tagging](/assets/docs-images/exception_handling_process/AWS_Tagging.png)

   Further information on how tags are implemented can be found in chapter 3.2.1 of this wiki-page.  
   The following table shows all accepted values for a security group exception:

   | Detective control                                                                                    | Key                          | Accepted values for the tag                  |
   | ---------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------------------------- |
   | SAP: 1.40.01.05 - AWS Security Group does not restrict traffic to Telnet port from internet          | sec-by-def-network-exception | Telnet                                       |
   | SAP: 1.40.01.01 - AWS Security Group does not restrict traffic to DB ports from internet             | sec-by-def-network-exception | PostgreSQL, MySQL, MSSQL, OracleSQL, MongoDB |
   | SAP: 1.40.01.02 - AWS Security Group does not restrict traffic to Admin ports from internet          | sec-by-def-network-exception | SSH, RDP, VNC, RPC, RSH                      |
   | SAP: 1.40.01.03 - AWS Security Group does not restrict traffic to Infrastructure ports from internet | sec-by-def-network-exception | DNS, HTTP, POP3, SMTP, DHCP, SNMP            |
   | SAP: 1.40.01.04 - AWS Security Group does not restrict traffic to File sharing ports from internet   | sec-by-def-network-exception | NetBIOS, SMB, FTP, TFTP                      |

   Additional information can be found here: [Amazon Web Services Hardening Procedure 1.40.01](https://wiki.wdf.sap.corp/wiki/display/itsec/Amazon+Web+Service+-+Hardening#AmazonWebServiceHardening-1.40Networking%E2%80%93configuringsecureaspectsofVPC)

2. Other special HIGH policies:
   1. For "_SAP: 1.10.13 - AWS S3 buckets are accessible to public_" & "_SAP: 1.10.13 - AWS S3 Bucket has Global GET Permissions enabled via bucket policy_" the key is the following: "**sec-by-def-public-storage-exception**" and the value is "**enabled**".
   2. For "_SAP: 1.50.01 - AWS EBS volumes are not encrypted"_ the key is the following: "**sec-by-def-ebs-encryption-exception**" and the value is "**enabled**".
   3. For " _SAP: 1.60.06 - AWS Amazon Machine Image (AMI) is publicly accessible_ " the key is the following "**sec-by-def-public-image-exception**" and the value is "**enabled**".
   4. For "SAP "SAP: 1.50.02 - AWS S3 buckets do not have server side encryption" the key is the following: "**sec-by-def-encrypt-storage-exception**" and the value is "**enabled**".

#### **2.3.3.2 MS Azure**

The exception must be implemented by tagging the affected resources. Resources with this tag will be excluded from the alerts automatically. The tag has to be implemented as follows:

1.  For tags mentioned for the following security group polices, the key will be: "**sec-by-def-network-exception**". The exception will be done on port-level and this will be defined in the value. So the value may be "SSH" or "RDP" if you want an exception for either one port, or "SSH, RDP" if both ports should be excepted.  
    An example may look like as follows: **[sec-by-def-network-exception: SSH, RDP]**

        ![Azure_tagging](/assets/docs-images/exception_handling_process/Azure_tagging.png)

        Further information on how tags are implemented can be found in chapter 3.2.1 of this wiki-page.
        The following table shows all accepted values for a security group exception:

        | Detective control | Key | Accepted values for the tag |
        | --- | --- | --- |
        | SAP: 1.40.01.05 - MS Azure Network Security Group does not restrict traffic to Telnet port from internet | sec-by-def-network-exception | Telnet |
        | SAP: 1.40.01.01 - MS Azure Network Security Group does not restrict traffic to DB ports from internet | sec-by-def-network-exception | PostgreSQL, MySQL, MSSQL, OracleSQL, MongoDB |
        | SAP: 1.40.01.02 - MS Azure Network Security Group does not restrict traffic to Admin ports from internet | sec-by-def-network-exception | SSH, RDP, VNC, RPC, RSH |
        | SAP: 1.40.01.03 - MS Azure Network Security Group does not restrict traffic to Infrastructure ports from internet | sec-by-def-network-exception | DNS, HTTP, POP3, SMTP, DHCP, SNMP |
        | SAP: 1.40.01.04 - MS Azure Network Security Group does not restrict traffic to File-sharing ports from internet | sec-by-def-network-exception | NetBIOS, SMB, FTP, TFTP |

        *Secure-by-default tag structure*
        - For the Azure policies, it is crucial that the values are configured exactly in the order as described in the table above, e.g.:
                - Key: **sec-by-def-network-exception**, value: '**SSH, VNC, RSH'**
                - If the value will be set to **VNC, RSH, SSH** the policy will **NOT** accept this tag for the exception.Additional information can be found here: [Microsoft Azure Hardening Procedure 1.40.01](<https://wiki.wdf.sap.corp/wiki/display/itsec/Microsoft+Azure+-+Hardening#MicrosoftAzureHardening-1.40Networking%E2%80%93configuringsecureaspectsofNetworkSecurityGroups(NSG)>)

2.  For the other special HIGH policies:
    1.  "_SAP: 1.40.05 - Azure storage accounts has blob container(s) with public access_" the key is the following: "**sec-by-def-public-storage-exception**" and the value is "**enabled**".
    2.  "_SAP: 1.40.05 - Storage Accounts without Secure transfer activated_" the key is the following: "**sec-by-def-encrypt-storage-exception**" and the value is "**enabled**".

#### 2.3.3.3 GCP

The exception must be implemented by tagging the affected resources. Resources with this tag will be excluded from the alerts automatically. The label has to be implemented as follows:

1. For tags mentioned for the following firewall rule polices in GCP, the following **labels** will be used as it is not possible to use key-value pairs:

   | Detective control                                                                                                   | Label                                    |
   | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
   | SAP: 1.40.01.05 - GCP Firewall rule with Inbound traffic from the internet to telnet port on the blocklist          | sec-by-def-telnet-port-exception         |
   | SAP: 1.40.01.01 - GCP Firewall rule with Inbound traffic from the internet to DB ports on the blocklist             | sec-by-def-database-port-exception       |
   | SAP: 1.40.01.02 - GCP Firewall rule with Inbound traffic from the internet to admin ports on the blocklist          | sec-by-def-admin-port-exception          |
   | SAP: 1.40.01.03 - GCP Firewall rule with Inbound traffic from the internet to Infrastructure ports on the blocklist | sec-by-def-infrastructure-port-exception |
   | SAP: 1.40.01.04 - GCP Firewall rule with Inbound traffic from the internet to file sharing ports on the blocklist   | sec-by-def-fileshare-port-exception      |

   It is important to notice that exceptions in GCP are not per port but per Policy and each policy covers multiple ports. Information on how to tag firewall rules in GCP can be found in chapter 3.2.3. An example may look like this:

   ![gcp_tagging](/assets/docs-images/exception_handling_process/gcp_tagging.png)

2. For the other special HIGH policy:  
   "_SAP: 1.40.07 - GCP Storage buckets are publicly accessible to all users_" the key is the following: "**sec-by-def-public-storage-exception**" and the value is "**enabled**".

#### 2.3.3.4 AliCloud

For tags mentioned the in following security group polices, the key will be: "**sec-by-def-network-exception**". The exception will be done on port-level and the port is defined in the value. So the value may be "SSH" or "RDP" if you want an exception for either one port, or "SSH, RDP" if both ports should be excepted.

An example may look like as follows: **[sec-by-def-network-exception: SSH, RDP]**

1. Go to the ECS Service from AliCloud and move to Security Groups. Select the affected Security Group, toggle the box and click on "Edit Tags":  
   ![alicloud_tagging](/assets/docs-images/exception_handling_process/alicloud_tagging.png)

2. Enter the tag and the value and click on "Confirm". The result may look like the following example:  
   ![alicloud_tagging2](/assets/docs-images/exception_handling_process/alicloud_tagging2.png)

This table shows all accepted values for a security group exception:

| Detective control                                                                            | Key                          | Accepted values for the tag                  |
| -------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------------------------- |
| SAP: Alibaba Cloud Security Group allow internet traffic to blocklisted Telnet port          | sec-by-def-network-exception | Telnet                                       |
| SAP: Alibaba Cloud Security Group allow internet traffic to blocklisted database ports       | sec-by-def-network-exception | PostgreSQL, MySQL, MSSQL, OracleSQL, MongoDB |
| SAP: Alibaba Cloud Security Group allow internet traffic to blocklisted admin ports          | sec-by-def-network-exception | SSH, RDP, VNC, RPC, RSH                      |
| SAP: Alibaba Cloud Security Group allow internet traffic to blocklisted infrastructure ports | sec-by-def-network-exception | DNS, HTTP, POP3, SMTP, DHCP, SNMP            |
| SAP: Alibaba Cloud Security Group allow internet traffic to blocklisted file sharing ports   | sec-by-def-network-exception | NetBIOS, SMB, FTP, TFTP                      |
