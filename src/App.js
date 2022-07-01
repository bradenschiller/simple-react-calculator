import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

const CalculatorInput = styled.input`
  width: 99%;
  height: 4rem;
  border: none;
  text-align: end;
  font-size: 2rem;
  color: #fff;
  background-color: #000;
`;

const CalculatorNumberContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 1fr 1fr 1fr;
`;

const CalculatorNumberContainerBottomRow = styled.div`
  display: grid;
  grid-template-columns: 200px 100px 100px;
  grid-template-rows: 1fr 1fr;
`;

const NumberBlock = styled.button`
  width: ${(props) => (props.expanded ? "200px" : "100px")};
  height: 100px;
  background-color: ${(props) => (props.action ? "orange" : "gray")};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border: 0.25rem solid black;
  border-radius: 50%;
`;

/*
[x] Add Function
[x] Subtract Function
- Divide Function
- Multiply Function
- Equals Actions
- Preserve last action
*/

const App = () => {
  const [lastCalculation, setLastCalculation] = useState(null);
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState(null);
  const [operation, setOperation] = useState("");

  const evaluate = () => {
    if (!operation.length) {
      return null;
    }

    if (operation === "add") {
      setOperation("");

      setLastCalculation(String(Number(lastNumber) + Number(currentNumber)));

      return setCurrentNumber(
        String(Number(lastNumber) + Number(currentNumber))
      );
    }

    if (operation === "subtract") {
      setOperation("");

      setLastCalculation(String(Number(lastNumber) - Number(currentNumber)));

      return setCurrentNumber(
        String(Number(lastNumber) - Number(currentNumber))
      );
    }

    if (operation === "multiply") {
      setOperation("");

      setLastCalculation(String(Number(lastNumber) * Number(currentNumber)));

      return setCurrentNumber(
        String(Number(lastNumber) * Number(currentNumber))
      );
    }

    if (operation === "divide") {
      setOperation("");

      setLastCalculation(String(Number(lastNumber) / Number(currentNumber)));

      return setCurrentNumber(
        String(Number(lastNumber) / Number(currentNumber))
      );
    }
  };

  /* curried function could be better or just an operation function like

  TODO: Replace action functions with this one function

  const handleActionOnClick = (action) => {
    setLastNumber(currentNumber);
    setOperation(action);
    setCurrentNumber(String(""));
  };

  */

  const addNumbers = () => {
    setLastNumber(currentNumber);
    setOperation("add");
    setCurrentNumber("");
  };

  const subtractNumbers = () => {
    setLastNumber(currentNumber);
    setOperation("subtract");
    setCurrentNumber("");
  };

  const multiplyNumbers = () => {
    setLastNumber(currentNumber);
    setOperation("multiply");
    setCurrentNumber("");
  };

  const divideNumbers = () => {
    setLastNumber(currentNumber);
    setOperation("divide");
    setCurrentNumber("");
  };

  const inputNumber = (number) => {
    if (currentNumber.length >= 9 && !lastCalculation) {
      return null;
    }

    if (operation.length) {
      setCurrentNumber(number);
    }

    if (lastCalculation) {
      setCurrentNumber(number);
      return setLastCalculation(null);
    }

    setCurrentNumber(String(currentNumber) + String(number));
  };

  const clearInput = () => setCurrentNumber("");

  return (
    <>
      <CalculatorInput value={currentNumber} type="text" placeholder="0" />
      <CalculatorNumberContainer>
        <NumberBlock onClick={clearInput}>AC</NumberBlock>
        <NumberBlock>+/-</NumberBlock>
        <NumberBlock>%</NumberBlock>
        <NumberBlock onClick={divideNumbers} action>
          /
        </NumberBlock>
        <NumberBlock onClick={() => inputNumber("7")}>7</NumberBlock>
        <NumberBlock onClick={() => inputNumber("8")}>8</NumberBlock>
        <NumberBlock onClick={() => inputNumber("9")}>9</NumberBlock>
        <NumberBlock onClick={multiplyNumbers} action>
          x
        </NumberBlock>
        <NumberBlock onClick={() => inputNumber("4")}>4</NumberBlock>
        <NumberBlock onClick={() => inputNumber("5")}>5</NumberBlock>
        <NumberBlock onClick={() => inputNumber("6")}>6</NumberBlock>
        <NumberBlock onClick={subtractNumbers} action>
          -
        </NumberBlock>
        <NumberBlock onClick={() => inputNumber("1")}>1</NumberBlock>
        <NumberBlock onClick={() => inputNumber("2")}>2</NumberBlock>
        <NumberBlock onClick={() => inputNumber("3")}>3</NumberBlock>
        <NumberBlock onClick={addNumbers} action>
          +
        </NumberBlock>
      </CalculatorNumberContainer>
      <CalculatorNumberContainerBottomRow>
        <NumberBlock onClick={() => inputNumber("0")} expanded>
          0
        </NumberBlock>
        <NumberBlock>.</NumberBlock>
        <NumberBlock onClick={evaluate} action>
          =
        </NumberBlock>
      </CalculatorNumberContainerBottomRow>
    </>
  );
};

export default App;
