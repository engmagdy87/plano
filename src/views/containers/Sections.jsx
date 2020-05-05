import React, { Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../shared/Header';
import WeddingCoupleImage from '../../assets/images/wedding-couple.svg';
import ApartmentImage from '../../assets/images/Apartment.svg';
import PartyImage from '../../assets/images/bachelorette-party.svg';
import TravelImage from '../../assets/images/travel.svg';
import ShoppingImage from '../../assets/images/shopping-bag (1).svg';
import '../../assets/styles/containers/sections.scss';
import { Store } from '../../store/store';
import { setChecklistCookie } from '../../helpers/CookieHelper';
import types from '../../store/types';

export default function Sections() {
  const { dispatch } = useContext(Store);
  const history = useHistory();
  const redirectToWeddingCeremony = function () {
    setChecklistCookie(1);
    dispatch({
      type: types.checklist.SET_CURRENT_CHECKLIST,
      payload: 1,
    });
    history.push('/home');
  };

  const renderContent = function () {
    const phoneAndTablet = window.matchMedia('(max-width:992px)');
    if (phoneAndTablet.matches) {
      return (
        <Container className="sections-wrapper">
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <div
                className="sections-wrapper__choice"
                onClick={redirectToWeddingCeremony}
              >
                <img src={WeddingCoupleImage} alt="wedding couple" />
                <span>Wedding ceremony</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <div className="sections-wrapper__choice">
                <img src={ApartmentImage} alt="apartment" />
                <span>apartment</span>
              </div>
            </Col>
            <Col xs={6}>
              <div className="sections-wrapper__choice">
                <img src={PartyImage} alt="party" />
                <span>Bachelorette</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <div className="sections-wrapper__choice">
                <img src={TravelImage} alt="travel" />
                <span>Packing</span>
              </div>
            </Col>
            <Col xs={6}>
              <div className="sections-wrapper__choice">
                <img src={ShoppingImage} alt="shopping" />
                <span>Shopping</span>
              </div>
            </Col>
          </Row>
        </Container>
      );
    } else
      return (
        <div className="sections-wrapper">
          <div
            className="sections-wrapper__choice"
            onClick={redirectToWeddingCeremony}
          >
            <img src={WeddingCoupleImage} alt="wedding couple" />
            <span>Wedding ceremony</span>
          </div>
          <div className="sections-wrapper__choice">
            <img src={ApartmentImage} alt="apartment" />
            <span>apartment</span>
          </div>
          <div className="sections-wrapper__choice">
            <img src={PartyImage} alt="party" />
            <span>Bachelorette</span>
          </div>
          <div className="sections-wrapper__choice">
            <img src={TravelImage} alt="travel" />
            <span>Packing</span>
          </div>
          <div className="sections-wrapper__choice">
            <img src={ShoppingImage} alt="shopping" />
            <span>Shopping</span>
          </div>
        </div>
      );
  };

  return (
    <Fragment>
      <Header activePath="" />
      {renderContent()}
    </Fragment>
  );
}
