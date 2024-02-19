---
layout: default
title: "Prisma API Key Usage"
parent: Prisma Ops
grand_parent: Operations
nav_order: 4
has_children: true
---

# Runbook: Deleting Cloud Accounts, Subscriptions, and Projects

## Document Control

The document control section describes the revision history and summary of changes made in the document. It will serve as the version control
for the contents of the document.

## Revision History

```
Revision Number Revision Date Summary of Change Changed By
1.0 05.04.2020 Initial Draft Hyperscaler DevSecOps
```

## Table of Contents

# Prisma ASPI Key Usage

- Access Keys are a secure way to enable programmatic access to the Prisma Cloud API.
- By default, only the System Admin has API access and can enable API access for other administrators.
- If you have API access, you can create up to two access keys.
- Further documentation can be found on the [Prisma API Documentation Page](https://api.docs.prismacloud.io/)

Remember:

- Keys should be set to expire within 90 days (Maximum)
- Keys set to expire in a timeframe greater than 90 days will be modified by the System Admin to expire within 90 days of its created date.
- Once keys expire, you cannot reactivate an expired access key.

# Creating an API Key

## Operational Procedures

### STEP 1 >> Select Settings > Access Keys and click + Add New.

<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/prisma_api_key_usage/prisma_api_key_usage_step_1.png">
</p>

### STEP 2 >> Enter Name > Check Key Expiry > Set Expiration Date and click + Create.

    Name:  Line of Business_API Shortname
      Example:
        MC_DevOps_Automation
        SGS_Vulnerablity_MGMT

**60 Day Max Lifetime of the API Key**

<p align="center">
  <img width="" height="" align="center" src="/assets/docs-images/prisma_api_key_usage/prisma_api_key_usage_step_2.png">
</p>

# Securing your API Key

### STEP 1 >> Select Settings > Access Keys and click + Add New.

# API Key Rotation

Use your existing key to generate the next API key.

    <insert Code here>
