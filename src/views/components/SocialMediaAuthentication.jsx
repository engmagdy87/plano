import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import FacebookLogo from '../../assets/images/facebook.png';
import GoogleLogo from '../../assets/images/google-plus.png';

export default function SocialMediaAuthentication() {
  const { t } = useTranslation(['auth']);
  return (
    <Row>
      <Col sm={12} md={6}>
        <div className="authentication-form-wrapper__social-media authentication-form-wrapper__social-media--facebook">
          <div>
            <img src={FacebookLogo} alt="facebook logo" />
          </div>
          <span>{t('auth:facebook')}</span>
        </div>
      </Col>
      <Col sm={12} md={6}>
        <div className="authentication-form-wrapper__social-media authentication-form-wrapper__social-media--google">
          <div>
            <img src={GoogleLogo} alt="google logo" />
          </div>
          <span>{t('auth:google')}</span>
        </div>
      </Col>
    </Row>
  );
}
