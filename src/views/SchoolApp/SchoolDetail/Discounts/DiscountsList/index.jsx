import React from 'react';

import PageHeader from 'components/Layout/PageHeader';
import PageTitle from 'components/Layout/PageTitle';
import DefaultReactTable from 'components/Grid/DefaultReactTable';

import SchoolDiscountsContainer from 'containers/School/SchoolDiscountsContainer';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import { localCurrencyValue } from 'util/localization/localValues';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';

type DiscountsListProps = {
  history: {
    push: any,
  },
  schoolDiscounts: {
    payload: {},
  },
  schoolId: string,
  match: {
    url: string,
  },
};

class DiscountsList extends React.Component {
  props: DiscountsListProps;
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
        Header: 'Description',
        accessor: 'Description',
      },
      {
        Header: 'Value',
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
    ];
    return (
      <div className="DiscountsList">
        <SchoolDiscountsContainer dispatchFetchParams={this.props.schoolId}>
          <div className="DiscountsList__items">
            {this.props.schoolDiscounts.payload && (
              <DefaultReactTable
                className="linked-row"
                data={this.props.schoolDiscounts.payload}
                columns={columns}
                getTrProps={(state, rowInfo, column, instance) => ({
                  onClick: () => {
                    this.props.history.push({
                      pathname: `${this.props.match.url}/edit/${
                        rowInfo.original.Id
                      }`,
                      state: { initialValues: rowInfo.original },
                    });
                  },
                })}
              />
            )}
          </div>
        </SchoolDiscountsContainer>
      </div>
    );
  }
}

export default DiscountsList;
