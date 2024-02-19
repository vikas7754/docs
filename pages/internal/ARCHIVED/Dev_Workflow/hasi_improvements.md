---
layout: default
title: "[ARCHIVE] HaSi improvements"
parent: "[ARCHIVE] Dev WorkFlow"
grand_parent: ARCHIVED
has_children: false
---

# Hardening SecDevOps Minerva Cloud Security Delivery Infrastructure
As part of SAP security standards, the Minerva infrastructure was subject to a
thorough security penetration test (formerly HASI). A number of findings emerged
and security improvements were recommended. Below is a brief overview of some
interesting tasks done to implement the recommended improvements and address the
HASI findings.

Although the recommended security improvements should be considered common
practice, they are not always implemented and possibly overlooked. We would like
to share our personal experience so that others may see the benefits and perhaps
consider implementing these security improvements in their respective
landscapes.


## Workload identity
The Workload Identity allows GKE applications to access GCP services in a secure
fashion and is the GCP recommended way.

The Minerva infrastructure is based on GKE; the GCP managed Kubernetes
provision.  GKE services that run in pods use Kubernetes service accounts as
identity. On the other hand, GCP uses IAM service accounts to allow access to
GCP services.  Enabling the Workload Identity allows Kubernetes service accounts
to act as IAM service accounts to access GCP services. This way, pods that use
the configured Kubernetes service accounts automatically authenticate as IAM
service accounts to access GCP APIs. When properly configured, this mechanism
allows a fine grained tuning of the authorization and authentication of GKE
applications.

An important component of the Workload Identity is the GKE Metadata Server,
which maintains important information such as:

- GCP project information
- GCP Nodes attributes
- GCP Service accounts associated to a node

This information is used by the Workload Identity to understand the specific pod
running in a node association with the IAM identity.

For more information please refere to the GCP documentation
https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity

In order for the Workload Identity to identify a Kubernetes service account, it
needs to use the namespace of the service account. We had already separated
different cluster services into their respective namespaces. Therefore, we made
a configuration decision to create multiple Workload Identities in each cluster
with each Workload Identity paired with the respective Kubernetes service
account in the service namespace. The result being a Workload Identity
configuration per namespace associated with the different services in that
particular namespace.

## GCP Service accounts and secrets configuration
As IAM service accounts are given roles to perform certain actions on Cloud
resources, using the same service account for all Kubernetes workloads is not
advisable. We already separated the different service accounts per workload as
described above. Furthermore, as service accounts need to access secrets to
perform certain operations, normally the secret-accessor role is given.
However, that role gives access to all secrets in the project which is also not
advisable. Therefore, rather than provide such role, we have configured each
relevant secret to allow access to the specific service account. The logic is
basically reversed where rather than being the service account able to access
all secrets, the secrets themselves allow access to only the service accounts
that need access.

## Kubernetes preventive controls and audit
Preventive controls in Kubernetes stop any uncompliant deployments from being
admitted into the cluster thereby earning it the title "Admission controller".
OPA Gatekeeper is the Admission Controller with which the preventive controls
are implemented.  Gatekeeper is a customisable admission control webhook, that
intercepts admission requests before they are persisted, enforcing policies that
are executed by the Open Policy Agent (OPA). Have custom policy needs for your
cluster? No worries.  Using OPA Gatekeeper, it is possible to write custom
policies in rego and familiar kubernetes YAML syntax.  Another interesting
feature is the possibility to exclude namespaces from any policy defined.  This
simply means that Gatekeeper will enforce any defiined policy on all namespaces
except the excluded namespace. In our case, this was an absloute win.

Aside from being an Admission Controller, Gatekeeper provides audit information
on deployments already running in the cluster before the introduction of
Gatekeeper to the cluster. This is a very useful feature to perform compliance
audits an already running deployments in a cluster.  Configurations made prior
to the Gatekeeper deployment cannot be stopped by the OPA, an audit of such
configurations against the control policies is generated. Such audit violations
can therefore be acted upon by developers without necessarely stopping the
running cluster.

PS: We would recommend redefining the scope of the webhook to exclude the
kube-system namespace in order to avoid breaking system pods and node
registration, or unpredictable behaviour of the cluster during upgrades.

More details can be found at
https://open-policy-agent.github.io/gatekeeper/website/docs/

Currently we have implemented the following contraint policies in our
landscapes, with more to be added in the future:

- host-namespace
- priviledge-escalation
- priviledged-container
- run-as-user-group

## Containers runtime scan
This feature allows scanning containers at run-time to detect any suspicious
activity based on defined rules. Falco was used to implement this functionality
(more details on Falco can be fount at https://falco.org/docs/). Falco comes
with a set of pre-defined rules that only need to be enabled. CVEs rules are
also available. Falco intercepts linux syscalls and generate alerts according to
the enabled rules.

In our landscapes, the following rules have been enabled, which are based on the
driver-loader image configuration at
https://github.com/falcosecurity/charts/tree/master/falco:

- proc-fs
- boot-fs
- lib-modules
- user-fs
- etc-fs
- driver-fs

## Intranode visibility
Intranode visibility uses VPC network for packets sent between Pods. This in
turn uses firewall rules, routes, flow logs, and packet mirroring configurations
for the packets. This allows to:

- flow logs can be seen for traffic between pods
- have firewall rules created for all traffic among pods, even on the same node
- clone traffic throufh Packet Mirroring for examination

More details can be found at
https://cloud.google.com/kubernetes-engine/docs/how-to/intranode-visibility
