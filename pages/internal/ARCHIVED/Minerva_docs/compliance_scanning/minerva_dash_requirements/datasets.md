---
layout: default
title: "[ARCHIVE] Datasets"
parent: "[ARCHIVE] Minerva Dashboarding Requirements"
grand_parent: "[ARCHIVE] Minerva - Compliance Scanning"
has_children: false
---
# Data Sets
There are three immediately critical data sets, but potentially a growing number of data sources in scope for Minerva Dashboarding.

The three critical ones in scope for MVP and v1 are the ones below - with the third an aspirational goal at best for MVP, but certainly in scope for v1 release.

1. [Minerva Public Cloud Infrastructure Policy Compliance Scans](###Minerva-Public-Cloud-Infrastructure-Policy-compliance-scans)
2. [HSDB Account data, including organizational hierarchy and security attributes](##HSDB-data)
3. [HS Assets](###HS-Assets-data)

The following are out of scope for MVP and v1 release, but are deliverables for the 2nd half of 2022 as part of [Secure Cloud Delivery 2.0](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/Cjhxjf8S8dNdVUh5Ux6r2n).

4. [Cerberus (Compliance Drift reporting)](##Cerberus-(Compliance-Drift-Reporting))
5. Additional Minerva compliance scans
    1. [Minerva Compliance Drift Reporting](###Minerva-Compliance-Drift-Reporting)
    2. [Golden Image compliance scans](###Minerva-Golden-Image-compliance-scans)
    3. [Network Security compliance scans]()
    4. [Kubernetes and Container Security compliance scans]()
6. [HS DaaS resource asset inventory data](###Extended-HS-Assets-and-HS-DaaS-assets)

Finally, at as of yet unpredictable schedule and not particularly part of any SCD2 deliverables:

7. [Future HS or SGS data sources](##Future-HS-or-SGS-data-sources)

The list below identifies the specific data sources, rather than the numbered time line above. That is, all Minerva scans are bundled together, rather than in the numbered list above. The links jump directly to the appropriate section, though.

## Minerva Scan Alerts
Minerva is the heart of our compliance scans, with the public cloud infrastructure policy compliance scans the most obvious. However, as part of the SCD2 program, we cover compliance scans for four new areas as well. Luckily, we should be able to leverage our existing scan data enrichment and reporting pipeline for these additional use cases. 

### Minerva Public Cloud Infrastructure Policy compliance scans
The key data set for Minerva Dashboarding and the reason it exists at all - with other data sets providing further enrichment or additional use cases. This data (of course) is stored in our ELK stack, enriched with HSDB account data.

The data should allow us to show a current state view segmented by organizational hierarchy, cloud provider, environment type and other security attributes, as well as allow for time-based historical views segmented similarly. Through the link with cloud account IDs as well as resource IDs, we should also be able to combine this data with HSDB and HS Assets/HS DaaS data to further enrich the context of the compliance scans, for instance through alerts/cloud account and alerts/resources ratios that normalize security compliance posture across business units and board areas.

### Minerva Compliance Drift Reporting
[Cerberus](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/cIhuYtpopKrMh79OUXzEmo) is the Security Concept Generation Tool and guaranteed-to-be-secure-by-default IaC Generation and Deployment Tool developed out of the HS Network & Security Architecture team, led by Ryan Tolentino. During 2022 Cerberus will see an expansion of features, including integration with the Golden Image service, and become the only way to submit Security Concepts to SGS at all (planned to be expanded eventually to only require SGS interaction for cases requiring exceptions).

Landscapes we have security concepts/Cerberus templates for and can be marked in some way - best if deployed through Cerberus itself - should be in compliance upon deployment. But, will they remain that way? At least anecdotally we know that cloud landscapes often bear little relationship to their Security Concepts, which may be several years old - and landscapes may *never* have looked like their security concepts. At least with Cerberus deployments we will have a known-good starting point.

The compliance drift reporting therefore is a scan against the actual deployed landscape and the Cerberus template it supposedly was based on. While a direct detailed report card is best shared directly with account owners and securiyt officers, aggregated results should be viewable in OrcMinervaa Dashboarding, including comparisons between compliance posture of Cerberus deployed landscapes and those outside of it, through scatter plots and other visualizations. The assumption, of course, would be that Cerberus deployed lanscapes - even if drifted from their initial deployment state - are still statistically more in compliance as those continuing to opt for doing things themselves.

The goal would be to create pressure on teams not yet on the central Cerberus service and not meeting their compliance targets or falling below the Cerberus-deployed standard, and visualize the difference.

### Minerva Golden Image compliance scans
Related to the Compliance Drift reporting based on Cerberus, SCD2 commitments require us to provide compliance scans around the Golden Image central services developed out of HS Network & Security Architecture and for which the HS SecDevOps team will provide (light) Operational support.

The compliance verification scans will consist of two controls: 

1. Is the image deployed based on the HS provided hardened Golden Image?
2. What is the age of the image used?

The data set from such compliance scans should allow for reporting as an intersection of the two: i.e. Golden Image used or not, and relative age. That will allow for interesting scatterplots and comparative clustering!

### Minerva Network Security compliance Scans
Data for Network Security compliance scans are associated with the deliverables for [Workstream 6](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/E2JAstTDlMyKeH4KecGOOx) in SCD2. This workstream requires the deployment of:

1. DDoS Mitigation Service
2. Central DNS Service (initiative separate from SCD2 between GCS & SGS)
3. WAF instance Service

These services will initially be made available electively... but increasingly become mandatory, especially the first two, unless an exception is granted and mitigating controls are in place.

The Minerva compliance scanning will scan for whether cloud accounts have the service deployed to verify compliance, and make it visible how adoption is spread through board areas, business units and environment types. Here, too, comparisons between those who have deployed the service and who haven't should be possible.

### Minerva Kubernetes and Container Security compliance scans
As part of SCD2 [Workstream 8](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/IpaPaisD9Nui1smUDnZsZI), we are heavily involved in the creation of a security suite of tools for Kubernetes-based landscapes.

This security suite eventually will become mandatory and should be pre-deployed in cloud-native or Gardener-provisioned Kubernetes clusters. To ensure that these tools *remain* deployed and in-use, they are associated with Minerva compliance scanning against the Kubernetes and Container Security policy requirements, but also that Admission Control based on OPA Gatekeeper is deployed and which constraints are active, and that the yet-to-be-selected runtime security tool is in place.

As with all our other compliance scans, this data should be enriched through the usual pipeline, allowing for visualization based on organizational hierarchy and security attributes. Note that ideally we also have indicators (whether through Cerberus or Gardener) that the toolset was pre-deployed, or deployed by the cloud account admins themselves.

## HSDB data
The second critical data source is HSDB. This database holds the association between account IDs and organizatonal hierarchy (driven by cost object), ownership and roles, and security attributes and other metadata kept up to date by the [CALM processes](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/L1SDpSx7aeAY5uOFshC2bK).

This data already enriches the compliance scan data, but is valuable in its own right in any alerts/cloud account ratio-based data visualizations included in the [Dashboard Views](dashboardviews.md). Given that there is such a wide variety of number cloud accounts in use by particular business units, as well as varying preferences and deployment numbers on different providers, these ratios already have proven powerful in reporting - with the board area/company-wide ratio heatmaps already part of Tim McKnight's Monthly Security Report. 

In the concepts so far, the depth of these visualizations has been limited to the data included in the data exports via the [Multi Cloud Creator Accounts](https://db.multicloud.int.sap/admin/creator/account/) data export. This gives 4 layers of organizational hierarchy and cloud providers, but misses two more (practically) usuable organizational levels as well as the security attributes, including environment type. Being able to directly query the HSDB at full data level will be very powerful - including future security attributes or asset management required attributes yet to be defined.

As HSDB will host HS Assets data, as well as Minerva aggregate data, it would be ideal to let the database engine prepare the require data for data visualizations, rather than let the data visualization filter and aggregate data as needed, or spend resources on combining datasets. This both to reduce the data transferred and the computational load on the users' browsers.

## HS Assets and HS DaaS data
Within the context of Minerva Dashboarding, this primarily involves the inclusion of resource asset inventory data in compliance scan reporting. 

### HS Assets vs. HS DaaS
The eventual terminology is yet to be determined but for short-hand's sake, HS Assets refers to data collected "wide and shallow" by HS Engineering. This provides a running inventory of all cloud objects deployed in each cloud account, with IDs but little metadata. This allows us to count resources by type in each cloud account, as well as rolled up to higher organizational levels, cloud provider, and environment types. This data will be stored within HSDB.

HS DaaS (in our context) refers specifically to additional metadata collected from CloudHealth for particularly interesting resource types, i.e. "narrow and deep". This includes public IPs, VMs/instance IDs, VPCs/NSGs, load balancers and others, with the scope potentially to be expanded in the future. This data currently is collected into a storage bucket in AWS.

For the former there is a clear path to integration within HSDB, for HS DaaS data this is yet to be determined. Attention will focus on HS Assets data until the data becomes available through HS API (whether through direct data integration or via service account call to a remote API, intermediated by HS API).

### HS Assets data
HS Assets data specifically refers to the "wide but shallow" scans performed by HS Engineering and retrieved directly from the cloud provider APIs. This data will be accessible in the same way as HSDB data.

Similarly to cloud accounts in HSDB, resource asset inventory data allows us to normalize the number of alerts across the organization, provider and security attributes against the number of resources deployed - whether in total as proxy for the size of the landscape, or as proportion of (non-)compliant resources as percentage of the total number of a particular resource type. The alerts/cloud account ratio visualizations already included in [Dashboard Views](dashboardviews.md) could easily be conceived of based on alerts/resources ratios.

### Extended HS Assets and HS DaaS assets
HS Assets data specifically refers to the "narrow and deep" scans performed by the HS Technology Office and retrieved via the CloudHealth API. This avoid hitting the cloud APIs again, unnecessarily, as CloudHealth has already collected it. Unlike other scans this therefore does not add to the scan load (beyond what CloudHealth is already doing).

The data collected from this is in AWS. It is yet to be determined in Q1 how this data will be made accessible via HS API. Without clear timeline (to be decided between HS TO and HS Engineering), it is not yet clear when or how we can use this data for Minerva Dashboards.

The additional metadata for key resources such as compute instances, network groups, , load balancers, NAT gateways, disk volumes, storage buckets, as well as managed services eventually should give us increasingly better view on how resources are deployed in SAP's cloud account landscapes, and provide an invaluable tool for security incident response and even operational improvements.

## Cerberus (Compliance Drift Reporting)
>Note: see above for the [Minerva scans](###Minerva-Compliance-Drift-Reporting) related to compliance drift reporting)

[Cerberus](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/cIhuYtpopKrMh79OUXzEmo) data is required to know what the supposedly "good" state is of a particular landscape in a cloud account, and is therefore listed here as a separate data set. It is at the moment not immediately clear what data structures are involved or how this data would be accessed - or at what stage. For instance, the compliance scan itself may well handle this data integration to include pass/fail/skip results in the scans. There may therefore not be a particular need to query the Cerberus data base directly for security analytics in Minerva Dashboarding.

## Future HS or SGS data sources
It is likely that additional data sources will present themselves, including from tooling we ourselves operate. For instance, the scans from the proposed eBPF-based container runtime security tool will need to be enriched as well with HSDB data in order to become practically useful in the LoB teams. 

As always, the more we can combine datasets together, the more valuable they become - so the obvious combination of Minerva Kubernetes compliance scans and runtime tool scans is a given. However, we could also consider resource utilization data coming from Plutus/HS DaaS once it becomes available through HS API, as well as through mutual data exchange with SGS. They may be uncomfortable with sharing data in deep detail, but rolled up to a certain organizational level is likely feasible. Should a cloud-native vulnerability scanning tool be deployed out of [Workstream 7](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/r9yA9juGAjIcnxPXMOQyWw) as planned, this data set could be used in Minerva Dashboarding. Should that choice be Tanium, we may still be able to either have or get access to that data set.

As much of this remains uncertain, none of these additional data sets are explicit SCD2 deliverables - but an eye should be kept on how such data sets can be integrated into Minerva Dashboards as they come online, and prioritize accordingly.
