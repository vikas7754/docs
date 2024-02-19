---
layout: default
title: Developer Guide
nav_order: 2
parent: Dev WorkFlow
grand_parent: Internal Documentation
---
# Developer guide
This document aims to provide guidelines for developers in the compliance
devsecops team.

## PR merging process
As a CICD is enabled, there are some important things to consider in order to
save time and avoid issues.

The CICD adds a status check on the **develop** branch so that each new PR
branch needs to be up to date before merging. This is to ensure that the branch
has been tested.

Each time that a PR is created a CI pipeline run is started. This includes some
tests such as hadolint tests and inspec control static checks. More will be
added as time passes, for example unit tests.

Github has a status check enabled which allows a PR to be merged only if it is
up to date with the **develop** branch, which means that the PR has to be
rebased with **develop**. Please follow the git guidelines
[here](./git-guide.md).

```
Do not use the **update branch** button as this will merge the develop branch
into your PR. We are using a rebase strategy and this will cause issues.
```

It is advisable some level of coordination among developers to save time to
avoid trying to merge PRs at the same time.

A dedicated slack **#hs_devsecops_developer** channel is to be used for such
coordination.

Each time a PR is ready to be merged the responsible developer makes an
announcement in the channel that is about to merge his/her PR. This is
equivalent to take a virtual token for the merging process. This means that the
PR is already being rebased on **develop** and once the CI tests are completed
and passed the PR can be merged.

If in the mean time another developer with a PR ready to merge comes along,
he/she announce in the channel to be the next in line for merging his/her
PR. The latter developer should wait to rebase the PR once the previous PR is
merged as the **develop** branch will be updated.

Once the first developer has merged his/her PR, he/she must say so in the
channel so that the token is released and the next developer in the queue can
take it, which means rebase his/her PR, push it and a start a new CI run for the
PR.

As more developers come along the same process applies.

## Merging strategy
In terms of merging strategy, github provides 3 different ways:
- **Create a merge commit**: use this when there are more than 1 commit in the
  PR, as it creates an additional merge commit which wraps up all commits in the
  PR
- **Squash and merge**: don't use this, as all commits are squashed into one and
  you loose the commits history of your PR
- **Rebase and merge**: use this when there is a single commit in the PR, as
  adds a single commit to the PR, and there is no use of having a merge commit
  in addition

Once a PR is merged, the branch should be deleted in github using the button
avaialable.

## Daily integration tests
As at the moment controls tests inlcude only integration tests that need real
systems and therefore use service accounts to perform actions in those systems,
only one run at the time can be started. A daily run of the CI perfoming such
integration tests is performed at 6AM UCT. Any possible integration issues on
the controls is reported in those runs and pushed to a dedicated slack
**#mc_devsecops_cicd_tests**. Developers are encouraged to check the reported
issues and create bugfix PRs to address them. These PRs will follow the exact
same process above.
