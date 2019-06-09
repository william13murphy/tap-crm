import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

type DataCardProps = {
  title?: string,
  titleLink?: string,
  className?: string,
  deleteLink?: string,
  deleteLinkText?: string,
  editLink?: string,
  children: React.Element<any>,
};

const DataCard = (props: DataCardProps) => {
  return (
    <div
      style={props.style || {}}
      className={`${props.className || ''} DataCard pt-card pt-elevation-1`}
    >
      <div className={`DataCard__header ${props.title ? '' : '--no-title'}`}>
        <div className="DataCard__toolbar">
          {props.editLink && (
            <Link className="pt-button" to={props.editLink}>
              <i className="fa fa-pencil" />
              Edit
            </Link>
          )}
          {props.deleteLink && (
            <Link className="pt-button" to={props.deleteLink}>
              {props.deleteLinkText || 'Remove'}
            </Link>
          )}
        </div>
        {props.title && (
          <div>
            {props.titleLink ? (
              <Link to={props.titleLink}>
                <h3 className="DataCard__title">{props.title || ''}</h3>
              </Link>
            ) : (
              <h3 className="DataCard__title">{props.title || ''}</h3>
            )}

            <h3 className="DataCard__subtitle">{props.subTitle || ''}</h3>
          </div>
        )}
      </div>
      <div className="DataCard__body">{props.children}</div>
    </div>
  );
};

export default DataCard;
