import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { registerUser } from '../../helpers/APIsHelper';
import { setUserCookie } from '../../helpers/CookieHelper';
import Header from '../shared/Header';
import WhoAreYou from '../components/buildProfileSlides/WhoAreYou';
import WhatIsYourName from '../components/buildProfileSlides/WhatIsYourName';
import WhoIsLuckySpouse from '../components/buildProfileSlides/WhoIsLuckySpouse';
import WhenSpecialDay from '../components/buildProfileSlides/WhenSpecialDay';
import WeddingBudget from '../components/buildProfileSlides/WeddingBudget';
import Spinner from '../shared/Spinner';
import '../../assets/styles/containers/build-profile.scss';
import { Store } from '../../store/store';
import types from '../../store/types';

export default function BuildProfile() {
  const { state, dispatch } = useContext(Store);
  const [slideId, setSlideId] = useState(1);
  const [progressValue, setProgressValue] = useState(20);
  const history = useHistory();
  const onClickButton = function (id) {
    setSlideId(id);
    setProgressValue(id * 20);
  };

  useEffect(() => {
    if (state.userPersona.identifier === '') history.push('/');
  });

  useEffect(() => {
    if (slideId === 6) {
      if (state.userPersona.marriageDate === null)
        delete state.userPersona.marriageDate;
      registerUser(state.userPersona)
        .then((res) => {
          const data = res.data.register;
          setUserCookie(data.token, data.user.name);
          history.push('/sections');
          window.onpopstate = function (event) {
            history.go(1);
          };
        })
        .catch(() => {
          dispatch({
            type: types.categories.SET_TOAST_DATA,
            payload: {
              show: true,
              text: 'Unexpected error when register user, Please try again!',
              status: 'error',
            },
          });
        });
    }
  }, [dispatch, history, slideId, state.userPersona]);

  const renderSlide = function () {
    switch (slideId) {
      case 1:
        return <WhoAreYou onClickButton={onClickButton} />;
      case 2:
        return <WhatIsYourName onClickButton={onClickButton} />;
      case 3:
        return <WhoIsLuckySpouse onClickButton={onClickButton} />;
      case 4:
        return <WhenSpecialDay onClickButton={onClickButton} />;
      case 5:
        return <WeddingBudget onClickButton={onClickButton} />;

      default:
        return null;
    }
  };

  const renderPage = function () {
    if (slideId === 6) return <Spinner text="Your profile is building..." />;
    else
      return (
        <Container className="build-profile-wrapper">
          <Row>
            <Col xs={12} className="build-profile-wrapper__progress">
              <span>Build you profile</span>
              <span className="text-right">{progressValue}%</span>
            </Col>
            <Col xs={12}>
              <ProgressBar now={progressValue} />
            </Col>
          </Row>
          {renderSlide()}
          <Button
            variant="outline-primary"
            onClick={() => onClickButton(slideId - 1)}
            className={
              slideId === 1
                ? 'build-profile-wrapper__back-button--hide'
                : 'build-profile-wrapper__back-button--show'
            }
          >
            Back
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
