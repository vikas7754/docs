---
layout: default
title: "[ARCHIVE] Controls Tracking"
nav_order: 2
parent: "[ARCHIVE] Release Information"
grand_parent: ARCHIVED
has_children: false
---
###     Targeted Release '3.x.0' Workflow

##	Start of Sprint 'X' to End of Sprint 'X+1' (SecOps Team Involved) :

-       Dev branch already created from Master
-       Create release version 3.x.0 in Zenhub. All the controls and other tasks for Sprint 'X' and 'X+1' will be linked to this release
-       Create feature branches for each task (this should be created from Dev branch)
-       Once a task in a feature branch is completed, a PR is created to be merged into Dev
-       This PR will require approval from 2 members of SecOps team
-       This feature branch is deleted once merged into Dev

##	End of Sprint 'X+1' (SecOps Team Involved) :

-       Cut-off time for all the controls targeting 3.x.0 release will be Friday 12 PM PST
-       A new branch  will be created out of Develop branch named 'Release-3.x.0'
-       A PR will be created for 'Release-3.x.0' to be merged into Master
-       Email will be sent out to SGS team to get their reviews on this PR

##	Start-End of Sprint 'X+2'(SecOps and SGS Team Involved) :

-       Get reviews/comments from SGS on PR to rectify controls
-       Create a ‘control fix’ branch from ‘3.x.0’ release branch to rectify controls based on feedback from SGS
-       Create a PR to merge ‘control fix’ branch back into ‘3.x.0’ release branch. This will require approval from SecOps team
-       At the same time create a PR from same ‘control fix’ branch to be merged into Develop. This will ensure all the bugfixes that are made to          release-3.x.0 branch are also included in the Develop branch
-       All the feature branches should continuously be rebased with Develop branch
-       Once a control is rectified, conversation on that comment for that relevant control should be resolved by SGS

##	Start of Sprint 'X+3':

-       Version Bump: infra/helm/sap-inspec-consumer/Chart.yaml (appVersion)
-       Version Bump: profiles/sap-aws/inspec.yml (version)
-       Version Bump: profiles/sap-azure/inspec.yml (version)
-       Version Bump: profiles/sap-gcp/inspec.yml (version)
-       Deploy all the controls developed till date to Dev environment 
-       Deploy to Pre-Production environment
-       Deploy to Production environment
-       Once PR is approved by SGS and SecOps team, it is merged in Master. Commit message when PR merge into master should be tagged with ‘release 3.x.0’
-       Release the images with updated controls to Artifactory 
-       Update Artifactory release documentation ('help_end_user_process') specifying the new added controls and bug fixes

##	Special case: If controls are decided not to be included in a release (TBD)

-       Create a new branch out of release branch, delete those relevant control files. 
-       Delete all the control that are supposed to be part of next release in one commit
-       Delete all the controls that needs to be permanently deleted in one commit
-       Merge this new branch back into release branch
-       Merge release branch into master
-       Merge master into Dev
-       Create a new branch out of dev and do ‘git revert <commit hash>
-       Commit hash will be a hash of delete commit for the controls that will be targeted for next release
-       At this point Dev branch will contain all the controls that were deleted as well

##  SemVer:

#   Example: x.y.z-alpha.1
-       ‘x’ is major release that breaks backward compatibility
-       ‘y’ is minor release that does not break backward compatibility
-       ‘z’ is bug fix
-       Development and Pre-Production deployments will have ‘alpha.1’ suffix
-       This suffix will be removed for Production deployments
-       Addition of new control involves incrementing minor release part of the SemVer
-       Change to an existing control involves incrementing bug fix part of the SemVer
-       Addition of a new control as well as a bug fix involves incrementing minor release part of the SemVer

##  Roll back Strategy:

-	If deployment in production breaks, it is rolled back to previous state on Wednesday in the week after the deployment is made.
-	This rollback is done using Helm
-	The rollback will involve incrementing the SemVer and restoring to previous working state of the deployment
