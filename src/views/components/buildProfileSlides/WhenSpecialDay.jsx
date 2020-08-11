import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import CalendarImage from '../../../assets/images/calendar (5).svg';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../assets/styles/components/when-special-day.scss';
import { Store } from '../../../store/store';
import types from '../../../store/types';
import RightArrowIcon from '../../../assets/images/right-arrow.svg';
export default function WhenSpecialDay({ onClickButton }) {
  const { t } = useTranslation(['build-profile']);
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
      onClickButton(5, { marriageDate: startDate !== '' ? startDate : null });
    }
  };
  return (
    <div className="when-special-day-wrapper">
      <Row className="when-special-day-wrapper__title">
        <Col xs={12} className="text-center">
          <img
            src={CalendarImage}
            alt="waving hand"
            className="when-special-day-wrapper__title__hero"
          />
        </Col>
        <Col
          xs={12}
          className="text-center when-special-day-wrapper__title__text"
        >
          <p
            className={`when-special-day-wrapper__title__couples ${
              state.lang === 'en'
                ? 'when-special-day-wrapper__title__couples--en'
                : 'when-special-day-wrapper__title__couples--ar'
            }`}
          >
            {state.userPersona.name} & {state.userPersona.spouseName}
          </p>
          <p
            className={`when-special-day-wrapper__title__date ${
              state.lang === 'en'
                ? 'when-special-day-wrapper__title__date--en'
                : 'when-special-day-wrapper__title__date--ar'
            }`}
          >
            {t('build-profile:whenIsYourSpecialDay')}
          </p>
        </Col>
      </Row>
      <Row className="when-special-day-wrapper__form">
        <Col>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label
                className={`${
                  state.lang === 'en'
                    ? 'form-check__date-label--en'
                    : 'form-check__date-label--ar'
                }`}
              >
                {t('build-profile:dueDate')}
              </Form.Label>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className={`bootstrap-border ${
                  state.lang === 'en'
                    ? 'bootstrap-border--en'
                    : 'bootstrap-border--ar'
                }`}
                placeholderText={t('build-profile:enterDate')}
                minDate={new Date()}
              />
              <Form.Check
                className={`${
                  state.lang === 'en'
                    ? 'form-check__label--en'
                    : 'form-check__label--ar'
                }`}
                label={t('build-profile:itIsNotDeterminedYet')}
                onChange={setNotDeterminedFlag}
                checked={isDateDetermined}
              />
              {error && (
                <span
                  className={`error-message ${
                    state.lang === 'en'
                      ? 'error-message--en'
                      : 'error-message--ar'
                  }`}
                >
                  {t('build-profile:dueDateErrorMessageFirstSection')}{' '}
                  <strong>
                    {t('build-profile:dueDateErrorMessageSecondSection')}
                  </strong>
                </span>
              )}
            </Form.Group>
            <div
              className={`when-special-day-wrapper__form__form-action ${
                state.lang === 'en'
                  ? 'when-special-day-wrapper__form__form-action--en'
                  : 'when-special-day-wrapper__form__form-action--ar'
              }`}
            >
              <Button onClick={handleNext}>
                {t('build-profile:next')}{' '}
                <img src={RightArrowIcon} alt="back" />
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
