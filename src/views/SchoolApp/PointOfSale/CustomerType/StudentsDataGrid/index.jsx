import React from 'react';
import connect from 'src/redux/connect';
import { Redirect } from 'react-router-dom';
import { dynamicBackRoute } from 'util/router';
import { cartReset } from 'src/redux/actionCreators/pos/cart';
import { customerUpdate } from 'src/redux/actionCreators/pos/customer';

import DefaultReactTable from 'components/Grid/DefaultReactTable';

import AvatarBlank from 'assets/images/avatar_blank.png';
import styleVariables from 'styles/_variables';
import './styles.less';

type StudentsDataGridProps = {
  dispatchCartReset: Function,
  dispatchCustomerUpdate: Function,
  history: {
    push: any,
  },
  location: {},
  match: {},
  pos: {},
};

class StudentsDataGrid extends React.Component {
  props: StudentsDataGridProps;
  state = {
    columns: [
      {
        Header: (
          <div className="StudentList__header">
            <span>Student Name</span>
          </div>
        ),

        accessor: 'name',
        Filter: ({ filter, onChange }) => (
          <div>
            <span className="StudentList__searchIcon pt-icon pt-icon-search" />
            <input
              className="StudentList__search"
              onChange={event => onChange(event.target.value)}
              value={filter ? filter.value : ''}
              placeholder="Search for Student by Name"
              style={{
                width: '100%',
              }}
            />
          </div>
        ),

        Cell: row => {
          const profilePicture =
            row.original.properties.PictureBlobUrl || AvatarBlank;
          return (
            <div className="StudentList__container">
              <span className="StudentList__item">
                <img src={profilePicture} width="40" height="40" />
              </span>
              <span className="StudentList__item">{row.value}</span>
            </div>
          );
        },
      },
    ],
    data: [],
    customer: {
      selected: null,
      details: {},
    },
  };

  componentWillMount() {
    let { students } = this.props.pos;
    if (students.payload) {
      let data = students.payload.map(item => {
        return {
          name: `${item.FirstName} ${item.LastName}`,
          studentId: item.StudentId,
          id: item.BarCode,
          properties: item,
        };
      });
      this.setState({
        data,
      });
    }
  }

  selectedRow = (state, rowInfo) => {
    let { customer } = this.state;
    return {
      onClick: e => {
        this.setState({
          customer: {
            selected: rowInfo.index,
            details: rowInfo.original,
            screen: 'STUDENT',
          },
        });
      },
      style: {
        background:
          rowInfo && rowInfo.index === customer.selected
            ? styleVariables.sky_blue
            : styleVariables.white,
        color:
          rowInfo && rowInfo.index === customer.selected
            ? styleVariables.white
            : styleVariables.black,
      },
    };
  };

  onProceed = () => {
    if (
      this.state.customer.selected === null ||
      this.state.customer.selected === -1
    )
      return;

    this.props.dispatchCartReset();
    this.props.dispatchCustomerUpdate(this.state.customer);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      const posUrl = dynamicBackRoute(this.props.match.url, '/customer-type');
      return <Redirect to={`${posUrl}/select-item`} />;
    }

    return (
      <div className="StudentContainer">
        <div className="StudentList">
          <DefaultReactTable
            getTheadThProps={(state, rowInfo, column, instance) => {
              return {
                style: {
                  background: styleVariables.cyan,
                },
              };
            }}
            getTrProps={(state, rowInfo) => this.selectedRow(state, rowInfo)}
            className="linked-row has-action"
            pageSize={this.state.data.length}
            data={this.state.data}
            columns={this.state.columns}
          />
        </div>
        <div className="Footer">
          <button
            type="button"
            className="Footer__link pt-button pt-intent-primary"
            onClick={this.onProceed}
          >
            Proceed
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
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
  StudentsDataGrid,
  mapStateToProps,
  mapDispatchToProps
);
