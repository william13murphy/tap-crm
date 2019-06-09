import React from 'react';
import connect from 'src/redux/connect';
import { roles, authorizeRole } from 'util/auth/roles';

import StudentNoteFormContainer from 'containers/Student/StudentNoteFormContainer';
import NotesCard from 'views/SchoolApp/Students/StudentDetail/Notes/NotesCard';
import NoDataMessage from 'components/DataLoading/NoDataMessage';
import './styles.less';

type FlaggedNotesPreviewProps = {
  schoolId: string,
  calendar: {
    payload: [],
    error: boolean,
  },
  myAppointments: {
    payload: [],
  },
  history: Object,
  timeZone: string,
  nav: {
    efcNavHeight: number,
    schoolNavHeight: number,
    subNavHeight: number,
  },
  topSectionClassName?: string,
};

class FlaggedNotesPreview extends React.Component {
  props: FlaggedNotesPreviewProps;

  constructor(props) {
    super(props);
    this._isMounted = false;

    this.state = {
      height: 380,
    };
  }
  componentDidMount() {
    this._isMounted = true;

    setTimeout(() => {
      if (this._isMounted) {
        // this.setState({
        //   height: setGridHeight,
        // });
        this.setGridHeight();
      }
    }, 0);
    // window.addEventListener('resize', this.handleResizing);
    window.addEventListener('resize', this.setGridHeight);
  }

  componentWillUnmount() {
    this._isMounted = false;
    // window.removeEventListener('resize', this.handleResizing);
    window.removeEventListener('resize', this.setGridHeight);
  }

  // handleResizing = event => {
  //   this.setState({
  //     height: setGridHeight,
  //   });
  // };

  setGridHeight = () => {
    const pageHeaderHeight =
      document.getElementsByClassName('Dashboard__header') &&
      document.getElementsByClassName('Dashboard__header')[0]
        ? document.getElementsByClassName('Dashboard__header')[0].clientHeight
        : 0;

    // Get height of section above the grid
    const bottomSectionHeight =
      document.getElementsByClassName('PageHeader') &&
      document.getElementsByClassName('PageHeader')[0]
        ? document.getElementsByClassName('PageHeader')[0].clientHeight
        : 0;

    const bufferHeight = 40;

    // Calculate table body height
    let tableBodyHeight =
      window.innerHeight -
      (this.props.nav.efcNavHeight +
        this.props.nav.schoolNavHeight +
        this.props.nav.subNavHeight +
        pageHeaderHeight +
        bottomSectionHeight +
        bufferHeight);

    // Minimum table height:
    if (tableBodyHeight < 170) {
      tableBodyHeight = 170;
    }
    this.setState({
      height: tableBodyHeight,
    });
    //return tableBodyHeight;
  };

  render() {
    const schoolId = this.props.schoolId;
    return (
      <div
        className="FlaggedNotesPreview"
        style={{ height: this.state.height }}
      >
        {this.props.notesForSchool.payload === 0 ? (
          <NoDataMessage errorMessage="No flagged notes found." />
        ) : (
          this.props.notesForSchool.payload
            .filter((item, index, array) => {
              // Filter all orphan notes and notes without ParentId
              let matchedParentIndex = array.findIndex(innerItem => {
                return item.ParentId === innerItem.Id;
              });
              if (!item.ParentId || matchedParentIndex === -1) return true;
              return false;
            })
            .map((item, index) => {
              return (
                <StudentNoteFormContainer
                  key={index}
                  dispatchActionOnSuccessParams={{
                    studentId: `${item.StudentId}`,
                    schoolId: `${schoolId}`,
                  }}
                >
                  <NotesCard
                    studentId={item.StudentId}
                    data={item}
                    key={index}
                    allNotes={this.props.notesForSchool}
                  />
                </StudentNoteFormContainer>
              );
            })
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav,
    schoolHealth: state.report.schoolHealth,
    token: state.token,
  };
};

export default connect(
  FlaggedNotesPreview,
  mapStateToProps
);
