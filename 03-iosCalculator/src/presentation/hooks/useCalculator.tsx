import {useRef, useState} from 'react';

enum Operator {
  add,
  subtract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
  };

  const deleteOperation = () => {
    let currentSign = '';
    let temporalNumber = number;

    if (number.includes('-')) {
      currentSign = '-';
      temporalNumber = number.substring(1);
    }

    if (temporalNumber.length > 1) {
      return setNumber(currentSign + temporalNumber.slice(0, -1));
    }

    setNumber('0');
  };

  const toggleSign = () => {
    if (number.includes('-')) {
      setNumber(number.replace('-', ''));
    } else {
      setNumber('-' + number);
    }
  };

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      if (numberString === '.') {
        return setNumber(number + numberString);
      }

      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }

      if (numberString === '0' && !number.includes('.')) {
        return;
      }

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  const setLastNumber = () => {
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };

  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  const calculateResult = () => {
    const num1 = Number(number);
    const num2 = Number(prevNumber);

    switch (lastOperation.current) {
      case Operator.add:
        setNumber(`${num1 + num2}`);
        break;

      case Operator.subtract:
        setNumber(`${num2 - num1}`);
        break;

      case Operator.multiply:
        setNumber(`${num1 * num2}`);
        break;

      case Operator.divide:
        setNumber(`${num2 / num1}`);
        break;
    }

    setPrevNumber('0');
  };

  return {
    number,
    buildNumber,
    prevNumber,
    clean,
    deleteOperation,
    toggleSign,
    divideOperation,
    addOperation,
    multiplyOperation,
    subtractOperation,
    calculateResult,
  };
};
