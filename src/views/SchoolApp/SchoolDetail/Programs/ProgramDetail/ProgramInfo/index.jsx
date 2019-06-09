import React from 'react';
import Page from 'components/Layout/Page';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import moment from 'moment';
import '../styles.less';

type ProgramInfoPageProps = {
  schoolId: string,
  history: {},
  match: {
    params: {
      styleId: string,
    },
    path: string,
  },
  schoolContacts: {
    payload: {},
  },
  styleRanks: {
    payload: [],
  },
  schoolStyles: [{}],
  match: {
    params: {
      schoolId: string,
      styleId: string,
    },
  },
  styleDetail: {
    payload: [{}],
  },
  references: [{}],
};

const ProgramInfo = (props: ProgramInfoPageProps) => {
  const publicString =
    props.styleDetail.payload.Public.toString()
      .charAt(0)
      .toUpperCase() + props.styleDetail.payload.Public.toString().slice(1);
  return (
    <Page className="ProgramDetail" title="Program Detail">
      <PageHeader>
        <PageTitle>Program Details</PageTitle>
      </PageHeader>
      <PageBody>
        <div className="ProgramInfoWrapper">
          <div className="FormWrapper">
            <Link
              to={`/app/school-app/${
                props.match.params.schoolId
                }/school-detail/programs/detail/${
                props.match.params.styleId
                }/program/edit`}
              className="pt-button pt-intent-primary pt-icon-repeat">
              Edit Program Details
            </Link>
            <table className="default-table-plain ProgramTable">
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td className="AlignRight">{props.styleDetail.payload.Name}</td>
                </tr>
                <tr>
                  <td>Created On:</td>
                  <td className="AlignRight">
                    {moment(props.styleDetail.payload.CreatedOn).format(
                      'YYYY-MM-DD'
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td className="AlignRight">{props.styleDetail.payload.Description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </PageBody>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    schoolStyles: state.school.styles,
    styleDetail: state.school.styleDetail,
    references: state.utility.references,
  };
};

export default connect(
  ProgramInfo,
  mapStateToProps
);
