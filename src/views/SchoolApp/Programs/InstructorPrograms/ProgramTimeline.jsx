import React from 'react';
import DataCard from 'components/DataCard';

const ProgramTimeline = () => (
  <DataCard title="My Timeline">
    <table className="TimelineTable">
      <tbody>
        <tr>
          <td>
            <strong>January 16, 2017</strong>
          </td>
          <td>Promoted Ash Millard to Yellow Belt</td>
        </tr>
        <tr>
          <td>
            <strong>January 6, 2018</strong>
          </td>
          <td>Promoted Jaxon Casey to Orange Belt</td>
        </tr>
        <tr>
          <td>
            <strong>December 9, 2017</strong>
          </td>
          <td>Promoted Will Dewar to Yellow Belt</td>
        </tr>
        <tr>
          <td>
            <strong>December 2, 2017</strong>
          </td>
          <td>Enrolled Hannah Hannah in Karate as a White Belt</td>
        </tr>
      </tbody>
    </table>
  </DataCard>
);

export default ProgramTimeline;
