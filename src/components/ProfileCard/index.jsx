import React from 'react';
import DataCard from 'components/DataCard';
import './styles.less';

type ProfileCardProps = {
  className: string,
  children: React.DOMElement<any>,
  flat?: boolean, // removes card styles
};

const ProfileCard = (props: ProfileCardProps) => (
  <div className={`ProfileCard ${props.className}`}>
    <DataCard
      title={props.title || ''}
      subTitle={props.subTitle}
      className={`ProfileCard__card ${
        props.flat ? '' : 'pt-card pt-elevation-1'
      }`}
    >
      {props.children}
    </DataCard>
  </div>
);

export default ProfileCard;
