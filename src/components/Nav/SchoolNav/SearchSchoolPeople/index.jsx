import React from 'react';
import connect from 'src/redux/connect';

import OmnibarPersonSearchControlled from 'components/Search/OmnibarPersonSearchControlled';
import NavNavLinkMock from 'components/Nav/SchoolNav/NavNavLinkMock';
import { studentDetailFetch } from 'src/redux/actionCreators/student/detail';
import { studentContactDetailFetch } from 'src/redux/actionCreators/student/contactDetail';

import SearchIcon from 'assets/images/icon_search.png';

type SearchSchoolPeopleProps = {
  schoolId: string,
  searchFuzzy: Array<{}>,
  history: {
    push: Function,
  },
  dispatchStudentDetailFetch: Function,
  dispatchStudentContactDetailFetch: Function,
};

class SearchSchoolPeople extends React.Component {
  props: SearchSchoolPeopleProps;

  handleItemSelect = item => {
    this.setState({ isOpen: false });
    let itemLink = '';
    if (item.type === 'CONTACT') {
      itemLink = `/app/school-app/${
        this.props.schoolId
      }/students/student-contact/${item.id}`;
      this.props.dispatchStudentContactDetailFetch(item.id);
    } else if (item.type === 'LEAD') {
      itemLink = `/app/school-app/${this.props.schoolId}/students/leads/${
        item.id
      }/edit`;
      this.props.dispatchStudentDetailFetch(item.id);
    } else if (item.type === 'STUDENT') {
      itemLink = `/app/school-app/${this.props.schoolId}/students/detail/${
        item.id
      }`;
      this.props.dispatchStudentDetailFetch(item.id);
    }
    if (itemLink !== '') {
      this.props.history.push(itemLink);
    }
  };
  componentWillMount() {
    const searchItems =
      this.props.searchFuzzy && this.props.searchFuzzy.payload
        ? this.props.searchFuzzy.payload.map((cV, i) => {
            let id = '';
            if (cV.Type === 'CONTACT') id = cV.ContactId;
            if (cV.Type === 'LEAD') id = cV.SchoolLeadId;
            if (cV.Type === 'STUDENT') id = cV.StudentId;
            return {
              name: cV.FirstName + ' ' + cV.LastName,
              type: cV.Type,
              id,
            };
          })
        : '';
    this.setState({
      searchItems,
      isOpen: false,
    });
  }
  handleClick = () => {
    this.setState({ isOpen: true });
  };
  handleClose = () => {
    this.setState({ isOpen: false });
  };
  render() {
    return (
      <OmnibarPersonSearchControlled
        handleItemSelect={this.handleItemSelect}
        handleClick={this.handleClick}
        handleClose={this.handleClose}
        items={this.state.searchItems}
        isOpen={this.state.isOpen}
      >
        <NavNavLinkMock
          handleClick={this.handleClick}
          // icon="pt-icon-search" // "icon_rocket.svg"
          icon={SearchIcon}
          name="Search"
        />
      </OmnibarPersonSearchControlled>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchFuzzy: state.school.searchFuzzy,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchStudentDetailFetch: (id: string) => {
      dispatch(studentDetailFetch(id));
    },
    dispatchStudentContactDetailFetch: (id: string) => {
      dispatch(studentContactDetailFetch(id));
    },
  };
};

export default connect(
  SearchSchoolPeople,
  mapStateToProps,
  mapDispatchToProps
);
