import React, { Fragment, useState, useEffect, useContext } from 'react';
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Button,
  Breadcrumb,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../shared/Header';
import { Store } from '../../store/store';
import Spinner from '../shared/Spinner';
import arrayMove from 'array-move';
import SortableList from '../components/SortableList';
import SelectedTask from '../components/SelectedTask';
import TaskDetailsModal from '../components/TaskDetailsModal';
import Toast from '../shared/Toast';
import { categoriesActions } from '../../store/actions';
import { getChecklistCookie } from '../../helpers/CookieHelper';
import { isUserAuthenticated } from '../../helpers/UserAuthentication';
import * as USER from '../../constants/UserAuthentication';
import SideDrawer from '../components/SideDrawer';
import types from '../../store/types';
import '../../assets/styles/containers/home.scss';

export default function Home() {
  const { t } = useTranslation(['home']);
  const { state, dispatch } = useContext(Store);
  const history = useHistory();
  const [categoriesContent, setCategoryContent] = useState(
    state.categoriesData
  );
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [selectedTask, setSelectedTask] = useState(state.selectedTask);
  const [toastData, setToastData] = useState();

  const onSortEnd = async ({
    data,
    categoryId,
    categoryIdInDataArray,
    oldIndex,
    newIndex,
  }) => {
    const currentOrder = categoriesContent[categoryIdInDataArray].tasks.map(
      (task) => task.id
    );

    categoriesContent[categoryIdInDataArray].tasks = arrayMove(
      data,
      oldIndex,
      newIndex
    );
    setCategoryContent([...categoriesContent]);
    const newOrder = categoriesContent[categoryIdInDataArray].tasks.map(
      (task) => task.id
    );

    const payload = { categoryId, currentOrder, newOrder };
    await categoriesActions.orderTasks(payload);
  };

  const getChecklistId = function () {
    const checklistId = getChecklistCookie();
    dispatch({
      type: types.checklist.SET_CURRENT_CHECKLIST,
      payload: Number(checklistId),
    });
    return checklistId;
  };

  useEffect(() => {
    async function fetchCategories(checklistId) {
      await categoriesActions.fetchCategoriesData(dispatch, checklistId);
    }
    const checklistId = getChecklistId();

    if (!checklistId && isUserAuthenticated() === USER.AUTHENTICATED) {
      history.push('/sections');
    } else if (
      !checklistId &&
      isUserAuthenticated() === USER.PARTIAL_AUTHENTICATED
    )
      history.push('/build-profile');
    else if (isUserAuthenticated() === USER.NOT_AUTHENTICATED)
      history.push('/');
    else fetchCategories(checklistId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCategoryContent(state.categoriesData);
    if (state.categoriesData.length > 0)
      setActiveMenuItem(state.categoriesData[0].id);
  }, [state.categoriesData]);

  useEffect(() => {
    setSelectedTask(state.selectedTask);
  }, [state.selectedTask]);

  useEffect(() => {
    setToastData(state.toastData);
  }, [state.toastData]);

  const phoneAndTablet = window.matchMedia('(max-width:992px)');

  const openTaskDrawer = function () {
    dispatch({
      type: types.categories.SET_OPEN_TASK_FORM,
      payload: {
        flag: true,
        operation: 'create',
      },
    });
  };

  const renderContent = () => {
    if (!categoriesContent) return renderErrorHandlingView();
    else if (categoriesContent.length === 0) return <Spinner />;
    else return renderData();
  };

  const renderErrorHandlingView = function () {
    return (
      <Fragment>
        <Header activePath="home" />
        <div className="home-wrapper__error">
          <div>
            <p>
              <span role="img" aria-label="warning">
                ⚠️
              </span>{' '}
              {t('home:errorLoadingPage')}
            </p>
            <p>{t('home:errorLoadingPageAction')}</p>
          </div>
        </div>
      </Fragment>
    );
  };
  const renderData = function () {
    return (
      <Fragment>
        <Header activePath="home" />
        <hr />
        <div>
          <div className="breadcrumb-wrapper">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Checklist</Breadcrumb.Item>
              <Breadcrumb.Item active>Ceremony</Breadcrumb.Item>
            </Breadcrumb>
            <p>By category</p>
          </div>
          <hr />
        </div>
        <Container className="home-wrapper">
          <Row className="home-wrapper__content">
            <Col
              md={2}
              className="home-wrapper__content__menu d-sm-none d-md-block"
            >
              <h4
                className={`home-wrapper__content__menu__title ${
                  state.lang === 'en'
                    ? 'home-wrapper__content__menu__title--en'
                    : 'home-wrapper__content__menu__title--ar'
                }`}
              >
                {t('home:tasksCategories')}
              </h4>
              <ul
                className={`home-wrapper__content__menu__list ${
                  state.lang === 'en'
                    ? 'home-wrapper__content__menu__list--en'
                    : 'home-wrapper__content__menu__list--ar'
                }`}
              >
                {categoriesContent.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => {
                      document
                        .querySelector(
                          '#' + category.title.replace(/ |&/g, '_')
                        )
                        .scrollIntoView();
                      setActiveMenuItem(category.id);
                    }}
                    className={`${
                      activeMenuItem === category.id ? 'active' : ''
                    } ${state.lang === 'en' ? 'active--en' : 'active--ar'}`}
                  >
                    {category.title}
                  </li>
                ))}
              </ul>
            </Col>
            <Col sm={12} md={6} className="home-wrapper__content__tasks">
              <Row className="home-wrapper__content__tasks__header">
                <Col>
                  <h4
                    className={`home-wrapper__content__tasks__title ${
                      state.lang === 'en'
                        ? 'home-wrapper__content__tasks__title--en'
                        : 'home-wrapper__content__tasks__title--ar'
                    }`}
                  >
                    {categoriesContent[0].checklist.title}
                  </h4>
                </Col>
                <Col>
                  <Button
                    className={`d-block ml-auto home-wrapper__content__tasks__cta ${
                      state.lang === 'en'
                        ? 'home-wrapper__content__tasks__cta--en'
                        : 'home-wrapper__content__tasks__cta--ar'
                    }`}
                    onClick={openTaskDrawer}
                  >
                    {t('home:addTaskCTA')}
                  </Button>
                </Col>
              </Row>
              <Row className="home-wrapper__content__tasks__progress">
                <Col
                  className={`home-wrapper__content__tasks__progress-title ${
                    state.lang === 'en'
                      ? 'home-wrapper__content__tasks__progress-title--en'
                      : 'home-wrapper__content__tasks__progress-title--ar'
                  }`}
                >
                  <h6>{t('home:progress')}</h6>
                </Col>
                <Col
                  className={`home-wrapper__content__tasks__progress-title ${
                    state.lang === 'en' ? 'text-right' : 'text-left'
                  } ${
                    state.lang === 'en'
                      ? 'home-wrapper__content__tasks__progress-title--en'
                      : 'home-wrapper__content__tasks__progress-title--ar'
                  }`}
                >
                  <h6>0 / 60 {t('home:progressTasks')}</h6>
                </Col>
              </Row>
              <ProgressBar
                now={0}
                className={`${
                  state.lang === 'en'
                    ? 'progress--en progress-bar--en'
                    : 'progress--ar progress-bar--ar'
                }`}
              />
              <div
                id="myContainer"
                className="home-wrapper__content__tasks__details"
              >
                {categoriesContent.map((category, index) => (
                  <div key={category.id}>
                    <h4
                      id={category.title.replace(/ |&/g, '_')}
                      className={`home-wrapper__content__tasks__details__title ${
                        state.lang === 'en'
                          ? 'home-wrapper__content__tasks__details__title--en'
                          : 'home-wrapper__content__tasks__details__title--ar'
                      }`}
                    >
                      {category.title}
                    </h4>
                    <SortableList
                      distance={1}
                      item={category}
                      onSortEnd={(props) =>
                        onSortEnd({
                          ...props,
                          data: category.tasks,
                          categoryId: Number(category.id),
                          categoryIdInDataArray: index,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </Col>
            <Col
              md={4}
              className="d-sm-none d-md-block home-wrapper__content__operations"
            >
              {Object.keys(selectedTask).length === 0 ? (
                <div className="home-wrapper__content__placeholder">
                  <h2>{t('home:taskDetails')}</h2>
                </div>
              ) : (
                <SelectedTask selectedTask={selectedTask} />
              )}
            </Col>
          </Row>
        </Container>
        {phoneAndTablet.matches ? <TaskDetailsModal /> : null}
        <SideDrawer />
        <Toast {...toastData} />
      </Fragment>
    );
  };
  return (
    <div style={{ direction: state.lang === 'en' ? 'ltr' : 'rtl' }}>
      {renderContent()}
    </div>
  );
}
