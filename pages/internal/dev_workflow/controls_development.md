---
layout: default
title: Controls Development with Chef Inspec
parent: DevOps WorkFlow
grand_parent: CI/CD
nav_order: 7
has_children: true
---
# Controls Development with Chef Inspec
- This document describes the overall Controls development process. 
- The examples and the commands documented below are specific to AWS profile however, similar process can be followed for Azure, GCP and Alicloud as well since the profile structure for AWS, Azure, GCP and Alicloud hyperscalers are all the same.

- **Terraform tests:**
   - The terraform tests include good tests, bad tests and tests required to cover edge cases for a control.
   - In good tests resources are deployed in the way that ideally the control should pass that test. In bad tests resources are deployed in the way that ideally the control should fail that test.
   - The terraform tests in the repository are structured in modules:
     - Create relevant resource in any of the existing modules or if a module does not exist create a new one.
     - The attribute values for the resource in a module are parameterised in the form of variables in order for its reusability. The value for these variables are then added in good terraform main.tf and bad terraform main.tf depending whether it is a good or a bad resource.

- **Cookstyle Linting:**
   - Cookstyle linting is an enforced check as part of the Pull Request validation automation. PR's will be automatically checked for Cookstyle violations.
   - To run this locally, run `Cookstyle .` when in the profile directory, or run `cookstyle -D --format offenses` for a nicer formatted output.
   - Cookstyle can also automatically fix a lot of linting issues (if not, it will guide you how to fix them) by running `cookstyle -A`

# Control Development:

- **Step 1**: **Set environment variables to write terraform tests and run Chef Inspec:**

  - Relevant environment variables must be set depending on for which hyperscaler control development is done.
  
  1. **AWS**

     - AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION, AWS_REGION, AWS_AVAILABILITY_ZONE, AWS_MASTER_ACCOUNT_ID
     - AWS_DEFAULT_REGION = us-east-1
     - AWS_REGION = us-east-1
     - AWS_AVAILABILITY_ZONE = us-east-1a

  2. **Azure**
     - ARM_CLIENT_ID, ARM_CLIENT_SECRET, ARM_SUBSCRIPTION_ID, ARM_TENANT_ID, AZURE_SUBSCRIPTION_ID, AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET,  ARM_ORG_ID

  3. **GCP**
     - GOOGLE_APPLICATION_CREDENTIALS, GCP_PROJECT_ID, GCP_ORG_ID, TF_VAR_GOOGLE_PROJECT
     - GCP_PROJECT_ID = sap-mcsec-inspec-test2
     - TF_VAR_GOOGLE_PROJECT = sap-mcsec-inspec-test2

- **Step 2**: **Create Good/Bad Terraform tests**
  - Deploying a specific module in good terraform (similar process for bad terraform)
    ```
    - cd profiles/sap-aws/test/integration/good-terraform
    - terraform init
    - terraform plan -target=module.<module_name>
    - terraform apply -target=module.<module_name>
    ```
  - Once testing is done **Do not forget** to destroy the resources
      - To destroy resources:
        ```
        - cd profiles/sap-aws
        - terraform destroy
        ```

- **Step 3**: **Writing/Testing Chef Inspec control**
  - The chef inspec controls are present in following directory of the repo: profiles/sap-aws/controls
  - There is a wiki tag (eg: SAP: 1.60.05) associated with each of the control. Each control is present in a file with .rb extension named under this wiki tag  (eg: sap_1_60_05).
  - This Wiki tag can be found in the control tracking sheet.
  - For new control, if a file with that tag already exist, it will be written in the same file. Ff a file with that tag does not exist a new file is created in the same format and control is added in that file.
  - Control components:
    - The name of the control should be in following format: 'sap_\<wiki_tag\>_\<small_description_of_the_control\>'. One example would be 'sap_1_50_05_s3_bucket_public'
    - The title can be taken directly from the controls tracking sheet
    - The description has to be formulated with reference from SGS Wiki chapter
    - tag sgs_wiki_url: SGS Wiki chapter link has to be added
  - Testing Controls: Once control has been written
    - **Method 1**: Testing in current repository

      - Run a specific control:
        - AWS
          ```
          - cd profiles/sap-aws
          - inspec exec . -t aws:// --input aws_master_account_id=<enter_master_account_id> --controls <enter_your_control_name>
          ```
        - Azure
          ```
          - cd profiles/sap-azure
          - inspec exec . -t azure:// --controls <enter_your_control_name>
          ```
        - GCP
          ```
          - cd profiles/sap-gcp
          - inspec exec . -t gcp:// --input gcp_project_id=sap-mcsec-inspec-test2 gcp_organization_id=<enter_gcp_org_id> --controls <enter_your_control_name>
          ```
      - Run all the controls:
        - AWS
          ```
          - cd profiles/sap-aws
          - inspec exec . -t aws:// --input aws_master_account_id=<enter_master_account_id>
          ```
        - Azure
          ```
          - cd profiles/sap-azure
          - inspec exec . -t azure://
          ```
        - GCP
          ```
          - cd profiles/sap-gcp
          - inspec exec . -t gcp:// --input gcp_project_id=sap-mcsec-inspec-test2 gcp_organization_id=<enter_gcp_org_id> 
          ```
    - **Method 2**: Testing using Inspec Shell

      - Clone the AWS Inspec resource pack ([AWS Resource Pack](https://github.com/inspec/inspec-aws.git))
      - Navigate to base of the repo:
        ```
        - cd inspec-aws
        - inspec shell -t aws:// --depends .
        ```
      - This will open up an inspec shell where you can run the entire control or even 'cd' into a resource and test the attributes individually . eg: To test attributes for a s3 bucket
        ```
        - cd aws_s3_bucket(bucket_name: 'bucket_name')
        - ls
        ```

- **Step 4**: **Running Integration Test suite**
  
  - Once all the terraform tests are written, control is developed and it is tested locally next step is to run the test suite:
  - Follow this process:
    ```
    - cd profiles/sap-aws
    - rake test:update_expected_results
    ```
  - The test suite run is automated and will do the following:
    - Initialize good terraform
    - Initialize bad terraform
    - Create good terraform resources
    - Run inspec tests against those resources
    - Destroy good terraform resources 
    - Create bad terraform resources
    - Run inspec tests against those resources
    - Destroy bad terraform resources
    - Render results of the run in 'expected_results.json' file. This file can be found here: /profiles/sap-aws/test/results
      - This file contains list of all the controls and their expected good configuration and bad configuration results.
      - It is necesary to verify if only that new control which was developed is added into this file with its expected results. (Ideally expected results should be good configuration passing and bad configuration failing)

- **Step 5**: **Building docker images**

  - There are two docker images whose built needs to be verified as a part of control development.
  - To verify this follow this process:
    ```
    - cd profiles/sap-aws
    - rake build:all[sap-mcsec-compliance-dev,3.0.0-alpha.1]
    ```
  - This will build PubSub and ad-hoc docker images which should be successful.

- **Step 6**: **Creating a PR**

  - Once all the steps have been followed, a PR is created to merge into 'develop' branch.
  - The PR should consist screenshots for good and bad tests and a small description regarding the control and the test cases covered.

# Summary:

- Create a new feature branch from develop.
- Write Good/Bad terraform tests.
- Develop a control.
- Test the control locally using any of the 2 methods mentioned above.
- Run the test suite and verify just that new control is added in expected_results file and rest of the results for all other controls are the same.
- Verify Docker images are built successfully.

# Important links:

- [AWS Resource Pack](https://github.com/inspec/inspec-aws.git)
- [Azure Resource Pack](https://github.com/inspec/inspec-azure.git)
- [GCP Resource Pack](https://github.com/inspec/inspec-gcp.git)
