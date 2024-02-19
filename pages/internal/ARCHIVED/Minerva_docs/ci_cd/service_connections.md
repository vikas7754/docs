---
layout: default
title: "[ARCHIVE] Service Connections"
parent: "[ARCHIVE] CI/CD"
grand_parent: "[ARCHIVE] Internal Minerva Docs"
has_children: false
---

# Service Connections
Information on Azure DevOps service connections can be found here.

**Please do not give all pipelines access to a service connection unless a risk assessment has been done along with the topic delegates**

## Kubernetes Service Connection
When creating a kubernetes service connection on Azure DevOps, please do not create connections with kubernetes service accounts that have admin or cluster admin privileges. Service connections must be namespace-specific and make use of least-privilege principles.

After creating a service account with least privilege, you can get the secret for that service account by setting the environment variables SERVICE_ACCOUNT_NAMESPACE and SERVICE_ACCOUNT_NAME running the following command:

```
kubectl get secret $(kubectl get serviceaccounts $SERVICE_ACCOUNT_NAME -o custom-columns=":secrets[0].name" -n $SERVICE_ACCOUNT_NAMESPACE ) -o yaml -n $SERVICE_ACCOUNT_NAMESPACE
```