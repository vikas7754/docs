---
layout: default
title: "[ARCHIVE] Dashboards and Flow"
parent: "[ARCHIVE] Minerva Dashboarding Requirements"
grand_parent: "[ARCHIVE] Minerva - Compliance Scanning"
has_children: false
---


# Dashboards and Flow
I (Jay) spent much of my earlier career in tech in Analytics - in fact for so long that I saw its name change from Decision Support Systems, to Business Intelligence, to Analytics and Big Data, and Metrics, KPIs and OKRs. 

After that time in analytics, much of it in Business Objects and SAP Consulting where every direct colleague was a BI/Analytics specialist, it is easy to take assumption for granted that those with much less experience in analytics may not share. Moreover, analytics has gone through evolutions as technology has become more readily available, but also information demands and datasets have changed. Whereas analytics and dashboard in the 90s-early 2010s often focused on counting things (sales transactions and value perhaps the most typical example), with the advent of big data analytics, the boundary between data science, data visualization and analytics & dashboarding is increasingly fuzzy. 

This section therefore includes extensive background in analytics and data visualization that 

## Metric Selection
It is easy to just throw a bunch of arbitrary metrics onto a dashboard canvas, and call it a day. Unfortunately, this is often what is done with dashboarding, rather than give it some real thought. Dashboards are often limited by the capabilities of a reporting tool or graphing package, and too often dashboards are produced that may look nice, but don't provide actual insight, exploration or actionable results.

The most extreme example I have seen is an SAP internal results deck from a team that had counted the number of meetings and collective number of minutes spent in meetings - as if that by itself was an achievement worthy of communication. So... you spent time together on Teams? *How is that relevant in relationship to the success of your program?*

The success of Project Evolve, Secure Cloud Delivery (1.0), One Strike Hyperscaler Security, Secure Cloud Delivery 2.0 and whatever comes after should be measured by how effective it has been towards improving  driving security improvements in the hyperscaler landscape. The purpose of the Minerva Dashboard is to measure that effectiveness, as well as move the organization to action and facilitate enforcemnent.

As indicated in the diagram below, *actionable insight should be the minimum standard*. The main question should be what is the situation, how does that compare to any targets set, and how does it drive towards action and continuous improvement.

![Actionable Analytics]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/actionable-analytics.png)

Analytics and dashboards that provide no insight or only leads to a mild satisfaction of curiosity neither keeps anyone engaged, nor does it drive help us toward remediation efforts and therefore waste a lot of effort and undermines what we're trying to achieve.

We don't want to keep the organization in a constant state of shock, though, and the more insightful and effective the Minerva Dashboards, the more we enable our internal stakeholders to get their compliance under control and stay on top of things. We would want to keep them engaged and return frequently, to keep driving towards continuous improvement.

It is important therefore that we always keep the following questions in mind for our audience.

>Note: to avoid confusion with the ? marker for aspirational requirements, these deliberately miss one

### Question: Who is the audience
We have to keep our intended audience in mind, many of whom are not security experts. Analytics should be clearly explained in jargon-free language and their intention obvious. It must be clear what is good and what is bad, and what desired state is expected. 

### Question: Are we measuring the right things
Given the difference in team size, variety of workloads, number of cloud accounts in use, number of resources deployed, and even cloud providers used, it is very easy to give a distored view. For instance, a simplistic count of outstanding alerts may be the most obvious metric, but that doesn't take into account that different board areas and teams operate vastly different number of cloud accounts. Only counting outstanding alerts is likely to only focus attention on teams operating large numbers of cloud accounts and resources - simply by the size of their landscape.

As we have seen in the past two years, though, this often hides the state of policy compliance of smaller teams operating fewer cloud accounts, where their total number of alerts are easily lost among the larger numbers among LoBs operating thousands of cloud accounts like BTP Core, CX, or ECS. For this reason we have already included reporting in the weekly status deck based on ratios of alerts per 1,000 resources or alerts per cloud account. Especially among high alerts we often see an inverse correlation between the size of the public cloud landscape of an LoB (and their associated team size) and the ratio of alerts/cloud acount. If we only counted alerts, this correlation would not be visible at all.

### Question: Are we encouraging the right behavior
Since the point of analytics is to drive action, it is important we are encouraging the right behavior. That is directly related to picking the right metrics, again, because tracking particular metrics inevitably means that teams start working towards those metrics... and potentially missing out on other actions that may even have higher priority. 

This also comes into play when we pick "focus issues", as we have done with S3 storage buckets in H2/2021 and will do again with unencrypted EBS Volumes after Q1/22. Think of this encouraging of right behavior as *campaigns* to bring attention to particular topics. This can even be just mentioning and tracking specific alerts or alert types, like the AWS ELB ruleset.

### Question: Are we effective
Beyond whether the dashboards themselves are effective in communicating their message (see diagram above), we have to be able to measure how effective we are in our overall goal to bring compliance alerts down as low as possible. This may seem obvious, but again, it is easy to measure the wrong thing, and therefore fool yourself into a sense of progress - or even by a desire to show success.

If we are doing well, we should be able to show that and celebrate it. But if we fall behind, that shouldn't be hidden behind "green" stoplights, but *highlighted* so corrective action is taken. Lack of progress, or falling behind goals, must be communicated just as strongly as success.

### Question: Are we enabling continuous improvement
We don't just want to get teams to go through a one-time exercise to fix their current outstanding alerts, and then think it is done. We want them to return again and again and continuously keep monitoring their landscape and keep improving. We want them to remain up-to-date and informed about changes in policies and how that may (have) effect(ed) their own alert numbers.

We keep teams engaged through providing easy access to deep insight into the composition and security compliance posture of cloud accounts under their management. By also allowing them to compare and rate themselves to other teams we further encourage them to return to the dashboard and do better. I am not a big fan of gamification, but a little competition among teams is healthy and encouraging.

## Story telling
Good analytics tell a story. But a story has a stucture, with a beginning, a middle and end, as well as a cadence. The first question we all ask is how are we doing. That puts time-based charts first, with progress on the year to targets to begin, and then showing more details how things changed over a certain time period. 

This flows into current state charts that shows in far greater detail how the current alerts are distributed by organizational hierarchy, environment, provider, etc. The ratio heatmaps, then, show better how business units compare across the organization, now taking their number of cloud accounts into account.

Then, if you still want to know more how that breaks down by policy category, across the company and within your (or other) board area, we have the clustering charts.

### Navigation: Tab structure?
That brings up how navigation between dashboards should be done. As the ? indicates, this is open, but - especially given the assumption for additional visualizations in the future - it may make sense to add sub-menus under main Tabs:

| Time-based Charts | Current State Charts          | Further Analysis        |
|-------------------|-------------------------------|-------------------------|
| YTD Progress      | Alert Status Multi View       | Clustering              |
| Delta Charts      | Alerts/Cloud Accounts Heatmap | Clustering (Board Area) |

Depending on the dashboard page structure chosen, room may need to be made within the menus for medium alerts views.

It may also be useful to have at the bottom of each dashboard page a -> next link or button to move to the next visualization.

>Note: We will also need to find a way for Account-specific Viewers to get their unique views. Perhaps a similar submenu structure can be set up for a "My Accounts" section? (vs a "Company-wide" section for everyone).

## General Structure - Show & Tell
It would be unfair to our users to give them a data visualization such as this and not tell them what it actually is, and how they should look at it.

![dendrogram heatmap]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/dendro.png)

There should be a space to provide more explanation about the chart type and what it shows, and explain potentially how any interactive features work. This description likely updates infrequently.

Such a chart description is not likely to change frequently, but that itself is not enough - it only described how the chart *works* and how it should be consumed. Similarly to the current weekly status deck slides, the dashboards should allow for a frequently (weekly, for instance) commentary space, where our team (Jay, most likely) can comment on notable changes - for instance through policy updates, exceptions done active, or a general positive or negative trend. This commentary is likely to update frequently.

### Dashboard Page Structure?
Beyond the backend and code challenge potentially to accommodate the description and commentary text areas, we should consider page structure. Many of the visualizations have a lot going on, and that makes text areas to the right or left of them problematic without sizing them down considerably. It may therefore make more sense to structure them vertically, and allow the user to scroll.

| **HS Portal Banner**                              |
|:-------------------------------------------------:|   
| *Navigation Menu?*                                |
| Text: Title and Chart Description (slow-changing) |
| SVG: Data Visualization - High Alerts             |
| Text: Chart Commentary  (frequently changing)     |
| SVG: Data Visualization - Medium Alerts           |
| Text: Chart Commentary (frequently changing)      |

The thinking behind this would be that most would be interested in the High Alerts, and can scroll down to the Mediums should they wish - and will have loaded by the time the user is done with the High alert visualization. 

Alternatively, it may be more effective to use submenus under the tab structure with separate entries to high and medium pages

| **HS Portal Banner**                              |
|:-------------------------------------------------:|   
| *Navigation Menu?*                                |
| Text: Title and Chart Description (slow-changing) |
| SVG: Data Visualization - High or Medium Alerts   |
| Text: Chart Commentary  (frequently changing)     |

With full screen windows quite wide, text should be divided into two columns, at least. The page may also require a margin on each side, however reduced screen width will leave less space for these visualizations, especially when showing multiple views.

## Look and Feel
To ensure coherence of data visualizations in Minerva Dashboarding, they should all look and feel similar as part of the whole. This primarily manifests itself in font, and especially color palette. 

### Accommodating various screensizes
All the SVGs resize to screensize - with the subtle exception of the clustering chart which updates its height depending on the number of business units to display. I would not suggest to access these visualizations on a phone, but otherwise they may well accommodate tablets to 2K, 4K and 8K screens.

Some adjustments may be required for different screensizes, especially for fonts, despite using "rem" units for all text sizes, which are relative to the user's browser default font size. Users should be able to use the zoom in their browsers to adjust font size. This is not ideal, though, and may not be immediately obvious to users. 

SVG margins may need to be converted to a % value, if necessary.

### Fonts
SAP's standard font is Arial. The index.css also includes Roboto and Oxygen as sans serif alternatives, a. o., should somehow Arial not be available.

### Color Scales

Colors can be tricky in data visualizations. You don't want them to be too bright, they should be distinguishable between categories and should be appropriate for the message the visualization should convey (for instance in good/bad situations). Luckily, there are some good resources online for this, most notably the [Sunlight Foundation Data Visualization Style Guidelines](https://github.com/amycesal/dataviz-style-guide/blob/master/Sunlight-StyleGuide-DataViz.pdf) (SFSG). 

The style guide is not followed to the letter, but is especially useful for the color palettes in it, and the colors in the Minerva concept visualizations follow this palette. Note that not all the RGB hex color codes in the guide are correct! So verify in case the color seems off, or not even to be in the same hue. Verify with the separate RGB values.

>Note: these colors have not been tested or verified for color-blindness or other accessibility issues. We could consider an alternative set of color scales that does.

#### Board Area Color Scale

The colors below are used for the different board areas. Many of these have come about historically as part of previous status reporting, and are maintained for continuity - with slide shade adjustments to bring them in line with the color sty;es in the SFSG. Consolidation, GF&A and People & Operations all share a purple hue for their colors. This is mostly historic as previously they were reported jointly as 'Other'. Unmapped is a red color, as no accounts and alerts ideally are unmapped. (Note: at the moment these are essentially all Concur)

| Board Area                        | Color   | Sample |
|-----------------------------------|---------|:--------:|
| Consolidation                     | #8E6C8A |![#8E6C8A](https://via.placeholder.com/15/8E6C8A/ffffff?text=+) |
| Customer Success                  | #B0CBDB | ![#B0CBDB](https://via.placeholder.com/15/B0CBDB/ffffff?text=+)|
| Global Finance & Administration   | #B396AD | ![#B396AD](https://via.placeholder.com/15/B396AD/ffffff?text=+)|
| Marketing & Solutions             | #E6842A | ![#E6842A](https://via.placeholder.com/15/E6842A/ffffff?text=+)|
| Office of the CEO                 | #5F7186 | ![#5F7186](https://via.placeholder.com/15/5F7186/ffffff?text=+)|
| People & Operations               | #684664 | ![#684664](https://via.placeholder.com/15/684664/ffffff?text=+)|
| SAP Product Engineering           | #BD8F22 | ![#BD8F22](https://via.placeholder.com/15/BD8F22/ffffff?text=+)|
| Technology & Innovation           | #FFC000 | ![#FFC000](https://via.placeholder.com/15/FFC000/ffffff?text=+)|
| Unmapped                          | #BD2B28 | ![#BD2B28](https://via.placeholder.com/15/BD2B28/ffffff?text=+)|

Note that in drillable charts into board areas, these base colors are used and then varied by luminosity depending on the number of business units at that particular level. That way each board area has a certain "tone".

#### Delta Chart Color Scale

| Delta                 | Color   | Sample |
|-----------------------|---------|:--------:|
| Negative value (Good) | #A0B700 |![#A0B700](https://via.placeholder.com/15/A0B700/ffffff?text=+)|
| Positive value (Bad)  | #BD2D28 |![#BD2D28](https://via.placeholder.com/15/BD2D28/ffffff?text=+)|

#### Environments Color Scale

Similarly, specific colors are chosen for environment types. Again, these colors match the SFSG. DEV through SANDBOX colors have an element of risk rating in them, going from light yellow (LAB) to red (PROD). Policy violations in a Lab environment still need to be followed up on, but they carry less risk then when seen in QA or PROD landscapes. DEMO and TRAINING landscapes tend to be short-lived, and at least are not connected to anything.

| Environment Type | Color   | Sample |
|------------------|---------|:--:|
| DEMO             | #5F7186 | ![#5F7186](https://via.placeholder.com/15/5F7186/ffffff?text=+) |
| DEV              | #FFC000 | ![#FFC000](https://via.placeholder.com/15/FFC000/ffffff?text=+) |
| LAB              | #F2DA57 | ![#A0B700](https://via.placeholder.com/15/F2DA57/ffffff?text=+) |
| PROD             | #BD2B28 | ![#A0B700](https://via.placeholder.com/15/BD2B28/ffffff?text=+) |
| QA               | #E6842A | ![#A0B700](https://via.placeholder.com/15/E6842A/ffffff?text=+) |
| SANDBOX          | #F6B656 | ![#F6B656](https://via.placeholder.com/15/F6B656/ffffff?text=+) |
| TRAINING         | #B0CBDB | ![#B0CBDB](https://via.placeholder.com/15/B0CBDB/ffffff?text=+) |  
| Unmapped         | #E5E2E0 | ![#A0B700](https://via.placeholder.com/15/E5E2E0/ffffff?text=+) |

#### Provider Color Scale

At the moment only colors have been chosen for the global three of AWS, Azure and GCP. We'll have to pick a separate color for AliCloud (![#A0B700](https://via.placeholder.com/10/BD2B28/ffffff?text=+)?). For AWS and Azure China I propose a similar hue but with lighter luminosity (i.e. lighter).

| Provider | Color   | Sample |
|----------|---------|:--------:|
| AWS      | #E6842A | ![#E6842A](https://via.placeholder.com/15/E6842A/ffffff?text=+) |
| Azure    | #33B6D0 | ![#33B6D0](https://via.placeholder.com/15/33B6D0/ffffff?text=+) |
| GCP      | #A0B700 | ![#A0B700](https://via.placeholder.com/15/A0B700/ffffff?text=+) |

#### Ratio Log Scale

The colors for the ratio log scales are:

| Fixed | Variable | Color   | Sample |
|-------|----------|---------|:--------:|
| 100   | max      | #BD2B28 | ![#BD2B28](https://via.placeholder.com/15/BD2B28/ffffff?text=+) |
| 1     | 1        | #FFF000 | ![#FFF000](https://via.placeholder.com/15/FFF000/ffffff?text=+) |
| 0.01  | min      | #5C8100 | ![#5C8100](https://via.placeholder.com/15/5C8100/ffffff?text=+) |

>Note: the yellow midpoint is brighter than other yellows used, but avoids the scale from "washing out" entirely and becoming harder to read - as both the max and min colors are more tempered. 

#### Font Color
Default font color for titles and axis labels is #363636 (![#363636](https://via.placeholder.com/10/363636/ffffff?text=+)). Hover color is #888888 (![#888888](https://via.placeholder.com/10/888888/ffffff?text=+)).

### Dark Mode?
While the visualizations have been designed against white background, the colors above likely work against either light or dark backgrounds. It may require only some CSS updates for text (titles, axis ticks and labels, links). Such a choice could be implemented through a possible User Preferences (see Usability section in [Dashboard Views](dashboardviews.md)).

## Dashboard Views
To avoid this page from getting very long - the detailed dashboard view requirements are in a separate page linked below. It is assumed these are contained within the [Dashboard Page Structure?](###Dashboard-Page-Structure?), unless an alternative framing is agreed.

[Dashboard Views](dashboardviews.md)

## Future State?
The requirements above (as well as the detailed dashboard views) cover the immediate horizon of MVP and version 1 release, or even much of 2022. So what follows is more aspirational and thinking of where we might go. This is certainly subject to change and review as circumstances change and data becomes available. But it is good to present a general idea of where Minerva dashboarding might evolve to.

Topics in here and elsewhere that have a ? are such aspirational ideas.

### Global drill through?
Imagine this use case for security experts in LoBs, security incident response, and operational monitoring.

The screen opens up to a view of the world, with locations where resources are deployed highlighted and clickable. To the side are key metrics or event that require alerts, as well as a search box for specific cloud accounts, and navigation to filter by board area and business units.

This global view can be zoomed in on, and for each location gives a general indication of its security and compliance state, as well as any markers for specific cloud accounts or issues that require more immediate attention based on their risk level.

We can drill into a particular cloud region, and see more detail for that level. If some event requires our immediate attention, or we are looking up a particular cloud account, the Account View opens.

#### Account View?
Lookup for a particular cloud account opens up the Account View. This gives a graphical representation of the resources the deployed in the account, and any other cloud accounts or DCs it is connected to. The cloud account view shows the VPCs/NSGs that separate the networks, and represents the connections between them. Within the VPCs, other resources deployed are shown, such as compute and storage, or any managed services.

Each of the resources have indicators associated with them, from compliance scans, vulnerability scans, netflow information, or threat detection events to give both the cloud account as a whole as well as the resources within it a risk rating.

Such a view would provide a comprehensive insight into a particular cloud account, whether to follow-up and remediate based on highest risk priority, or for context during initial triage of an active security incident.

