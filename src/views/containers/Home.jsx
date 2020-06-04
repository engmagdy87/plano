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
import Header from '../shared/Header';
import { Store } from '../../store/store';
import Spinner from '../shared/Spinner';
import arrayMove from 'array-move';
import SortableList from '../components/SortableList';
import SelectedTask from '../components/SelectedTask';
import TaskDetailsModal from '../components/TaskDetailsModal';
import Toast from '../shared/Toast';
import { categoriesActions } from '../../store/actions';
import { getChecklistCookie, getUserCookie } from '../../helpers/CookieHelper';
import SideDrawer from '../shared/SideDrawer';
import types from '../../store/types';
import '../../assets/styles/containers/home.scss';

export default function Home() {
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
    const checklistId = getChecklistId();
    const token = getUserCookie();

    if (!checklistId && token) history.push('/sections');
    if (!checklistId && !token) history.push('/');

    async function fetchCategories(checklistId) {
      await categoriesActions.fetchCategoriesData(dispatch, checklistId);
    }
    fetchCategories(checklistId);
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
              Oops! Something went wrong!
            </p>
            <p>Please try again</p>
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
              <h4>Tasks Categories</h4>
              <ul>
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
                    className={activeMenuItem === category.id ? 'active' : ''}
                  >
                    {category.title}
                  </li>
                ))}
              </ul>
            </Col>
            <Col sm={12} md={6} className="home-wrapper__content__tasks">
              <Row className="home-wrapper__content__tasks__header">
                <Col>
                  <h4>{categoriesContent[0].checklist.title}</h4>
                </Col>
                <Col>
                  <Button className="d-block ml-auto" onClick={openTaskDrawer}>
                    Add Task
                  </Button>
                </Col>
              </Row>
              <Row className="home-wrapper__content__tasks__progress">
                <Col>
                  <h6>Progress</h6>
                </Col>
                <Col className="text-right">
                  <h6>0 / 60 Tasks</h6>
                </Col>
              </Row>
              <ProgressBar now={0} />
              <div
                id="myContainer"
                className="home-wrapper__content__tasks__details"
              >
                {categoriesContent.map((category, index) => (
                  <div key={category.id}>
                    <h4 id={category.title.replace(/ |&/g, '_')}>
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
                  <h2>Task Details</h2>
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
  return <Fragment>{renderContent()}</Fragment>;
}
