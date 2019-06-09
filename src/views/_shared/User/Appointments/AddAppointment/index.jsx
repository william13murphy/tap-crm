import React from 'react';
import moment from 'moment';
import { Route } from 'react-router-dom';

import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import FormWrapper from 'components/Layout/FormWrapper';
import Modal from 'components/Modal';

import { getReferenceItemIdByDescription } from 'api/referenceItems';
import UserAppointmentFormContainer from 'containers/User/UserAppointmentFormContainer';
import AppointmentForm from '../AppointmentForm';

type AddAppointmentPageProps = {
  location: Object,
  userId: string,
  formState: {
    payload: string,
  },
  schoolId: string,
  match: {
    params: {
      schoolId: string,
    },
  },
  initialValues: {},
  title: string,
};

const AddAppointmentPage = (props: AddAppointmentPageProps) => {
  let backUrl = '/app/dashboard/';
  let appointmentFormInitialValues = {};
  const TrialAppointmentTypeId = getReferenceItemIdByDescription(
    props.references,
    'LstAppointmentTypes',
    'Trial'
  ).Id;

  appointmentFormInitialValues['AppointmentTypeId'] = TrialAppointmentTypeId;
  appointmentFormInitialValues['StartTimeUtc'] =
    (props.location.state.initialValues &&
      props.location.state.initialValues.StartTimeUtc) ||
    moment()
      .add(5, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ssZ');
  appointmentFormInitialValues['EndTimeUtc'] =
    (props.location.state.initialValues &&
      props.location.state.initialValues.EndTimeUtc) ||
    moment()
      .add(65, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ssZ');
  appointmentFormInitialValues['StartDate'] =
    (props.location.state.initialValues &&
      props.location.state.initialValues.StartDate) ||
    moment().toISOString();

  return (
    <Modal
      title="Add Appointment"
      closeUrl={`/app/school-app/${
        props.match.params.schoolId
      }/dashboard/calendar`}
    >
      <UserAppointmentFormContainer
        update={false}
        // initialValues={props.initialValues || {}}
        dispatchActionOnCloseParams={props.userId}
        redirectOnSuccess={`/app/school-app/${
          props.match.params.schoolId
        }/dashboard/calendar/appointments/${props.formState.payload}/detail`}
      >
        <AppointmentForm
          update={false}
          initialValues={appointmentFormInitialValues}
        />
      </UserAppointmentFormContainer>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    userId: state.token.payload.UserId,
    formState: state.user.appointmentPost,
    references: state.utility.references,
  };
}

export default connect(
  AddAppointmentPage,
  mapStateToProps
);
