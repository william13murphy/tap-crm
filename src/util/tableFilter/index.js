import React from 'react';
import { getReferenceItemOptions } from 'api/referenceItems';

//While using row itself to filter data we will use filterPayloadMethod
export const filterPayloadMethod = (filter, row, matchField) => {
  if (filter.value) {
    if (row) {
      let matched = row[matchField];
      let matchedName =
        matched &&
        matched
          .toString()
          .toLowerCase()
          .match(filter.value.toString().toLowerCase());
      return matchedName;
    }
  }
};

//While using array of refrences we will use filterReferenceMethod
export const filterReferenceMethod = (
  filter,
  row,
  references,
  referenceType,
  matchField
) => {
  if (filter.value) {
    let items = getReferenceItemOptions(referenceType, references);

    let matchedItem = items.find(item => item.value === row[matchField]);
    if (matchedItem) {
      let matchedName = matchedItem.label
        .toLowerCase()
        .match(filter.value.toLowerCase());
      return matchedName;
    }
  }
};

export const filter = ({ filter, onChange }) => (
  <input
    onChange={event => onChange(event.target.value)}
    style={{ width: '100%' }}
    // value={filter ? filter.value : ''}
  />
);
