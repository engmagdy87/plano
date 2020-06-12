import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  useRef,
} from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { Store } from '../../store/store';
import { useForm } from 'react-hook-form';
import { categoriesActions } from '../../store/actions';
import Loading from '../shared/Loading';
import types from '../../store/types';
import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/styles/shared/side-drawer.scss';

export default function SideDrawer() {
  const { t } = useTranslation(['task']);
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

  const addTask = async (payload) => {
    setShowLoadingSpinner(true);
    try {
      await categoriesActions.createNewTask(
        dispatch,
        refactorPayload(payload),
        t('task:taskCreatedSuccessfully'),
        t('task:somethingWrong')
      );
      setShowLoadingSpinner(false);
      resetForm();
      if (submitOption === 'save') closeTaskDrawer();
    } catch (error) {
      setShowLoadingSpinner(false);
    }
  };

  const editTask = async (taskId, payload) => {
    setShowLoadingSpinner(true);
    try {
      await categoriesActions.editTask(
        dispatch,
        taskId,
        payload.categoryId,
        refactorPayload(payload),
        t('task:taskUpdatedSuccessfully'),
        t('task:somethingWrong')
      );
      setShowLoadingSpinner(false);
      resetForm();
      closeTaskDrawer();
    } catch (error) {
      setShowLoadingSpinner(false);
    }
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

  const getCorrespondingCSSClasses = (lang, flag) => {
    if (lang === 'en')
      return `side-drawer-wrapper__content--en ${
        flag
          ? 'side-drawer-wrapper__content--en--open'
          : 'side-drawer-wrapper__content--en--close'
      }`;
    else
      return `side-drawer-wrapper__content--ar ${
        flag
          ? 'side-drawer-wrapper__content--ar--open'
          : 'side-drawer-wrapper__content--ar--close'
      }`;
  };

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
          className={getCorrespondingCSSClasses(state.lang, flag)}
        >
          <Row className="side-drawer-wrapper__content__header">
            <Col
              className={`d-flex justify-content-left align-items-center side-drawer-wrapper__content__header-title ${
                state.lang === 'en'
                  ? 'side-drawer-wrapper__content__header-title--en'
                  : 'side-drawer-wrapper__content__header-title--ar'
              }`}
              sm={{ span: 3, offset: 1 }}
              xs={5}
            >
              {operation === 'edit' ? t('task:edit') : t('task:add')}
            </Col>
            <Col
              className="d-flex justify-content-center align-items-center"
              sm={2}
              xs={4}
            >
              <Button
                variant="outline-dark"
                disabled
                className={`side-drawer-wrapper__content__header__premium ${
                  state.lang === 'en'
                    ? 'side-drawer-wrapper__content__header__premium--en'
                    : 'side-drawer-wrapper__content__header__premium--ar'
                }`}
              >
                {t('task:premium')}
              </Button>
            </Col>
            <Col xs={3} sm={6}>
              <span
                className={`side-drawer-wrapper__close-button ${
                  state.lang === 'en'
                    ? 'side-drawer-wrapper__close-button--en'
                    : 'side-drawer-wrapper__close-button--ar'
                }`}
                onClick={closeTaskDrawer}
              >
                &times;
              </span>
            </Col>
          </Row>
          <div className="side-drawer-wrapper__divider"></div>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
                {t('task:name')}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={t('task:namePlaceholder')}
                name="title"
                ref={register({ required: true, maxLength: 80 })}
                className={`${
                  state.lang === 'en' ? 'form-control--en' : 'form-control--ar'
                }`}
              />
              {errors.title && (
                <span
                  className={`error-message ${
                    state.lang === 'en'
                      ? 'error-message--en'
                      : 'error-message--ar'
                  }`}
                >
                  {t('task:invalidTaskName')}
                </span>
              )}
            </Form.Group>
            <Form.Group
              controlId="category"
              className={`${
                state.lang === 'en' ? 'form-group--en' : 'form-group--ar'
              }`}
            >
              <Form.Label
                className={`form-label-category ${
                  state.lang === 'en' ? 'form-label--en' : 'form-label--ar'
                }`}
              >
                {t('task:category')}
              </Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                ref={register({ required: true, validate: validateCategory })}
                className={`${
                  state.lang === 'en' ? 'form-control--en' : 'form-control--ar'
                }`}
              >
                <option key="-1" value="-1">
                  {t('task:selectCategoryPlaceholder')}
                </option>
                {state.categoriesData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </Form.Control>
              {errors.categoryId && (
                <span
                  className={`error-message ${
                    state.lang === 'en'
                      ? 'error-message--en'
                      : 'error-message--ar'
                  }`}
                >
                  {t('task:chooseCategory')}
                </span>
              )}
            </Form.Group>
            <Form.Group
              controlId="cost"
              className={`${
                state.lang === 'en' ? 'form-group--en' : 'form-group--ar'
              }`}
            >
              <Form.Label
                className={`${
                  state.lang === 'en' ? 'form-label--en' : 'form-label--ar'
                }`}
              >
                {t('task:estimatedCost')}
              </Form.Label>
              <InputGroup
                className={`${
                  state.lang === 'en' ? 'form-group--en' : 'form-group--ar'
                }`}
              >
                <Form.Control
                  type="number"
                  placeholder={t('task:estimatedCostPlaceholder')}
                  name="cost"
                  ref={register({ required: false })}
                  className={`${
                    state.lang === 'en'
                      ? 'form-control--en'
                      : 'form-control--ar'
                  }`}
                />
                <InputGroup.Prepend>
                  <InputGroup.Text
                    id="inputGroupPrepend"
                    className={`${
                      state.lang === 'en'
                        ? 'input-group-text--en'
                        : 'input-group-text--ar'
                    }`}
                  >
                    {t('task:egp')}
                  </InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
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
                {t('task:dueDate')}
              </Form.Label>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className={`bootstrap-border ${
                  state.lang === 'en'
                    ? 'bootstrap-border--en'
                    : 'bootstrap-border--ar'
                }`}
                placeholderText={t('task:dueDatePlaceholder')}
                minDate={new Date()}
              />
            </Form.Group>

            <Form.Group
              controlId="note"
              className={`${
                state.lang === 'en' ? 'form-group--en' : 'form-group--ar'
              }`}
            >
              <Form.Label
                className={`${
                  state.lang === 'en' ? 'form-label--en' : 'form-label--ar'
                }`}
              >
                {t('task:notes')}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="note"
                placeholder={t('task:notesPlaceholder')}
                ref={register({ required: false })}
                className={`${
                  state.lang === 'en' ? 'form-control--en' : 'form-control--ar'
                }`}
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
                    } ${
                      state.lang === 'en'
                        ? 'form-action--en'
                        : 'form-action--ar'
                    }`}
                  >
                    {t('task:saveAndCreate')}
                  </Button>
                </Col>
                <Col md={5} sm={12}>
                  <Button
                    variant="outline-primary"
                    type="submit"
                    onClick={() => setSubmitOption('save')}
                    className={`${
                      state.lang === 'en'
                        ? 'form-action--en'
                        : 'form-action--ar'
                    }`}
                  >
                    {t('task:save')}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
        <Loading showLoadingSpinner={showLoadingSpinner} lang={state.lang} />
      </Container>
    </Fragment>
  );
}
