import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  useRef,
} from 'react';
import '../../assets/styles/shared/side-drawer.scss';
import { Store } from '../../store/store';
import types from '../../store/types';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MENU_ITEMS from '../../assets/data/menu-items.json';

export default function SideDrawer() {
  const { state, dispatch } = useContext(Store);
  const [taskDrawer, setTaskDrawer] = useState({ flag: false, operation: '' });
  const [selectedTask, setSelectedTask] = useState({
    text: '',
    tag: '',
    cost: undefined,
    due_date: '',
    completed: false,
  });
  const [startDate, setStartDate] = useState('');
  let sideDrawerWrapper = useRef();

  const closeTaskDrawer = function () {
    dispatch({
      type: types.checklist.SET_OPEN_TASK_FORM,
      payload: {
        flag: false,
        operation: state.taskForm.operation,
      },
    });
    const phoneAndTablet = window.matchMedia('(max-width:992px)');
    if (!phoneAndTablet.matches) {
      dispatch({
        type: types.checklist.RESET_SELECTED_TASK,
      });
      setStartDate('');
      setTaskDrawer({ flag: false, operation: '' });
      setSelectedTask({
        text: '',
        tag: '',
        cost: undefined,
        due_date: '',
        completed: false,
      });
    }
    sideDrawerWrapper.current.scrollTop = 0;
  };
  const saveData = function () {
    const { operation } = taskDrawer;
    closeTaskDrawer();

    dispatch({
      type: types.checklist.SET_OPEN_TASK_FORM,
      payload: {
        flag: false,
        operation: state.taskForm.operation,
      },
    });
    dispatch({
      type: types.checklist.SET_TOAST_DATA,
      payload: {
        show: true,
        text:
          operation === 'edit'
            ? 'This task has Updated successfully'
            : 'This task has created successfully',
      },
    });
  };

  useEffect(() => {
    setTaskDrawer(state.taskForm);
    if (taskDrawer.operation === 'edit' && taskDrawer.flag) {
      setSelectedTask(state.selectedTask.data);
      const date = state.selectedTask.data.due_date;
      setStartDate(
        date === '' ? '' : new Date(state.selectedTask.data.due_date)
      );
    }
  }, [selectedTask, state.selectedTask, state.taskForm, taskDrawer]);

  const { flag, operation } = taskDrawer;
  return (
    <Fragment>
      <Container
        className={`side-drawer-wrapper ${
          flag ? 'side-drawer-wrapper--open' : 'side-drawer-wrapper--close'
        }`}
      >
        <div
          ref={sideDrawerWrapper}
          className={`side-drawer-wrapper__content ${
            flag
              ? 'side-drawer-wrapper__content--open'
              : 'side-drawer-wrapper__content--close'
          }`}
        >
          <Row className="side-drawer-wrapper__content__header">
            <Col
              className="d-flex justify-content-left align-items-center side-drawer-wrapper__content__header-title"
              sm={{ span: 3, offset: 1 }}
              xs={5}
            >
              {operation} Task
            </Col>
            <Col
              className="d-flex justify-content-center align-items-center"
              sm={2}
              xs={4}
            >
              <Button
                variant="outline-dark"
                disabled
                className="side-drawer-wrapper__content__header__premium"
              >
                PREMIUM
              </Button>
            </Col>
            <Col xs={3} sm={6}>
              <span
                className="side-drawer-wrapper__close-button"
                onClick={closeTaskDrawer}
              >
                &times;
              </span>
            </Col>
          </Row>
          <div className="side-drawer-wrapper__divider"></div>
          <Form>
            <Form.Group controlId="name">
              <Form.Label className="form-label-name">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Task Name"
                defaultValue={selectedTask.text}
                onChange={() => {}}
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label className="form-label-category">Category</Form.Label>
              <Form.Control as="select">
                <option key="-1">--select category</option>
                {MENU_ITEMS.map((item) => (
                  <option key={item.id}>{item.text}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="cost">
              <Form.Label>Estimated Cost</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Enter Task Cost"
                  defaultValue={selectedTask.cost}
                  onChange={() => {}}
                />
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">EGP</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Form.Group>
            <Form.Group style={{ marginBottom: '8px' }}>
              <Form.Label>Due Date</Form.Label>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="bootstrap-border"
                placeholderText="Choose Due Date"
                minDate={new Date()}
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group controlId="note">
              <Form.Label>Note</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Container>
              <Row className="form-action">
                <Col md={7} sm={12}>
                  <Button variant="primary" disabled>
                    Save & create another
                  </Button>
                </Col>
                <Col md={5} sm={12}>
                  <Button variant="outline-primary" onClick={saveData}>
                    Save
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </Container>
    </Fragment>
  );
}
