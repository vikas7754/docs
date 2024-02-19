---
layout: default
title: "[ARCHIVE] Data Exports"
parent: "[ARCHIVE] Minerva Reporting"
grand_parent: "Minerva - Compliance Scanning"
has_children: false
---

# Data Exports for Minerva Alert Data

Every **Thursday**, the results of the Monday scan are shared with the recipients in the DL MC SAE Hyperscaler Security Extended Distro (External). This document describes the process of producing the data export files from the archived files in the [GCP Archive Storage Bucket](https://console.cloud.google.com/storage/browser/elastic-data-archive-bucket;tab=objects?forceOnBucketsSortingFiltering=false&authuser=0&orgonly=true&project=sap-mcsec-inspec-prod&supportedpurview=organizationId,project&prefix=&forceOnObjectsSortingFiltering=false&rapt=AEjHL4P2X3UULQXGFV97ML0SUcQIu1bcPLjfK4mDRUhUNkpQtYCUt7DYbgBe1AGev_Ld9IUiMClUBjG40EuYtETWOjdlmjKJ7w&pli=1), and sending it out to the audience. Note that these data exports are also the basis for the weekly status reporting. See [Status Reporting Data Preparation](status_reporting_data_prep.md).

So far, exports are sent Thursdays afternoon Pacific time. There is no set time, but they are always sent before 6PM so colleagues globally have them Friday morning.

The main steps are:

1. Scan results validation
2. Downloading files
3. Add HSDB account data and insert pivot tables
4. Upload to Teams
5. Send to recipients with light commentary

## Scan results validation

- In Elastic, compare results w/previous week for benchmark. Set this filter `https://minerva.multicloud.int.sap:5601/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-12d,to:now))&_a=(columns:!(),filters:!(),index:'6f81b2a0-2a94-11ec-9911-559d0f7a0f46',interval:auto,query:(language:kuery,query:''),sort:!(!(timestamp,desc)))`

- Select 1st scan for filter
- Open Controls Error Reporting Dashboard in another tab
- Select 3rd scan for new filter
- Open Controls Error Reporting Dashboard in another tabControls Error Reporting Dashboard
- Following attributes needs to be verified:
  - Total Results of scans (e.g. 10M 3/27/2023 for EU/APAC; 3/26/2023 for US) | 2nd April US; 3rd for EU/APAC: Should be ~10M +- x 4%
  - Errors Rate: < 0.02%
  - Accounts Scanned: Review Accounts#; should be same or greater for each cloud provider - 100; China 0- -15 on negative
  - Errors By Control ID: Sort Number by Descending for new scan only
    - Identify all controls with number of errors >=3
    - Compare against exception list with accepted number of digits for errors:
      - 2_02_iam_group_admin_access -> 3/4 digit, 3_02_storage_account_blobs_logging -> 3/4 digit, 3_02_storage_account_tables_logging -> 3/4 digit, 3_02_storage_account_queues_logging -> 3/4 digit, AWS S3 bucket related controls -> upto 3 digits, storage related controls for ALY -> upto 3 digit
- Data validation is done!

## Downloading files

The data exports are in the [GCP Archive Storage Bucket](https://console.cloud.google.com/storage/browser/elastic-data-archive-bucket;tab=objects?forceOnBucketsSortingFiltering=false&authuser=0&orgonly=true&project=sap-mcsec-inspec-prod&supportedpurview=organizationId,project&prefix=&forceOnObjectsSortingFiltering=false&rapt=AEjHL4P2X3UULQXGFV97ML0SUcQIu1bcPLjfK4mDRUhUNkpQtYCUt7DYbgBe1AGev_Ld9IUiMClUBjG40EuYtETWOjdlmjKJ7w&pli=1)

1. Open the bucket and open the `excel` folder
2. Sort the `Created` folder so the newest files are on top most recent scan by filtering on the current weeks Monday scan (e.g. for 4/6 type minerva-2023-04); `minerva-2023-<month_no>-<monday's date>`
3. Download the `minerva-<date>-high-all-bulk-archive.xls` and the three `minerva-<date>-medium-<TI/PE/Others>-bulk-archive.xls` files
4. Download a copy of the HSDB database via [this link](https://db.multicloud.int.sap/creator/accounts.csv). If you don't have access to this, make sure you have Reader role in HSDB.

> Note that the HSDB download can be somewhat unreliable if the connection is interrupted somehow before the download is fully done. Verify that it is a full download by making sure size of the file is around 19.5 MB. You may have to repeat the download!

On local machine:

- Create a new folder using todays date - naming convention <todays date> (<scan date>)
- Copy/Paste file from download area to this new directory

## Add Account Data and Insert Pivot Tables

Our internal stakeholders have come to expect the exports in a particular format and structure. Some teams build automation on these files, so it is good to keep the same format week-to-week, and announce changes in the future during Office Hours.

1. Open each downloaded excel file and save it using this naming convention:
   - Highs: `Minerva_Open_High_<3-letter month><2 digit days><2 digit year>_ELK.xlsx`. Example: `Minerva_Open_High_Aug1822_ELK`
   - Mediums: `Minerva_Open_Medium_<3-letter month><2 digit days><2 digit year>_ELK_<PE/TI/Other>.xlsx`. Examples: `Minerva_Open_Medium_Aug1822_ELK_TI.xslx`, `Minerva_Open_Medium_Aug1822_ELK_PE.xlsx`, `Minerva_Open_Medium_Aug1822_ELK_Other.xlsx`
2. Rename the worksheet with the alerts to `Minerva High`, `Minerva Medium (PE)`, `Minerva Medium (TI)` or `Minerva Medium (Other)` as appropriate
3. Add a new worksheet called `Accounts`. Copy the content of the HSDB download into this worksheet
4. Go back to the alerts worksheet and select all
5. From the Excel menu, insert a Pivot Table in a new worksheet. Rename the worksheet to `Pivot Org`
6. Add the following fields to the Pivot Rows in Order:
   - L1
   - L2
   - L3
   - L4
   - L5
   - L6
   - L7
   - L8
   - cloud_id
   - control_title
7. add `control_title` to the Pivot Values
8. Right-click (win) or Control-click (mac) one of the L1 fields in the pivot table and select `Expand/Collapse > Collapse Entire Field`. For the PE and TI mediums, use the L2 field (as they are single board areas)
9. Right-click (win) or Control-click (mac) the worksheet and `Move or Copy... > Pivot Org`, making sure to tick the `Create a copy` checkbox. Rename the copied worksheet to `Pivot Alerts`
10. Remove all but `control_title` from the Pivot Rows, then sort the `Count of control_title` column largest to smallest
11. Set `File > Always Open Read-Only` for MAC and for windows follow these steps: File > Save As > More options... > A dialog box will appear > Click on the dropdown for Tools > General Options.. > Check the Read-only recommended box.

Pivot Org
![pivot-org](/assets/docs-images/minerva_reporting/pivot-org.png)

Pivot Alerts
![pivot-alerts](/assets/docs-images/minerva_reporting/pivot-alerts.png)

You should now have four files ready for upload.

[Minerva High example file](https://sap.sharepoint.com/:x:/r/teams/MCSecureArchandEngineering/_layouts/15/Doc.aspx?sourcedoc=%7B697AE438-BC22-40AD-9C8A-EA3AD09BA9A0%7D&file=Minerva_Open_High_Apr0623_ELK.xlsx&action=default&mobileredirect=true) (see same HS Secure Architecture & Engineering Sharepoint folder for Medium examples)

> Note: Steps 8 and 9 could be done as well by creating a new pivot table from the alert list and only adding `control_title` in both Pivot Rows and Pivot Values. The copy approach ensures that the list always matches the Pivot Org numbers so is done for consistency and data quality purpose.

## Upload to Teams

The files are stored in [MC Secure Architecture & Engineering](https://sap.sharepoint.com/teams/MCSecureArchandEngineering/Shared%20Documents/Forms/AllItems.aspx?RootFolder=%2Fteams%2FMCSecureArchandEngineering%2FShared%20Documents%2FGeneral%2FWeekly%20Minerva%20Data%20Dumps&FolderCTID=0x012000BD28024DFDAF47468E69380606887991)

1. Navigate to the the above mentioned link
2. Upload the 4 files you have created

## Send to Recipients with Light Commentary

Much of the following is essentially templatized. However, it is nice to give a quick update with how the week went. It is therefore recommended to first do at least some of the [Status Reporting Data Preparation](status_reporting_dataprep.md) before distributing the data exports.

The screenshot below shows a recent data export mail. The highlighted sections are what changes every week (but of course the format can be changed), the other text can typically stay the same.

Data Export Mail
![data-export-mail](/assets/docs-images/minerva_reporting/data-export-mail.png)

1. Find last week's data export mail and Reply All to it. Remove all superfluous text before the "Hi everyone,".
2. Update the Subject line (i.e. remove the Re: that is added, and update the date). Example:
   - **Re:** Hyperscaler Secure Architecture & Engineering Alert Remediation - Minerva Open High and Medium **Apr 6**, 2023
   - Hyperscaler Secure Architecture & Engineering Alert Remediation - Minerva Open High and Medium **Apr 6**, 2023
3. Update the links section (first highlighted section) with the links for the newly uploaded files.
   1. Open the `MC Secure Architecture & Engineering/Weekly Minerva Data Dumps` folder in Sharepoint (Menu: Open in Sharepoint)
   2. Click the link/share icon behind each file and click it
   3. Click `People you specify can view` and select `People in SAP SE with the link`. Click Apply
   4. Click `Copy` under Copy Link
   5. Insert into the data export mail
4. Update the commentary (yellow highlighted section) with the changes of the week.
5. Proof read and send to DL MC SAE Hyperscaler Security Extended Distro (External) and Cc: DL GCS Multi Cloud Security Operations

> Note: since the recipient list is over 500, expect a significant number of out-of-office notifications in response.
