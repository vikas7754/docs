---
layout: default
title: "[ARCHIVE] Status Reporting Deck"
parent: "[ARCHIVE] Minerva Reporting"
grand_parent: "[ARCHIVE] Minerva - Compliance Scanning"
has_children: false
---

# Status Reporting Deck

The Status Reporting deck needs to be created before Friday as they are used by others in developing the Executive Update on Friday.

## Alerts Status Reporting Purpose

We have multiple data channels for Minerva compliance data. This is one of the most important ones. While the Mailers and Data Exports have a wider reach into the organization, the status reporting keeps central security teams up to data, as well as executive leadership across the board areas. It is intended to make current compliance status visible, as well as any major changes. It is also how we as a team are most visible to senior leadership.

Luckily, much of this by now has an established format. Most of the work will be copy and paste, with commentary added to help interpret what is being shown. The commentary allows us to highlight particular successes or challenges we want to bring attention to.

This deck also gives us the opportunity to communicate the projected and actual (once deployed) impact of upcoming releases. The community always appreciates the heads-up, as well as what effect the control changes had on the landscape. Such information also allows central security teams in the LoB to prepare the teams they represent, as well as their leadership. This is especially important in case the projections lead to an increase in alerts.

## Status Reporting Preparation

Before starting the status reporting deck, make sure you do the data preparation, as well as update the Minerva dashboards - even if just locally. They are inputs to the status deck.

## Status Reporting Deck

There is a sequence to the deck. An example is [here](https://sap.sharepoint.com/:p:/r/teams/MCSecureArchandEngineering/_layouts/15/Doc.aspx?sourcedoc=%7B033AD685-2724-4049-AAE8-01CEA40563E3%7D&file=MC%20SAE%20Hyperscaler%20%20Weekly%20Update%20Feb%2010th%202023.pptx&action=edit&mobileredirect=true)

1. Any major announcements - new policies to be introduced, start of Preventive Controls Deployment Rings, etc.
2. "Release Note" slides of policy changes with projected impact (if release still to be deployed to Prod) or actual impact (first Monday scan results after a new release). Given the 2-weekly release cycle, we should expect this to be a standard section in the deck
3. High Severity Alerts
   1. Year to date overview and delta table with high level commentary
   2. Top 10 violations and weekly top 10 delta (or major changes)
   3. Ratio progress tracking
   4. Ratio Heatmap
4. Medium Severity Alerts
   1. Year to date overview and delta table with high level commentary
   2. Top 10 violations and weekly top 10 delta (or major changes)
   3. (Campaign Slide: Key Rotation Alerts Tracking)
   4. Ratio progress tracking
   5. Ratio Heatmap
5. "Standard" Slides
   1. Preventive Controls Table
   2. Minerva Remediations
   3. Minerva slide, including link to latest Minerva Consumer Container
   4. Links

> Note: Additional slides may be added and become recurrent based on current campaigns.

### Major Announcements

Start with providing any major announcements. e.g. a new high-impact control that needs to be discussed, or any announcement of significance.

Currently, the preventive control slide should be part of the Major Announcement section. Once Deployment Ring 4 is completed it can be placed in the standard slides.

### Release Note Slides

We have developed a nice sequence with the 2-weekly Minerva updates of being able to announce ahead of the deployment what the projected impact of control and policy changes is, based on pre-prod, following the next week by the actual impact we found in the first production scans. This is a really good way to keep the community informed and engaged with the changes.

### High & Medium Slides

Make sure you have done the [reporting data preparation](status_reporting_dataprep.md) and the [manual dashboard updates](manual_dashboard_updates.md).

#### Year to date overview and delta table with high level commentary

1. Take a screenshot of the Year-to-date Minerva Dashboard (your local dev instance, most likely) and crop it to just the line charts

![board-area-linecharts](/assets/docs-images/minerva_reporting/board-area-linecharts.png)

> Note: maximize your browser window screen area (and if necessary, refresh the page) to make the screenshot.

2. Paste it into the slide and resize it over the existing line chart from the previous week. Send it to back, and delete the previous.
3. Hide all but the last 4 delta columns in the [minerva-high-alert-chart-2022.xsx](https://sap.sharepoint.com/:x:/r/teams/MC-DevSecOps/Shared%20Documents/Data%20Exports%20and%20Reporting%20Samples/minerva-high-alert-chart-2022.xlsx?d=wc87c0389dbee40338a4aa6b10243746f&csf=1&web=1&e=D5n6G6) Excel sheet, and copy the delta table.
4. Paste it into the slide as an image and resize it over the table from the previous week. Send it to back, and delete the previous.

![delta-table](/assets/docs-images/minerva_reporting/delta-table.png)

5. Delete the text (it's often easier to do the commentary last, when you have done all the slides, or at least the next one) and update the date in the title

#### Top 10 violations and weekly top 10 delta (or major changes)

1. Take a screenshot of the Alerts Overview Minerva Dashboard and crop it to just the Top 10 Alerts by Board Area and Environment

![top10-alerts](/assets/docs-images/minerva_reporting/top10-alerts.png)

2. Paste it into the slide and resize it over the existing chart from the previous week. Send it to back and delete the previous week's chart.
3. Copy the Top 10 delta chart from the [top10](https://sap.sharepoint.com/:x:/r/teams/MC-DevSecOps/Shared%20Documents/Data%20Exports%20and%20Reporting%20Samples/top10Aug18-22.xlsx?d=wdbdb4b38da4949a099e8644c84da97f9&csf=1&web=1&e=QDLJbu) Excel sheet, and paste it as image into the slide deck. Resize it, place it over the existing and move to back. Delete last week's.
4. Update the list with the controls having the most change, up or down. In a good week, highlight progress, but include top riser at least. In a bad week, highlight the main risers, but include some good news (if there is any)
5. Update the date in the title

6. Copy the ratio tables from [minerva-high-alert-chart-2022.xsx](https://sap.sharepoint.com/:x:/r/teams/MC-DevSecOps/Shared%20Documents/Data%20Exports%20and%20Reporting%20Samples/minerva-high-alert-chart-2022.xlsx?d=wc87c0389dbee40338a4aa6b10243746f&csf=1&web=1&e=D5n6G6) Excel sheet while the hidden columns are still hidden. Paste it into the slide as image. Resize and place over the existing, and remove the previous.

![ratio-tables](/assets/docs-images/minerva_reporting/ratio-tables.png)

2. Unhide the hidden columns in the Excel sheet to get definition in the line charts
3. Copy each of the two line charts from the [minerva-high-alert-chart-2022.xsx](https://sap.sharepoint.com/:x:/r/teams/MC-DevSecOps/Shared%20Documents/Data%20Exports%20and%20Reporting%20Samples/minerva-high-alert-chart-2022.xlsx?d=wc87c0389dbee40338a4aa6b10243746f&csf=1&web=1&e=D5n6G6) Excel sheet. Absolute numbers on top, ratios below.
4. Paste each as image into the slide deck, resize and place over the ones from the previous week, and send to back. Remove the previous week's chart.

![absolute-lines](/assets/docs-images/minerva_reporting/absolute-lines.png)
![ratio-lines](/assets/docs-images/minerva_reporting/ratio-lines.png)

5. Update the commentary with the change for the week
6. Update the title date

#### Compliance Heatmap

1. Take a screenshot of the Compliance Heatmap Minerva Dashboard and crop it e.g.:

![ratio-heatmap](/assets/docs-images/minerva_reporting/ratio-heatmap.png)

2. Paste it into the slide, resize it, and place it over the previous week's. Send it to back and delete the old
3. Copy the alerts/cloud account ratio and change from the previous slide and replace the previous week's in the commentary.

#### Touching Up

If you haven't provided a commentary yet on the first slide with the year to date progress, do it now. Do a final check around the slides for any missing content or edits.

### Standard Slides

The standard slides don't change as much, but make sure to update the release name in the Minerva Consumer Container link. Update any links in the final links slide as necessary.
