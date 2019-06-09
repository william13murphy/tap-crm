import React from 'react';
import SelectField from 'components/Forms/SelectField';
import connect from 'src/redux/connect';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

// Must be wrapped in SchoolStylesContainer.
// Requires state.school.styles

type SchoolStylesSelectFieldProps = {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
  data: {
    payload: Array<{
      Name: string,
      Id: string,
    }>,
  },
  InputOptions?: {
    menuPosition: string,
    menuPlacement: string,
    maxMenuHeight: number,
  },
};

const SchoolStylesSelectField = (props: SchoolStylesSelectFieldProps) => {
  if (props.data.payload.length > 0) {
    return (
      <SelectField
        {...props}
        className={`${props.className || ''} SchoolStylesSelectField`}
        options={props.data.payload.map(cV => {
          return {
            label: cV.Name,
            value: cV.Id,
          };
        })}
      />
    );
  } else {
    return <NoDataMessage errorMessage="No Styles Found" />;
  }
};

const mapStateToProps = state => {
  return {
    data: state.school.styles,
  };
};

export default connect(
  SchoolStylesSelectField,
  mapStateToProps
);
