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
  border-radius: ${props => (props.expanded ? "4rem" : "50%")};
`;

const OperationBlock = styled.button`
  width: ${(props) => (props.expanded ? "200px" : "100px")};
  height: 100px;
  background-color: ${(props) =>
    props.inputHighlight == props.operation ? "white" : "orange"};
  color: ${(props) =>
    props.inputHighlight == props.operation ? "orange" : "white"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border: 0.25rem solid black;
  border-radius: 50%;
`;

const App = () => {
  const [lastCalculation, setLastCalculation] = useState(null);
  const [currentNumber, setCurrentNumber] = useState("");
  const [visualNumber, setVisualNumber] = useState("");
  const [lastNumber, setLastNumber] = useState(null);
  const [operation, setOperation] = useState("");
  const [inputHighlight, setInputHighlight] = useState("");

  const evaluate = () => {
    if (!operation.length) {
      return null;
    }

    // TODO: Change to a switch statement
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
      if (Number(currentNumber) === 0) {
        return setCurrentNumber("Error");
      }

      setOperation("");

      setLastCalculation(String(Number(lastNumber) / Number(currentNumber)));

      return setCurrentNumber(
        String(Number(lastNumber) / Number(currentNumber))
      );
    }
  };

  const operationAction = (operation) => {
    setLastNumber(currentNumber);
    setOperation(operation);
    setInputHighlight(operation);
    setVisualNumber(currentNumber)
    setCurrentNumber("");
  };

  const inputNumber = (number) => {
    if (currentNumber == "Error") {
      setCurrentNumber("");
      return setCurrentNumber(number);
    }

    if (currentNumber.length >= 9 && !lastCalculation) {
      return null;
    }

    if (operation.length) {
      setVisualNumber(number)
      setCurrentNumber(number);
      setInputHighlight("");
    }

    if (lastCalculation) {
      setCurrentNumber(number);
      return setLastCalculation(null);
    }

    setVisualNumber(String(currentNumber) + String(number));
    setCurrentNumber(String(currentNumber) + String(number));
  };

  const clearInput = () => setCurrentNumber("");

  const handleAbsClick = () => setCurrentNumber(String(currentNumber * -1))

  const handlePercentClick = () => setCurrentNumber(String(currentNumber / 100))

  return (
    <>
      <CalculatorInput value={operation.length ? visualNumber : currentNumber} type="text" placeholder="0" />
      <CalculatorNumberContainer>
        <NumberBlock onClick={clearInput}>AC</NumberBlock>
        <NumberBlock onClick={handleAbsClick}>+/-</NumberBlock>
        <NumberBlock onClick={handlePercentClick}>%</NumberBlock>
        <OperationBlock
          onClick={() => operationAction("divide")}
          inputHighlight={inputHighlight}
          operation={"divide"}
        >
          ÷
        </OperationBlock>
        <NumberBlock onClick={() => inputNumber("7")}>7</NumberBlock>
        <NumberBlock onClick={() => inputNumber("8")}>8</NumberBlock>
        <NumberBlock onClick={() => inputNumber("9")}>9</NumberBlock>
        <OperationBlock
          onClick={() => operationAction("multiply")}
          inputHighlight={inputHighlight}
          operation={"multiply"}
        >
          x
        </OperationBlock>
        <NumberBlock onClick={() => inputNumber("4")}>4</NumberBlock>
        <NumberBlock onClick={() => inputNumber("5")}>5</NumberBlock>
        <NumberBlock onClick={() => inputNumber("6")}>6</NumberBlock>
        <OperationBlock
          onClick={() => operationAction("subtract")}
          inputHighlight={inputHighlight}
          operation={"subtract"}
        >
          -
        </OperationBlock>
        <NumberBlock onClick={() => inputNumber("1")}>1</NumberBlock>
        <NumberBlock onClick={() => inputNumber("2")}>2</NumberBlock>
        <NumberBlock onClick={() => inputNumber("3")}>3</NumberBlock>
        <OperationBlock
          onClick={() => operationAction("add")}
          inputHighlight={inputHighlight}
          operation={"add"}
        >
          +
        </OperationBlock>
      </CalculatorNumberContainer>
      <CalculatorNumberContainerBottomRow>
        <NumberBlock onClick={() => inputNumber("0")} expanded>
          0
        </NumberBlock>
        <NumberBlock>.</NumberBlock>
        <OperationBlock onClick={evaluate} inputHighlight={inputHighlight}>
          =
        </OperationBlock>
      </CalculatorNumberContainerBottomRow>
    </>
  );
};

export default App;
