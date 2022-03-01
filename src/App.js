import React, { Component } from 'react';
import './app.scss';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import TopBar from './components/TopBar';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import RepoPage from './content/RepoPage';


import { inject, observer } from 'mobx-react';
import PrivateRoute from './pages/PrivateRoute';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import RedirectPage from './pages/RedirectPage';
import WorkspacesPage from './pages/WorkspacesPage';
import LogsPage from './pages/LogsPage';
import ReportsPage from './pages/ReportsPage';
import ExecutePage from './pages/ExecutePage';
import ScanPage from './pages/ScanPage';
import SummaryPage from './pages/SummaryPage';

import FlowsPage from './pages/FlowsPage';
import UploadPage from './pages/UploadPage';
import DeletePage from './pages/DeletePage';
import FlowDetail from './containers/Details/Flows/FlowDetail';
import ModuleDetail from './containers/Details/Flows/ModuleDetail';
import PsPage from './pages/PsPage';


class App extends Component {

  render() {
    return (
      <>
        <TopBar />
        <Content>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/redirect" component={RedirectPage} />
            {/* stateless page */}
            <PrivateRoute exact path="/" component={LandingPage} />
            <PrivateRoute exact path="/home" component={LandingPage} />
            <PrivateRoute exact path="/repos" component={RepoPage} />
            <PrivateRoute exact path="/upload" component={UploadPage} />
            <PrivateRoute exact path="/execute" component={ExecutePage} />
            <PrivateRoute
              exact
              path="/workspaces"
              component={WorkspacesPage}
            />
            <PrivateRoute exact path="/flows" component={FlowsPage} />
            <PrivateRoute
              exact
              path="/reports/:wsname/"
              component={ReportsPage}
            />
            <PrivateRoute
              exact
              path="/summary/:wsname/"
              component={SummaryPage}
            />

            <PrivateRoute exact path="/delete" component={DeletePage} />
            <PrivateRoute exact path="/progress" component={ScanPage} />
            <PrivateRoute exact path="/ps" component={PsPage} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default inject('sessStore', 'axiosStore')(observer(App));
