import React from 'react';
import connect from 'src/redux/connect';
import ColorDisplay from 'components/ColorDisplay';
import SelectField from 'components/Forms/SelectField';

import './styles.less';

type RankRequirementSelectFieldProps = {
  name: string,
  className?: string,
  rankRequirements: {
    payload?: [],
  },
};

const RankRequirementSelectField = (props: RankRequirementSelectFieldProps) => {
  const rankTypeOptions = props.rankRequirements.payload
    .map(rankType => {
      if (rankType.ControlTypeId === 'c3689c23-601e-49d8-9f4a-ba71034bc499') {
        let color = rankType.Color;
        return {
          label: (
            <div className="Select__AdditionalSkills">
              <ColorDisplay
                className="Color__element"
                small
                color={rankType.Color}
              />
              <span className="Rank__Name">{rankType.Name}</span>
            </div>
          ),
          value: rankType.Name + rankType.Id,
        };
      }
    })
    .filter(function(n) {
      return n != undefined;
    });
  return (
    <SelectField
      {...props}
      className={`${props.className || ''} RankRequirementSelectField`}
      options={rankTypeOptions}
    />
  );
};

const mapStateToProps = state => {
  return {
    rankRequirements: state.school.rankRequirements,
  };
};

export default connect(
  RankRequirementSelectField,
  mapStateToProps
);
