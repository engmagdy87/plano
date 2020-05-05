import React, { useContext } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import WavingHandImage from '../../../assets/images/waving-hand.svg';
import '../../../assets/styles/components/what-is-your-name.scss';
import { Store } from '../../../store/store';
import types from '../../../store/types';
import { useForm } from 'react-hook-form';

export default function WhatIsYourName({ onClickButton }) {
  const { state, dispatch } = useContext(Store);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    dispatch({
      type: types.user.SET_USER_NAME,
      payload: data.name,
    });
    onClickButton(3);
  };

  return (
    <div className="what-is-your-name-wrapper">
      <Row className="what-is-your-name-wrapper__title">
        <Col xs={12} className="text-center">
          <img src={WavingHandImage} alt="waving hand" />
        </Col>
        <Col xs={12} className="text-center">
          <span>What's your name?</span>
        </Col>
      </Row>
      <Row className="what-is-your-name-wrapper__form">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Enter your name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full Name"
                defaultValue={state.userPersona.name}
                name="name"
                ref={register({ required: true })}
              />
              {errors.name && (
                <span className="error-message">Invalid Name</span>
              )}
            </Form.Group>
            <div className="what-is-your-name-wrapper__form__form-action">
              <Button type="submit">Next</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
