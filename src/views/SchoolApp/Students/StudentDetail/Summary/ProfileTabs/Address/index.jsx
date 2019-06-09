import React from 'react';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';

type AddressProps = {
  studentDetail: {
    payload: {
      User: {},
      Id: string,
      Address1: string,
      Address2: string,
      City: string,
      State: string,
      Zip: string,
    },
  },
};

const Address = (props: AddressProps) => {
  return (
    <div className="AddressSummary" title="Address">
      <div className="pt-card">
        <table className="default-table-plain">
          <tbody>
            {props.studentDetail.payload.Address1 ? (
              <tr>
                <td className="value">
                  {props.studentDetail.payload.Address1}
                </td>
              </tr>
            ) : (
              ''
            )}
            {props.studentDetail.payload.Address2 ? (
              <tr>
                <td className="value">
                  {props.studentDetail.payload.Address2}
                </td>
              </tr>
            ) : (
              ''
            )}

            <tr>
              <td className="value">
                {props.studentDetail.payload.City}
                ,&nbsp;
                {props.studentDetail.payload.State}
                &nbsp;
                {props.studentDetail.payload.Zip}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Link
        className="ViewAllLink"
        to={`/app/school-app/${
          props.studentDetail.payload.SchoolId
        }/students/detail/${
          props.studentDetail.payload.Id
        }/summary/address/edit`}
      >
        <button className="pt-button">
          <i className="fa fa-pencil" />
          Edit
        </button>
      </Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    studentDetail: state.student.detail,
  };
};

export default connect(
  Address,
  mapStateToProps
);
