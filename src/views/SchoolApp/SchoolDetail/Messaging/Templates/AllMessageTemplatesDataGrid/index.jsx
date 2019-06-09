import React from 'react';
import connect from 'src/redux/connect';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import Modal from 'components/Modal';
import ConfirmDialog from 'components/ConfirmDialog';
import EmailSendForm from '../EmailTemplates/EmailSendForm';
import EmailTemplateForm from '../EmailTemplates/EmailTemplateForm';
import LetterTemplateForm from '../../_shared/LetterTemplateForm';
import SMSSendForm from '../SMSTemplates/SMSSendForm';
import SMSTemplateForm from '../SMSTemplates/SMSTemplateForm';
import TemplateSMSFormContainer from 'containers/School/TemplateSMSFormContainer';
import TemplateLetterFormContainer from 'containers/School/TemplateLetterFormContainer';
import TemplateEmailFormContainer from 'containers/School/TemplateEmailFormContainer';

import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';
import EmailTemplateContainer from 'containers/School/EmailTemplateContainer';
import LetterTemplateContainer from 'containers/School/LetterTemplateContainer';
import SMSTemplateContainer from 'containers/School/SMSTemplateContainer';

import TemplateEmailDeleteContainer from 'containers/School/TemplateEmailDeleteContainer';
import TemplateLetterDeleteContainer from 'containers/School/TemplateLetterDeleteContainer';
import TemplateSMSDeleteContainer from 'containers/School/TemplateSMSDeleteContainer';

import SchoolOutboxEmailFormContainer from 'containers/School/SchoolOutboxEmailFormContainer';
import SchoolOutboxSMSFormContainer from 'containers/School/SchoolOutboxSMSFormContainer';

import { localDateFormat } from 'util/localization/localValues';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import '../styles.less';

type AllMessageTemplatesDataGridProps = {
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

class AllMessageTemplatesDataGrid extends React.Component {
  props: AllMessageTemplatesDataGridProps;
  constructor(props) {
    super();
    const MESSAGING_PAGE_PATH = `/app/school-app/${
      props.schoolId
    }/school-detail/messaging/templates`;
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Name',
          accessor: 'Name',
        },
        {
          Header: 'Last Updated',
          accessor: 'ChangedOn',
          minWidth: 50,
          Cell: rowInfo => {
            return moment(rowInfo.value).format(localDateFormat());
          },
          filterMethod: (filter, row) => {
            let obj = {
              ...row,
              ChangedOn: row._original.ChangedOn,
            };
            return filterPayloadMethod(filter, obj, 'ChangedOn');
          },
          Filter: filter,
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
          Header: 'Action',
          accessor: 'Action',
          className: 'Action',
          filterable: false,
          minWidth: 50,
          Cell: row => (
            <div className="Action__cell">
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/templates/email/send/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Send Email Template"
                    closeUrl={MESSAGING_PAGE_PATH}
                  >
                    <SchoolAnemicStudentsContainer
                      dispatchFetchParams={this.props.schoolId}
                    >
                      <TemplatePlaceholdersContainer>
                        <EmailTemplateContainer
                          dispatchFetchParams={row.original.Id}
                        >
                          <SchoolOutboxEmailFormContainer
                            dispatchActionOnCloseParams={this.props.schoolId}
                            redirectOnSuccess={MESSAGING_PAGE_PATH}
                          >
                            <EmailSendForm
                              schoolId={this.props.schoolId}
                              templatePlaceholders={
                                this.props.templatePlaceholders
                              }
                              initialValues={row.original}
                              templateTypeId={row.original.TemplateTypeId}
                            />
                          </SchoolOutboxEmailFormContainer>
                        </EmailTemplateContainer>
                      </TemplatePlaceholdersContainer>
                    </SchoolAnemicStudentsContainer>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/templates/sms/send/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Send SMS Template"
                    closeUrl={MESSAGING_PAGE_PATH}
                  >
                    <SchoolAnemicStudentsContainer
                      dispatchFetchParams={this.props.schoolId}
                    >
                      <TemplatePlaceholdersContainer>
                        <SMSTemplateContainer
                          dispatchFetchParams={row.original.Id}
                        >
                          <SchoolOutboxSMSFormContainer
                            dispatchActionOnCloseParams={this.props.schoolId}
                            redirectOnSuccess={MESSAGING_PAGE_PATH}
                          >
                            <SMSSendForm
                              schoolId={this.props.schoolId}
                              templatePlaceholders={
                                this.props.templatePlaceholders
                              }
                              initialValues={row.original}
                              templateTypeId={row.original.TemplateTypeId}
                            />
                          </SchoolOutboxSMSFormContainer>
                        </SMSTemplateContainer>
                      </TemplatePlaceholdersContainer>
                    </SchoolAnemicStudentsContainer>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/templates/email/edit/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Edit Email Template"
                    closeUrl={MESSAGING_PAGE_PATH}
                  >
                    <TemplatePlaceholdersContainer>
                      <EmailTemplateContainer
                        dispatchFetchParams={row.original.Id}
                      >
                        <TemplateEmailFormContainer
                          dispatchActionOnCloseParams={this.props.schoolId}
                          redirectOnSuccess={MESSAGING_PAGE_PATH}
                        >
                          <EmailTemplateForm
                            schoolId={this.props.schoolId}
                            templatePlaceholders={
                              this.props.templatePlaceholders
                            }
                            templateTypeId={row.original.TemplateTypeId}
                          />
                        </TemplateEmailFormContainer>
                      </EmailTemplateContainer>
                    </TemplatePlaceholdersContainer>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/templates/letter/edit/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Edit Letter Template"
                    closeUrl={MESSAGING_PAGE_PATH}
                  >
                    <TemplatePlaceholdersContainer>
                      <LetterTemplateContainer
                        dispatchFetchParams={row.original.Id}
                      >
                        <TemplateLetterFormContainer
                          dispatchActionOnCloseParams={this.props.schoolId}
                          redirectOnSuccess={MESSAGING_PAGE_PATH}
                        >
                          <LetterTemplateForm
                            schoolId={this.props.schoolId}
                            templateTypeId={row.original.TemplateTypeId}
                          />
                        </TemplateLetterFormContainer>
                      </LetterTemplateContainer>
                    </TemplatePlaceholdersContainer>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/templates/sms/edit/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Edit SMS Template"
                    closeUrl={MESSAGING_PAGE_PATH}
                  >
                    <SMSTemplateContainer dispatchFetchParams={row.original.Id}>
                      <TemplateSMSFormContainer
                        dispatchActionOnCloseParams={this.props.schoolId}
                        redirectOnSuccess={MESSAGING_PAGE_PATH}
                      >
                        <SMSTemplateForm
                          references={this.props.references}
                          role={this.props.role}
                          schoolId={this.props.schoolId}
                        />
                      </TemplateSMSFormContainer>
                    </SMSTemplateContainer>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/templates/email/delete/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Delete Email Template"
                    closeUrl={MESSAGING_PAGE_PATH}
                  >
                    <TemplateEmailDeleteContainer
                      dispatchActionOnCloseParams={this.props.schoolId}
                      redirectOnSuccess={MESSAGING_PAGE_PATH}
                    >
                      <ConfirmDialog
                        title="Are you sure you want to delete?"
                        closeUrl={MESSAGING_PAGE_PATH}
                        id={row.original.Id}
                      />
                    </TemplateEmailDeleteContainer>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/templates/letter/delete/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Delete Letter Template"
                    closeUrl={MESSAGING_PAGE_PATH}
                  >
                    <TemplateLetterDeleteContainer
                      dispatchActionOnCloseParams={this.props.schoolId}
                      redirectOnSuccess={MESSAGING_PAGE_PATH}
                    >
                      <ConfirmDialog
                        title="Are you sure you want to delete?"
                        closeUrl={MESSAGING_PAGE_PATH}
                        id={row.original.Id}
                      />
                    </TemplateLetterDeleteContainer>
                  </Modal>
                )}
              />
              <Route
                path={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/templates/sms/delete/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Delete SMS Template"
                    closeUrl={MESSAGING_PAGE_PATH}
                  >
                    <TemplateSMSDeleteContainer
                      dispatchActionOnCloseParams={this.props.schoolId}
                      redirectOnSuccess={MESSAGING_PAGE_PATH}
                    >
                      <ConfirmDialog
                        title="Are you sure you want to delete?"
                        closeUrl={MESSAGING_PAGE_PATH}
                        id={row.original.Id}
                      />
                    </TemplateSMSDeleteContainer>
                  </Modal>
                )}
              />
              {row.original.MessageType.toLowerCase() !== 'letter' ? (
                <Link
                  className="pt-button"
                  to={`/app/school-app/${
                    this.props.schoolId
                  }/school-detail/messaging/templates/${row.original.MessageType.toLowerCase()}/send/${
                    row.original.Id
                  }`}
                >
                  <i
                    className="Icon IconSend fa fa-share"
                    aria-hidden="true"
                    title="Send"
                  />
                </Link>
              ) : (
                ''
              )}
              &nbsp;
              <Link
                className="pt-button"
                to={`/app/school-app/${
                  this.props.schoolId
                }/school-detail/messaging/templates/${row.original.MessageType.toLowerCase()}/edit/${
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
                }/school-detail/messaging/templates/${row.original.MessageType.toLowerCase()}/delete/${
                  row.original.Id
                }`}
              >
                <i
                  className="Icon IconDelete fa fa-trash"
                  aria-hidden="true"
                  title="Delete"
                />
              </Link>
            </div>
          ),
        },
      ],
    };
  }

  componentDidMount() {
    let allEmailTemplates = [];
    let allSMSTemplates = [];
    let allLetterTemplates = [];

    if (this.props.allEmailTemplates.payload) {
      allEmailTemplates = this.props.allEmailTemplates.payload
        .filter(item => !item.WellKnownTypeId)
        .map(item => {
          item.MessageType = 'Email';
          return item;
        });
    }
    if (this.props.allLetterTemplates.payload) {
      allLetterTemplates = this.props.allLetterTemplates.payload
        .filter(item => !item.WellKnownTypeId)
        .map(item => {
          item.MessageType = 'Letter';
          return item;
        });
    }
    if (this.props.allSMSTemplates.payload) {
      allSMSTemplates = this.props.allSMSTemplates.payload.map(item => {
        item.MessageType = 'SMS';
        return item;
      });
    }

    let data = allEmailTemplates.concat(
      allLetterTemplates.concat(allSMSTemplates)
    );

    this.setState({ data });
  }

  render() {
    return (
      <DynamicHeightReactTable
        className="AllMessageTemplatesDataGrid has-action"
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
    allSMSTemplates: state.school.allSMSTemplates,
  };
};

export default connect(
  AllMessageTemplatesDataGrid,
  mapStateToProps
);
