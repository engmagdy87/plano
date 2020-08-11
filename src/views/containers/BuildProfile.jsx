import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { userActions } from '../../store/actions';
import {
  setUserDataCookie,
  getUserDataCookie,
} from '../../helpers/CookieHelper';
import { isUserAuthenticated } from '../../helpers/UserAuthentication';
import getRegistrationStep from '../../helpers/RegistrationStepIdentifier';
import * as USER from '../../constants/UserAuthentication';
import { Store } from '../../store/store';
import types from '../../store/types';
import Header from '../shared/Header';
import WhoAreYou from '../components/buildProfileSlides/WhoAreYou';
import WhatIsYourName from '../components/buildProfileSlides/WhatIsYourName';
import WhoIsLuckySpouse from '../components/buildProfileSlides/WhoIsLuckySpouse';
import WhenSpecialDay from '../components/buildProfileSlides/WhenSpecialDay';
import WeddingBudget from '../components/buildProfileSlides/WeddingBudget';
import Spinner from '../shared/Spinner';
import LeftArrowIcon from '../../assets/images/left-arrow.svg';
import '../../assets/styles/containers/build-profile.scss';

export default function BuildProfile() {
  const { t } = useTranslation(['build-profile']);
  const { state, dispatch } = useContext(Store);
  const userData = getUserDataCookie();
  const [slideId, setSlideId] = useState(1);
  const [data, setData] = useState(null);
  const [progressValue, setProgressValue] = useState(20);
  const [userGender, setUserGender] = useState('');
  const history = useHistory();
  const onClickButton = async function (id, data) {
    let result;
    if (data !== undefined) {
      result = await userActions.setupUserSteps(dispatch, data);
      setData(result);
    }

    setSlideId(id);
    setProgressValue(id * 20);
  };

  useEffect(() => {
    if (slideId === 6) {
      setTimeout(() => {
        setSlideId(7);
      }, 3000);
    }
    if (slideId === 7) {
      dispatch({
        type: types.user.SET_USER_SIGN_UP_FORM,
        payload: {
          ...data,
        },
      });

      setUserDataCookie(data);
      history.push('/sections');
      window.onpopstate = function () {
        history.go(1);
      };
    }
  }, [data, dispatch, history, slideId]);

  useEffect(() => {
    if (isUserAuthenticated() === USER.NOT_AUTHENTICATED) history.push('/');
    else if (isUserAuthenticated() === USER.AUTHENTICATED)
      history.push('/home');
    else if (isUserAuthenticated() === USER.PARTIAL_AUTHENTICATED) {
      dispatch({
        type: types.user.SET_USER_SIGN_UP_FORM,
        payload: {
          ...userData,
        },
      });

      const orderedNullSteps = getRegistrationStep(userData);

      setSlideId(
        orderedNullSteps.length !== 0 ? Number.parseInt(orderedNullSteps[0]) : 1
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSlide = function () {
    switch (slideId) {
      case 1:
        return (
          <WhoAreYou onClickButton={onClickButton} setGender={setUserGender} />
        );
      case 2:
        return <WhatIsYourName onClickButton={onClickButton} />;
      case 3:
        return (
          <WhoIsLuckySpouse
            onClickButton={onClickButton}
            userGender={userGender}
          />
        );
      case 4:
        return <WhenSpecialDay onClickButton={onClickButton} />;
      case 5:
        return <WeddingBudget onClickButton={onClickButton} />;

      default:
        return null;
    }
  };

  const renderPage = function () {
    if (slideId === 6)
      return (
        <Spinner
          lang={state.lang}
          text={t('build-profile:yourProfileIsBuilding')}
        />
      );
    else
      return (
        <Container className="build-profile-wrapper">
          <Row>
            <Col xs={12} className="build-profile-wrapper__progress">
              <span
                className={`${
                  state.lang === 'en'
                    ? 'build-profile-wrapper__progress__title--en'
                    : 'build-profile-wrapper__progress__title--ar'
                }`}
              >
                {t('build-profile:step')} {slideId} {t('build-profile:of')} 5{' '}
                {t('build-profile:buildYourProfile')}
              </span>
              {/* <span
                className={`build-profile-wrapper__progress__details ${
                  state.lang === 'en'
                    ? 'build-profile-wrapper__progress__details--en'
                    : 'build-profile-wrapper__progress__details--ar'
                }`}
              >
                {progressValue}%
              </span> */}
            </Col>
            <Col xs={{ span: 6, offset: 3 }}>
              <ProgressBar now={progressValue} />
            </Col>
          </Row>
          {renderSlide()}
          <Button
            variant="outline-primary"
            onClick={() => onClickButton(slideId - 1)}
            className={`${
              slideId === 1
                ? 'build-profile-wrapper__back-button--hide'
                : 'build-profile-wrapper__back-button--show'
            }
                ${
                  state.lang === 'en'
                    ? 'build-profile-wrapper__back-button--en'
                    : 'build-profile-wrapper__back-button--ar'
                }`}
          >
            <img src={LeftArrowIcon} alt="back" />
          </Button>
        </Container>
      );
  };

  return (
    <Fragment>
      <Header activePath="build-profile" />
      {renderPage()}
    </Fragment>
  );
}
