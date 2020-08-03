import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import ThinkingFaceImage from '../../../assets/images/Thinking Face.svg';
import BrideImage from '../../../assets/images/bride (1).svg';
import GroomImage from '../../../assets/images/groom (1).svg';
import '../../../assets/styles/components/who-are-you.scss';
import { Store } from '../../../store/store';
import types from '../../../store/types';

export default function WhoAreYou({ onClickButton, setGender }) {
  const { t } = useTranslation(['build-profile']);
  const { state, dispatch } = useContext(Store);

  const setUserGender = function (gender) {
    dispatch({
      type: types.user.SET_USER_GENDER,
      payload: gender,
    });
    setGender(gender);
    onClickButton(2, { gender });
  };
  return (
    <div className="who-are-you-wrapper">
      <Row className="who-are-you-wrapper__title">
        <Col xs={12} className="text-center">
          <img
            className="who-are-you-wrapper__title__hero"
            src={ThinkingFaceImage}
            alt="thinking face"
          />
        </Col>
        <Col xs={12} className="text-center who-are-you-wrapper__title__text">
          <span
            className={`${
              state.lang === 'en'
                ? 'who-are-you-wrapper__title__text--en'
                : 'who-are-you-wrapper__title__text--ar'
            }`}
          >
            {t('build-profile:whoAreYou')}
          </span>
        </Col>
      </Row>
      <Row className="who-are-you-wrapper__choices">
        <Col xs={6}>
          <div
            className={`who-are-you-wrapper__choice ${
              state.userPersona.gender === 'Female'
                ? 'who-are-you-wrapper__choice--active'
                : ''
            } ${
              state.lang === 'en'
                ? 'who-are-you-wrapper__choice--en'
                : 'who-are-you-wrapper__choice--ar'
            }`}
            onClick={() => setUserGender('Female')}
          >
            <img src={BrideImage} alt="bride" />
            <span>{t('build-profile:bride')}</span>
          </div>
        </Col>
        <Col xs={6}>
          <div
            className={`who-are-you-wrapper__choice ${
              state.userPersona.gender === 'Male'
                ? 'who-are-you-wrapper__choice--active'
                : ''
            } ${
              state.lang === 'en'
                ? 'who-are-you-wrapper__choice--en'
                : 'who-are-you-wrapper__choice--ar'
            }`}
            onClick={() => setUserGender('Male')}
          >
            <img src={GroomImage} alt="groom" />
            <span>{t('build-profile:groom')}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
