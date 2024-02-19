---
layout: default
title: "[ARCHIVE] Minerva Dashboarding Requirements"
parent: "[ARCHIVE] Minerva - Compliance Scanning"
grand_parent: "[ARCHIVE] Internal Minerva Docs"
has_children: true
---
# Minerva Dashboarding Requirements
![Minerva logo]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/Minerva_logo_white_small.png)

This document covers requirements for security compliance analytics as part of Minerva Dashboarding in HS Portal. This is a deliverable for [Secure Cloud Delivery 2.0](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/Cjhxjf8S8dNdVUh5Ux6r2n), included in [WS2: Security Analytics](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/rCj8IH4bzttGtXV703jT83), [WS6: Networking Security](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/E2JAstTDlMyKeH4KecGOOx), [WS7: Host Security](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/r9yA9juGAjIcnxPXMOQyWw) and [WS8: Kubernetes Security](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/IpaPaisD9Nui1smUDnZsZI)  with key milestones:

- Q1/22: Minerva Dashboarding MVP
- Q2/22: Minerva Dashboarding v1 release
- Q3/22: Compliance Drift reporting
- Q3/22: Golden Image verification reporting
- Q4/22: Network Security compliance reporting and enforcement
- Q4/22: Kubernetes compliance reporting

These requirements largely cover Q1 and Q2 deliverables, as it is not yet clear enough and too early to tell what exactly will be covered in the Q3 and Q4. These will likely be separate additions to the v1 release, to be defined during upcoming SCD2 Quarterly Planning Workshops, and driven by dependencies such as Cerberus ([Workstream 3](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/TTK48whM5fahgy8MeSP2WK)) or the Kubernetes compliance scanning ([Workstream 8](https://jam4.sapjam.com/groups/rfjLPU42pSuICiflCl7pMp/overview_page/IpaPaisD9Nui1smUDnZsZI)). To ensure this flexibility, ensuring a good [Continous Delivery](##-Continuous-Delivery:-Templating-and-Continuous-Improvement) process is critical - as well as allow us to respond quickly to changing needs and priorities in compliance reporting.

## General Purpose and Objectives
>*Tools don't fix security problems, people do*

As we have seen over the last few years, it is not enough to have compliance scanning in place. We had this in 2019, and the number of alerts simply grew as the size of the landscape grew. Giving LoB teams access to compliance data also proved to be insufficient, as long as there was no great pressure on teams to follow up on alerts. Only when compliance alerts were made visible to the organization, remediation got the support of SGS leadership and the various executive board members, and board area COOs started to keep track of progress did we start to make significant progress. This progress in the various business units came on the back of weekly Prisma data exports and the status reporting driven from it, shared with executive leadership, board area delegates and our Office Hours community on the weekly calls.

Key in this has been the data enrichment we already do with Prisma and Minerva scan alerts, to associate cloud accounts with their organizational hierarchy, security attributes and account ownership and roles. This is not something that comes with security tools and yet has proven critical to get organizations to move, based on the pivot tables included in the weekly data exports

The purpose of our compliance scans with Minerva ultimately, then, is to bring as much as possible of the landscape in compliance with SGS policies (or covered by mitigating controls and granted exceptions). In order to do so, we have to:

1. Make alert scans accessible to the teams who can remediate them
2. Make the data accessible to security officers and other LoB representative so they can ensure teams remediate them
3. Make the compliance posture visible and transparent to executive leadership (whether SGS or within the board areas)
4. Empower those involved in enforcement of policies with easy access to compliance scan data

So far, the tendency has been to share more liberally, as long as colleagues have a legitimate requirement for the data. The data exports and weekly reporting is shared with the Office Hours invite and email distribution list. That doesn't mean it should be available to *everyone*, though, so there is a need to verify access to Minerva Dashboards.

Beyond that core purpose, though, it is critical we allow our stakeholders to get a grip on the "shape" of the landscape. Whether within SGS, within Multi Cloud, let alone elsewhere in the organization, it has been difficult to visualize the variety in workloads, resource sizes and cloud accounts, or the state of their relative compliance posture within their board area or across the company. So far, remediation efforts have been on "company-wide" level, whether it comes to top-line high alert numbers, or specific focus areas like S3 buckets. We have not yet been able to easily visualize whether particular policy *categories* are more or less of a problem in different segments of the company. Only recently, even, we've been able to highlight outliers through alerts/cloud account ratio reporting.

### Minerva Dashboarding as the "face" of entire Minerva solution
Compliance scans run from our Kubernetes cluster are quite abstract for our users. Beyond an architecture diagram there isn't anything to "touch", so it remains largely an idea. Especially for our existing Prisma users (in the tool itself), the decommissioning of that CSPM tool will feel like something has been taken away from them. Many mostly interacted already with Prisma alerts through the weekly exports, but many also insisted on Prisma access directly, despite its flaws.

Minerva Dashboards will for most of our users and stakeholders be the most tangible and visible part of the entire solution - and especially at executive level. Mailers and data exports will satisfy those "below" following up on specific alerts in specific cloud accounts, but many of our "middle" and "top" users (and hopefully also Account-specific Viewers) will consume Minerva scans primarily through Minerva Dashboards. It is therefore inevitably the "face" of the entire solution, and therefore most likely judged primarily on how well it serves our various stakeholders.

Even our MVP will provide insights that have as of now not yet been possible, so I doubt we will disappoint. But it does highlight the need for the analytics to be: 

1. visually appealing
2. easy to use and understand, and 
3. provide actionable insights

Despite the "should" language, by necessity, in documented requirements, there is (hopefully) something inherently enjoyable  about making "pretty things" that show off all the hard work the team has put and is putting into less visible backend engineering. Let's build something extraordinary that no security tool on the market can do!

>Note: I apologize in advance for the "wall-of-text" and volume of these requirements. The requirements contain a lot of background information, basic principles and vision statements, even analytics and dashboard theory. Hopefully these are helpful as background for the more specific and detailed "should" sections. 

>Note two: Throughout the requirements, some are speculative or aspirational and up for debate. These are marked with a ? in their section header. These are not MVP or v1 requirements - they may never see the light of day if not practical.

## Detailed Requirements by Topic
The list below describes different topic areas for the Minerva Dashboards. These generally cover MVP and release 1 requirements, but also look forward to what might lie ahead - as it is good to know what we might ultimately be able to accomplish as part of a future vision. Speculative/aspirational post-MVP/v1 releases are marked with a ? in the requirements in the links below:

1. [Roles and Personas](rolesandpersonas.md)
2. [RBAC and Data Access](rbacdataaccess.md)
3. [Data Sets](datasets.md)
4. [HS Portal Integration](hsportalintegration.md)
5. [Continuous Delivery: Templating and Continuous Improvement](continuousdelivery.md)
6. [Dashboards and Flow](dashboardsflow.md)

## Background
The Minerva dashboarding has some legacy. We have been reporting weekly since Aug 2019 with slides like these. Note that these are deliberately from before some of the data visualizations in D3/React replaced elements in it. Slides like these are used both for tracking high and medium alerts (the latter since April/May 2021).

The weekly alert slides open with a time-based view:

![status 1]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/analytics-1.png)

Followed by a current view of the top 10 alerts and a delta view.

![status 2]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/analytics-3.png)

Separately, the weekly status deck reports on number of resources in the landscape (as per Prisma), as well as alerts/(1000) cloud resources and alerts/cloud accounts overall. More recently also the ratio heatmaps have been included on company-wide level.

These slides are included in the weekly status deck that is shared with executive leadership on fridays, board area delegates on monday morning, and the wider Office Hours community on Tuesday's calls.

This provides context for the direction of the visualizations in the Dashboard Views, and ties back to the "Show & Tell" structure. We don't want to take things away, but make them better, more accessible, updated more frequently... and provide a lot more depth than before. The base elements are already there:

1. Time-based views (year-to-date progress to targets, delta charts)
2. Current state views by board area and environment
3. Additional commentary, updated weekly

While the weekly status reporting will continue in some way - if only to make it more easily digestible to our executive stakeholders - the same principles should also be baked into Minerva Dashboarding.

It is also assumed that Minerva Dashboarding will replace any manual work currently involved in producing weekly slides - short of commentary, and will be based on Minerva Dashboard screenshots. This further speaks to the need to be visually appealing, while at the same time ensuring that everybody through the company is always working from the same dat, and teams know what their leadership sees.

Finally, the wish is that Minerva Dashboards may even replace current status reporting on Office Hours with live views - in order to focus specifically on any notable changes over the past week, beyond high level repeating status slides.
