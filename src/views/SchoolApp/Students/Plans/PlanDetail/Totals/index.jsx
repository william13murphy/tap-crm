import React from 'react';
import { Link } from 'react-router-dom';
import connect from 'src/redux/connect';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import PageFooter from 'components/Layout/PageFooter';
import BackButton from 'components/Buttons/BackButton';

import calculatePageBodyHeight from '../calculatePageBodyHeight';
import PlanDetailTotals from './PlanDetailTotals';
import Discounts from './Discounts';
import './styles.less';

type TotalsPageProps = {
  match: {
    path: string,
    params: { schoolId: string, planId: string, id: string },
  },
};

class TotalsPage extends React.Component {
  constructor() {
    super();
    this.setPageBodyHeight = this.setPageBodyHeight.bind(this);
    this._isMounted = false;

    this.state = {
      pageBodyHeight: 500, // default height
    };
  }
  setPageBodyHeight = () => {
    this.setState({
      pageBodyHeight: calculatePageBodyHeight(),
    });
  };

  componentDidMount() {
    this._isMounted = true;
    setTimeout(() => {
      if (this._isMounted) {
        this.setPageBodyHeight();
      }
    }, 0);
    window.addEventListener('resize', this.setPageBodyHeight);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.setPageBodyHeight);
  }
  render() {
    const readOnly =
      this.props.planDetail.payload.TerminiationDate ||
      this.props.planDetail.payload.Finalized
        ? true
        : false;
    return (
      <Page className="PlanDetailTotalsPage">
        <PageBody height={this.state ? this.state.pageBodyHeight : null}>
          <Discounts readOnly={readOnly} />
          <PlanDetailTotals
            data={this.props.planDetail.payload}
            readOnly={readOnly}
          />
        </PageBody>

        <PageFooter>
          <Link
            className={`pt-button pt-intent-primary`}
            to={this.props.backUrl}
          >
            Previous
          </Link>
          <Link className="pt-button pt-intent-primary" to={this.props.nextUrl}>
            Next
          </Link>
        </PageFooter>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    planDetail: state.student.planDetail,
  };
};

export default connect(
  TotalsPage,
  mapStateToProps
);
