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
import { useForm } from 'react-hook-form';
import { createTask, updateTask } from '../../helpers/APIsHelper';
import Loading from './Loading';
import 'react-datepicker/dist/react-datepicker.css';

export default function SideDrawer() {
  const { state, dispatch } = useContext(Store);
  const [selectedTask, setSelectedTask] = useState({
    category: { id: '-1', title: '' },
    cost: '',
    done: false,
    dueDate: '',
    id: '',
    status: '',
    title: '',
    note: '',
  });
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      categoryId: selectedTask.category.id,
    },
  });
  const [startDate, setStartDate] = useState('');
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [submitOption, setSubmitOption] = useState('');
  let sideDrawerWrapper = useRef();

  const closeTaskDrawer = function () {
    dispatch({
      type: types.categories.SET_OPEN_TASK_FORM,
      payload: {
        flag: false,
        operation: state.taskForm.operation,
      },
    });
    resetForm();
    const phoneAndTablet = window.matchMedia('(max-width:992px)');
    if (!phoneAndTablet.matches) {
      // dispatch({
      //   type: types.categories.RESET_SELECTED_TASK,
      // });
      setSelectedTask({
        category: { title: '' },
        cost: '',
        done: false,
        dueDate: '',
        id: '',
        status: '',
        title: '',
        note: '',
      });
    }
    // @ts-ignore
    sideDrawerWrapper.current.scrollTop = 0;
  };
  const resetForm = () => {
    reset({ title: '', categoryId: '-1', cost: '', note: '' });
    setStartDate('');
  };

  const refactorPayload = (payload) => {
    let newPayload;
    if (payload.dueDate === '') {
      const { dueDate, ...rest } = payload;
      newPayload = { ...rest };
    } else newPayload = payload;

    return newPayload;
  };

  const addTask = (payload) => {
    setShowLoadingSpinner(true);
    createTask(refactorPayload(payload))
      .then(async (res) => {
        setShowLoadingSpinner(false);
        const task = res.data.createTask;
        dispatch({
          type: types.categories.ADD_TASK,
          payload: {
            categoryId: task.category.id,
            task,
          },
        });

        dispatch({
          type: types.categories.SET_TOAST_DATA,
          payload: {
            show: true,
            text: 'Task created successfully',
            status: 'success',
          },
        });
        resetForm();
        if (submitOption === 'save') closeTaskDrawer();
      })
      .catch(() => {
        dispatch({
          type: types.categories.SET_TOAST_DATA,
          payload: {
            show: true,
            text: 'Unexpected error when creating task, Please try again!',
            status: 'error',
          },
        });
      });
  };

  const editTask = (taskId, payload) => {
    setShowLoadingSpinner(true);
    updateTask(taskId, refactorPayload(payload))
      .then(async (res) => {
        setShowLoadingSpinner(false);
        const task = res.data.updateTask;
        dispatch({
          type: types.categories.EDIT_TASK,
          payload: {
            currentCategoryId: payload.categoryId,
            taskId,
            updatedTask: task,
          },
        });
        dispatch({
          type: types.categories.SET_SELECTED_TASK,
          payload: {
            selectedCategoryId: payload.categoryId,
            selectedTaskId: taskId,
          },
        });
        dispatch({
          type: types.categories.SET_TOAST_DATA,
          payload: {
            show: true,
            text: 'Task updated successfully',
            status: 'success',
          },
        });
        resetForm();
        closeTaskDrawer();
      })
      .catch(() => {
        dispatch({
          type: types.categories.SET_TOAST_DATA,
          payload: {
            show: true,
            text: 'Unexpected error when updating task, Please try again!',
            status: 'error',
          },
        });
      });
  };

  const onSubmit = async (data) => {
    const { operation } = state.taskForm;
    const payload = {
      ...data,
      dueDate: startDate,
      checklistId: state.currentChecklistId,
      categoryId: Number(data.categoryId),
      cost: Number(data.cost),
    };

    if (operation === 'edit') editTask(Number(selectedTask.id), payload);
    else addTask(payload);
  };

  const validateCategory = function (value) {
    return value !== '-1';
  };

  useEffect(() => {
    const { flag, operation } = state.taskForm;
    if (operation === 'edit' && flag) {
      const task = state.selectedTask.data[0];
      reset({
        title: task.title,
        categoryId: task.category.id,
        cost: task.cost,
        note: task.note,
      });
      setSelectedTask(task);
      setStartDate(task.dueDate === '' ? '' : new Date(task.dueDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.taskForm]);

  const { flag, operation } = state.taskForm;
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label className="form-label-name">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Task Name"
                name="title"
                ref={register({ required: true, maxLength: 80 })}
              />
              {errors.title && (
                <span className="error-message">Invalid Task Name</span>
              )}
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label className="form-label-category">Category</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                ref={register({ required: true, validate: validateCategory })}
              >
                <option key="-1" value="-1">
                  --select category
                </option>
                {state.categoriesData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </Form.Control>
              {errors.categoryId && (
                <span className="error-message">Choose Category</span>
              )}
            </Form.Group>
            <Form.Group controlId="cost">
              <Form.Label>Estimated Cost</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Enter Task Cost"
                  name="cost"
                  ref={register({ required: false })}
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
            </Form.Group>

            <Form.Group controlId="note">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="note"
                ref={register({ required: false })}
              />
            </Form.Group>
            <Container>
              <Row className="form-action">
                <Col md={7} sm={12}>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => setSubmitOption('saveAndCreate')}
                    className={`${
                      operation === 'edit' ? 'form-action--hide-element' : ''
                    }`}
                  >
                    Save & create another
                  </Button>
                </Col>
                <Col md={5} sm={12}>
                  <Button
                    variant="outline-primary"
                    type="submit"
                    onClick={() => setSubmitOption('save')}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
        <Loading showLoadingSpinner={showLoadingSpinner} />
      </Container>
    </Fragment>
  );
}
