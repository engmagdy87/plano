import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import DollarImage from '../../../assets/images/dollar.svg';
import '../../../assets/styles/components/wedding-budget.scss';

export default function WeddingBudget({ onClickButton }) {
  const budgets = ['20,000', '50,000', '100,000', '200,000', '300,000'];

  const [activeBudgetItem, setActiveBudgetItem] = useState('');

  const renderBudgetsList = function() {
    return budgets.map((budget, index) => (
      <div
        key={index}
        className={`wedding-budget-wrapper__list__item ${
          activeBudgetItem === budget
            ? 'wedding-budget-wrapper__list__item--active'
            : ''
        }`}
        onClick={() => setActiveBudgetItem(budget)}
      >
        <p>more than</p>
        <p>{budget} EGP</p>
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
            <Button onClick={() => onClickButton(6)}>Next</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
