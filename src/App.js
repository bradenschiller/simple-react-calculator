import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import OperationBlock from "./OperationBlock";
import { OperationTypes } from "./Constants";

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
  border-radius: ${(props) => (props.expanded ? "4rem" : "50%")};
`;

const App = () => {
  const [lastCalculation, setLastCalculation] = useState(null);
  const [currentNumber, setCurrentNumber] = useState("");
  const [visualNumber, setVisualNumber] = useState("");
  const [lastNumber, setLastNumber] = useState(null);
  const [operation, setOperation] = useState("");
  const [isHighlighted, setIsHighlighted] = useState("");

  const evaluate = () => {
    const calculate = (operation) => {
      const solutions = {
        ADD: String(Number(lastNumber) + Number(currentNumber)),
        SUBTRACT: String(Number(lastNumber) - Number(currentNumber)),
        MULTIPLY: String(Number(lastNumber) * Number(currentNumber)),
        DIVIDE: String(Number(lastNumber) / Number(currentNumber)),
      };

      return solutions[operation];
    };

    const handleOperationEvaluation = (operation) => {
      setOperation("");
      setLastCalculation(calculate(operation));
      return setCurrentNumber(calculate(operation));
    };

    switch (operation) {
      case OperationTypes.ADD:
        return handleOperationEvaluation(OperationTypes.ADD);
      case OperationTypes.SUBTRACT:
        return handleOperationEvaluation(OperationTypes.SUBTRACT);
      case OperationTypes.MULTIPLY:
        return handleOperationEvaluation(OperationTypes.MULTIPLY);
      case OperationTypes.DIVIDE:
        return handleOperationEvaluation(OperationTypes.DIVIDE);
      default:
        return null;
    }
  };

  const operationAction = (operation) => {
    setLastNumber(currentNumber);
    setOperation(operation);
    setIsHighlighted(operation);
    setVisualNumber(currentNumber);
    setCurrentNumber("");
  };

  const inputNumber = (number) => {
    const currentValueIsError = currentNumber === "Error";
    const numberInpurOverflow = currentNumber.length >= 9 && !lastCalculation;
    const hasOperation = operation.length;

    if (currentValueIsError) {
      setCurrentNumber("");
      return setCurrentNumber(number);
    }

    if (numberInpurOverflow) {
      return null;
    }

    if (hasOperation) {
      setVisualNumber(number);
      setCurrentNumber(number);
      setIsHighlighted("");
    }

    if (lastCalculation) {
      setCurrentNumber(number);
      return setLastCalculation(null);
    }

    setVisualNumber(`${currentNumber}${number}`);
    setCurrentNumber(`${currentNumber}${number}`);
  };

  const clearInput = () => setCurrentNumber("");

  const handleAbsClick = () => setCurrentNumber(String(currentNumber * -1));

  const handlePercentClick = () =>
    setCurrentNumber(String(currentNumber / 100));

  return (
    <>
      <CalculatorInput
        value={operation.length ? visualNumber : currentNumber}
        type="text"
        placeholder="0"
      />
      <CalculatorNumberContainer>
        <NumberBlock onClick={clearInput}>AC</NumberBlock>
        <NumberBlock onClick={handleAbsClick}>+/-</NumberBlock>
        <NumberBlock onClick={handlePercentClick}>%</NumberBlock>
        <OperationBlock
          operation={OperationTypes.DIVIDE}
          isHighlighted={isHighlighted}
          operationAction={operationAction}
        />
        <NumberBlock onClick={() => inputNumber("7")}>7</NumberBlock>
        <NumberBlock onClick={() => inputNumber("8")}>8</NumberBlock>
        <NumberBlock onClick={() => inputNumber("9")}>9</NumberBlock>
        <OperationBlock
          operation={OperationTypes.MULTIPLY}
          isHighlighted={isHighlighted}
          operationAction={operationAction}
        />
        <NumberBlock onClick={() => inputNumber("4")}>4</NumberBlock>
        <NumberBlock onClick={() => inputNumber("5")}>5</NumberBlock>
        <NumberBlock onClick={() => inputNumber("6")}>6</NumberBlock>
        <OperationBlock
          operation={OperationTypes.SUBTRACT}
          isHighlighted={isHighlighted}
          operationAction={operationAction}
        />
        <NumberBlock onClick={() => inputNumber("1")}>1</NumberBlock>
        <NumberBlock onClick={() => inputNumber("2")}>2</NumberBlock>
        <NumberBlock onClick={() => inputNumber("3")}>3</NumberBlock>
        <OperationBlock
          operation={OperationTypes.ADD}
          isHighlighted={isHighlighted}
          operationAction={operationAction}
        />
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
