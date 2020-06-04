import React, { useContext, useEffect, useState } from 'react';
import { Breadcrumb, Container, Row, Col } from 'react-bootstrap';
import { Store } from '../../../../store/store';
import '../../../../assets/styles/components/admin-panel-user-details.scss';
import { useHistory } from 'react-router-dom';
import { formatDate } from '../../../../helpers/DatesHelper';
export default function UserDetails({ setShowUserDetails }) {
  const { state } = useContext(Store);
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(state.selectedUser).length === 0) history.push('/admin');
    setUser(state.selectedUser);
  }, [history, state.selectedUser]);

  return (
    <div className="admin-panel-user-details-wrapper">
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => setShowUserDetails(false)}>
          Users
        </Breadcrumb.Item>
        <Breadcrumb.Item>{state.selectedUser.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Container className="admin-panel-user-details-wrapper__content">
        <Row>
          <Col className="d-flex admin-panel-user-details-wrapper__item">
            <h4>Account ID</h4>
            <h4>{user.email || user.phone}</h4>
          </Col>
          <Col className="d-flex admin-panel-user-details-wrapper__item">
            <h4>Join Date</h4>
            <h4>
              {user.joined_at !== ''
                ? formatDate(new Date(user.joined_at))
                : ''}
            </h4>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex admin-panel-user-details-wrapper__item">
            <h4>Status</h4>
            <h4>UNDEFINED</h4>
          </Col>
          <Col className="d-flex admin-panel-user-details-wrapper__item">
            <h4>Last Login Date</h4>
            <h4>
              {user.last_login_at !== ''
                ? formatDate(new Date(user.last_login_at))
                : ''}
            </h4>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex admin-panel-user-details-wrapper__item">
            <h4>Spouse Type</h4>
            <h4>{user.spouseName}</h4>
          </Col>
          <Col className="d-flex admin-panel-user-details-wrapper__item">
            <h4>Estimated Budget</h4>
            <h4>>={user.prepCost}</h4>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex admin-panel-user-details-wrapper__item">
            <h4>Wedding Date</h4>
            <h4>
              {user.marriageDate !== ''
                ? formatDate(new Date(user.marriageDate))
                : ''}
            </h4>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
