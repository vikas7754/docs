---
layout: default
title: "[ARCHIVE] Status Reporting Data Preparation"
parent: "[ARCHIVE] Minerva Reporting"
grand_parent: "[ARCHIVE] Minerva - Compliance Scanning"
has_children: false
---

# Status Reporting Data Preparation

Status reporting of security compliance alerts has evolved in a SecDevOps way since August of 2019 to what it is today. Status reporting changes slowly, to ensure that there is consistency from week to week. Some things, like the bar charts colors or delta table structure, go back to January 2020 when we first had Prisma exports for High alerts.

Since we have yearly targets and on executive level there is an expectation for quarterly progress updates, changes should be carefully introduced.

Before starting data preparation for the status deck, make sure you have the [data exports](data_exports.md) done.

The data preparation involves the following steps.

1. Consolidate Mediums
2. Update the Year-to-Date Tracking
3. Top 10 Deltas

## Consolidate Mediums

The data exports for Mediums, to keep file sizes manageable, are shared as three separate files. In order to report on the full data set, we have to create a consolidated file.

1. Create a new Excel file, and name it `Minerva_Open_Medium_<3-letter month><2 digit days><2 digit year>_ELK_ALL.xlsx`. The file name ultimately doesn't matter as you won't share this - but it makes it easier for yourself to keep it consistent.
2. Copy the alerts from the TI, PE and Other files into this worksheet. For the 2nd and 3rd, remove the header row. You should now have the full set in one worksheet
3. Select all and insert a Pivot table
4. Follow the same steps 5-9 as described in the [Data Exports](data_exports.md) section. You don't need the Accounts copied in. Again, you're not sharing this.

## Update the Year-to-Date Tracking

The latest will be shared on hand-over:

Start with the `Minerva High` worksheet.

### Update the Tables

1. Insert a new columns wherever the latest results are shown

![insert-row](/assets/docs-images/minerva_reporting/insert-row.png)

2. Select the last column in the top table, then drag it over another column from the bottom right handle. You should end up with a duplicate, but the date incremented by 1

![drag-top](/assets/docs-images/minerva_reporting/drag-top.png)

3. Update the date. This is not a real date, just change the number
4. Do the same for the index tables. Select the last column of both tables and drag it over.

![drag-index-tables](/assets/docs-images/minerva_reporting/drag-index-tables.png)

5. Update the date. These are real dates and are used in the line charts, so you will need to give this correct dates in date format
6. The first row in the first index chart is the total number of scans. Note that this is all of them, not just the highs. We should change this once the compliance rate KPI is approved. Now we can update it here, then have it updated automatically to the mediums.
   1. Go into Kibana and find the total number of scans for this particular scan
   2. insert it in the field in Excel - this calculates the high failed alerts/total scans once we add in this weeks results in the top table
7. The first row in the 2nd ratio table is for the total number of active accounts. This allows us to calculate the ratio of high severity alerts/cloud account
   1. Open the latest high alert data export you have just created
   2. go to the Accounts worksheet and select all
   3. Insert a pivot table in a new worksheet
   4. add `cloud_id` to the Pivot Values, `type` to Pivot Rows and `status` to filter
   5. Filter the set so only ACTIVE, NOTINORG and blanks are included (i.e. exclude DELETED, INACTIVE, etc.)
   6. Take the total and put it in Excel

Now we need to update the delta table. This is a bit trickier, as there are a lot of formulas driving this.

1. Update the dates in the column headers (see upcoming picture)
2. Select the top cell from the previous week, and drag it over to the next column

![prep-delta-1](/assets/docs-images/minerva_reporting/prep-delta-1.png)

3. Update the next column so it reads from the newly added column in the top table
4. Do the same for the percentage calculation

![prep-delta-2](/assets/docs-images/minerva_reporting/prep-delta-2.png)

5. Select the three cells we've updated for this top row and drag it down for all board areas. Do NOT include the totals line

![prep-delta-3](/assets/docs-images/minerva_reporting/prep-delta-3.png)

6. Select last week's total cell, and drag it over to the next column

![prep-delta-4](/assets/docs-images/minerva_reporting/prep-delta-4.png)

7. Update the next column so it reads from the totals of the newly added column in the top table
8. Do the same for the percentage calculation

![prep-delta-5](/assets/docs-images/minerva_reporting/prep-delta-4.png)

You should now be ready to enter the high severity alerts from the Highs data export in the top table, and the delta table should update.

The process for Medium alerts is the same, with the exception of entering total scans and number of accounts. The mediums ratio table has formulas that read those values from the Highs worksheet, and will grab the new values as the previous week column is dragged one column over to the new week.

### Update Line Charts

For each of the two line charts in both worksheets, we need to explicitly add in the new column of data. For each:

1. Right/Control-click the chart and `Select Data`
2. For each of the data series, update the Y-axis to include the new column, as well as the horizontal (categorical) axis labels, by incrementing the last column in the data array.

## Top 10 Deltas

This one can be a bit tricky, and a bit annoying as Excel will protest a lot that the formulas are incorrect. Just click that away.

> Note: Because this delta will change each week, before anything else, save the last week's Top 10 sheet with an updated date!

We start with the previous week's delta table

![top10-delta](/assets/docs-images/minerva_reporting/top10-delta.png)

1. Delete the first column with numbers, i.e. 2nd column

![top10-delta-step1](/assets/docs-images/minerva_reporting/top10-delta-step1.png)

2. Delete the 'delta' column (last one)

![top10-delta-step2](/assets/docs-images/minerva_reporting/top10-delta-step2.png)

3. Sort the table with Count of Alerts largest to smallest

![top10-delta-step3](/assets/docs-images/minerva_reporting/top10-delta-step3.png)

4. Open the high or medium (ALL) alerts data export for the week, and copy the top 10-12 or so from the Alerts Pivot worksheet
5. Paste it next to the existing table with last week's results
6. Now comes the tricky part of lining the control titles in column A with those in column C. You will have to insert rows and cut & paste this or last week's control title and number to make the two data sets line up
7. Remove any unnecessary rows, delete column C with the 2nd set of control titles
8. add 'delta' as next column header, then add a formula in the first cell of `= <this week> - <previous week>`
9. Sort the table on the current week's alert numbers Smallest to Largest
10. For the chart, choose Select Data, and select ONLY the first column and the delta column
11. Select all data points and set the fill color to either dark red or light green, depending on which are more above of below zero
12. Adjust the color of individual data points in the series going the other way
13. Adjust the dates in the title
