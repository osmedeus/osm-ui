import React, { Component } from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderMenu,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from '@carbon/react';
import { Favorite, Logout, License } from '@carbon/react/icons';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';


const NavLinks = () => (
  <>
    <HeaderMenuItem element={Link} to="/workspaces">
      Workspaces
    </HeaderMenuItem>

    <HeaderMenu aria-label="Actions" menuLinkName="Utilities">
      <HeaderMenuItem element={Link} to="/ps">
        Running Process
      </HeaderMenuItem>
      <HeaderMenuItem element={Link} to="/execute">
        Execute
      </HeaderMenuItem>

      <HeaderMenuItem element={Link} to="/delete">
        Delete
      </HeaderMenuItem>
    </HeaderMenu>
  </>
);

class TopBar extends Component {
  render() {
    return (
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <Header aria-label="Carbon Tutorial">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName element={Link} to="/" prefix="Osmedeus">
              Next Generation UI
            </HeaderName>

            <HeaderNavigation aria-label="Workspaces">
              <NavLinks />
            </HeaderNavigation>

            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              isPersistent={false}>
              <SideNavItems>
                <HeaderSideNavItems>
                  <NavLinks />
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>

            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label="Donation"
                onClick={() => {
                  window.open('https://docs.osmedeus.org/donation/');
                }}>
                <Favorite size={20} />
              </HeaderGlobalAction>


              <HeaderGlobalAction
                aria-label="Documentaion"
                onClick={() => {
                  console.log('logout');
                  window.localStorage.clear();
                  this.props.sessStore.setLogout();
                  window.location.reload();
                }}>
                <License size={20} />
              </HeaderGlobalAction>


              <HeaderGlobalAction
                aria-label="Logout"
                onClick={() => {
                  console.log('logout');
                  window.localStorage.clear();
                  this.props.sessStore.setLogout();
                  window.location.reload();
                }}>
                <Logout size={20} />
              </HeaderGlobalAction>

            </HeaderGlobalBar>
          </Header>
        )}
      />
    )
  }
}

export default inject('sessStore', 'axiosStore')(observer(TopBar));
