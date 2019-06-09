import React from 'react';
import connect from 'src/redux/connect';
import {
  localCurrencyValue,
  localCurrencyZero,
} from 'util/localization/localValues';

import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import ButtonColumn from 'components/ButtonColumn';

import { filter, filterReferenceMethod } from 'util/tableFilter';

type PlanDiscountsDataGridProps = {
  match: { params: { schoolId: string, planId: string } },
  planDiscounts: any,
  schoolDiscounts: any,
};

class PlanDiscountsDataGrid extends React.Component {
  props: PlanDiscountsDataGridProps;
  constructor(props) {
    super(props);

    this.state = {
      planDiscountData: [],
    };
  }
  componentDidMount() {
    const planDiscountDataLoad = [];
    if (this.props.planDiscounts.payload) {
      this.props.planDiscounts.payload.map((planDiscount, i) => {
        return this.props.schoolDiscounts.payload.map((schoolDiscount, j) => {
          if (schoolDiscount.Id === planDiscount.SchoolDiscountId) {
            schoolDiscount['planDiscountId'] = planDiscount.Id;
            planDiscountDataLoad.push(schoolDiscount);
          }
        });
      });
    }

    this.setState({
      planDiscountData: planDiscountDataLoad,
    });
  }

  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Type',
        accessor: 'TypeId',
        Cell: rowInfo => (
          <ReferenceOutput
            listName="LstDiscountTypes"
            id={rowInfo.original.TypeId}
          />
        ),
        filterMethod: (filter, row) =>
          filterReferenceMethod(
            filter,
            row,
            this.props.references,
            'LstDiscountTypes',
            'TypeId'
          ),
        Filter: filter,
      },
      {
        Header: 'Amount',
        accessor: 'Value',
        Cell: rowInfo => {
          if (
            rowInfo.original.TypeId === '41a05cd6-b273-4ce1-a51a-c63e9154d8e4'
          ) {
            return <span>{rowInfo.value && rowInfo.value + '%'}</span>;
          } else {
            return (
              <span>{rowInfo.value && localCurrencyValue(rowInfo.value)}</span>
            );
          }
        },
      },
      {
        Header: 'Actions',
        Cell: rowInfo => {
          return (
            <button
              className="pt-button"
              onClick={() => {
                this.props.history.push({
                  pathname: `${this.props.match.url}/delete-discount/${
                    rowInfo.original.planDiscountId
                  }`,
                });
              }}
            >
              Remove
            </button>
          );
        },
      },
    ];
    return this.state.planDiscountData.length > 0 ? (
      <div className="DiscountsList">
        <div className="DiscountsList__items">
          {this.state.planDiscountData && (
            <DefaultReactTable
              className="linked-row"
              data={this.state.planDiscountData}
              columns={columns}
            />
          )}
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    schoolDiscounts: state.school.discounts,
    planDiscounts: state.student.planDiscounts,
  };
};

export default connect(
  PlanDiscountsDataGrid,
  mapStateToProps
);
