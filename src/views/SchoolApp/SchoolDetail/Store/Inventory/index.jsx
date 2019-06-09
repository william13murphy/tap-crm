import React from 'react';

import Page from 'components/Layout/Page';
import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import PageBody from 'components/Layout/PageBody';
import FormWrapper from 'components/Layout/FormWrapper';
import BackButton from 'components/Buttons/BackButton';
import SchoolPosContainer from 'containers/PointOfSale/SchoolPosContainer';
import SkuFormContainer from 'containers/PointOfSale/SkuFormContainer';
import InventoryGrid from './InventoryGrid';
import AddInventoryItemForm from './AddInventoryItemForm';
import { Link, Route } from 'react-router-dom';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';

type InventoryProps = {
  match: {
    url: string,
    path: string,
    params: {
      schoolId: string,
    },
  },
  schoolPos: {
    payload: {
      Id: string,
    },
  },
  schoolId: string,
};

const Inventory = (props: InventoryProps) => (
  <Page className="InventoryPage" title="Inventory">
    <SchoolPosContainer dispatchFetchParams={props.schoolId}>
      <Route
        exact
        path={`${props.match.path}/add`}
        render={() => {
          return (
            <div>
              <PageHeader>
                <PageTitle inline>Add New Item</PageTitle>
                <Link to={props.match.url}>
                  <BackButton>Back to Inventory</BackButton>
                </Link>
              </PageHeader>
              <PageBody center>
                <FormWrapper>
                  <SkuFormContainer
                    dispatchActionOnCloseParams={props.schoolId}
                    redirectOnSuccess={props.match.url}
                  >
                    <AddInventoryItemForm
                      posId={
                        props.schoolPos.payload && props.schoolPos.payload.Id
                      }
                      schoolId={props.schoolId}
                    />
                  </SkuFormContainer>
                </FormWrapper>
              </PageBody>
            </div>
          );
        }}
      />
      <Route
        exact
        path={props.match.path}
        render={() => (
          <div>
            <PageHeader>
              <PageTitle inline>Inventory</PageTitle>
              <Link to={`${props.match.url}/add`}>
                <button className="pt-button pt-intent-primary pt-icon-series-add">
                  Add New Item
                </button>
              </Link>
            </PageHeader>
            <PageBody>
              <InventoryGrid
                data={props.schoolPos}
                schoolId={props.schoolId}
                match={props.match}
              />
            </PageBody>
          </div>
        )}
      />
      <Route
        path={`${props.match.path}/:inventoryId/edit`}
        render={innerProps => {
          return (
            <Modal title="Edit Inventory Item" closeUrl={props.match.url}>
              <SkuFormContainer
                update
                initialValues={innerProps.location.state.initialValues}
                redirectOnSuccess={props.match.url}
                dispatchActionOnCloseParams={props.schoolId}
              >
                <AddInventoryItemForm
                  posId={
                    props.schoolPos.payload ? props.schoolPos.payload.Id : ''
                  }
                  schoolId={props.schoolId}
                />
              </SkuFormContainer>
            </Modal>
          );
        }}
      />
    </SchoolPosContainer>
  </Page>
);

const mapStateToProps = state => {
  return {
    schoolPos: state.pos.schoolPos,
  };
};

export default connect(
  Inventory,
  mapStateToProps
);
