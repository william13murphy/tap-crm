const tempHelpMessages = [
  {
    id: 'Dashboard.Today.AddNewTask.Title',
    message: 'Task Title',
  },

  {
    id: 'Dashboard.Today.AddNewTask.Description',
    message: 'Task Description',
  },

  {
    id: 'Dashboard.Today.AddNewTask.DueDate',
    message: 'Due Date of the Task',
  },

  {
    id: 'Dashboard.Today.AddNewTask.Type',
    message: 'Select a task type from the drop down',
  },

  {
    id: 'Dashboard.Today.AddNewTask.Status',
    message: 'Select a Status from the drop down',
  },

  {
    id: 'Dashboard.Today.AddNewTask.AssignTo',
    message:
      'You can assign a task to a staff member by selecting the name from the drop down',
  },
  {
    id: 'Dashboard.Calendar.AddAppointment.Type',
    message: 'You can select the appointment type from this list',
  },
  {
    id: 'Dashboard.Calendar.AddAppointment.Description',
    message: 'Appointment description',
  },
  {
    id: 'Dashboard.FlaggedNotes.Reply.NoteType',
    message:
      'You can select the note type from this list. Internal - Communication between EFC and School. Public - Anyone who has access to the CRM can view including students',
  },
  {
    id: 'Dashboard.FlaggedNotes.Reply.Title',
    message: 'Note Title',
  },
  {
    id: 'Dashboard.FlaggedNotes.Reply.Description',
    message: 'Note Description',
  },
  {
    id: 'School.Staff.AddSchoolStaff.SelectRole',
    message:
      'You can select one of the role from this list. Based on the role selected, user will be able to perform operations.',
  },
  {
    id: 'School.Program.AddSchoolProgram.Name',
    message: 'Program Name',
  },
  {
    id: 'School.Classes.AddSchoolProgram.Description',
    message: 'Program Description',
  },
  {
    id: 'School.Classes.AddNewClass.Name',
    message: 'Class name',
  },
  {
    id: 'School.Classes.AddNewClass.Description',
    message: 'Class Description',
  },
  {
    id: 'School.Classes.AddNewClass.Program',
    message: 'Select a program you want to create a class for.',
  },
  {
    id: 'School.Classes.AddNewClass.MaxStudents',
    message: 'Maximum number of students to attend',
  },
  {
    id: 'School.Classes.AddNewClass.StartDate',
    message: 'Set Start Date of the class to attend',
  },
  {
    id: 'School.Classes.AddNewClass.EndDate',
    message: 'Set End Date of the class to attend',
  },
  {
    id: 'School.Classes.AddNewClass.FrequencyTypeId',
    message: 'Set Frequency of the class.',
  },
  {
    id: 'School.Classes.AddNewClass.Instructor',
    message: 'Select Instructor',
  },
  {
    id: 'School.Classes.AddNewClass.StartTime',
    message: 'Set Start Time of the Class.',
  },
  {
    id: 'School.Classes.AddNewClass.EndTime',
    message: 'Set End Time of the Class.',
  },
  {
    id: 'School.Settings.AddSchoolContact.FirstName',
    message: 'Contact first name',
  },
  {
    id: 'School.Settings.AddSchoolContact.LastName',
    message: 'Contact last name',
  },
  {
    id: 'School.Settings.AdScoolContact.Email',
    message: 'Contact email address',
  },
  {
    id: 'School.Settings.AddSchoolContact.SelectRole',
    message:
      'You can select one of the role from this list. Based on the role selected, user will be able to perform operations.',
  },
  {
    id: 'School.Settings.Addresses.EditSchoolAddress.AddressType',
    message: 'You can select the address type from this list',
  },
  {
    id: 'School.Skills.AddSkill.Name',
    message: 'Skill Name',
  },
  {
    id: 'School.Skills.AddSkill.Description',
    message: 'Description of the skill',
  },
  {
    id: 'School.Skills.AddSkill.SelectColor',
    message:
      'Select a color for the new skill. If the color you want is not available you can enter the Hex or RGB code.',
  },
  {
    id: 'School.Programs.Ranks.AddSkill.SelectColor',
    message:
      'Select a color for the new skill. If the color you want is not available you can enter the Hex or RGB code.',
  },
  {
    id: 'School.Packages.AddNewPackage.Name',
    message: 'Name of the package',
  },
  {
    id: 'School.Packages.AddNewPackage.Description',
    message: 'Description of the package ',
  },
  {
    id: 'School.Packages.AddNewPackage.ContractPeriod',
    message:
      'Contract period of the package. For example, 3 months, 6 months , 1 year, 2 year etc.',
  },
  {
    id: 'School.Packages.AddNewPackage.PaymentFrequency',
    message:
      'Set the payment frequency of the package. For example, weekly, monthly, quarterly, bi-annual, yearly etc.',
  },
  {
    id: 'School.Packages.AddNewPackage.Price',
    message: 'Set the price of the package',
  },
  {
    id: 'School.Packages.AddNewPackage.SignUpPrice',
    message: 'Set the enrollment fee',
  },
  {
    id: 'School.Packages.AddNewPackage.TerminationPrice',
    message: 'Set the termination fee',
  },
  {
    id: 'School.Packages.AddNewPackage.MaximumClassesPerWeek',
    message: 'Set number of allowed classes per week',
  },
  {
    id: 'School.Packages.AddNewPackage.MaximumStudents',
    message: 'Set number allowed members',
  },
  {
    id: 'School.Packages.AddNewPackage.MaximumPrograms',
    message: 'Set number of allowed programs for this package',
  },
  {
    id: 'School.Programs.AddNewSubscription.EndDate',
    message:
      'If the End Date is omitted, the rate will be available on an ongoing basis',
  },
  {
    id: 'School.Programs.AddNewPunchCard.EndDate',
    message:
      'If the End Date is omitted, the rate will be available on an ongoing basis',
  },
  {
    id: 'School.Discounts.AddNewDiscount.Name',
    message: 'Discount Name',
  },
  {
    id: 'School.Discounts.AddNewDiscount.Type',
    message: 'Discount Type',
  },
  {
    id: 'School.Discounts.AddNewDiscount.Value',
    message: 'Set the value of the discount. For example, 25% set set as 25',
  },
  {
    id: 'School.Programs.AddSchoolProgram.Name',
    message: 'School Program Name',
  },
  {
    id: 'School.Programs.AddSchoolProgram.Description',
    message: 'Description of the Program',
  },
  {
    id: 'School.Campaigns.AddNewCampaign.Detail',
    message: 'Name of the Campaign',
  },
  {
    id: 'School.Campaigns.AddNewCampaign.Target',
    message: 'Target level. For Example, 150 leads',
  },
  {
    id: 'School.Campaigns.AddNewCampaign.Type',
    message: 'Type of the Campaign',
  },
  {
    id: 'School.Campaigns.AddNewCampaign.StatDate',
    message: 'Campaign Start Date',
  },
  {
    id: 'School.Campaigns.AddNewCampaign.EndDate',
    message: 'Campaign End Date',
  },
  {
    id: 'School.Messaging.Outbox.ComposeMessage.Type',
    message: 'Message Type',
  },
  {
    id: 'School.Messaging.Outbox.ComposeMessage.SelectAList',
    message: 'Select A Student List',
  },
  {
    id: 'School.Messaging.Outbox.ComposeMessage.EmailTemplates',
    message: 'You can select an Email template from this list',
  },
  {
    id: 'School.Messaging.Outbox.ComposeMessage.SMSlTemplates',
    message: 'You can select a SMS template from this list',
  },
  {
    id: 'School.Messaging.Outbox.ComposeMessage.LetterTemplates',
    message: 'You can select a letter template from this list',
  },
  {
    id: 'School.Messaging.Outbox.ComposeMessage.PageSize',
    message: 'You can select different page sizes for you letter',
  },
  {
    id: 'School.Messaging.StudentLists.AddStudentList.Name',
    message: 'Student List Name',
  },
  {
    id: 'School.Messaging.StudentLists.AddStudentList.Description',
    message: 'Student List Description',
  },
  {
    id: 'School.Messaging.StudentLists.AddStudentList.SelectMembers',
    message: 'Add Students to the list',
  },
  {
    id: 'School.Inventory.AddNewItem.Category',
    message: 'Select Inventory Category',
  },
  {
    id: 'School.Inventory.AddNewItem.Name',
    message: 'Item Name',
  },
  {
    id: 'School.Inventory.AddNewItem.Description',
    message: 'Item Description',
  },
  {
    id: 'School.Inventory.AddNewItem.Selling Price',
    message: 'Item Retail Price',
  },
  {
    id: 'School.Inventory.AddNewItem.TaxRate',
    message: 'Sales Tax Rate. For Example, 6% enter 6',
  },
  {
    id: 'School.Inventory.AddNewItem.MinimumQuantity',
    message: 'Miminum stock level',
  },
  {
    id: 'School.Inventory.AddNewItem.MaximumQuantity',
    message: 'Maximum stock level',
  },
  {
    id: 'Student.Plans.Payment.AddPaymentTerm.PlanStartDate',
    message:
      'Effective date of the plan. Plan start date could be same or different from the payment start date',
  },
  {
    id: 'Student.Plans.Payment.AddPaymentTerm.PlanEndDate',
    message: 'End date of the plan',
  },
  {
    id: 'School.Staff.AddSchoolStaff.Preffered',
    message: 'Preferred contact for communication between EFC and the school',
  },
  {
    id: 'School.Staff.EditSchoolStaff.Preffered',
    message: 'Preferred contact for communication between EFC and the school',
  },
  {
    id: 'Admin.ExternalUsers.AddSchoolUser.Preffered',
    message: 'Preferred contact for communication between EFC and the school',
  },
];

export default tempHelpMessages;
