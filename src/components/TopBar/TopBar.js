import React, { Component } from 'react';
import {
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  Switcher,
  SwitcherDivider,
  SwitcherItem,
  SwitcherItemLink,
  SkipToContent,
} from 'carbon-components-react/lib/components/UIShell';
import {
  Add24,
  Search16,
  Download20,
  Logout20,
  Edit20,
  Information20,
} from '@carbon/icons-react';
import Search20 from '@carbon/icons-react/lib/search/20';
import Settings20 from '@carbon/icons-react/lib/settings/20';
import Settings16 from '@carbon/icons-react/lib/settings/16';
import Notification20 from '@carbon/icons-react/lib/notification/20';
import AppSwitcher20 from '@carbon/icons-react/lib/app-switcher/20';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';


class TopBar extends Component {
  state = {
    isExpanded: false,
    isDetails: false,
    isSettings: false,
  };

  componentDidMount() {
    console.log(this.props.axiosStore.url);
    const jwt = window.localStorage.getItem('jwt');
    if (jwt) {
      this.props.axiosStore.setJWT(jwt);
      this.props.sessStore.setisLogged();
      console.log(this.props.sessStore.isLogged);
      this.setState({ isLogged: this.props.sessStore.isLogged });
    }
  }

  // openSwither
  openSwither = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
    this.setState({ isSettings: false });
  }
  openSettings = () => {
    this.setState({ isSettings: !this.state.isSettings });
    this.setState({ isExpanded: false });
  }

  render() {
    let isExpanded = this.state.isExpanded;
    let isSettings = this.state.isSettings;
    let switcher = (
      <HeaderPanel aria-label="Header Panel">
        <Switcher role="menu" aria-label="Switcher Container">
          <SwitcherItem isSelected aria-label="Link 1" href="#">
            Nice catch man!
          </SwitcherItem>          
        </Switcher>
      </HeaderPanel>
    );

    if (isExpanded) {
      switcher = (
        <HeaderPanel aria-label="Header Panel" expanded>
          <Switcher role="menu" aria-label="Switcher Container">
            <SwitcherItem element={Link} to="/workspaces">
              Workspaces
            </SwitcherItem>
            <SwitcherDivider />
            <SwitcherItem element={Link} to="/progress">
              Progress
            </SwitcherItem>
            <SwitcherDivider />
            <SwitcherItem element={Link} to="/ps">
              Running Process
            </SwitcherItem>
            <SwitcherDivider />
            <SwitcherItem element={Link} to="/flows">
              Flows
            </SwitcherItem>
            <SwitcherDivider />
            <SwitcherItem element={Link} to="/execute">
              Execute
            </SwitcherItem>
            <SwitcherDivider />
            <SwitcherDivider />
            <SwitcherItem element={Link} to="/delete">
              Delete
            </SwitcherItem>
            <SwitcherDivider />
            Made with ♥ by
            <a href="https://twitter.com/j3ssiejjj" target="_blank">@j3ssiejjj</a>
          </Switcher>
        </HeaderPanel>
      );
    }

    if (isSettings) {
      switcher = (
        <HeaderPanel aria-label="Header Panel" expanded>
          <Switcher role="menu" aria-label="Switcher Container">
            {/* <SwitcherItem element={Link} to="/config">
              Configurations
            </SwitcherItem> */}
            <SwitcherDivider />
            <SwitcherItem
              aria-label="Link 1"
              onClick={() => {
                console.log('logout');
                window.localStorage.clear();
                this.props.sessStore.setLogout();
                window.location.reload();
              }}>
              Log Out
            </SwitcherItem>
          </Switcher>
        </HeaderPanel>
      );
    }

    return (
      <Header aria-label="Osmedeus UI Platform Name">
        <SkipToContent />
        <HeaderName element={Link} to="/home" prefix="">
          Osmedeus Next Generation UI
        </HeaderName>
        <HeaderNavigation>
          <HeaderMenuItem element={Link} to="/workspaces">
            Workspaces
          </HeaderMenuItem>

          <HeaderMenuItem element={Link} to="/progress">
            Progress
          </HeaderMenuItem>

          <HeaderMenuItem element={Link} to="/execute">
            Execute
          </HeaderMenuItem>

          <HeaderMenu aria-label="Actions" menuLinkName="Utilities">
            <HeaderMenuItem element={Link} to="/ps">
              Running Process
            </HeaderMenuItem>

            <HeaderMenuItem element={Link} to="/flows">
              Workflow Lists
            </HeaderMenuItem>
            <HeaderMenuItem element={Link} to="/delete">
              Delete
            </HeaderMenuItem>
          </HeaderMenu>
        </HeaderNavigation>
        <HeaderGlobalBar>

          <HeaderGlobalAction
            aria-label="Settings"
            onClick={() => {
              window.open('https://docs.osmedeus.org/donation/');
            }}>
            <Information20 />
          </HeaderGlobalAction>

          <HeaderGlobalAction
            aria-label="Settings"
            onClick={() => {
              console.log('logout');
              window.localStorage.clear();
              this.props.sessStore.setLogout();
              window.location.reload();
            }}>
            <Logout20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="App Switcher"
            isActive
            onClick={() => {
              this.openSwither();
            }}>
            <AppSwitcher20 />
          </HeaderGlobalAction>
        </HeaderGlobalBar>

        {switcher}
      </Header>
      // </div>
    );
  }
}

export default inject('sessStore', 'axiosStore')(observer(TopBar));
