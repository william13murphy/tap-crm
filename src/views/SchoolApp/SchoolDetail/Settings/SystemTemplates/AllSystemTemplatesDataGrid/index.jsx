import React from 'react';
import moment from 'moment';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import { getReferenceItemById } from 'src/api/referenceItems';

import Modal from 'components/Modal';
import ConfirmDialog from 'components/ConfirmDialog';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';

import TemplateLetterDeleteContainer from 'containers/School/TemplateLetterDeleteContainer';
import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';
import TemplateLetterFormContainer from 'containers/School/TemplateLetterFormContainer';
import LetterTemplateContainer from 'containers/School/LetterTemplateContainer';
import LetterTemplateForm from '../LetterTemplateForm';

import SchoolOutboxEmailFormContainer from 'containers/School/SchoolOutboxEmailFormContainer';
import TemplateEmailDeleteContainer from 'containers/School/TemplateEmailDeleteContainer';
import TemplateEmailFormContainer from 'containers/School/TemplateEmailFormContainer';
import EmailTemplateContainer from 'containers/School/EmailTemplateContainer';
import EmailTemplateForm from '../EmailTemplateForm';

import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import '../styles.less';

type AllSystemTemplatesDataGridProps = {
  data: Array<{}>,
  history: {
    push: any,
  },
  emailTemplate: {
    payload: {},
  },
  letterTemplate: {
    payload: {},
  },
  smsTemplate: {
    payload: {},
  },
  allEmailTemplates: {
    payload: [],
  },
  allLetterTemplates: {
    payload: [],
  },
  allSMSTemplates: {
    payload: [],
  },
  references: any,
  role: string,
  schoolId: string,
  templatePlaceholders: string,
};

class AllSystemTemplatesDataGrid extends React.Component {
  props: AllSystemTemplatesDataGridProps;
  constructor(props) {
    super();
    const SYSTEM_TEMPLATES_PAGE_PATH = `/app/school-app/${
      props.schoolId
    }/school-detail/settings/system-templates`;
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Name',
          accessor: 'Name',
          minWidth: 50,
        },
        {
          Header: 'Last Updated',
          accessor: 'ChangedOn',
          minWidth: 50,
          Cell: row => (
            <div>{moment(row.original.ChangedOn).format('YYYY-MM-DD')}</div>
          ),
        },
        {
          Header: 'Type',
          accessor: 'TemplateTypeId',
          minWidth: 50,
          Cell: row => <div>{row.original.MessageType}</div>,
          filterMethod: (filter, row) => {
            let obj = {
              ...row,
              TemplateTypeId: row._original.MessageType,
            };

            return filterPayloadMethod(filter, obj, 'TemplateTypeId');
          },
          Filter: filter,
        },
        {
          Header: 'System Template Type',
          accessor: 'WellKnownTypeId',
          minWidth: 50,
          Cell: row => {
            return (
              <div>
                {row.original.MessageType === 'Email'
                  ? getReferenceItemById(
                      this.props.references,
                      'LstWellKnownTemplateTypesEmail',
                      row.original.WellKnownTypeId
                    ).Description
                  : getReferenceItemById(
                      this.props.references,
                      'LstWellKnownTemplateTypesLetter',
                      row.original.WellKnownTypeId
                    ).Description}
              </div>
            );
          },
        },
        {
          Header: 'Action',
          accessor: 'Action',
          className: 'Action',
          filterable: false,
          minWidth: 50,
          Cell: row => (
            <div className="Action__cell">
              <Link
                className="pt-button"
                to={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/settings/system-templates/${row.original.MessageType.toLowerCase()}/${row.original.TemplateType.toLowerCase()}/edit/${
                  row.original.Id
                }`}
              >
                <i
                  className="Icon IconEdit fa fa-pencil"
                  aria-hidden="true"
                  title="Edit"
                />
              </Link>
              &nbsp;
              <Link
                className="pt-button"
                to={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/settings/system-templates/${row.original.MessageType.toLowerCase()}/${row.original.TemplateType.toLowerCase()}/delete/${
                  row.original.Id
                }`}
              >
                <i
                  className="Icon IconDelete fa fa-trash"
                  aria-hidden="true"
                  title="Delete"
                />
              </Link>
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/settings/system-templates/email/:templateType/edit/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Edit Email Template"
                    closeUrl={SYSTEM_TEMPLATES_PAGE_PATH}
                  >
                    <TemplatePlaceholdersContainer>
                      <EmailTemplateContainer
                        dispatchFetchParams={row.original.Id}
                      >
                        <TemplateEmailFormContainer
                          dispatchActionOnCloseParams={this.props.schoolId}
                          redirectOnSuccess={SYSTEM_TEMPLATES_PAGE_PATH}
                        >
                          <EmailTemplateForm schoolId={this.props.schoolId} />
                        </TemplateEmailFormContainer>
                      </EmailTemplateContainer>
                    </TemplatePlaceholdersContainer>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/settings/system-templates/letter/:templateType/edit/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Edit Letter Template"
                    closeUrl={SYSTEM_TEMPLATES_PAGE_PATH}
                  >
                    <TemplatePlaceholdersContainer>
                      <LetterTemplateContainer
                        dispatchFetchParams={row.original.Id}
                      >
                        <TemplateLetterFormContainer
                          dispatchActionOnCloseParams={this.props.schoolId}
                          redirectOnSuccess={SYSTEM_TEMPLATES_PAGE_PATH}
                        >
                          <LetterTemplateForm schoolId={this.props.schoolId} />
                        </TemplateLetterFormContainer>
                      </LetterTemplateContainer>
                    </TemplatePlaceholdersContainer>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/settings/system-templates/email/:templateType/delete/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Delete Email Template"
                    closeUrl={SYSTEM_TEMPLATES_PAGE_PATH}
                  >
                    <TemplateEmailDeleteContainer
                      dispatchActionOnCloseParams={this.props.schoolId}
                      redirectOnSuccess={SYSTEM_TEMPLATES_PAGE_PATH}
                    >
                      <ConfirmDialog
                        title="Are you sure you want to delete?"
                        closeUrl={SYSTEM_TEMPLATES_PAGE_PATH}
                        id={row.original.Id}
                      />
                    </TemplateEmailDeleteContainer>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/settings/system-templates/letter/:templateType/delete/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Delete Letter Template"
                    closeUrl={SYSTEM_TEMPLATES_PAGE_PATH}
                  >
                    <TemplateLetterDeleteContainer
                      dispatchActionOnCloseParams={this.props.schoolId}
                      redirectOnSuccess={SYSTEM_TEMPLATES_PAGE_PATH}
                    >
                      <ConfirmDialog
                        title="Are you sure you want to delete?"
                        closeUrl={SYSTEM_TEMPLATES_PAGE_PATH}
                        id={row.original.Id}
                      />
                    </TemplateLetterDeleteContainer>
                  </Modal>
                )}
              />
            </div>
          ),
        },
      ],
    };
  }

  componentDidMount() {
    let allEmailTemplates = [];
    let allLetterTemplates = [];

    if (this.props.allEmailTemplates.payload) {
      allEmailTemplates = this.props.allEmailTemplates.payload
        .filter(item => item.WellKnownTypeId)
        .map(item => {
          item.MessageType = 'Email';
          item.TemplateType = getReferenceItemById(
            this.props.references,
            'LstTemplateTypes',
            item.TemplateTypeId
          ).Description;
          return item;
        });
    }
    if (this.props.allLetterTemplates.payload) {
      allLetterTemplates = this.props.allLetterTemplates.payload
        .filter(item => item.WellKnownTypeId)
        .map(item => {
          item.MessageType = 'Letter';
          item.TemplateType = getReferenceItemById(
            this.props.references,
            'LstTemplateTypes',
            item.TemplateTypeId
          ).Description;
          return item;
        });
    }

    let data = allEmailTemplates.concat(allLetterTemplates);

    this.setState({ data });
  }

  render() {
    return (
      <DynamicHeightReactTable
        className="AllSystemTemplatesDataGrid has-action"
        data={this.state.data}
        pageSize={this.state.data.length}
        columns={this.state.columns}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    references: state.utility.references,
    role: state.token.payload.Role,
    templatePlaceholders: state.utility.templatePlaceholders,
    allEmailTemplates: state.school.allEmailTemplates,
    allLetterTemplates: state.school.allLetterTemplates,
  };
};

export default connect(
  AllSystemTemplatesDataGrid,
  mapStateToProps
);
