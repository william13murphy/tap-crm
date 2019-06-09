import React from 'react';
import DataCard from 'components/DataCard';

type ExternalContactCardProps = {
  contactTypeName?: string,
  editLink?: string,
  deleteLink?: string,
  title?: string,
  contact: {
    User: {
      Email: string,
      Profile: {
        FirstName: string,
        LastName: string,
      },
    },
  },
};

const ExternalContactCard = (props: ExternalContactCardProps) => {
  return (
    <DataCard title={props.title} editLink={props.editLink}>
      <span>
        {props.contact.User.Profile.FirstName}{' '}
        {props.contact.User.Profile.LastName} - {props.contact.User.Email}
      </span>
    </DataCard>
  );
};

export default ExternalContactCard;
