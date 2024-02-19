---
layout: default
title: "[ARCHIVE] Application-layer encryption"
parent: "[ARCHIVE] Dev WorkFlow"
grand_parent: ARCHIVED
has_children: false
---
# Application layer encryption
This feature allows encrypting K8s secrets, providing an additional layer of
security. Additional details can be found in the [GCP
page](https://cloud.google.com/kubernetes-engine/docs/how-to/encrypting-secrets).

In our implementation, a keyring called `k8s-keyring` is created. Keys are
created in the format of `<cluster-name>-app-key`,
e.g. `elastic-cluster-app-key`.  As each keyring must be the cluster location,
the SG cluster has its own keyring in `asia-northeast1` location.

Each key is set to be rotated after 1 year. After the first deployment all k8s
secrets are encrypted with the primary key version. Once the key is rotated, to
force secrets to be re-encrypted with the latest primary key version, a touch
(i.e. a simple modifications) of the secret should be performed. This can be
accomplished with an update of each secret annotation, e.g.:

```
kubectl get secrets --all-namespaces -o json | kubectl annotate --overwrite -f \
- encryption-key-rotation-time="TIME"
```
where TIME can be time of the next rotation, as e.g. `20230911-120922`.

Meeting reminders for each cluster in each infrastructure (dev, preprod and
prod) for the infra admins should be set to perform the above secrets
annotations command.
