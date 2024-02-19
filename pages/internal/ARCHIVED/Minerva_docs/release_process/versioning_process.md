---
layout: default
title: "[ARCHIVE] Versioning Process"
parent: "[ARCHIVE] Release Process"
grand_parent: "[ARCHIVE] Internal Minerva Docs"
has_children: false
---

# Generic service versioning workflow

In order to provide a valuable versioning workflow, given our current approach,
we have to consider different version definitions:

- **code-version**: this version is the one mantained in the code for the
  specific service, e.g. for consumer it is maintained in the inspec.yaml
  file. This version specifies the status of the code and the associated
  image version to be built
- **deploy-version**: this is the appVersion value mantained in the helm chart
  and it is used to deploy the image version
- **running-version**: this is the currently running version of the service
  and it is retrievable in the GCP console under the relative GKE workload
- **released-versions**: this is a list of all versions officially released

In our current software lifecycle approach when a PR is merged, different
processes maybe triggered depending on the combination of the status of the
versions definitions above. For example a new image might be built or updated,
and then deployed in a landscape. If the landscape is production, then a release
is done. The following diagram illustrates in details how the defined versions
above interact with each other and can trigger different processes:

<img align="center" src="/assets/docs-images/release_process/versioning_process.jpg" width="65%" height="65%">

**Note**: all services should follow this approach.

# Minerva versioning process

Minerva release concerns consumers only. It adopts an alphabetical codename
approach for versioning based on cities.

Each codename release has associated the semver version of each consumer and the
release date as following:

| **Name**     | **Alicloud version** | **AWS version** | **Azure version** | **GCP version** | **Release date** |
| ------------ | -------------------- | --------------- | ----------------- | --------------- | ---------------- |
| Atlanta      | 4.2.0                | 4.3.0           | 4.2.0             | 4.2.0           | 2022-03-01       |
| Buenos Aires | 4.3.0                | 4.4.0           | 4.2.0             | 4.3.0           | 2022-04-01       |
| Cairo        | 4.4.0                | 4.4.0           | 4.3.0             | 4.3.0           | 2022-05-01       |

## Consumers versioning

Each consumer hyperscaler version is maintained in the relative inspec.yaml
file. This indicates the **code-version** and it's used to create the
corresponding image. Each deployed hyperscaler version is maintained in the helm
values file.

Please note that while normally the **deploy-version** is up to date with the
latest build, there might be times where this is not the case, especially if
between the build of the new image and the deployment there is a considerable
time gap.

## Release notes

The release notes contain the mapping of each official release with the
corresponding hyperscalers consumer version. Adhoc image users should refer to
the release notes to understand which image version they need to download.

# Helm chart versioning

Helm charts maintain a chart version value which is used to keep track of
changes of the chart itself. Each time a change in the chart is made the version
should be increased accordingly.
