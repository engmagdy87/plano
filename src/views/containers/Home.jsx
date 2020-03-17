import React, { Fragment, useState, useEffect, useContext } from 'react';
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Button,
  Breadcrumb
} from 'react-bootstrap';
import Header from '../shared/Header';
import { Store } from '../../store/store';
import arrayMove from 'array-move';
import SortableList from '../components/SortableList';
import SelectedTask from '../components/SelectedTask';
import TaskDetailsModal from '../components/TaskDetailsModal';
import { checklistAction } from '../../store/actions';
import '../../assets/styles/containers/home.scss';

export default function Home() {
  const { state, dispatch } = useContext(Store);
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [items, setItems] = useState(state.checklistData);
  const [selectedTask, setSelectedTask] = useState(state.selectedTask);

  const onSortEnd = ({ data, targetId, oldIndex, newIndex }) => {
    items[targetId].checklist = arrayMove(data, oldIndex, newIndex);
    setItems([...items]);
  };

  useEffect(() => {
    async function fetchChecklistData() {
      await checklistAction.fetchChecklistData(dispatch);
    }
    fetchChecklistData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setItems(state.checklistData);
  }, [state.checklistData]);
  useEffect(() => {
    setSelectedTask(state.selectedTask);
  }, [state.selectedTask]);

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
            <ul>
              {items.map(item => (
                <li
                  key={item.id}
                  onClick={() => {
                    document
                      .querySelector('#' + item.text.replace(/ |&/g, '_'))
                      .scrollIntoView();
                    setActiveMenuItem(item.id);
                  }}
                  className={activeMenuItem === item.id ? 'active' : ''}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </Col>
          <Col
            sm={12}
            md={6}
            className="pl-md-5 pr-md-5 home-wrapper__content__tasks"
          >
            <Row className="mb-4 mb-md-5">
              <Col>
                <h4>Wedding Ceremony</h4>
              </Col>
              <Col>
                <Button className="d-block ml-auto">New Task</Button>
              </Col>
            </Row>
            <Row>
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
              {items.map(item => (
                <div key={item.id}>
                  <h3 id={item.text.replace(/ |&/g, '_')}>{item.text}</h3>
                  <SortableList
                    distance={1}
                    item={item}
                    onSortEnd={props =>
                      onSortEnd({
                        ...props,
                        data: item.checklist,
                        targetId: item.id
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
      <TaskDetailsModal />
    </Fragment>
  );
}
