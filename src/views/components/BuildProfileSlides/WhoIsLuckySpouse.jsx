import React, { useContext } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import RingsImage from '../../../assets/images/rings.svg';
import '../../../assets/styles/components/lucky-spouse.scss';
import { Store } from '../../../store/store';
import types from '../../../store/types';
import { useForm } from 'react-hook-form';

export default function WhoIsLuckySpouse({ onClickButton }) {
  const { state, dispatch } = useContext(Store);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    dispatch({
      type: types.user.SET_USER_SPOUSE_NAME,
      payload: data.spouseName,
    });
    onClickButton(4);
  };
  return (
    <div className="lucky-spouse-wrapper">
      <Row className="lucky-spouse-wrapper__title">
        <Col xs={12} className="text-center">
          <img src={RingsImage} alt="waving hand" />
        </Col>
        <Col xs={12} className="text-center">
          <span>Who's your lucky spouse?</span>
        </Col>
      </Row>
      <Row className="lucky-spouse-wrapper__form">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Enter name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full Name"
                defaultValue={state.userPersona.spouseName}
                name="spouseName"
                ref={register({ required: true })}
              />
              {errors.spouseName && (
                <span className="error-message">Invalid Spouse Name</span>
              )}
            </Form.Group>
            <div className="lucky-spouse-wrapper__form__form-action">
              <Button type="submit">Next</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
