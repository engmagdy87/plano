import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation(['build-profile']);
  const { state, dispatch } = useContext(Store);
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
        <p
          className={`wedding-budget-wrapper__list__item__more-than ${
            state.lang === 'en'
              ? 'wedding-budget-wrapper__list__item__more-than--en'
              : 'wedding-budget-wrapper__list__item__more-than--ar'
          }`}
        >
          {t('build-profile:moreThan')}
        </p>
        <p
          className={`wedding-budget-wrapper__list__item__budget
__budget ${
            state.lang === 'en'
              ? 'wedding-budget-wrapper__list__item__budget--en'
              : 'wedding-budget-wrapper__list__item__budget--ar'
          }`}
        >
          {budget.key} {t('build-profile:egp')}
        </p>
      </div>
    ));
  };
  return (
    <div className="wedding-budget-wrapper">
      <Row className="wedding-budget-wrapper__title">
        <Col xs={12} className="text-center">
          <img
            className="wedding-budget-wrapper__title__hero"
            src={DollarImage}
            alt="waving hand"
          />
        </Col>
        <Col
          xs={12}
          className="text-center wedding-budget-wrapper__title__text"
        >
          <span
            className={`${
              state.lang === 'en'
                ? 'wedding-budget-wrapper__title__text--en'
                : 'wedding-budget-wrapper__title__text--ar'
            }`}
          >
            {t('build-profile:howMuchWouldYouSpendOnWeddingperpetration')}
          </span>
        </Col>
      </Row>
      <Row className="wedding-budget-wrapper__list">
        <Col className="wedding-budget-wrapper__list__content">
          {renderBudgetsList()}
        </Col>
        <Col>
          <div className="wedding-budget-wrapper__list__action">
            <Button
              className={`${
                state.lang === 'en'
                  ? 'wedding-budget-wrapper__list__action--en'
                  : 'wedding-budget-wrapper__list__action--ar'
              }`}
              onClick={handleNext}
            >
              {t('build-profile:next')}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
