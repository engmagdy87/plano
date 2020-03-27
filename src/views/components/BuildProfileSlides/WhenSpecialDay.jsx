import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import CalendarImage from '../../../assets/images/calendar (5).svg';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../assets/styles/components/when-special-day.scss';

export default function WhenSpecialDay({ onClickButton }) {
  const [startDate, setStartDate] = useState('');
  return (
    <div className="when-special-day-wrapper">
      <Row className="when-special-day-wrapper__title">
        <Col xs={12} className="text-center">
          <img src={CalendarImage} alt="waving hand" />
        </Col>
        <Col xs={12} className="text-center">
          <p>"Name" & "Name"</p>
          <p>When's your special day?</p>
        </Col>
      </Row>
      <Row className="when-special-day-wrapper__form">
        <Col>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Due Date</Form.Label>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={date => setStartDate(date)}
                className="bootstrap-border"
                placeholderText="DD/MM/YYYY"
                minDate={new Date()}
              />
              <Form.Check label="It's not determined yet" />
            </Form.Group>
            <div className="when-special-day-wrapper__form__form-action">
              <Button onClick={() => onClickButton(5)}>Next</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
