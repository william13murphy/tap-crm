const tempExternalContact = {
  // 'Id': '00000000-0000-0000-0000-000000000000',
  ClientId: this.props.clientDetail.payload.Id,
  // 'UserId': '00000000-0000-0000-0000-000000000000',
  User: {
    // 'Id': '00000000-0000-0000-0000-000000000000',
    Email: 'test@test.com',
    PhoneNumber: '1115555555',
    CreatedOn: '2017-09-21T14:26:45.354Z',
    ChangedOn: '2017-09-21T14:26:45.354Z',
    CreatedBy: '88237092-ed98-4da9-98e6-2de1d10e0fd0',
    Profile: {
      FirstName: 'testfirstname',
      LastName: 'testlastname',
      UserTypeId: 'e21dcb05-1f7b-4c95-9c29-0e583b120e44', // School User
      // 'Title': 'test Title',
      // 'Suffix': 'test Suffix',
      // 'Prefix': 'test Prefix',
      // 'PrefferedName': 'test PrefferedName',
      Dob: '2017-09-20T19:34:52.227Z',
      GenderId: tempGenderIds.female,
      CountryId: '2af6ff6c-8bb8-46f0-b27e-81def1b76b64', // United States
      // 'Organization': 'test Organization',
      // 'Department': 'test Department',
      // 'Picture': 'test Picture'
    },
    Claims: [
      {
        ClaimValue: 'SCHUSER',
      },
    ],
    UserName: 'test@test.com',
    Password: 'AbcDEF123!!',
  },
  ContactTypeId: '6e088e9f-c7b3-437e-bf91-4b780ef8f49b',
  ContactRoleId: '7dcc58c4-fef7-4127-a3b5-d467513d7364',
  Preffered: true,
  Administrator: true,
  Description: 'string',
};

export default tempExternalContact;
