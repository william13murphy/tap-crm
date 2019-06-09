import React from 'react';

type ProgramAndRankDisplayProps = {
  schoolStyles: { payload: Array<{}> },
  member: {
    InitialPackageStyleRank: {
      SchoolStyleId: string,
      InitialStyleRankId: string,
    },
  },
};

const getStyleName = (schoolStyles, member) => {
  const styles = schoolStyles.payload;
  const id = member.InitialPackageStyleRank.SchoolStyleId;
  return styles.filter(style => {
    if (style.Id === id) {
      return true;
    }
  })[0].Name;
};

const getStyleRankName = (schoolStyles, member) => {
  const styles = schoolStyles.payload;
  const styleId = member.InitialPackageStyleRank.SchoolStyleId;
  const rankId = member.InitialPackageStyleRank.InitialStyleRankId;
  const selectedStyle = styles.filter(style => {
    if (style.Id === styleId) {
      return true;
    }
  })[0];
  const selectedRank = selectedStyle.StyleRanks.filter(rank => {
    if (rank.Id === rankId) {
      return true;
    }
  })[0].Name;
  return selectedRank;
};

const ProgramAndRankDisplay = (props: ProgramAndRankDisplayProps) => (
  <div className="ProgramAndRankDisplay">
    <table className="default-table-plain">
      <tbody>
        <tr>
          <td>
            <span className="pt-icon pt-icon-tick pt-intent-success" />{' '}
            <span>Program:</span>
          </td>
          <td>{getStyleName(props.schoolStyles, props.member)}</td>
        </tr>
        <tr>
          <td>
            <span className="pt-icon pt-icon-tick pt-intent-success" />{' '}
            <span>Initial Rank:</span>
          </td>
          <td>{getStyleRankName(props.schoolStyles, props.member)}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ProgramAndRankDisplay;
