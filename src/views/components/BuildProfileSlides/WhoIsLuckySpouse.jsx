import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import RingsImage from '../../../assets/images/rings.svg';
import '../../../assets/styles/components/lucky-spouse.scss';

export default function WhoIsLuckySpouse({ onClickButton }) {
  return (
    <div className="lucky-spouse-wrapper">
      <Row className="lucky-spouse-wrapper__title">
        <Col xs={12} className="text-center">
          <img src={RingsImage} alt="waving hand" />
        </Col>
        <Col xs={12} className="text-center">
          <span>Who's your lucky spouse?</span>
        </Col>
      </Row>
      <Row className="lucky-spouse-wrapper__form">
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Enter name</Form.Label>
              <Form.Control type="text" placeholder="Full Name" />
            </Form.Group>
            <div className="lucky-spouse-wrapper__form__form-action">
              <Button onClick={() => onClickButton(4)}>Next</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
