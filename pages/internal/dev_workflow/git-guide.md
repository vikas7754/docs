---
layout: default
title: Git Guide
parent: Dev WorkFlow
grand_parent: Internal Documentation
nav_order: 4
has_children: true
---
# Developer Git Guide
This guide provides some suggestion on how to use git for a normal development
process. However, please consider that this is not the only way to do this and
alternative ways are also valid. Also, only cli examples are used in this
guide. If you are using a different client, you will need to find the
correspondent way to perform each operation.  Finally, this guide is not about
explaining the basic git commands and terminology for which you are expected to
have some knowledge. When not sure always refer to the official documentation.

## Standard workflow
The **develop** branch is the main developing branch from which one normally
creates a new branch from to work on a new feature or a bugfix.

A naming convention is suggested to be adopted in the team to use a prefix for
the branch name:
- feature: for any new feature or updating an existing one
- bugfix: for any bugfix
- hotfix: for any hotfix which is bug that affects released code running in
  production and needs fixed ASAP

Using those prefixes branch names would be:
- **feature/super-feature**
- **bugfix/bad-bug**
- **hotfix/urgent-bug**

To update your local **develop** branch with the remote **develop**, you first
need to make your local repo aware of changes in the remote repo:

```
git fetch --prune
```

Then you can align your local **develop** with the remote one by doing a hard
reset:

```
git checkout develop            # change your working branch to develop
git reset --hard origin/develop # reset your local develop to the remote one
```

If your local **develop** branch is up to date with the remote
**origin/develop**, you can create your new branch as:

```
git checkout develop
git checkout -b feature/super-feature
```

Once you start working on your feature/bugfix branch and other developers work
get merged to the remote **develop** branch, your local **develop** diverges
from the remote and you need to realign yours. This can be done through a rebase
of your local feature/bugfix branch to the develop branch on the remote
repo. Rememeber that to do a rebase your working branch needs to be your
feature/bugfix branch, which you can switch to with a checkout:

```
# Only need the following command if your working branch is not the one you
# need to do the rebase
git checkout feature/super-feature

git rebase --rebase-merges=no-rebase-cousins origin/develop
```

The first time that you push your local feature/bugfix to the remote repo you
need to create a remote branch with the same name as your local branch:

```
git push origin HEAD
```

Subsequent updates can be pushed to your remote branch as:

```
git push --force-with-lease origin
```

## The meaningful changes approach to git commits
A PR should only have **meaningful changes** to the code that allows who ever looks
at the git history to easyly see:

```
The state of the code before this PR and after the PR is merged
```

This means that the commits should reflect the logical separation of the changes
being made. For example if the PR is changing a service and its deployment files
it would be advisable to have two different commits, one for the service and the
other one for the infrastructure deployment.  Also, the number of commits for
changes to the same file or group of logical files should be one. Creating
additional commits just because the same file(s) has been changed multiple times
during the development work, doesn't provide any help to whoever looks at the
git history or in case some fix needs to be performed by using the
history. Remember what was stated above, only **meaningful changes**. There are
two ways to achieve this.

### Soft reset
In this approach you continuosly create commits one after the other. Obviously
this piles up commits on top of each and defeats the **meaningful changes**
approach. In this case doing a soft reset at the point before your work starts
allows to drop all the commits, but keep all the changes. In practice after you
perform this you will see all the files that you have changed as unstaged, which
allow to create your clean commits following the **meaningful changes**
approach. Below is an example:

```
# Example of git history of your changes on top of the develop branch

6f09df1 # change to file A 
51f5cdb # change to file B
773fb95 # change to file B
0467f10 # change to file A
fa03972 # last change in develop 
```

To do a soft reset at the last change in develop as follow:

```
git reset --soft fa03972
```

After this apply the stage and commits commands shown above.

### Amend and fixup
In this approach you create your clean history from the start and maintain it
clean by updating the same commits. This depends on which commits you need to
update, last one or one further down your history.

To amend the last commit:

```
git add path/to/my/local/file         # Stage your change
git commit --amend                    # Amend the last commit
```

Use a instant fixup to amend one of the commits in your branch that is older
than the last commit:

```
git add path/to/my/local/file         # Stage a fix
git commit --fixup=a0b1c2d3           # Perform the commit to fix broken a0b1c2d3
git rebase -i --autosquash a0b1c2d3~1 # Now merge fixup commit into broken commit
```

## References
1. Git docs https://git-scm.com/docs
2. Git fixup
   https://stackoverflow.com/questions/3103589/how-can-i-easily-fixup-a-past-commit
