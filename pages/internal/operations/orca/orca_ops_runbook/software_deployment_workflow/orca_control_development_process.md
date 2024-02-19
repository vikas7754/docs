---
layout: default
title: Orca Ops Runbook - Orca Control Development Process
parent: Software Deployment Workflow
grand_parent: Orca Ops Runbook
has_children: false
---

# Orca Ops Runbook - Orca Control Development Process
This documentation will cover the process to build Orca Control for SGS new requirement.


## Orca Control Development Process
To build new control requirement by SGS, the following steps will need to be taken :

1. Get the requirements from SGS
2. Run relevant Tests
2. Write custom queries which provide us with compliance data for assets within our landscape and tested out with sonar query. 
3. Get SGS validations and approvals
4. Write the Orca controls using Control Definition Format. 

    - control name
    - control description
    - sgs_wiki_link
    - query 
    - score
    - allow_orca_score_adjustment: false
    - enabled: true
    - category: Best practices
    - minerva_control_id: null
5. PR validations and approvals
6. Control deployed to Orca Production

