import React from 'react';
import Page from 'components/Layout/Page';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import Modal from 'components/Modal';
import DiscountsList from './DiscountsList';
import AddSchoolDiscountForm from './AddSchoolDiscountForm';
import SchoolDiscountFormContainer from 'containers/School/SchoolDiscountFormContainer';
import './styles.less';

type SchoolDiscountsPageProps = {
  schoolId: string,
  history: {},
  schoolDiscounts: {
    payload: {},
  },
  match: {
    path: string,
    url: string,
  },
};

class SchoolDiscountsPage extends React.Component {
  props: SchoolDiscountsPageProps;

  render() {
    return (
      <Page className="SchoolDiscountsPage" title="Discounts">
        <Route
          path={`${this.props.match.path}/add`}
          render={() => {
            return (
              <Modal
                title={'Add School Discounts'}
                closeUrl={this.props.match.url}
              >
                <SchoolDiscountFormContainer
                  dispatchActionOnCloseParams={this.props.schoolId}
                  redirectOnSuccess={this.props.match.url}
                >
                  <AddSchoolDiscountForm id={this.props.schoolId} />
                </SchoolDiscountFormContainer>
              </Modal>
            );
          }}
        />
        <Route
          path={`${this.props.match.path}/edit/:discountId`}
          render={innerProps => {
            return (
              <Modal
                title={'Update School Discounts'}
                closeUrl={this.props.match.url}
              >
                <SchoolDiscountFormContainer
                  dispatchActionOnCloseParams={this.props.schoolId}
                  redirectOnSuccess={this.props.match.url}
                  initialValues={innerProps.location.state.initialValues}
                >
                  <AddSchoolDiscountForm id={this.props.schoolId} />
                </SchoolDiscountFormContainer>
              </Modal>
            );
          }}
        />
        <PageHeader>
          <PageTitle inline>Discounts</PageTitle>
          <Link
            className="pt-button pt-intent-primary pt-icon-credit-card"
            to={`${this.props.match.url}/add`}
          >
            Add New Discount
          </Link>
        </PageHeader>
        <PageBody>
          <DiscountsList
            schoolId={this.props.schoolId}
            schoolDiscounts={this.props.schoolDiscounts}
            history={this.props.history}
            match={this.props.match}
            references={this.props.references}
          />
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    schoolDiscounts: state.school.discounts,
    references: state.utility.references,
  };
};

export default connect(SchoolDiscountsPage, mapStateToProps);
