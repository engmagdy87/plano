import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Form, Button } from 'react-bootstrap';
import RingsImage from '../../../assets/images/rings.svg';
import '../../../assets/styles/components/lucky-spouse.scss';
import { Store } from '../../../store/store';
import types from '../../../store/types';
import { useForm } from 'react-hook-form';
import RightArrowIcon from '../../../assets/images/right-arrow.svg';

export default function WhoIsLuckySpouse({ onClickButton, userGender }) {
  const { t } = useTranslation(['build-profile']);
  const { state, dispatch } = useContext(Store);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    dispatch({
      type: types.user.SET_USER_SPOUSE_NAME,
      payload: data.spouseName,
    });
    onClickButton(4, { spouseName: data.spouseName });
  };
  return (
    <div className="lucky-spouse-wrapper">
      <Row className="lucky-spouse-wrapper__title">
        <Col xs={12} className="text-center">
          <img
            className="lucky-spouse-wrapper__title__hero"
            src={RingsImage}
            alt="waving hand"
          />
        </Col>
        <Col xs={12} className="text-center lucky-spouse-wrapper__title__text">
          <span
            className={`${
              state.lang === 'en'
                ? 'lucky-spouse-wrapper__title__text--en'
                : 'lucky-spouse-wrapper__title__text--ar'
            }`}
          >
            {userGender === 'Female'
              ? t('build-profile:whoIsYourLuckySpouseMale')
              : t('build-profile:whoIsYourLuckySpouseFemale')}
          </span>
        </Col>
      </Row>
      <Row className="lucky-spouse-wrapper__form">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label
                className={`${
                  state.lang === 'en'
                    ? 'lucky-spouse-wrapper__form__label--en'
                    : 'lucky-spouse-wrapper__form__label--ar'
                }`}
              >
                {t('build-profile:enterName')}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={t('build-profile:enterYourNamePlaceholder')}
                defaultValue={state.userPersona.spouseName}
                name="spouseName"
                ref={register({ required: true })}
                className={`${
                  state.lang === 'en'
                    ? 'lucky-spouse-wrapper__form__control--en'
                    : 'lucky-spouse-wrapper__form__control--ar'
                }`}
              />
              {errors.spouseName && (
                <span
                  className={`error-message ${
                    state.lang === 'en'
                      ? 'error-message--en'
                      : 'error-message--ar'
                  }`}
                >
                  {t('build-profile:invalidSpouseName')}
                </span>
              )}
            </Form.Group>
            <div
              className={`lucky-spouse-wrapper__form__form-action ${
                state.lang === 'en'
                  ? 'lucky-spouse-wrapper__form__form-action--en'
                  : 'lucky-spouse-wrapper__form__form-action--ar'
              }`}
            >
              <Button type="submit">
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
