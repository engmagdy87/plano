import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ThinkingFaceImage from '../../../assets/images/Thinking Face.svg';
import BrideImage from '../../../assets/images/bride (1).svg';
import GroomImage from '../../../assets/images/groom (1).svg';
import '../../../assets/styles/components/who-are-you.scss';

export default function WhoAreYou({ onClickButton }) {
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
            className="who-are-you-wrapper__choice"
            onClick={() => onClickButton(2)}
          >
            <img src={BrideImage} alt="bride" />
            <span>BRIDE</span>
          </div>
        </Col>
        <Col xs={6}>
          <div className="who-are-you-wrapper__choice">
            <img src={GroomImage} alt="groom" />
            <span>GROOM</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
