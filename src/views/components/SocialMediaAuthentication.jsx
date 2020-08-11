import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { userActions } from '../../store/actions';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import FacebookLogo from '../../assets/images/facebook.png';
import GoogleLogo from '../../assets/images/google-plus.png';
import { Store } from '../../store/store';
import {
  setUserTokenCookie,
  setUserDataCookie,
} from '../../helpers/CookieHelper';
import types from '../../store/types';
import { startStepForUserCompleteProfile } from '../../helpers/UserAuthentication';

export default function SocialMediaAuthentication({ setShowLoading }) {
  const { t } = useTranslation(['auth']);
  const { dispatch } = useContext(Store);
  const history = useHistory();
  const responseFacebook = async (response) => {
    const { email, id } = response;
    setShowLoading(true);
    try {
      const res = await userActions.userSignInWithFacebook(dispatch, {
        email,
        facebookId: id,
      });
      setShowLoading(false);
      const data = res.data.facebookAuth;
      setUserTokenCookie(data.token);
      setUserDataCookie(data.user);
      dispatch({
        type: types.user.SET_IS_USER_AUTH_FORM,
        payload: { show: false, authType: '' },
      });
      dispatch({
        type: types.user.SET_USER_SIGN_UP_FORM,
        payload: {
          ...data.user,
        },
      });
      const nullKeys = startStepForUserCompleteProfile(data.user, [
        'facebookId',
        'googleId',
      ]);

      if (nullKeys.length !== 0) history.push('/build-profile');
      else history.push('/sections');
    } catch (error) {
      setShowLoading(false);
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <Row>
      <Col sm={12} md={6}>
        <FacebookLogin
          appId="655297785195379" //APP ID NOT CREATED YET
          fields="email"
          callback={responseFacebook}
          disableMobileRedirect={true}
          render={(renderProps) => (
            <div
              className="authentication-form-wrapper__social-media authentication-form-wrapper__social-media--facebook"
              role="button"
              onClick={renderProps.onClick}
            >
              <div>
                <img src={FacebookLogo} alt="facebook logo" />
              </div>
              <span>{t('auth:facebook')}</span>
            </div>
          )}
        />
      </Col>
      <Col sm={12} md={6}>
        <div className="authentication-form-wrapper__social-media authentication-form-wrapper__social-media--google">
          <div>
            <img src={GoogleLogo} alt="google logo" />
          </div>
          <span>{t('auth:google')}</span>
        </div>
      </Col>
      {/* <GoogleLogin
        clientId="" //CLIENTID NOT CREATED YET
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      /> */}
    </Row>
  );
}
