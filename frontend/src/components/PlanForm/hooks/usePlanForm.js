import { useEffect, useState } from 'react';
import useReduxState from '../../../hooks/useReduxState';

export const usePlanForm = (state, getState) => {
  const [isFieldActive, setFieldActive] = useState(false);
  const [currency, setCurrency] = useState({});
  const [currencySvg, setCurrencySvg] = useState('hryvnaRate');
  const [rateValue, setRateValue] = useState('');
  const { userInfo } = useReduxState();

  const onHandleChange = e => {
    getState({ ...state, [e.target.name]: e.target.value });
  };
  const setFlatPrice = () => {
    getState({
      ...state,
      flatPrice:
        Number(rateValue) *
        (currency[currencySvg] ? Number(currency[currencySvg]) : 1),
    });
  };
  const onSetRateValue = e => {
    setRateValue(e.target.value);
    getState({
      ...state,
      [e.target.name]:
        e.target.valueAsNumber *
        (currency[currencySvg] ? Number(currency[currencySvg]) : 1),
    });
  };
  useEffect(() => {
    setFlatPrice();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencySvg]);

  const onHandleFocus = () => setFieldActive(true);
  const onHandleBlur = () => setFieldActive(false);
  return {
    valuePlan: {
      isFieldActive,
      currencySvg,
      rateValue,
      userInfo,
    },
    setStatePlan: { setCurrency, setCurrencySvg },
    onChangePlan: {
      onHandleChange,
      onSetRateValue,
      onHandleFocus,
      onHandleBlur,
    },
  };
};
