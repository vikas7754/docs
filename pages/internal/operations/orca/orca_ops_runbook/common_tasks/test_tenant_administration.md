---
layout: default
title: Orca Ops Runbook - Test Tenant Administration
parent: Common Tasks
grand_parent: Orca Ops Runbook
nav_order: 4
has_children: false
---
# Orca Ops Runbook - Test Tenant Administration
This documentation will cover information about the Orca test tenant


## Accessing the Test Tenant

### Pre-requesites for logging in:
- No active Orca production sessions can be logged in on the browser that you plan to log into the test tenant on. If you'd like to access the production tenant and the test tenant at the same time, you must access them in different browser sessions. I most often have one open in a regular session and the other open in an incognito session.
- You must be granted access to the test tenant by one of the admins. Reach out to others on the team to find out who has admin access to create a user for you.

### Logging in
- The test tenant uses the same hostname as the production tenant, so to log in you will navigate to `https://eu.sap.app.orcasecurity.io/`. 
- Instead of using SSO to login, navigate to the email/password login. 
- Login with the test user that has been granted to you. This will be your SAP email, with an added `+test` tag. IE `first.last+test@sap.com`. The `+test` tag addition is what allows orca to redirect requests for this user to the test tenant.
- You should now be logged into the test tenant. 

## Adding Users to the Test Tenant

Before adding a user, its best to send them an email with the login instructions, IE:


>> Hello User,
You’ll momentarily receive an invite with a registration link for the Orca test tenant. When you register, please be sure to register with your sap email, with a tag “+test” appended to it. For instance, first.last+test@sap.com. This is how Orca redirects users to the test tenant.
To login, go to the following url: https://eu.sap.app.orcasecurity.io/
This URL is the same as our production instance, except the test tenant is logged into via username and password rather than SSO. Use your email with “+test” appended to it, and you will be logged into the test tenant.


1. Navigate to the Users screen in Orca
2. Click on `Invite User`
3. Add the user email that you'd like to invite to the test tenant. This should be their regular SAP email, with a `+test` tag added to it. IE `first.last+test@sap.com`. 
4. Select the role/permissions scope that you want the user to have.
5. Select the option to send an invitation email (optional) - for named users, it's best to send them an invite link. If you are creating a testing user for internal team use (IE testing-user1+test@sap.com), do not send an invite email, but rather generate an invitation link and create the user using that link, since the test user would not have an email inbox.
