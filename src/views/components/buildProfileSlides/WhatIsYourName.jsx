import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Form, Button } from 'react-bootstrap';
import WavingHandImage from '../../../assets/images/waving-hand.svg';
import '../../../assets/styles/components/what-is-your-name.scss';
import { Store } from '../../../store/store';
import types from '../../../store/types';
import { useForm } from 'react-hook-form';

export default function WhatIsYourName({ onClickButton }) {
  const { t } = useTranslation(['build-profile']);
  const { state, dispatch } = useContext(Store);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    dispatch({
      type: types.user.SET_USER_NAME,
      payload: data.name,
    });
    onClickButton(3, { name: data.name });
  };

  return (
    <div className="what-is-your-name-wrapper">
      <Row className="what-is-your-name-wrapper__title">
        <Col xs={12} className="text-center">
          <img
            className="what-is-your-name-wrapper__title__hero"
            src={WavingHandImage}
            alt="waving hand"
          />
        </Col>
        <Col
          xs={12}
          className="text-center what-is-your-name-wrapper__title__text"
        >
          <span
            className={`${
              state.lang === 'en'
                ? 'what-is-your-name-wrapper__title__text--en'
                : 'what-is-your-name-wrapper__title__text--ar'
            }`}
          >
            {t('build-profile:whatIsYourName')}
          </span>
        </Col>
      </Row>
      <Row className="what-is-your-name-wrapper__form">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label
                className={`${
                  state.lang === 'en'
                    ? 'what-is-your-name-wrapper__form__label--en'
                    : 'what-is-your-name-wrapper__form__label--ar'
                }`}
              >
                {t('build-profile:enterYourName')}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={t('build-profile:enterYourNamePlaceholder')}
                defaultValue={state.userPersona.name}
                name="name"
                ref={register({ required: true })}
                className={`${
                  state.lang === 'en'
                    ? 'what-is-your-name-wrapper__form__control--en'
                    : 'what-is-your-name-wrapper__form__control--ar'
                }`}
              />
              {errors.name && (
                <span
                  className={`error-message ${
                    state.lang === 'en'
                      ? 'error-message--en'
                      : 'error-message--ar'
                  }`}
                >
                  {t('build-profile:invalidName')}
                </span>
              )}
            </Form.Group>
            <div
              className={`what-is-your-name-wrapper__form__form-action ${
                state.lang === 'en'
                  ? 'what-is-your-name-wrapper__form__form-action--en'
                  : 'what-is-your-name-wrapper__form__form-action--ar'
              }`}
            >
              <Button type="submit">{t('build-profile:next')}</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
