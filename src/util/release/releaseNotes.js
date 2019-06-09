// Remember to increment the VERSION_NUMBER in util/release/index.jsx

const releaseNotes = `

## v0.8.0.1
<p class="date">APRIL 22, 2019</p>

<h3 class="newFeature">New Features</h3>

- Updates to import student functionality
- Import school structure via CSV upload
- School programs page style updates
- Student plan payment updates
- Updates to rapid student entry for EFC admins and school admins
- Students communications screen updates
- Payment history page updates
- Updates to Gradings page
- Table view improvements
- FreshDesk integration for faster customer support
- LogRocket Integration to record user sessions

## v0.7.0.1
<p class="date">APRIL 15, 2019</p>

<h3 class="newFeature">New Features</h3>

- Export/Import student functionality
- Performance Improvements
- New Dashlets
- Rapid Student Entry Form

## v0.4.1.3
<h3 class="bugFixes">Bug Fixes</h3>

- Payment Terms now default to “Two Weeks”.
- Converting a Lead to a Student now refreshes the students list in the Add New Account Owner form (and elsewhere in the app where the anemicStudents endpoint is used).
- Updated the Plan Detail Classes Modal copy to “Classes per Week”.

## v0.4.1.2
<h3 class="bugFixes">Bug Fixes</h3>

- Plan Detail > Payment Terms Form > Directly changing Number of Payments now updates the Payment Amount Preview.
- Fixed a bug in the States dropdown when adding a new owner from scratch.
- Add Student Owner - improved layout of the student dropdown
- Fix losing the schoolId when closing Store Purchase History modal or clicking on the grid rows.
- Minor improvements to Kiosk check-in layout and “Checked In” button

## v0.4.1.1
<h3 class="bugFixes">Bug Fixes</h3>

- Updated the Kiosk Grading Summary to fix vertical layout bug for skill checkmarks.

## v0.4.1.0
<h3 class="newFeature">New Features</h3>

- Added WalkMe to the app.
- Now showing student avatar after they check-in to the Kiosk.
- Can now select an existing student to pre-fill the Add New Account Owner form.
- Added the Card Type selector to the POS checkout.

<h3 class="bugFixes">Bug Fixes</h3>

- Fixed Reset Password button alignment to account for WalkMe.
- Centered POS Student Selector to improve layout.
- Removed a Print Receipt link from the POS which was showing before the order was completed.
- Customized the Payment Authorization Modal's width to match the document.
- Fixed a bug in End Date Date Pickers.
- Now hiding efc-created appointments from School Today Calendar.
- Only showing School Contacts on the Staff Page, removed EFC Contacts from displaying here.
- Fetching less previous months (2) on Calendars to optimize loading speed.
- Fixed a bug in finalized & canceled plans which caused the finalize page to be Read-Only.
- Fixed a bug in the Appointment Detail where the data was not displaying sometimes.
- Fixed a bug when enrolling a student into a plan from their Student Detail > Plans tab, where the student would sometimes not be added.
- Fixed Skills checkmarks from displaying vertically in School Overview, Student Grading Summary, and Class Detail.
- Fixed multiple buttons showing a loading spinner when a single button was clicked in the Plan Finalize Payments Grid.
- Added CreatedBy field to Student Notes to improve tracking and fix a 500 error.
- Fixed the alignment of Action buttons in the Leads Grid on the Marketing Overview page.
- Switched out a Kiosk API to fetch School Detail.

## v0.4.0.0
<h3 class="newFeature">New Features</h3>

- Added a variable for WalkMe to create walkthroughs based on the User’s Role.
- Added a shadow to belt images so white belt could be visible on white backgrounds.
- Added School & EFC Unpaid Reports. EFC Admins can view all Unpaids or view Unpaids by User. CDS Users can view only their own Schools’ Unpaids.
- Can now send messages to students from all reports.
- The Nav Bar now displays the selected School Name for EFC Users.

<h3 class="bugFixes">Bug Fixes</h3>

- Fix End Date logic in Rate Display
- **GH-1082**: Auto-fill Start Date, make End Date optional, and fix disabling field logic in Add New Campaign Form
- **TAP-847**: Fixed display of belt image while editing and saving the Program.
- **TAP-612**: Revised View Appointment Detail page to use endpoint, fixing an application state bug when refreshing page.
- **TAP-842**: Removed auto-card image which sometimes conflicts with selected card type.
- **GH-1079**: Debounced the Smart List to improve performance while entering values.
- **TAP-851**: Fixed the student contact details page routing.
- **GH-1084**: Updated the Lead’s mandatory fields to ensure Converting to Student happens without errors.
- **GH-1094**: Added student avatar to the Program > Students grid.
- **GH-1088**: Added a black option to belt color selector.
- **GH-1090**: Fixed “View Unpaids” link on Dashboard Today page to link to new Unpaid reports.
- **GH-1082**: Improved Campaigns by auto-filling start date and making end date optional, and fixed a bug which disabled the form sometimes.
- **GH-1081**: Program Rates Forms now autofill today’s date.
- **GH-1083**: Fixed a bug in the Start Date for Scheduling Trial Appointments
- **GH-1069**: Can now view previous months/years for Billing Summary & Statements.
- **TAP-826**: Fixed some bugs in the Grading Summary skills.
- **GH-1078**: Finalized plans are now read-only, but may be navigated through to view plan details.
- **TAP-865**: Only Active rates may now be selected when adding a program to a Plan.
- **GH-1117**: Fixed Refund button to show on Settled and Completed payments.
- **GH-1114**: Fixed a bug in Leads where the phone number & email would disappear after creating a Trial Appointment.


## v0.3.7.0
<h3 class="newFeature">New Features</h3>

- The Smart List's data grid columns can now be added/removed as needed.
- Update api’s based on new kinapptech domain, and removed old demo api.
- Allow Finalized plans to be navigated using top navigation in addition to Next/Previous buttons.
- Plan Grids are now displaying Owner information (FirstName, LastName), and formatted dates.
- Implemented payment status update endpoints on Finalize page (Suspend, retry, etc)
- A Plan's Down Payment Amount is now pre-filled on the Payment Terms Form.
- A Plan's recurring fee (monthly, weekly, etc) is now pre-calculated and previewed on the Payment Terms Form.
- Added ActiveCampaign and MindMe fields to school settings.
- Now displaying emails/sms's sent to each student in their profile: Student Detail > Messaging > Outbox.

<h3 class="bugFixes">Bug Fixes</h3>

- **TAP-792**: Fixed a bug in updating a student's profile picture
- **GH-1028**: Fixed a bug in down payment amount where the field was only accepting integer values.
- **TAP-825**: Fixed a bug in Campaign's date field related to future dates.
- **TAP-818**: Fixed a bug in System Templates routing.
- **GH-1039**: Students search now is scrollable when displaying many results.


## v0.3.6.1
<h3 class="bugFixes">Bug Fixes</h3>

- Fixed an error in the Plan Detail Finalize page which failed to show the plan payment schedule.

## v0.3.6.0
<h3 class="newFeature">New Features</h3>

- Added System Templates section to School Settings, where templates such as School Waiver can be edited per school.
- Improved design of Account Summary & Statement in Billing section.
- Individual payments may now be Suspended or Settled in the Plan Detail.
- In Payment Terms, the Down Payment Amount is now pre-filled based on all students & programs in a plan.
- Improved the performance for the Smart List when no filters are selected.
- Student avatar images are now displayed in the POS student selection list.
- The Zip Code field now transforms to “Post Code” for Australian schools.
- The Convert Lead to Student button now has a hover title named the same, and says “Convert” on the button for additional clarity.

<h3 class="bugFixes">Bug Fixes</h3>

- On Add New Student Note Form, made the EFC Flag switch orange for consistency with other places in the UI.
- **TAP-762** - fixed several bugs in the Add Class to Schedule Form
- Now hiding the QuickLogin on the Kiosk, for the sandbox & production environments.
- EFCFlag Switch is now orange, consistent with other parts of the app.
- Updated the “Attained Skill” logic to correctly show the attained skill date.
- Correctly updating fuzzy search list after a lead is added.
- Fixed the Number of Payments field in the Payment Terms Form, to allow user-inputted values as well as suggesting a value based on the Payment Frequency.
- Using the new Plan Finalize endpoint to finalize plans.
- Updated the leads endpoint url.
- Fixed a link to the Student Detail page in the Messaging section.


## v0.3.5.0
<h3 class="newFeature">New Features</h3>

- Release notes are now viewable in the app. Navigate to User Menu > App Settings > and Click on the version number to see Release Notes.
- POST Responses are now logged in the console (in addition to requests), enabling better data tracing for Kiosk & Smart List.
- Smart List’s SideNav menu now has an animated drawer effect when showing/hiding filters.
- Redesigned Notes, and rewrote Flagged Notes functionality to more closely mirror IF2.
- Subscription rate now more clearly denotes the Total Cost as “Total Cost (Signup + Annual Cost)”
- “Day of the Week” column has been added to the classes grid.
- Clarified included classes label as “Number of Included Weekly Classes”
- Plans improvements: Improved button text to “Add Existing Account Owner”, plans auto-renew by default, switched placement of Mobile & Phone Numbers in Add Account Owner form.

<h3 class="bugFixes">Bug Fixes</h3>

- Fixed child notes so they can be flagged/unflagged as expected.
- Fixed some errors related to Billing Summary & Statement displaying.
- **TAP-793**: a remaining known issue related to Summary not returning, sometimes)
- Student Store Purchase History is now displaying correctly.
- Student Profile now refreshes properly after being edited.
- Fixed some time formatting bugs related to student check-in.
- Fixed a bug related to Tax Rate being a required field in the School Settings.
- Fixed add Client Admin Form due to missing import.
- Fixed a bug which would disable the Student Lists “Submit” button when an even number of students was selected.
- Fixed Store Purchase History grid from Student User’s point of view.



## v0.3.4.8
<h3 class="bugFixes">Bug Fixes</h3>

- Hotfix for Edit Belts Form error with missing images


## v0.3.4.6

<h3 class="newFeature">New Features</h3>

- Smart List can now be submitted without filters selected, allowing messaging to, and exporting of, All School Students.
- In the Plan Detail > Students page, Student Names and Program Names now link to their respective Detail pages.
- Student Detail > Grading grid > Removed the “ProgressionDate” column, and renamed “EnrollmentDate” column to “Promotion Date”.

<h3 class="removed">Removed</h3>

- Removed Clock in/out feature and Clock History page.

<h3 class="bugFixes">Bug Fixes</h3>

- Fixed a memory leak in SubNavPortal, preventing app crashes on some “missing data” or “missing import” errors.
- Fixed a bug in the Calendar page where some events were appearing as all-day events.

`;

export default releaseNotes;
