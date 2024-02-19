---
layout: default
title: "[ARCHIVE] Dashboard Views"
parent: "[ARCHIVE] Minerva Dashboarding Requirements"
grand_parent: "[ARCHIVE] Minerva - Compliance Scanning"
has_children: false
---
# Dashboard Views
Until the repository for them changes, the visualizations refered to in this page are in the [https://github.tools.sap/I818358/d3-react](https://github.tools.sap/I818358/d3-react) repository. The screenshots included in here come from off-line concepts in that repo. 

Datasets for these visualizations at the moment is Prisma data exports, and a manually maintained weekly Excel for the year-to-date charts, as well as HSDB data exports where appropriate. The assumption is that this should be relative easy to replace with Minerva scan data, as most of the data fields will match... and in any case the useData.js file tends to transform the data. This is where therefore any necessary data field remapping is likely to take place.

Beyond the data requirements to make the visualizations work, hopefully little modification will be required. Should the repo for the visualization have a data folder, it will contain a data sample after processing by useData.js. It is simple to add this for other visualizations by console.log'ing the return value and saving the object. For more complex visualizations, also check the README.md

As can be seen from the screenshots included in this, these visualizations can be quite busy, and will require some descriptions as well as commentary for notable changes or trends. All visualizations apart from the dendrogram heatmaps also have interactivity allowing the users to drill further into the data. Rather than let users discover that by themselves, it is important there is a space to explain. (See also [Dashboard and Flow](dashboardflows.md))

## Time-based views
Time-based views show progress against a timeline to targets - whether successful or not. It indicates whether we are effective and can help identify trends. 

### Targets (Intro)
Since Project Evolve, we have set targets. This is no different for 2022. Apart from successful execution on SCD2 deliverables, We have set targets for ourselves as well as the rest of the company when it comes to High and Medium alerts. Nikki and I promised to the Executive Board in early 2020 that we would get the Highs under 20,000 ... when it was still well above 80,000 at the time. Nikki initially didn't agree, as it wasn't really under our control: it required the LoBs to remediate all the alerts we couldn't somehow handle centrally. But what convinced her was the argument that there is no point to a security program if it is not *effective*. And we surely get funding to fix the problem, right? Not just to put some new tools in place.

We ended that year on 5,400. A reduction of 96% of the peak of 135,000 in January.

For 2021 the policy set was sharpened and put us just under 10K. We chose to set the target to keep below that. We ended the year 48% below that target at just over 5,200, despite adding nearly 7,000 unencrypted S3 storage bucket alerts in July when the alert was lifted from medium to high severity. And all that while the landscape grew by 2.35x in number of resources deployed. 

So setting targets is good - especially if you overachieve on them. 😁

The targets for 2022 are:

- Keep High severity policy violations below 10,000 (repeat of last year)
- Bring Medium alerts down to 25,000 from the current ~230K (a reduction of ~90%)

The highs don't seem that ambitious given we are at 5,200 before the year starts, but there are 30,000-ish unencrypted EBS Volumes that will become high alerts end of Q1. Given that all of these need to be migrated, that is a significant challenge to the LoBs.

The Medium alerts target is ambitious, but here we will also be assisted by the growing role of Cerberus. It is always good to set ambitious targets: you may actually achieve them (as we have in past years).

>Note: these target numbers are based on current Prisma alert counts. Once we can reliably map the current state of Prisma alerts to Minerva alerts we will remap these targets accordingly. Given the increase in controls, the numbers are bound to rise.

The targets are set company/landscape-wide (excluding China - although my thinking is to simply *add* them in, and stick to current targets), and we don't set targets for the board areas invididually. However, as we have seen in 2020 and 2021, board area members compete with each other (especially SAP Product Engineering and Technology & Innovation) on these numbers, with their COO team tracking the numbers closely. The board areas and business units within them may well set their own targets - as we have seen ourselves with pressure from Gary Slater as well as Tom Lee to make alerts go away - not because they care about security, but because they don't want to have to explain why there are so many alerts in their unit.

The most important dashboard views are therefore the time-based views, and in particular the progress on yearly targets. That is what account owners, security experts, BISOs, board area delegates and even ourselves get judged on. It can be argued that SCD2 would never even have been possible had we not had the track record in progress towards these targets in prior years. 

### Progress on Yearly targets
For the reasons stated in the intro, the year-to-date progress charts to targets are the most important dashboards, and should open by default. The screenshot below is top level, but is intended to also allow drill into the board areas, similar to the Alerts Status Multi View. The visualization below does not show the progress table that has been part of weekly status reporting and still debating whether that should just remain an executive deck item, or should be included. After all, there are separately detailed delta-charts.

![Year to date progress chart]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/ytd-chart.png)

The visualization drills two layers down the hierarchy. While the company-wide view will show the targets for the year, there are no board area or LoB specific targets. The benchmark line for those are set at the first entry of the data set for that LoB.

>Note: this chart is the first one that is done on the basis of an ELK KQL query, which is included in the gitrepo. There are some data issues in the set, as well as some days are missing, some days are "doubled" and needed some adjustment. Hopefully with Minerva and exception database this will go away.


### Delta Views (difference across time period)
Delta Views help teams to understand what has changed in their landscape over a time period. Currently manually via Excel a company wide delta chart is produced (see Background section in [index.md](index.md)) to keep track of changes in the top 10 high alerts over a weekly period. 

We can do better than that - as with other views in here from the concept, we can segment the data in multiple ways much easier than has ever been possible. So, this doesn't just track the top 10 high alerts across the landscape, it also tracks by policy category and cloud provider, as well as environment type (top 4 by current high alerts) and board area/business unit (top 8 by current high alerts). The number of alerts per segment is included in the titles.

![delta chart high alerts]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/delta-chart.png)

The chart is drillable one layer deeper into the organization. More levels can be added.

![delta chart high alerts T&I]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/delta-ti.png)

## Current State Views
Current state views give a deeper view of the current state of the landscape - whether on company-wide level or within levels down in the organization. This allows users at different levels of the organization to get a better understanding of how policy violations are distributed among business units, types of environment, policy category and cloud provider, for instance. This should assist teams and those watching them in targeting who to notify, and/or what policy or policy type to focus on next in the remediation or continuous compliance effort.

### Alerts Status Multi View
This visualization starts on company-wide level, segmented by board area, but allow for two drills into the organizational hierarchy and single drills into type of environment and cloud provider, allowing the filters to be combined, by clicking on the chart legends. Through the five different views (two by top 10 alerts, three by policy category) far deeper insight into how policy violations are distributed can be gained much easier than has been possible before through the data exports - or required significant custom Excel work. 

When the bottom of a level is reached and the legend is clicked again, the visualization resets to company-wide level.

![alert status 0]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/viz-drill-org0.png)

Clicking down into the different dimensions allows for views such as:

![alert status 1]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/viz-drill-org1.png)

Or such as these:

![alert status 2]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/viz-drill-org2.png)

The filters can be applied selectively:

![alert status 3]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/viz-drill-org3.png)

At the moment, these are restricted in depth but with the alerts having a (practical) depth of 6 layers into the organization, there is no reason not to go deeper - it will just require an "escape to top" button to reset. Alternative, initially we can encourage people to double click an environment or provider to reset.

Level of depth is largely a question of size of the aggregate data by each of the dimensions (organization, environment, provider). As the row size of that 3-dimensional matrix doens't change by number of alerts, this should work well for both High and Medium alerts, and similar file size (compared to the concept, which are based on raw data exports).

### Alerts/Cloud Accounts Ratio Heatmap Organizational Scorecard
While this was developed before the Alerts Status Multi View, it follows a similar idea of drilling 3 levels into the organization. And this visualization similarly resets once the lowest level bottom is reached. This is currently limited by the HSDB portal data export of 4 levels of organizational hierarchy, and is missing environment information. A future improvement could make this also filterable by environment and cloud provider.

![ratio heatmap 1]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/i-heatmap1.png)

Drill into the organization by clicking the main board area titles.

![ratio heatmap 2]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/i-heatmap2.png)

And again drill into the next layer of the organization.

![ratio heatmap 3]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/i-heatmap3.png)

>Note: it will be interesting to see the difference between ratio heatmaps at different stages in time - i.e. start of the year/quarter and current state. This should just be a question of datasets for different dates feeding into two different instances of the data visualization. Probably not an MVP requirement, but should be considered for v1, or ongoing improvement.

## Further Analysis
Following the division of the submenu in [Dashboards and Flow](dashboardsflow.md), further analysis provides further inside into the landscape that gets us more into data science-like territory. These try to provide more insight than the current views can do. The Dendrogram Heatmaps are a good example of that, of trying to give different views of the dataset to find new patterns that otherwise would not be obvious. 

### Ratio and Alerts by Policy Category Dendrogram Heatmaps
There is a lot going on these dendrogram heatmaps, and more info in the [relevant README.md](https://github.tools.sap/I818358/d3-react/tree/main/clustering). They track alerts by policy category by L3 business unit in the overall view, L4 business units in the board area-specific version. Rather than order the heatmap simply by organization or business unit name, which would by arbitrary, a euclidian hierarchical clustering is used, to find the relative distance between each business unit across this multi-dimensional space.

This is perhaps just a fancy way of saying that business units that are similar to each other are put close to each other, which gives us this vertical pattern from higher ratios and alerts across categories, from red/orange to green. Note that the scale is based on a log scale, just as the Ratio Heatmaps, but on a variable scale based on the data set, rather than a fixed scale.

![dendrogram heatmap]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/dendro.png)

As it is difficult (impossible) to give the policy categories in a reasonable way, without changing the size of the charts dramatically, so the columns are indicated by letters. There is a tooltip included, though, which provides more information for each individual cells, including the organizational hierarchy.

![dendrogram heatmap tooltip]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/dendro-tooltip.png)

The board area-specific version goes down to L4 level for a particular board area - under the assumption that most teams, board area delegates and security exports in the LoBs would be more concerned where they are relative to business units in their own board area. The number of L4 varies and can even be quite small, so in some cases the size of the legend determines the SVG height, rather than the clustered heatmap itself, to avoid that legend doesn't get cut off.

![dendrogram heatmap T&I]({{ site.baseurl }}/assets/docs-images/minerva_dash_requirements/screenshots/dendro-ti.png)

>Note: the board area specific version currently has its filter hard-coded. Navigation to this should be discussed. While the visualization is ready, there is no specific requirement to include this in the MVP.

## Usability
We should want to make the Minerva dashboards as easy to use as is practical. Given that we have users that have wide access but likely particular filter preferences, it would be desirable to allow users to set defaults in some way, or save the state of a drill path.

### URL re-writing to allow users to "bookmark" a drill state?
My understanding is that React allows for URL rewriting to allow users to bookmark a particular state at a preferred drill level. If this is feasible, this would be a nice usability feature.

### Pre-filter appropriate charts to user's board area?
While not restricting access to data, it is conceivable that board area delegates, BISOs and security experts within a particular board area would want to default charts to their board area. For instance, for the Board Area specific dendrogram heatmap, or in the [Alerts Status Multi View](### Alerts Status Multi View), or even conceivably in a similarly drillable YTD progress chart.

### User preferences?
We could consider a setting page with user preferences where users could select particular default values or store drill stages (should URL re-writing be feasible).
