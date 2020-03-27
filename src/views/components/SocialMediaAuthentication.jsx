import React from 'react';
import { Row, Col } from 'react-bootstrap';
import FacebookLogo from '../../assets/images/facebook.png';
import GoogleLogo from '../../assets/images/google-plus.png';

export default function SocialMediaAuthentication() {
  return (
    <Row>
      <Col sm={12}>
        <div className="authentication-form-wrapper__social-media authentication-form-wrapper__social-media--facebook">
          <div>
            <img src={FacebookLogo} alt="facebook logo" />
          </div>
          <span>Facebook</span>
        </div>
      </Col>
      <Col sm={12}>
        <div className="authentication-form-wrapper__social-media authentication-form-wrapper__social-media--google">
          <div>
            <img src={GoogleLogo} alt="google logo" />
          </div>
          <span>Google</span>
        </div>
      </Col>
    </Row>
  );
}
