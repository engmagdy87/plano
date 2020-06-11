import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { categoriesActions } from '../../store/actions';
import { setUserCookie } from '../../helpers/CookieHelper';
import { Store } from '../../store/store';
import Header from '../shared/Header';
import WhoAreYou from '../components/buildProfileSlides/WhoAreYou';
import WhatIsYourName from '../components/buildProfileSlides/WhatIsYourName';
import WhoIsLuckySpouse from '../components/buildProfileSlides/WhoIsLuckySpouse';
import WhenSpecialDay from '../components/buildProfileSlides/WhenSpecialDay';
import WeddingBudget from '../components/buildProfileSlides/WeddingBudget';
import Spinner from '../shared/Spinner';
import '../../assets/styles/containers/build-profile.scss';

export default function BuildProfile() {
  const { t } = useTranslation(['build-profile']);
  const { state, dispatch } = useContext(Store);
  const [slideId, setSlideId] = useState(1);
  const [progressValue, setProgressValue] = useState(20);
  const [userGender, setUserGender] = useState('');
  const history = useHistory();
  const onClickButton = function (id) {
    setSlideId(id);
    setProgressValue(id * 20);
  };

  useEffect(() => {
    if (state.userPersona.identifier === '') history.push('/');
  });

  useEffect(() => {
    async function createUser() {
      const response = await categoriesActions.createNewUser(
        dispatch,
        state.userPersona
      );
      setUserCookie(response.token, response.user.name);
      history.push('/sections');
      window.onpopstate = function () {
        history.go(1);
      };
    }
    if (slideId === 6) {
      if (state.userPersona.marriageDate === null)
        delete state.userPersona.marriageDate;

      createUser();
    }
  }, [dispatch, history, slideId, state.userPersona]);

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
                {t('build-profile:buildYourProfile')}
              </span>
              <span
                className={`build-profile-wrapper__progress__details ${
                  state.lang === 'en'
                    ? 'build-profile-wrapper__progress__details--en'
                    : 'build-profile-wrapper__progress__details--ar'
                }`}
              >
                {progressValue}%
              </span>
            </Col>
            <Col xs={12}>
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
            {t('build-profile:back')}
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
