---
layout: default
title: Orca Ops Runbook - Orca Automation
parent: Service Build Information
grand_parent: Orca Ops Runbook
nav_order: 5
has_children: false
---

# Orca Ops Runbook - Orca Automation

This documentation covers Orca automation used by team

## **Orca Exceptions via Automation**

### **Overview**

The "Orca Exceptions via Automation" project automates the management of exceptions in the Orca tool. It introduces three cloud functions that work together to streamline the exception as automation cycle. Each function serves a specific purpose and operates independently, allowing for a decoupled and efficient workflow.

### **Requirements**

The main breakdown of the creation of this service can be found in [this tracker](https://github.tools.sap/SAE/orca/issues/101). # noqa: E999
To use this service, the following requirements must be met:

- Data passed to the Create Automation function must include the following fields:
  {
  "type": "new/update",
  "mcdb_groups": ["<mcdb_group1>", ...],
  "is_group_exception": "<is_group_exception>",
  "account_ids": ["<account_id1>", ...],
  "alert_names": ["<alert_name1>", ...],
  "expiry_date": "<expiry_date>"
  }
  Please ensure that the data provided adheres to this structure, include "orca_automation_rule_id": "xxxxxx" if type=update.

 <p align="center">
      <img width="" height="" align="center" src="/assets/docs-images/orca_ops_runbooks/csv_data_ingestion.png">
 </p>

### **Architecture**

The project architecture consists of the following components:

Create Automation: This function receives requests via GCP Pub/Sub to create or update exceptions. It examines the payload and determines whether it is a new exception or an update to existing exception. For new exception, the function performs validation on various fields, creates an automation rule in Orca, and inserts a corresponding record in the Cloud Spanner database. In the case of an update exception, the function directly updates the record in the Cloud Spanner database using the Orca automation rule as the primary key.

Update Automation: The Update Automation function receives the payload directly from the change stream configured at the Cloud Spanner side. It detects "update" modifications and applies the necessary changes to the Orca automation rules, either by updating existing rules or deleting them.

Expiry Status Checker: Triggered on a weekly basis by Cloud Scheduler, this function reads all valid exceptions from the Cloud Spanner database. It checks their expiry dates and updates the status to false if the expiry date has passed.

Slack Integration (Notification Channel): The Slack integration acts as a real-time notification channel for the cloud functions. It delivers immediate alerts and updates for any exceptions-related events, including errors or modifications. Whenever such events occur, relevant messages are sent to designated Slack channels, enabling timely awareness.

 <p align="center">
      <img width="" height="" align="center" src="/assets/docs-images/orca_ops_runbooks/orca_exceptions_via_automation.png">
 </p>

### **Conclusion**

The "Orca Exceptions via Automation" project provides a comprehensive solution for automating the Orca automation cycle. By leveraging cloud functions and GCP services, it enables seamless exception management, improves efficiency, and reduces manual intervention.
