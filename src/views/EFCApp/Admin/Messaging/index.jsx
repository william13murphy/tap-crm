import React from 'react';
import connect from 'src/redux/connect';
import Module from 'components/Layout/Module';
import { Route, Redirect } from 'react-router-dom';
import { pdfToBase64String } from 'util/base64';
import './styles.less';

import AllSchoolsPage from './AllSchools';
import DetailPage from './Detail';

type AdminMessagingPageProps = {
  schoolId: string,
  history: {},
  location: {},
  match: {
    path: string,
    url: string,
    params: {
      schoolId: string,
    },
  },
};

class AdminMessaging extends React.Component {
  props: AdminMessagingPageProps;

  render() {
    return (
      <div className="AdminMessaging">
        <Module className="AdminMessagingModule" title="Admin Messaging">
          <Route
            exact
            path="/app/admin/messaging"
            render={() => {
              return <AllSchoolsPage />;
            }}
          />
          <Route
            path="/app/admin/messaging/detail/:schoolId"
            render={routeProps => {
              return <DetailPage schoolId={routeProps.match.params.schoolId} />;
            }}
          />
          <Route
            exact
            path="/app/admin/messaging/detail/:schoolId"
            render={routeProps => {
              return (
                <Redirect
                  to={`/app/admin/messaging/detail/${
                    routeProps.match.params.schoolId
                  }/outbox`}
                />
              );
            }}
          />
        </Module>
      </div>
    );
  }
}

export default connect(AdminMessaging);
