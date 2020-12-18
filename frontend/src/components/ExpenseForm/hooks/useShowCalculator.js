import { useState } from 'react';

const useShowCalculator = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const showCalculatorHandler = () => {
    setShowCalculator(!showCalculator);
  };
  return [showCalculator, showCalculatorHandler];
};

export default useShowCalculator;
