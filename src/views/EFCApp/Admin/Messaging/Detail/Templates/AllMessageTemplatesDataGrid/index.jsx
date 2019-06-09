import React from 'react';
import connect from 'src/redux/connect';

import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import { calculateLocalDateTimeFromUTCDateAndTime } from 'src/util/localization/timezone';
import Modal from 'components/Modal';
import ConfirmDialog from 'components/ConfirmDialog';
import SchoolAnemicStudentsContainer from 'containers/School/SchoolAnemicStudentsContainer';
import TemplatePlaceholdersContainer from 'containers/Utility/TemplatePlaceholdersContainer';

import EfcUserEmailTemplateContainer from 'containers/Administration/EfcUserEmailTemplateContainer';
import EfcUserEmailTemplateFormContainer from 'containers/Administration/EfcUserEmailTemplateFormContainer';
import EfcUserEmailTemplateDeleteFormContainer from 'containers/Administration/EfcUserEmailTemplateDeleteFormContainer';
import EfcUserEmailOutboxFormContainer from 'containers/Administration/EfcUserEmailOutboxFormContainer';
import EmailSendForm from '../EmailTemplates/EmailSendForm';
import EmailTemplateForm from '../EmailTemplates/EmailTemplateForm';

import EfcUserLetterTemplateContainer from 'containers/Administration/EfcUserLetterTemplateContainer';
import EfcUserLetterTemplateFormContainer from 'containers/Administration/EfcUserLetterTemplateFormContainer';
import EfcUserLetterTemplateDeleteFormContainer from 'containers/Administration/EfcUserLetterTemplateDeleteFormContainer';
import EfcUserLetterOutboxFormContainer from 'containers/Administration/EfcUserLetterOutboxFormContainer';
import LetterTemplateForm from '../LetterTemplates/LetterTemplateForm';

import EfcUserSMSTemplateContainer from 'containers/Administration/EfcUserSMSTemplateContainer';
import EfcUserSMSTemplateFormContainer from 'containers/Administration/EfcUserSMSTemplateFormContainer';
import EfcUserSMSTemplateDeleteFormContainer from 'containers/Administration/EfcUserSMSTemplateDeleteFormContainer';
import EfcUserSMSOutboxFormContainer from 'containers/Administration/EfcUserSMSOutboxFormContainer';
import SMSSendForm from '../SMSTemplates/SMSSendForm';
import SMSTemplateForm from '../SMSTemplates/SMSTemplateForm';
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
  efcUserEmailTemplates: {
    payload: [],
  },
  efcUserLetterTemplates: {
    payload: [],
  },
  efcUserSMSTemplates: {
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
    super(props);

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
          Cell: row => {
            let localDate = calculateLocalDateTimeFromUTCDateAndTime(
              this.props.timeZone,
              row.original.ChangedOn,
              row.original.ChangedOn
            );
            return <div>{moment(localDate).format(localDateFormat())}</div>;
          },
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
                path={`${this.props.match.path}/email/send/${row.original.Id}`}
                render={() => (
                  <Modal
                    title="Send Email Template"
                    closeUrl={`${this.props.match.url}`}
                  >
                    <SchoolAnemicStudentsContainer
                      dispatchFetchParams={this.props.schoolId}
                    >
                      <TemplatePlaceholdersContainer>
                        <EfcUserEmailTemplateContainer
                          dispatchFetchParams={row.original.Id}
                        >
                          <EfcUserEmailOutboxFormContainer
                            dispatchActionOnCloseParams={this.props.schoolId}
                            redirectOnSuccess={`${this.props.match.url}`}
                          >
                            <EmailSendForm
                              schoolId={this.props.schoolId}
                              templatePlaceholders={
                                this.props.templatePlaceholders
                              }
                              initialValues={row.original}
                              templateTypeId={row.original.TemplateTypeId}
                            />
                          </EfcUserEmailOutboxFormContainer>
                        </EfcUserEmailTemplateContainer>
                      </TemplatePlaceholdersContainer>
                    </SchoolAnemicStudentsContainer>
                  </Modal>
                )}
              />
              <Route
                path={`${this.props.match.path}/sms/send/${row.original.Id}`}
                render={() => (
                  <Modal
                    title="Send SMS Template"
                    closeUrl={`${this.props.match.url}`}
                  >
                    <SchoolAnemicStudentsContainer
                      dispatchFetchParams={this.props.schoolId}
                    >
                      <TemplatePlaceholdersContainer>
                        <EfcUserSMSTemplateContainer
                          dispatchFetchParams={row.original.Id}
                        >
                          <EfcUserSMSOutboxFormContainer
                            dispatchActionOnCloseParams={this.props.schoolId}
                            redirectOnSuccess={`${this.props.match.url}`}
                          >
                            <SMSSendForm
                              schoolId={this.props.schoolId}
                              templatePlaceholders={
                                this.props.templatePlaceholders
                              }
                              initialValues={row.original}
                              templateTypeId={row.original.TemplateTypeId}
                            />
                          </EfcUserSMSOutboxFormContainer>
                        </EfcUserSMSTemplateContainer>
                      </TemplatePlaceholdersContainer>
                    </SchoolAnemicStudentsContainer>
                  </Modal>
                )}
              />
              <Route
                path={`${this.props.match.path}/email/edit/${row.original.Id}`}
                render={() => (
                  <Modal
                    title="Edit Email Template"
                    closeUrl={`${this.props.match.url}`}
                  >
                    <TemplatePlaceholdersContainer>
                      <EfcUserEmailTemplateContainer
                        dispatchFetchParams={row.original.Id}
                      >
                        <EfcUserEmailTemplateFormContainer
                          dispatchActionOnCloseParams={this.props.schoolId}
                          redirectOnSuccess={`${this.props.match.url}`}
                        >
                          <EmailTemplateForm
                            schoolId={this.props.schoolId}
                            templatePlaceholders={
                              this.props.templatePlaceholders
                            }
                            templateTypeId={row.original.TemplateTypeId}
                            initialValues={row.original}
                          />
                        </EfcUserEmailTemplateFormContainer>
                      </EfcUserEmailTemplateContainer>
                    </TemplatePlaceholdersContainer>
                  </Modal>
                )}
              />
              <Route
                path={`${this.props.match.path}/letter/edit/${row.original.Id}`}
                render={routeProps => (
                  <Modal
                    title="Edit Letter Template"
                    closeUrl={`${this.props.match.url}`}
                  >
                    <TemplatePlaceholdersContainer>
                      <EfcUserLetterTemplateContainer
                        dispatchFetchParams={row.original.Id}
                      >
                        <EfcUserLetterTemplateFormContainer
                          dispatchActionOnCloseParams={this.props.schoolId}
                          redirectOnSuccess={`${this.props.match.url}`}
                        >
                          <LetterTemplateForm
                            schoolId={this.props.schoolId}
                            templateTypeId={row.original.TemplateTypeId}
                            initialValues={row.original}
                          />
                        </EfcUserLetterTemplateFormContainer>
                      </EfcUserLetterTemplateContainer>
                    </TemplatePlaceholdersContainer>
                  </Modal>
                )}
              />
              <Route
                path={`${this.props.match.path}/sms/edit/${row.original.Id}`}
                render={() => (
                  <Modal
                    title="Edit SMS Template"
                    closeUrl={`${this.props.match.url}`}
                  >
                    <EfcUserSMSTemplateContainer
                      dispatchFetchParams={row.original.Id}
                    >
                      <EfcUserSMSTemplateFormContainer
                        dispatchActionOnCloseParams={this.props.schoolId}
                        redirectOnSuccess={`${this.props.match.url}`}
                      >
                        <SMSTemplateForm
                          references={this.props.references}
                          role={this.props.role}
                          schoolId={this.props.schoolId}
                          initialValues={row.original}
                        />
                      </EfcUserSMSTemplateFormContainer>
                    </EfcUserSMSTemplateContainer>
                  </Modal>
                )}
              />
              <Route
                path={`${this.props.match.path}/email/delete/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Delete Email Template"
                    closeUrl={`${this.props.match.url}`}
                  >
                    <EfcUserEmailTemplateDeleteFormContainer
                      dispatchActionOnCloseParams={this.props.schoolId}
                      redirectOnSuccess={`${this.props.match.url}`}
                    >
                      <ConfirmDialog
                        title="Are you sure you want to delete?"
                        closeUrl={`${this.props.match.url}`}
                        id={row.original.Id}
                      />
                    </EfcUserEmailTemplateDeleteFormContainer>
                  </Modal>
                )}
              />
              <Route
                path={`${this.props.match.path}/letter/delete/${
                  row.original.Id
                }`}
                render={() => (
                  <Modal
                    title="Delete Letter Template"
                    closeUrl={`${this.props.match.url}`}
                  >
                    <EfcUserLetterTemplateDeleteFormContainer
                      dispatchActionOnCloseParams={this.props.schoolId}
                      redirectOnSuccess={`${this.props.match.url}`}
                    >
                      <ConfirmDialog
                        title="Are you sure you want to delete?"
                        closeUrl={`${this.props.match.url}`}
                        id={row.original.Id}
                      />
                    </EfcUserLetterTemplateDeleteFormContainer>
                  </Modal>
                )}
              />
              <Route
                path={`${this.props.match.path}/sms/delete/${row.original.Id}`}
                render={() => (
                  <Modal
                    title="Delete SMS Template"
                    closeUrl={`${this.props.match.url}`}
                  >
                    <EfcUserSMSTemplateDeleteFormContainer
                      dispatchActionOnCloseParams={this.props.schoolId}
                      redirectOnSuccess={`${this.props.match.url}`}
                    >
                      <ConfirmDialog
                        title="Are you sure you want to delete?"
                        closeUrl={`${this.props.match.url}`}
                        id={row.original.Id}
                      />
                    </EfcUserSMSTemplateDeleteFormContainer>
                  </Modal>
                )}
              />
              {row.original.MessageType.toLowerCase() !== 'letter' ? (
                <Link
                  className="pt-button"
                  to={`${
                    this.props.match.url
                  }/${row.original.MessageType.toLowerCase()}/send/${
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
                to={`${
                  this.props.match.url
                }/${row.original.MessageType.toLowerCase()}/edit/${
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
                to={`${
                  this.props.match.url
                }/${row.original.MessageType.toLowerCase()}/delete/${
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
    let efcUserEmailTemplates = [];
    let efcUserSMSTemplates = [];
    let efcUserLetterTemplates = [];

    if (this.props.efcUserEmailTemplates.payload) {
      efcUserEmailTemplates = this.props.efcUserEmailTemplates.payload.map(
        item => {
          item.MessageType = 'Email';
          return item;
        }
      );
    }
    if (this.props.efcUserLetterTemplates.payload) {
      efcUserLetterTemplates = this.props.efcUserLetterTemplates.payload.map(
        item => {
          item.MessageType = 'Letter';
          return item;
        }
      );
    }
    if (this.props.efcUserSMSTemplates.payload) {
      efcUserSMSTemplates = this.props.efcUserSMSTemplates.payload.map(item => {
        item.MessageType = 'SMS';
        return item;
      });
    }

    let data = efcUserEmailTemplates.concat(
      efcUserLetterTemplates.concat(efcUserSMSTemplates)
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
    efcUserEmailTemplates: state.administration.efcUserEmailTemplates,
    efcUserLetterTemplates: state.administration.efcUserLetterTemplates,
    efcUserSMSTemplates: state.administration.efcUserSMSTemplates,
  };
};

export default connect(
  AllMessageTemplatesDataGrid,
  mapStateToProps
);
