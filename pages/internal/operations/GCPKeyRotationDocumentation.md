---
layout: default
title: "GCP Key Rotation"
parent: Operations
grand_parent: Internal Documentation
nav_order: 7
has_children: true
---

# GCP Key Rotation

In Secret Manager, check the following to check the current version of
the keys in place:

In *sap-mcsec-inspec-prod* project \> **Security** \> **Secret Manager**
\> _inspec-gcp-creds_

In _sap-mcsec-inspec-preprod_ project \> **Security** \> **Secret
Manager** \> _inspec-gcp-creds_

In _sap-mcsec-compliance-dev_ project \> **Security** \> **Secret
Manager** \> _poc-chef-scan-gcp_

![prisma_rotation_1](/assets/docs-images/GCPKeyRotationDocumentation/prisma_rotation_1.jpg)

In _sap-mcsec-compliance-dev_ project \> **Security** \> **Service
Accounts** \> go to
_gcp-mc-chefcompute-dev\@sap-mcsec-compliance-dev.iam.gserviceaccount.com_
\> click on Keys \> click on **Add Key** \> **Create New Key** \> open
key in text editing program of your choice \> copy text

![prisma_rotation_2](/assets/docs-images/GCPKeyRotationDocumentation/prisma_rotation_2.jpg)

Let's update the keys to the new version.

For example, In _sap-mcsec-compliance-dev_ project \> **Security** \>
**Secret Manager** \> _poc-chef-scan-gcp_ \> click on **Versions** \>
**New Version** \> paste text into secret value box and click on **Add
New Version**

In VS Code, use the github extension and navigate to the cloud
compliance folder.

Make sure you're logged into gcloud using the gcloud auth login command:

```
gcloud auth login
```

![prisma_rotation_3](/assets/docs-images/GCPKeyRotationDocumentation/prisma_rotation_3.jpg)

In GCP, go to **Kubernetes Engine** \> **Clusters** \> click on _inspec
cluster_ (or whatever cluster you're working on) \> click on **Connect**

![prisma_rotation_4](/assets/docs-images/GCPKeyRotationDocumentation/prisma_rotation_4.jpg)

Copy the command line access command to run in VS Code.

Example: _gcloud container clusters get-credentials inspec-cluster
\--region europe-west4 \--project sap-mcsec-compliance-dev_

The following is referring to gcp dev deployment and gcp dev dispatcher:

In VS Code, navigate to _infra/helm/sap-inspec-consumer_.

Use the following command: _cd infra/helm/sap-inspec-consumer_.

Check helm via command \> _helm list_ to see what versions are listed.
After confirming the versions, click on _values.dev.yaml_ \> under **GCP
Configuration**, change **_secretVersion_** to whatever the new version
is.

![prisma_rotation_5](/assets/docs-images/GCPKeyRotationDocumentation/prisma_rotation_5.jpg)

Apply rake command \>

```
rake \'deploy\[dev,gcp\]'
```

In VS Code, navigate to _infra/helm/sap-inspec-dispatchers_. Use the
following command: _cd infra/helm/sap-inspec-dispatchers_

Check helm via command to see what versions are listed \>

```
helm list
```

Click on _values.dev.yaml_ \> under **GCP Configuration**, change
**_secretVersion_** to whatever the new version is.

Apply rake command \>

```
*rake \'deploy\[dev,gcp\]\'
```

Run the following command to check your k8s
contexts \>

```
kubectl config get-contexts
```

Then run the following command (edited to fit the situation/cluster) to make
sure the next steps don't impact the wrong cluster \>

```
kubectl config delete-cluster
gke_sap-mcsec-inspec-preprod_europe-west4_inspec-cluster
```

Let's get the connect command for the next cluster.

In GCP, go to **Kubernetes Engine** \> **Clusters** \> click on _inspec
cluster_ (for prod) (or whatever cluster you're working on) \> click on
**Connect**

Get the command \> _gcloud container clusters get-credentials
inspec-cluster \--region europe-west4 \--project sap-mcsec-inspec-prod_

Copy the command line access command to run in VS Code.

In VS code, navigate to values.prod.yaml \> under _GCP Configuration_,
change **_secretVersion_**

In the same path (_sap-inspec-dispatchers_) \> run the rake command \>

```
rake \'deploy\[prod,gcp\]\'
```

Change directories to sap-inspec -consumers, using the command: _cd
infra/helm/sap-inspec-consumer_

Repeat the above steps for _values.prod.yaml_ under sap-inspec-consumer.

Run the rake command \>

```
*rake \'deploy\[prod,gcp\]\'
```

Run the following command to check your k8s contexts \>

```
kubectl config get-contexts
```

Then run the following command (edited to fit the situation/cluster) \>

```
kubectl config delete-cluster* (fill in the appropriate details)
```

\> **Cluster** \> to make sure the next steps don't impact the wrong
cluster

Repeat the above steps for _values.preprod.yaml_ (for
_sap-inspec-consumer_ and _sap-inspec-dispatcher_) as well.
