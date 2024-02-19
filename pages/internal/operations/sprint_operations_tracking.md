---
layout: default
title: Sprint Operations Tracking
parent: Operations
grand_parent: Internal Documentation
nav_order: 8
has_children: true
---
# Sprint Operations Tracking

Reporting on team operations progress for each sprint generally consists of three components:
1. Data Gathering - Writing Jira queries and exporting each team members work and progress into .csv 
2. Analysis - Reviewing each ticket done for specific metrics (MTTR, Response Time etc.)
3. Visualization and Storage - Updating any applicable graphs and making sure monthly / quarterly information is up to date.

## Data Gathering
### Jira Queries 
- Jira queries can be written either through the basic filtering options or writing a custom query 
- An example query can be found and/or used below:
project = MCO AND resolved >= YEAR-MONTH-DAY AND resolved <= YEAR-MONTH-DAY AND assignee in ("TEAM MEMBERS E-MAIL")
- After the search filters your results, export the data into a .csv based on (Current fields)

## Analysis
### Ticket Metrics
Ticket progress can be tracked by the following SLA (service level agreements):
- Initial Response Time - Important for measuring how long a ticket sits in the queue before it is worked on.
- MTTR (Mean Time To Resolution) - Once a ticket is assigned, a measure of how long it takes until it is resolved. 

Currently the process is that for each team member, each ticket is reviewed individually to track both the response time and MTTR. Individual ticket review also helps identify tickets that are being blocked, or stale tickets that need to be updated or closed due to a lack of action (waiting for customer, vendor, etc.)

## Visualization and Storage
### Updating historical record
Currently all DSEC and MCO ticket progress is tracked by team member and uploaded to a monthly updated [sharepoint document](https://sap.sharepoint.com/:x:/r/teams/MC-DevSecOps/_layouts/15/Doc.aspx?sourcedoc=%7B17E12A36-9F95-4017-8F5F-4615BBF20B79%7D&file=dsec_mco_team_ratio.xlsx&action=default&mobileredirect=true). This is used by management to track each team members progress and ratio of development to operations work. Currently all data is summarized by month and by quarter. 
