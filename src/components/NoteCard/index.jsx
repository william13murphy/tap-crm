import React from 'react';
import './styles.less';
import DataCard from 'components/DataCard';
import moment from 'moment';

type NoteCardProps = {
  createdOn: string,
  title: string,
  detail: string,
  deleteLink?: string,
  editLink?: any,
};

const NoteCard = (props: NoteCardProps) => {
  return (
    <DataCard
      className="NoteCard"
      title={props.title}
      editLink={props.editLink}
    >
      <p className="NoteCard__created">
        {moment(props.createdOn).format('MMMM Do, YYYY')}
      </p>
      <p className="NoteCard__detail">{props.detail}</p>
    </DataCard>
  );
};

export default NoteCard;
