---
layout: default
title: CALM Automation
parent: CALM
grand_parent: Operations
nav_order: 2
has_children: true
---
# CALM Automation
##### _Steps to automate the CALM process and HSDB tips&tricks_

### **HSDB Authentication**

Get HSDB JWT (Hyperscaler DataBase/Json Web Token). This authenticates the 
following requests to update the accounts' security attributes  
[Official HSDB api ref](https://db.multicloud.int.sap/#tag/jwt-token)  
[Set your HSDB user password here](https://portal.multicloud.int.sap/settings)  
[HSDB password docs](https://github.tools.sap/mce/repose/blob/master/docs/creator/tutorial/2-setting-your-password.md)  

```
POST https://db.multicloud.int.sap/jwt-token/  

HEADERS: {
    "Content-Type": "application/json"
}

BODY: {  
    "username": "<your i/d/c number>",  
    "password": ""  
}  
```

| Field         | Example        | Comments  |
| :------------- |:-------------| -----|
| username      | "i337717"  | Must have logged into portal at least once |
| password      |  | Must pass the HSDB password strength check |


### **Update the accounts security attributes**
[Official HSDB api ref](https://db.multicloud.int.sap/#tag/scd)
```
PATCH https://db.multicloud.int.sap/scd/security-attributes/<HSDB ID>/

HEADERS: {
    "Authorization": "Bearer <jwt token>",
    "Content-Type": "application/json"
}

BODY: {
    "security_officer": "sap.employee01@sap.com",
    "environment": "DEV",
    "has_customer_data": "True",
    "has_personal_data": "True",
    "is_iso": "False",
    "is_soc": "False",
    "is_pci": "False"
}
```
| Field         | Example        | Comments  |
| :------------- |:-------------| -----|
| security_officer      | "sap.user01@sap.com"  | Must be active in SAP Corporate Active Directory |
| environment      | "PROD" / "QA" / "SANDBOX" / "DEV" / "LAB"      |   Pick one. All environments are subject to the same security controls |
| has_customer_data | "True" / "False"      | Pick one |
| has_personal_data      | "True" / "False" | Pick one |
| is_iso |"True" / "False" | Pick one |
| is_soc |"True" / "False" | Pick one |
| is_pci |"True" / "False" | Pick one | 

### **Renew Cloud Account Lease**
[Official HSDB api ref](https://db.multicloud.int.sap/#operation/scd_security-attributes_set_leased_until)
```
GET https://db.multicloud.int.sap/scd/security-attributes/<HSDB ID>/set_leased_until/
```
