type referenceOptionObject = Array<{
  Description: string,
  Id: string,
  Name: string,
}>;

// Transform hardcoded reference data into select options
// Example:
// * if your data was structured like this: [{'abcdef_id_ghijklm': 'Description Name'}]
// * objectToOptions(tempRateMaster, { keyName: 'value', valueName: 'label' });

export function objectToOptions(obj, { keyName, valueName }) {
  return Object.keys(obj).map(key => {
    return {
      [valueName]: obj[key],
      [keyName]: key,
    };
  });
}

export function getReferenceItems(name, references: referenceOptionObject) {
  const refList = references.payload.filter(cV => {
    if (cV.Name === name) {
      return true;
    }
  })[0].ReferenceItems;
  return refList;
}

export function getReferenceItemOptions(
  name,
  references: referenceOptionObject
) {
  const refList = references.payload.filter(cV => {
    if (cV.Name === name) {
      return true;
    }
  })[0].ReferenceItems;
  const options = refList.map(cV => {
    return {
      value: cV.Id,
      label: cV.Description,
      Code: cV.Code,
    };
  });
  return options;
}

export function getReferenceItemById(
  references,
  referenceListName: string,
  id: string
) {
  const referenceItemsFromRef = getReferenceItems(
    referenceListName,
    references
  );

  // If country id matches, get country name
  const itemsMatchingId = referenceItemsFromRef.filter(item => {
    if (item.Id === id) {
      return true;
    }
  })[0];

  return itemsMatchingId;
}

export function getReferenceItemIdByDescription(
  references,
  referenceListName: string,
  description: string
) {
  const referenceItemsFromRef = getReferenceItems(
    referenceListName,
    references
  );

  const itemsMatchingName = referenceItemsFromRef.filter(item => {
    if (item.Description === description) {
      return true;
    }
  })[0];

  return itemsMatchingName;
}

export function getCountryNameFromId(references, countryId) {
  const countryItemById = getReferenceItemById(
    references,
    'LstCountries',
    countryId
  );
  return countryItemById.Description;
}

export function getAddressTypeNameFromId(references, addressTypeId) {
  const addressItemById = getReferenceItemById(
    references,
    'LstAddressTypes',
    addressTypeId
  );
  return addressItemById.Description;
}

export function getExternalContactsFromContactsList(references, contactsList) {
  const contactTypeItemsFromRef = getReferenceItems(
    'LstContactTypes',
    references
  );
  const externalClientId = contactTypeItemsFromRef.filter(cV => {
    if (cV.Code === 'EX') {
      return true;
    }
  })[0].Id;
  // Filter contacts by contact type
  const externalContacts = contactsList.filter(cV => {
    if (cV.ContactTypeId === externalClientId) {
      return true;
    }
  });
  return externalContacts;
}

export function getInternalContactsFromContactsList(references, contactsList) {
  const contactTypeItemsFromRef = getReferenceItems(
    'LstContactTypes',
    references
  );
  const internalClientId = contactTypeItemsFromRef.filter(cV => {
    if (cV.Code === 'IN') {
      return true;
    }
  })[0].Id;

  // Filter contacts by contact type
  const internalContacts = contactsList.filter(cV => {
    if (cV.ContactTypeId === internalClientId) {
      return true;
    }
  });
  return internalContacts;
}
