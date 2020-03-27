import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import WavingHandImage from '../../../assets/images/waving-hand.svg';
import '../../../assets/styles/components/what-is-your-name.scss';

export default function WhatIsYourName({ onClickButton }) {
  return (
    <div className="what-is-your-name-wrapper">
      <Row className="what-is-your-name-wrapper__title">
        <Col xs={12} className="text-center">
          <img src={WavingHandImage} alt="waving hand" />
        </Col>
        <Col xs={12} className="text-center">
          <span>What's your name?</span>
        </Col>
      </Row>
      <Row className="what-is-your-name-wrapper__form">
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Enter your name</Form.Label>
              <Form.Control type="text" placeholder="Full Name" />
            </Form.Group>
            <div className="what-is-your-name-wrapper__form__form-action">
              <Button onClick={() => onClickButton(3)}>Next</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
