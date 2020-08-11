import React, { useEffect, useState, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Header from '../shared/Header';
import { Store } from '../../store/store';
import types from '../../store/types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  getUserTokenCookie,
  getUserDataCookie,
  setUserDataCookie,
} from '../../helpers/CookieHelper';
import { userActions } from '../../store/actions';
import ChangePasswordModal from '../components/profile/ChangePasswordModal';
import ReloginModal from '../components/profile/ReloginModal';
import Loading from '../shared/Loading';
import Toast from '../shared/Toast';
import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/styles/containers/profile.scss';

export default function Landing() {
  const budgets = [
    { key: '20,000', value: 20000 },
    { key: '50,000', value: 50000 },
    { key: '100,000', value: 100000 },
    { key: '200,000', value: 200000 },
    { key: '300,000', value: 300000 },
  ];
  const { t } = useTranslation(['profile']);
  const { state, dispatch } = useContext(Store);
  const [isIdentifierExistsFlag, setIsIdentifierExistsFlag] = useState(false);

  const userTokenInCookie = getUserTokenCookie();
  const userDataInCookie = getUserDataCookie();

  const loggedInUser =
    userTokenInCookie === undefined || userDataInCookie === undefined;

  const userLoggedInFromSocialMedia =
    userDataInCookie.facebookId || userDataInCookie.googleId;

  const profileData = { ...userDataInCookie };

  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      ...userDataInCookie,
    },
  });
  const [toastData, setToastData] = useState();
  const [dueDate, setDueDate] = useState(
    !loggedInUser && new Date(userDataInCookie.marriageDate)
  );
  const [gender, setGender] = useState(profileData.gender);
  const [prepCost, setPrepCost] = useState(profileData.prepCost);

  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (loggedInUser) history.push('/landing');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setToastData(state.toastData);
  }, [state.toastData]);

  const validateIdentifier = function (value) {
    setIsIdentifierExistsFlag(false);

    const emailRegEx = /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/;
    // const mobileRegEx = /^\d{11}$/;
    // return emailRegEx.test(value) || mobileRegEx.test(value);
    return emailRegEx.test(value);
  };
  const showChangePasswordModal = function () {
    dispatch({
      type: types.user.SET_SHOW_CHANGE_PASSWORD_MODAL,
      payload: true,
    });
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      gender,
      prepCost: Number(prepCost),
      marriageDate: dueDate,
    };
    setShowLoadingSpinner(true);
    const result = await userActions.isUserExists(payload.email);
    setShowLoadingSpinner(false);

    if (result === undefined)
      dispatch({
        type: types.categories.SET_TOAST_DATA,
        payload: {
          show: true,
          text: t('profile:unexpectedUpdateError'),
          status: 'error',
        },
      });
    else if (result) {
      setIsIdentifierExistsFlag(true);
    } else {
      setIsIdentifierExistsFlag(false);
      delete payload.email;
      const result = await userActions.updateUser(dispatch, payload);
      if (!result.isErrorExists) {
        setUserDataCookie(result.data);
        setIsEditMode(false);
        dispatch({
          type: types.categories.SET_TOAST_DATA,
          payload: {
            show: true,
            text: t('profile:profileUpdatedSuccessfully'),
            status: 'success',
          },
        });
      } else
        dispatch({
          type: types.categories.SET_TOAST_DATA,
          payload: {
            show: true,
            text: t('profile:existingIdentifier'),
            status: 'error',
          },
        });
    }
  };

  const renderHeaderButtons = function () {
    if (isEditMode)
      return (
        <>
          <Button onClick={() => setIsEditMode(false)}>
            {t('profile:cancelEdit')}
          </Button>
          <Button type="submit">{t('profile:saveEdit')}</Button>
        </>
      );
    return (
      <Button onClick={() => setIsEditMode(true)}>{t('profile:edit')}</Button>
    );
  };

  return (
    <div style={{ direction: state.lang === 'en' ? 'ltr' : 'rtl' }}>
      <Header activePath />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`profile-wrapper ${
            state.lang === 'en' ? 'profile-wrapper--en' : 'profile-wrapper--ar'
          }`}
        >
          <Row className="profile-wrapper__content__header">
            <Col
              className={`d-flex justify-content-left align-items-center profile-wrapper__content__header-title ${
                state.lang === 'en'
                  ? 'profile-wrapper__content__header-title--en'
                  : 'profile-wrapper__content__header-title--ar'
              }`}
              sm={4}
              xs={5}
            >
              {t('profile:title')}
            </Col>
            <Col
              className={`d-flex align-items-center profile-wrapper__content__header__cta ${
                state.lang === 'en'
                  ? 'profile-wrapper__content__header__cta--en'
                  : 'profile-wrapper__content__header__cta--ar'
              }`}
              sm={8}
              xs={7}
            >
              {renderHeaderButtons()}
            </Col>
          </Row>
          <div className="profile-wrapper__divider"></div>

          <Form.Group
            controlId="name"
            className={`${
              state.lang === 'en' ? 'form-group--en' : 'form-group--ar'
            }`}
          >
            <Form.Label
              className={`form-label-name ${
                state.lang === 'en' ? 'form-label--en' : 'form-label--ar'
              }`}
            >
              {t('profile:name')}
            </Form.Label>
            <Form.Control
              disabled={!isEditMode}
              type="text"
              placeholder={t('profile:enterYourNamePlaceholder')}
              name="name"
              ref={register({ required: true, maxLength: 80 })}
              className={`${
                state.lang === 'en' ? 'form-control--en' : 'form-control--ar'
              }`}
            />
            {errors.name && (
              <span
                className={`error-message ${
                  state.lang === 'en'
                    ? 'error-message--en'
                    : 'error-message--ar'
                }`}
              >
                {t('profile:invalidName')}
              </span>
            )}
          </Form.Group>
          <Form.Group
            controlId="email"
            className={`${
              state.lang === 'en' ? 'form-group--en' : 'form-group--ar'
            }`}
          >
            <Form.Label
              className={`form-label-email ${
                state.lang === 'en' ? 'form-label--en' : 'form-label--ar'
              }`}
            >
              {t('profile:email')}
            </Form.Label>
            <Form.Control
              disabled
              type="text"
              placeholder={t('profile:emailPlaceholder')}
              name="email"
              ref={register({ required: true, validate: validateIdentifier })}
              className={`${
                state.lang === 'en' ? 'form-control--en' : 'form-control--ar'
              }`}
            />
            {errors.email && (
              <span
                className={`error-message ${
                  state.lang === 'en'
                    ? 'error-message--en'
                    : 'error-message--ar'
                }`}
              >
                {t('profile:invalidEmail')}
              </span>
            )}
            {isIdentifierExistsFlag && (
              <span
                className={`error-message ${
                  state.lang === 'en'
                    ? 'error-message--en'
                    : 'error-message--ar'
                }`}
              >
                {t('auth:existingIdentifier')}
              </span>
            )}
          </Form.Group>
          <Form.Group
            controlId="gender"
            className={`${
              state.lang === 'en' ? 'form-group--en' : 'form-group--ar'
            }`}
          >
            <Form.Label
              className={`form-label ${
                state.lang === 'en' ? 'form-label--en' : 'form-label--ar'
              }`}
            >
              {t('profile:gender')}
            </Form.Label>
            <Form.Control
              disabled={!isEditMode}
              as="select"
              name="gender"
              defaultValue={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              className={`${
                state.lang === 'en' ? 'form-control--en' : 'form-control--ar'
              }`}
            >
              <option value="Male">{t('profile:groom')}</option>
              <option value="Female">{t('profile:bride')}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            controlId="spouseName"
            className={`${
              state.lang === 'en' ? 'form-group--en' : 'form-group--ar'
            }`}
          >
            <Form.Label
              className={`form-label ${
                state.lang === 'en' ? 'form-label--en' : 'form-label--ar'
              }`}
            >
              {t('profile:spouseName')}
            </Form.Label>
            <Form.Control
              disabled={!isEditMode}
              type="text"
              placeholder={t('profile:enterSpouseNamePlaceholder')}
              name="spouseName"
              ref={register({ maxLength: 80 })}
              className={`${
                state.lang === 'en' ? 'form-control--en' : 'form-control--ar'
              }`}
            />
          </Form.Group>

          <Form.Group
            style={{ marginBottom: '8px' }}
            className={`${
              state.lang === 'en' ? 'form-group--en' : 'form-group--ar'
            }`}
          >
            <Form.Label
              className={`${
                state.lang === 'en' ? 'form-label--en' : 'form-label--ar'
              }`}
            >
              {t('profile:dueDate')}
            </Form.Label>
            <DatePicker
              disabled={!isEditMode}
              dateFormat="dd/MM/yyyy"
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className={`bootstrap-border ${
                state.lang === 'en'
                  ? 'bootstrap-border--en'
                  : 'bootstrap-border--ar'
              }`}
              placeholderText={t('profile:enterDatePlaceholder')}
              minDate={new Date()}
            />
          </Form.Group>

          <Form.Group
            controlId="budget"
            className={`${
              state.lang === 'en' ? 'form-group--en' : 'form-group--ar'
            }`}
          >
            <Form.Label
              className={`form-label ${
                state.lang === 'en' ? 'form-label--en' : 'form-label--ar'
              }`}
            >
              {t('profile:budget')}
            </Form.Label>
            <Form.Control
              disabled={!isEditMode}
              as="select"
              name="prepCost"
              defaultValue={prepCost}
              onChange={(e) => {
                setPrepCost(e.target.value);
              }}
              className={`${
                state.lang === 'en' ? 'form-control--en' : 'form-control--ar'
              }`}
            >
              {budgets.map((budget) => (
                <option key={budget.key} value={budget.value}>
                  {t('profile:moreThan')} {budget.value} {t('profile:egp')}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <div
            className={`profile-wrapper__content__header mt-4 ${
              userLoggedInFromSocialMedia ? 'd-none' : ''
            }`}
          >
            <Row className="profile-wrapper__content__header mt-4">
              <Col
                className={`d-flex justify-content-left align-items-center profile-wrapper__content__header-title ${
                  state.lang === 'en'
                    ? 'profile-wrapper__content__header-title--en'
                    : 'profile-wrapper__content__header-title--ar'
                }`}
                sm={4}
                xs={5}
              >
                {t('profile:privacyTitle')}
              </Col>
              <Col
                className={`d-flex align-items-center profile-wrapper__content__header__cta ${
                  state.lang === 'en'
                    ? 'profile-wrapper__content__header__cta--en'
                    : 'profile-wrapper__content__header__cta--ar'
                }`}
                sm={8}
                xs={7}
              >
                {isEditMode ? (
                  <Button onClick={showChangePasswordModal}>
                    {t('profile:changePasswordTitle')}
                  </Button>
                ) : null}
              </Col>
            </Row>
            <div className="profile-wrapper__divider"></div>
            <Form.Group
              controlId="password"
              className={`${
                state.lang === 'en' ? 'form-group--en' : 'form-group--ar'
              }`}
            >
              <Form.Label
                className={`form-label ${
                  state.lang === 'en' ? 'form-label--en' : 'form-label--ar'
                }`}
              >
                {t('profile:password')}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={t('profile:passwordPlaceholder')}
                className={`${
                  state.lang === 'en' ? 'form-control--en' : 'form-control--ar'
                }`}
                value="passwordPassword"
                disabled
              />
            </Form.Group>
          </div>
        </div>
      </Form>
      <ChangePasswordModal setShowLoadingSpinner={setShowLoadingSpinner} />
      <ReloginModal />
      <Loading
        loader="full-screen"
        showLoadingSpinner={showLoadingSpinner}
        lang={state.lang}
      />
      <Toast {...toastData} />
    </div>
  );
}
