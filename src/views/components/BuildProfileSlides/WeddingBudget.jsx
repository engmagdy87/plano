import React, { useState, useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import DollarImage from '../../../assets/images/dollar.svg';
import '../../../assets/styles/components/wedding-budget.scss';
import { Store } from '../../../store/store';
import types from '../../../store/types';

export default function WeddingBudget({ onClickButton }) {
  const budgets = [
    { key: '20,000', value: 20000 },
    { key: '50,000', value: 50000 },
    { key: '100,000', value: 100000 },
    { key: '200,000', value: 200000 },
    { key: '300,000', value: 300000 },
  ];

  const { dispatch } = useContext(Store);
  const [activeBudgetItem, setActiveBudgetItem] = useState(0);

  const handleNext = function () {
    dispatch({
      type: types.user.SET_USER_PREP_COST,
      payload: activeBudgetItem,
    });
    onClickButton(6);
  };

  const renderBudgetsList = function () {
    return budgets.map((budget, index) => (
      <div
        key={index}
        className={`wedding-budget-wrapper__list__item ${
          activeBudgetItem === budget.value
            ? 'wedding-budget-wrapper__list__item--active'
            : ''
        }`}
        onClick={() => setActiveBudgetItem(budget.value)}
      >
        <p>more than</p>
        <p>{budget.key} EGP</p>
      </div>
    ));
  };
  return (
    <div className="wedding-budget-wrapper">
      <Row className="wedding-budget-wrapper__title">
        <Col xs={12} className="text-center">
          <img src={DollarImage} alt="waving hand" />
        </Col>
        <Col xs={12} className="text-center">
          <span>How much would you spend on wedding perpetration?</span>
        </Col>
      </Row>
      <Row className="wedding-budget-wrapper__list">
        <Col className="wedding-budget-wrapper__list__content">
          {renderBudgetsList()}
        </Col>
        <Col>
          <div className="wedding-budget-wrapper__list__action">
            <Button onClick={handleNext}>Next</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
