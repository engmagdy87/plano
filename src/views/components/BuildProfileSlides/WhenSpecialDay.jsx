import React, { useState, useContext } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import CalendarImage from '../../../assets/images/calendar (5).svg';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../assets/styles/components/when-special-day.scss';
import { Store } from '../../../store/store';
import types from '../../../store/types';

export default function WhenSpecialDay({ onClickButton }) {
  const { state, dispatch } = useContext(Store);
  const { marriageDate } = state.userPersona;

  const [startDate, setStartDate] = useState(marriageDate || '');
  const [isDateDetermined, setIsDateDetermined] = useState(
    marriageDate === null ? true : false
  );
  const [error, setError] = useState(false);

  const setNotDeterminedFlag = function (val) {
    setIsDateDetermined(val.target.checked);
    if (!isDateDetermined) setStartDate('');
  };

  const handleNext = function () {
    if (startDate === '' && !isDateDetermined) setError(true);
    else {
      dispatch({
        type: types.user.SET_USER_MARRIAGE_DATE,
        payload: startDate !== '' ? startDate : null,
      });
      onClickButton(5);
    }
  };
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
                onChange={(date) => setStartDate(date)}
                className="bootstrap-border"
                placeholderText="DD/MM/YYYY"
                minDate={new Date()}
              />
              <Form.Check
                label="It's not determined yet"
                onChange={setNotDeterminedFlag}
                checked={isDateDetermined}
              />
              {error && (
                <span className="error-message">
                  Please choose date or check{' '}
                  <strong>It's not determined yet</strong>
                </span>
              )}
            </Form.Group>
            <div className="when-special-day-wrapper__form__form-action">
              <Button onClick={handleNext}>Next</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
