import React from 'react';
import moment from 'moment';
import connect from 'src/redux/connect';
import { Link } from 'react-router-dom';
import ReferenceOutput from 'src/components/ConnectedComponents/ReferenceOutput';
import './styles.less';

type NoteBodyProps = {
  Id: string,
  Title: string,
  CreatedOn: string,
  NoteTypeId: string,
  StudentId: string,
  Detail: string,
  SchoolFlag: boolean,
  EFCFlag: boolean,
  StudentFlag: boolean,
};

const NoteBody = props => {
  const noteTitle = `${props.Title.charAt(0).toUpperCase()}${props.Title.slice(
    1
  ).toLowerCase()}`;

  return (
    <div className="NoteBody">
      <div className="NoteBody__header">
        {props.EFCFlag && (
          <span
            className="pt-icon pt-icon-flag NoteBody__efcflag"
            title="Flagged for EFC Admin"
          />
        )}
        {props.SchoolFlag && (
          <span
            className="pt-icon pt-icon-flag NoteBody__schoolflag"
            title="Flagged for School Admin"
          />
        )}
        {/*!props.SchoolFlag &&
          !props.EFCFlag && (
            <span
              className="pt-icon pt-icon-time NoteBody__timeicon"
              title={moment(props.CreatedOn).format('MMMM Do YYYY, h:mm:ss a')}
            />
          )*/}
        {moment(props.CreatedOn).format('MMMM Do, YYYY - h:mm a')}
      </div>
      {/* Removed NoteTypeId display, since all notes are marked as Restricted:
      <div className="NoteBody__section NoteBody__section__note-type">
        <span className="pt-icon pt-icon-person" title="Note Type" />{' '}
        <ReferenceOutput id={props.NoteTypeId} listName="LstSchoolNoteTypes" />
      </div>
       */}

      {/* Title removed in favor of auto-generated title
        <h3>{noteTitle}</h3> */}
      <div className="NoteBody__detail">{props.Detail}</div>

      <div className="NoteBody__footer">
        <div>
          <Link
            to={{
              pathname: `${props.match.url}/${props.Id}/reply`,
              state: {
                initialValues: {
                  ParentId: props.Id,
                  StudentId: props.StudentId,
                  Title: props.Title,
                },
              },
            }}
          >
            <button className="pt-button">
              <i className="fa fa-reply" />
              &nbsp;Reply
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({});

export default connect(
  NoteBody,
  mapStateToProps
);
