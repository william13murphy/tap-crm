import React from 'react';
import connect from 'src/redux/connect';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import PrivateComponent from 'components/Auth/PrivateComponent';
import DataCard from 'components/DataCard';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import { roles, authorizeRole } from 'util/auth/roles';
import SwitchField from 'components/Forms/SwitchField';
import Checkbox from 'components/Checkbox';
import { reduxForm } from 'redux-form';

import NoteBody from './NoteBody';

import './styles.less';

type NotesCardProps = {
  data: {
    payload: Array<{}>,
  },
  history: {
    push: any,
  },
  references: {},
  studentId: string,
  data: {
    Title: string,
    NoteTypeId: string,
    CreatedOn: string,
    Detail: string,
    SchoolFlag: boolean,
    EFCFlag: boolean,
    StudentId: string,
    Id: string,
  },
  schoolId: string,
  appContext: {
    schoolId: string,
  },
  match: {
    url: string,
  },
  dispatchFormPost: any,
  allNotes: { payload: [{}] },
};

const schoolFlagTitle = 'School Flag';
const efcFlagTitle = 'EFC Flag';

class NotesCard extends React.Component {
  props: NotesCardProps;

  constructor(props) {
    super(props);

    let childNotesFlags = {};
    let notes = this.props.allNotes && this.props.allNotes.payload;

    let efcStaffRole = authorizeRole(
      this.props.token.payload.Role,
      roles.SUBSET_EFC_STAFF
    );

    this.getAllChildNotes(
      notes,
      this.props.data,
      childNotesFlags,
      efcStaffRole
    );

    let noteFlagged = false;

    if (efcStaffRole) {
      noteFlagged = this.props.data.EFCFlag;
    } else {
      noteFlagged = this.props.data.SchoolFlag;
    }

    this.state = {
      noteFlagged: noteFlagged,
      childNotesFlags: childNotesFlags,
      efcStaffRole: efcStaffRole,
    };
    this.changeNoteStatus = this.changeNoteStatus.bind(this);
  }

  getAllChildNotes = (notes, data, childNotesFlags, efcStaffRole) => {
    notes
      .filter(item => item.ParentId === data.Id)
      .forEach(item => {
        if (efcStaffRole) {
          childNotesFlags[item.Id] = item.EFCFlag;
        } else {
          childNotesFlags[item.Id] = item.SchoolFlag;
        }
        this.getAllChildNotes(notes, item, childNotesFlags);
      });
  };

  changeNoteStatus() {
    // This switch un-flags for your own role.
    // For EFC Roles, it unflags for efc, allowing you to remove from your flagged notes.
    let flagged = this.state.noteFlagged;
    this.setState({ noteFlagged: !flagged });
    let data = this.props.data;
    if (this.state.efcStaffRole) {
      data.EFCFlag = !flagged;
    } else {
      data.SchoolFlag = !flagged;
    }

    this.props.dispatchFormPost(data);
  }

  changeChildNotesFlags = e => {
    let notes = this.props.allNotes && this.props.allNotes.payload;
    let { childNotesFlags } = this.state;
    let flagged = childNotesFlags[e.target.name];

    let selectedChildNote = notes.find(item => item.Id === e.target.name);

    if (this.state.efcStaffRole) {
      selectedChildNote.EFCFlag = !flagged;
    } else {
      selectedChildNote.SchoolFlag = !flagged;
    }
    this.setState({ childNotesFlags });
    this.props.dispatchFormPost(selectedChildNote);
  };

  renderChildNote = data => {
    let notes = this.props.allNotes && this.props.allNotes.payload;
    return notes
      .filter(item => item.ParentId === data.Id)
      .map((item, index) => {
        return (
          <DataCard title="" key={index}>
            {/* Flag/unflag child note. If a parent is flagged, the child note appears even if it is not flagged. */}
            <PrivateComponent allow={roles.SUBSET_SCHOOL_STAFF}>
              <SwitchField
                title={schoolFlagTitle}
                label={schoolFlagTitle}
                name={item.Id}
                className="SchoolFlagSwitch"
                checked={this.state.childNotesFlags[item.Id]}
                onClick={this.changeChildNotesFlags}
              />
            </PrivateComponent>
            <PrivateComponent allow={roles.SUBSET_EFC_STAFF}>
              <SwitchField
                title={efcFlagTitle}
                label={efcFlagTitle}
                name={item.Id}
                className="EFCFlagSwitch"
                checked={this.state.childNotesFlags[item.Id]}
                onClick={this.changeChildNotesFlags}
              />
            </PrivateComponent>
            <NoteBody {...item} />
            {this.renderChildNote(item)}
          </DataCard>
        );
      });
  };

  render() {
    return (
      <div className="NotesCard">
        <form method="POST">
          <DataCard
            title={`${this.props.data.FirstName}${' '}${
              this.props.data.LastName
            }`}
          >
            <PrivateComponent allow={roles.SUBSET_SCHOOL_STAFF}>
              <SwitchField
                title={schoolFlagTitle}
                label={schoolFlagTitle}
                name="NoteFlag"
                className="SchoolFlagSwitch"
                checked={this.state.noteFlagged}
                onClick={this.changeNoteStatus}
              />
            </PrivateComponent>
            <PrivateComponent allow={roles.SUBSET_EFC_STAFF}>
              <SwitchField
                title={efcFlagTitle}
                label={efcFlagTitle}
                name="NoteFlag"
                className="EFCFlagSwitch"
                checked={this.state.noteFlagged}
                onClick={this.changeNoteStatus}
              />
            </PrivateComponent>
            <NoteBody {...this.props.data} />
            {this.renderChildNote(this.props.data)}
          </DataCard>
        </form>
      </div>
    );
  }
}

const NotesCardForm = reduxForm({
  form: 'notes-card-flag', // a unique identifier for this form
})(NotesCard);

const mapStateToProps = state => {
  return {
    references: state.utility.references,
    appContext: state.appContext,
    token: state.token,
  };
};

export default connect(
  NotesCardForm,
  mapStateToProps
);
