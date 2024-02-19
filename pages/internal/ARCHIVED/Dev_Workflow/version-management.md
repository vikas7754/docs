---
layout: default
title: "[ARCHIVE] Version Management"
parent: "[ARCHIVE] Dev WorkFlow"
grand_parent: ARCHIVED
has_children: false
---
# Motivation and Objectives
In a software system, all dependencies go over release cycles to provide better
security, performance, functionalities. A system should always keep up with the
dependencies versions, at minimum for security updates. Leaving versions
unchanged for too long may have bad effects in the long run.  Also, the
production system needs to have pinned versions for reproducibility as well as
for easier debugging when issues arise as it would avoid confusion in case of
newer and untested versions were inadvertently deployed.

# Requirements
- All dependencies versions need to be pinned in production
- In development, versions should be always the latest, unless they break a
  functionality in which case they have to be pinned. In such a case a zenhub task
  should be created to modify the component/artifact to use the higher version

# Pre-requisites
Version files  in the main repo folder, i.e. *prod-requirements.yaml* and
*dev-requirements.yaml* with the following format:

```yml
python:
    type: language
    version: 3.8.0
    packages:
        - google-cloud-pubsub:
          version: latest/1.7.0
          locations:
              - services/inspec-dispatcher-alicloud/requirements.txt
              - services/inspec-elastic-data-transformer/requirements.txt
              - …
ruby:
    type: language
    version: ...
    packages:
        - bundle:
          version: latest/…
          locations:
              - profiles/sap-aws/Gemfile
              - profiles/sap-gcp/test/Gemfile
              - ...
rake:
    type: tool
    version: ...
terraform:
    type: tool
    version: ...
ubuntu:
    type: OS
    version: ...
    packages:
        - python3-pip:
          version: latest/…
          locations:
              - profiles/sap-aws/Dockerfile.pubsub
              - profiles/sap-alicloud/Dockerfile.pubsub
              - ...
```

# Process
- Production version file *prod-requirements.yaml* holds pinned versions for all
  dependencies
- Development version file *dev-requirements.yaml* maintains the list of all
  dependencies that don't break any functionality with no versions specified,
  and pinned versions of the known working ones where the higher version is
  known to break
  - Create zenhub task for known breaking version
- When performing a new release, it should be safe to bump-up the version from
  *dev-requirements.yaml* to *prod-requirements.yaml* as it should be implicitly
  tested

