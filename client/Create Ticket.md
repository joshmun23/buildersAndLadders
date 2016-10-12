Create Ticket
Title: Modify Invite New Users Dropdown to Allow Multiple Emails in a Single Entry
Description:

We've been informed from an incoming Customer that they would like to invite 300+ nonprofits to our platform. This ticket will make the invitation process as smooth as possible for our new Customer.

One of the methods that users can be invited to our platform is via the Create Post Marketplace feature.

On the Create Post feature, when a User is on Tab 4: Audience, they will see two switches: "Entire Community" and "Specific Users".

If the User clicks on "Specific Users", they see a field for "Invite New Users".

The current steps to add e-mails are:
1. Focus on Input for "Invite New Users"
2. Enter one e-mail
3. Repeat step 1-2 until complete.

The desired behavior to add e-mails are:
1. Focus on Input for "Invite New Users"
2. Enter a string of comma separated e-mails

Task: Modify Invite New Users Dropdown to Allow Multiple Emails in a Single Entry

Some Bases to Cover (Feel free to modify as such):

Acceptance Criteria
[ ] I should see a Tooltip to show different formats for inputting e-mails
[ ] I should be able to enter a valid Email
[ ] I should not be able to enter an invalid Email
[ ] I should be able to enter multiple e-mails with one entry
[ ] I should only accept valid e-mails from an entry with valid and invalid e-mails

Case 'A User enters a valid E-mail'
  Input: name@domain.com
  Expected
    EmailList: ['name@domain.com']

Case 'A User enters an invalid E-mail'
  Input: name@.com
  Expected
    EmailList: []

Case 'A User enters multiple e-mails in one entry'
  Input: 'name1@domain.com, name2@domain.com'
  Expected
    EmailList: ['name1@domain.com', 'name2@domain.com']

Case 'I should only accept valid e-mails from an entry with valid and invalid e-mails'
  Input: 'name1@.com, name2@domain.com'
  Expected
    EmailList: ['name2@domain.com']
    Validation: Invalid Email
