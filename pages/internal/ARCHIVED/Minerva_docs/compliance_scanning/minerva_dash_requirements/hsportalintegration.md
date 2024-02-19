---
layout: default
title: "HS Portal Integration"
parent: Minerva Dashboarding Requirements
grand_parent: Minerva - Compliance Scanning
has_children: false
---
# HS Portal Integration
[Multi Cloud Portal](https://portal.multicloud.int.sap/) is already established as the main portal for Multi Cloud related information and access to services - most specifically the [Accounts](https://portal.multicloud.int.sap/accounts) section which we also use during security incidents to look up account owners and security officers, and in return account owners use to update their account metadata as part of the CALM process.

HS Portal is a thin client on top of HS API which is driven off of the content of HSDB, including RBAC, etc. 

## Central Multi Cloud Data Access Enablement (HS DaaS)
A couple of strands between Minerva Dashboarding, HS DaaS ("Data-as-a-Service": an effort within HS as a whole to share and enable access to hyperscaler data of various kinds), HSDB and resource asset info collection, and the need for an overall strategy within Multi Cloud to operationalize and provide access to the data we collect came together around a Multi Cloud Data Access platform that leverages what HS Engineering has already built.

Beyond Minerva alone, there is a lot of pressure on the HS team to make data available *quickly* forcing a certain urgency and practical decisions. With HSDB already containing all necessary account metadata and ownership, and HS API already providing API access to either HS Portal Apps or LoBs using it for automation, it only makes sense to build on what already exists.

The diagram below evolved out of initial discussions between Tim and Jay with Skylar and Roberto, exploring options for Minerva to integrate with HS Portal. This gave us a good direction, which then escalated dramatically through the SCD2 HS DaaS/Assets MVP, part of Q4 deliverables - and driven specifically by the Asset Management remediation requirements associated with the October Audit Committee report. This concept is now the platform for Multi Cloud data.

![HS API Platform]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/MC-api-platform.png)

### HS Assets vs. HS DaaS
The eventual terminology is yet to be determined but for short-hand's sake, HS Assets refers to data collected "wide and shallow" by HS Engineering, HS DaaS (in our context) refers specifically to additional metadata collected from CloudHealth. (See also [Data Sets](datasets.md)). For the former there is a clear path to integration within HSDB, for HS DaaS data this is yet to be determined.

## Deep and Light Integration
This concept conceives of both deep and light integration options when it comes to data:

1. Deep: move data into HSDB
2. Light: intermediate data access through the HS API, letting the HS API backend make a service request to an API to request data

### Deep Integration
In this option, data would be transported at regular frequency from its source data store to HSDB directly. This would mean the data resides directly with the HSDB data, and would provide the fastest response times.

### Light Integration
It is likely neither desirable nor practical to in all cases import all data into HSDB from the various data sources we have. In case of Minerva dashboarding, for instance, it may not be practical to move *all* data from ELK into HSDB, but for instance have queries for alerts associated with specific cloud accounts be made accessible through a live ELK query. In this option, requests to the HS API for such data would result in the HS API backend making a service request to an API exposing that data directly. Such queries could be appended with WHERE clauses dependent on the user's role and data access defined in HSDB.

## Minerva Dashboarding as example of deep integration
Other Multi Cloud teams are still adjusting to this new strategy, but as we already were committed to HS Portal as the "host" for Minerva Dashboarding, we are the 'tip of the spear' for this HS Data Access Enablement platform. HS Engineering is similarly committed. Given our RBAC, data access and data requirements (which include HSDB cloud account data, as well resource data in HS Assets), this can only facilitate the analytics described in [Dashboards and Flow](dashboardsflow.md).

To accommodate resource asset information, HS Engineering is already upgrading their data base platform. This will also allow us to host aggregated scan data in HSDB. All of the analytics included in the requirements operate on aggregated data (i.e. rolled up to a certain level of organizational hierarchy, potentially enriched with public cloud provider and/or environment type), so for most use cases this is likely a feasible approach. 

## Minerva Dashboarding as example of light integration
For use cases that cannot be practically accommodated this way, we will need to work with HS Engineering on API access against our Minerva ELK data store. This may be for account owner- or security officer-specific data for specific cloud accounts they are responsible for, regardless of organizational cost hierarchy derived from ISP. This will certainly become more relevant for time-based charts tied to account owners or security officers ("Account-specific Viewers").

## HS Portal Integration
Minerva Dashboarding should be accessible from HS Portal's main tile menu (likely replacing the current Prisma tile), and include the HS Portal Banner (even if a modified one with a Minerva logo - TBD with HS Engineering):
![HS Portal Banner]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/mc-portal-banner.png)
