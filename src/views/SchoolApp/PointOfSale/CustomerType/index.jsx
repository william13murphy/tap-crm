import React from 'react';
import { dynamicBackRoute } from 'util/router';
import connect from 'src/redux/connect';
import { cartReset } from 'src/redux/actionCreators/pos/cart';
import { customerUpdate } from 'src/redux/actionCreators/pos/customer';

import SubNav from 'components/SubNav';
import Breadcrumbs from 'components/Breadcrumbs';
import ButtonGroup from 'components/ButtonGroup';
import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import StudentsDataGrid from './StudentsDataGrid';
import PublicCustomerForm from './PublicCustomerForm';
import './styles.less';

type CustomerTypePageProps = {
  onSubmit: Function,
  handleSubmit: Function,
  dispatchCustomerUpdate: Function,
  pos: Object,
  match: {
    url: string,
  },
};

class CustomerTypePage extends React.Component {
  props: CustomerTypePageProps;
  state = {
    customer: {
      screen: 'STUDENT',
    },
  };

  onPress = id => {
    this.props.dispatchCartReset();
    this.props.dispatchCustomerUpdate(this.state.customer);
    this.setState({ customer: { screen: id } });
  };

  render() {
    const posUrl = dynamicBackRoute(this.props.match.url, '/customer-type');
    const breadcrumbsData = [
      {
        to: this.props.match.url,
        label: 'Choose Customer Type',
        current: true,
      },
      {
        to: `${posUrl}/select-item`,
        label: 'Select Item',
        current: false,
      },
    ];

    return (
      <Page className="CustomerTypePage" title="Select Customer">
        <SubNav>
          <Breadcrumbs list={breadcrumbsData} />
        </SubNav>
        <PageHeader>
          <PageTitle>
            <span className="CustomerTypePage__title">
              Select Student or Public
            </span>
          </PageTitle>
        </PageHeader>
        <PageBody>
          <div className="CustomerTypePage__body">
            <div className="CustomerTypePage__buttons">
              <ButtonGroup
                style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
                active={this.state.customer.screen}
                data={[
                  {
                    key: 'STUDENT',
                    name: 'Student',
                  },
                  {
                    key: 'PUBLIC',
                    name: 'Public',
                  },
                ]}
                onClick={this.onPress}
              />
            </div>
            {this.state.customer.screen === 'STUDENT' ? (
              <StudentsDataGrid pos={this.props.pos} />
            ) : (
              <PublicCustomerForm
                pos={this.props.pos}
                dispatchCustomerUpdate={this.props.dispatchCustomerUpdate}
              />
            )}
          </div>
        </PageBody>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    pos: state.pos,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchCustomerUpdate: data => {
      dispatch(customerUpdate(data));
    },
    dispatchCartReset: () => {
      dispatch(cartReset());
    },
  };
};

export default connect(
  CustomerTypePage,
  mapStateToProps,
  mapDispatchToProps
);
