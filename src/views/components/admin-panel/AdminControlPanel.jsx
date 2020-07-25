import React, { useContext, useEffect, useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import AdminPanelHeader from './AdminPanelHeader';
import { Store } from '../../../store/store';
import { panelActions } from '../../../store/actions';
// import types from '../../../store/types';
import { getAdminCookie } from '../../../helpers/CookieHelper';
import Users from './tabs/Users';
import Settings from './tabs/Settings';
import UserDetails from './tabs/UserDetails';

import '../../../assets/styles/components/admin-control-panel.scss';

export default function AdminControlPanel({
  setShowLoadingSpinner,
  setAdminToken,
}) {
  const { state, dispatch } = useContext(Store);
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    if (Object.keys(state.selectedUser).length > 0) setShowUserDetails(true);
  }, [state.selectedUser]);

  useEffect(() => {
    async function fetchUsers() {
      setShowLoadingSpinner(true);
      await panelActions.listAllUsers(dispatch);
      setShowLoadingSpinner(false);
    }
    const token = getAdminCookie();
    if (token) fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="admin-control-panel-wrapper">
      <AdminPanelHeader setAdminToken={setAdminToken} />
      <Tab.Container defaultActiveKey="users">
        <Row>
          <Col sm={2} className="admin-control-panel-wrapper__side-menu">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link
                  eventKey="users"
                  className="admin-control-panel-wrapper__side-menu__nav-link"
                  onClick={() => setShowUserDetails(false)}
                >
                  Users
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="settings"
                  className="admin-control-panel-wrapper__side-menu__nav-link"
                  onClick={() => setShowUserDetails(false)}
                >
                  Settings
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10} className="admin-control-panel-wrapper__content">
            <Tab.Content>
              <Tab.Pane eventKey="users">
                {!showUserDetails ? (
                  <Users setShowUserDetails={setShowUserDetails} />
                ) : (
                  <UserDetails setShowUserDetails={setShowUserDetails} />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="settings">
                <Settings setShowLoadingSpinner={setShowLoadingSpinner} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
