---
layout: default
title: "[ARCHIVE] Continuous Delivery"
parent: "[ARCHIVE] Minerva Dashboarding Requirements"
grand_parent: "[ARCHIVE] Minerva - Compliance Scanning"
has_children: false
---
# Continuous Delivery: Templating and Continuous Improvement
The Mode of Operations of the HS SecDevOps team is one of Continuous Improvement and Continuous Delivery, as evidenced by our release process and CI/CD pipeline, our development and operational practices and even how we do documentation (including these requirements), soon extending even into blogs. 

In the same spirit, a template, development and release process should be established to allow for continuous delivery of new data visualizations, updates, as well as decommissioning of visualizations that are no longer relevant. This continuous delivery of Minerva Dashboards should allow us to respond rapidly  to new demands from exexcutives, changes in focus whether due to policy changes or particular problem areas, and leverage new data sets, new insights and share them with our stakeholder community as soon as we can - of course while maintaining quality standards.

## Data Visualization Development (Short Term)
Development of the data visualizations based on React and D3 as included in Jay's [personal company github](https://github.tools.sap/I818358/d3-react) repository, largely takes place off-line based on a retrieved dataset. That allows for the data visualizations to drive requirements, as well as lighten operational load for weekly status reporting - as is already the case today (Q4/2021).

This allows for the screenshots in [Dashboard Views](dashboardviews.md), data samples after (hopefully unnecessary) data cleansing and exception handling within the data access component making data requirements much clearer, but also of course the code base itself, and thereby help clarify the necessary backend requirements to enable these databoards integrated into HS Portal, including any required API work, and code-level integration with HS Portal and HS API.

## Templating and Continuous Improvement
This may be feasible as we work towards the MVP in Q1, but would likely slow our development process down if each off-line demo individually needs to be updated and prepared to get ready for integration with the portal. Therefore, as soon as a practical back-end data access and HS Portal integration method is established, a template should be established that can serve as the basis for future data visualization development.

(Ideally) this template should:

1. Allow for easy, if not seamless, integration into Minerva Dashboards in HS Portal as additional visualizations
2. Allow for data access directly to Minerva alert scan data or data aggregates held in HSDB via HS API
3. Allow for data access directly to Minerva alert scan data held in Minerva ELK, either by agreeing on a process to pull data for offline development from ELK directly, or as live query to ELK intermediated via HS API, whichever is more practical
4. Allow for data access directly to HSDB data via HS API
5. Allow for data access directly to HS Asset data via HS API
6. Allow for data access to other future data sources as they emerge

The first of these is to ensure a quick integration and deployment path from development to production, so we can quickly respond to new requests or needs, as well as new visualizations providing new insight.

The rest on the list is to both facilitate data access during development, as well as ease integration for rapid deployment - with the possibility of course to optimize the data query in that process.

## Encouraging those in the team interested in D3/React data viz
This may also be a good point to encourage those in the team with interesting in developing data visualizations, as well as understand how the existing ones work. Only basic knowledge of React (so far) has been required, and while D3 in pure form can be daunting, the combination of React and D3.js makes for a productive pipeline - especially when combining multiple views in a single visualization with a common (filtered) dataset.

I can strongly recommend this 17-hours (in two parts) [D3 React Tutorial](https://www.youtube.com/watch?v=2LhoCfjm8R4) on YouTube for those who want to get started. As the data visualizations are essentially based on the format defined in this course, it would be an excellent introduction directly relevant to the Minerva Dashboarding work.
