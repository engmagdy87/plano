import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import ThinkingFaceImage from '../../../assets/images/Thinking Face.svg';
import BrideImage from '../../../assets/images/bride (1).svg';
import GroomImage from '../../../assets/images/groom (1).svg';
import '../../../assets/styles/components/who-are-you.scss';
import { Store } from '../../../store/store';
import types from '../../../store/types';

export default function WhoAreYou({ onClickButton }) {
  const { state, dispatch } = useContext(Store);

  const setUserGender = function (gender) {
    dispatch({
      type: types.user.SET_USER_GENDER,
      payload: gender,
    });
    onClickButton(2);
  };

  return (
    <div className="who-are-you-wrapper">
      <Row className="who-are-you-wrapper__title">
        <Col xs={12} className="text-center">
          <img src={ThinkingFaceImage} alt="thinking face" />
        </Col>
        <Col xs={12} className="text-center">
          <span>Who are you?</span>
        </Col>
      </Row>
      <Row className="who-are-you-wrapper__choices">
        <Col xs={6}>
          <div
            className={`who-are-you-wrapper__choice ${
              state.userPersona.gender === 'Female'
                ? 'who-are-you-wrapper__choice--active'
                : ''
            }`}
            onClick={() => setUserGender('Female')}
          >
            <img src={BrideImage} alt="bride" />
            <span>BRIDE</span>
          </div>
        </Col>
        <Col xs={6}>
          <div
            className={`who-are-you-wrapper__choice ${
              state.userPersona.gender === 'Male'
                ? 'who-are-you-wrapper__choice--active'
                : ''
            }`}
            onClick={() => setUserGender('Male')}
          >
            <img src={GroomImage} alt="groom" />
            <span>GROOM</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
