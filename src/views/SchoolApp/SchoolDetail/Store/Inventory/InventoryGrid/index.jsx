import React from 'react';
import DynamicHeightReactTable from 'components/Grid/DynamicHeightReactTable';
import { Link } from 'react-router-dom';
import { getReferenceItemOptions } from 'api/referenceItems';
import connect from 'src/redux/connect';
import {
  localCurrencyValue,
  localCurrencyZero,
} from 'util/localization/localValues';
import './styles.less';
import BlankPicture from 'assets/images/blank_picture.png';
import {
  filterPayloadMethod,
  filter,
  filterReferenceMethod,
} from 'util/tableFilter';
import NoDataMessage from 'components/DataLoading/NoDataMessage';

type InventoryGridProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  references: {},
  studentId: string,
  schoolId: string,
  match: {
    url: string,
  },
};

class InventoryGrid extends React.Component {
  props: InventoryGridProps;

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          Header: '',
          accessor: 'PictureBlobUrl',
          Cell: row => {
            const itemPicture = row.original.PictureBlobUrl;
            if (itemPicture) {
              return <img src={itemPicture} width="40" height="40" />;
            } else {
              return <img src={BlankPicture} width="40" height="40" />;
            }
          },
          sortable: false,
          filterable: false,
          width: 53,
        },
        {
          Header: 'Name',
          accessor: 'Name',
        },
        {
          Header: 'Description',
          accessor: 'Description',
        },
        {
          Header: 'Category',
          accessor: 'CategoryId',
          Cell: row => {
            let items = getReferenceItemOptions(
              'LstSkuCategory',
              this.props.references
            );

            let matched = items.find(item => item.value === row.value);
            return <span>{`${matched.label}`}</span>;
          },
          filterMethod: (filter, row) =>
            filterReferenceMethod(
              filter,
              row,
              this.props.references,
              'LstSkuCategory',
              'CategoryId'
            ),
          Filter: filter,
        },
        {
          Header: 'Selling Price',
          accessor: 'SellingPrice',
          Cell: row => {
            return (
              <span>{`${
                row.value ? localCurrencyValue(row.value) : localCurrencyZero()
              }`}</span>
            );
          },
        },
        {
          Header: 'Tax Rate',
          accessor: 'TaxRate',
          Cell: rowInfo => (
            <span className="date">
              {rowInfo.value ? rowInfo.value + '%' : 0 + '%'}
            </span>
          ),
        },
        {
          Header: 'Available Quantity',
          accessor: 'AvailableQuantity',
        },
        {
          Cell: row => (
            <div className="Action__cell">
              <Link
                className="pt-button"
                to={{
                  pathname: `${props.match.url}/${row.original.Id}/edit`,
                  state: { initialValues: row.original },
                }}
              >
                <i
                  className="Icon IconEdit fa fa-pencil"
                  aria-hidden="true"
                  title="Edit"
                />
              </Link>
              &nbsp;&nbsp;
            </div>
          ),
          filterable: false,
          sortable: false,
        },
      ],
    };
  }
  render() {
    if (
      this.props.data.payload.Skus === null ||
      this.props.data.payload.length === 0
    ) {
      return <NoDataMessage errorMessage="No Inventory Found" />;
    }

    return (
      <div className="InventoryGrid">
        <DynamicHeightReactTable
          pageSize={
            this.props.data &&
            this.props.data.payload &&
            this.props.data.payload.length
          }
          className="linked-row has-action"
          data={
            this.props.data &&
            this.props.data.payload &&
            this.props.data.payload.Skus
          }
          columns={this.state.columns}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
  };
};

export default connect(
  InventoryGrid,
  mapStateToProps
);
