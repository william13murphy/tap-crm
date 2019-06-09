import React from 'react';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';
import { dynamicBackRoute } from 'util/router';

import SubNav from 'components/SubNav';
import Page from 'components/Layout/Page';
import Breadcrumbs from 'components/Breadcrumbs';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';

import CategoryDetail from './CategoryDetail';
import CartSummary from '../_shared/CartSummary';
import './styles.less';

type SelectItemPageProps = {
  data: Object,
  pos: Object,
};

class SelectItemPage extends React.Component {
  props: SelectItemPageProps;
  state = {
    tabs: [],
    activeTab: null,
    data: [],
  };

  render() {
    const posUrl = `${dynamicBackRoute(this.props.match.url, '/select-item')}`;
    const breadcrumbsData = [
      {
        to: `${posUrl}/customer-type`,
        label: 'Choose Customer Type',
        current: false,
      },
      {
        to: this.props.match.url,
        label: 'Select Item',
        current: true,
      },
    ];
    return (
      <Page className="SelectItemPage" title="Select Item">
        <SubNav>
          <Breadcrumbs list={breadcrumbsData} />
        </SubNav>
        <PageHeader>
          <PageTitle>Categories</PageTitle>
        </PageHeader>
        <PageBody>
          <div className="SelectItemBody">
            <div className="Categories">
              <CategoryDetail
                vertical={true}
                cartData={this.props.pos.cart.payload}
                pos={this.props.pos}
              />
            </div>
            <div className="Summary">
              <CartSummary
                cartData={this.props.pos.cart.payload}
                customer={this.props.pos.customer}
                showCheckout={true}
              />
            </div>
          </div>
          <div className="Footer">
            <Link
              className="Footer__button pt-button"
              to={`${posUrl}/customer-type`}
            >
              Back
            </Link>
          </div>
        </PageBody>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    pos: state.pos,
  };
}

export default connect(
  SelectItemPage,
  mapStateToProps
);
