import React from 'react';
import SelectField from 'components/Forms/SelectField';
import connect from 'src/redux/connect';

// Must be wrapped in AllClientsContainer.
// Requires state.client.allClients

type ClientSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
  allClients: {
    payload: Array<{
      Name: string,
      Id: string,
    }>,
  },
};

const ClientSelectField = (props: ClientSelectFieldProps) => {
  if (props.allClients.payload.length > 0) {
    return (
      <SelectField
        {...props}
        className={`${props.className || ''} ClientSelectField`}
        options={props.allClients.payload.map(client => {
          return {
            label: client.Name,
            value: client.Id,
          };
        })}
      />
    );
  } else {
    return <div>Error: Clients not found</div>;
  }
};

const mapStateToProps = state => {
  return {
    allClients: state.client.allClients,
  };
};

export default connect(ClientSelectField, mapStateToProps);
