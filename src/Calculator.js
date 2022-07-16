import React, { useState } from "react";
import styled from "styled-components";
import OperationBlock from "./OperationBlock";
import { OperationTypes } from "./Constants";

const CalculatorDisplay = styled.input`
  border: none;
  color: #fff;
  background-color: #000;
  text-align: right;
  height: 70px;
  line-height: 70px;
  padding: 16px 12px;
  font-size: 2.5rem;
  max-width: 375px;
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
  background-color: ${(props) => (props.isActionButton ? "orange" : "gray")};
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
  const [selectedOperationType, setSelectedOperationType] = useState("");
  const [isHighlighted, setIsHighlighted] = useState("");

  const handleEvaluation = () => {
    const selectedOperationCalculation = (selectedOperationType) => {
      const solutions = {
        ADD: String(Number(lastNumber) + Number(currentNumber)),
        SUBTRACT: String(Number(lastNumber) - Number(currentNumber)),
        MULTIPLY: String(Number(lastNumber) * Number(currentNumber)),
        DIVIDE: String(Number(lastNumber) / Number(currentNumber)),
      };

      return solutions[selectedOperationType];
    };

    const handleSelectedOperationEvaluation = (selectedOperationType) => {
      setSelectedOperationType("");
      setLastCalculation(selectedOperationCalculation(selectedOperationType));
      return setCurrentNumber(
        selectedOperationCalculation(selectedOperationType)
      );
    };

    switch (selectedOperationType) {
      case OperationTypes.ADD:
        return handleSelectedOperationEvaluation(OperationTypes.ADD);
      case OperationTypes.SUBTRACT:
        return handleSelectedOperationEvaluation(OperationTypes.SUBTRACT);
      case OperationTypes.MULTIPLY:
        return handleSelectedOperationEvaluation(OperationTypes.MULTIPLY);
      case OperationTypes.DIVIDE:
        return handleSelectedOperationEvaluation(OperationTypes.DIVIDE);
      default:
        return null;
    }
  };

  const handleOperationOnClick = (selectedOperationType) => {
    setLastNumber(currentNumber);
    setSelectedOperationType(selectedOperationType);
    setIsHighlighted(selectedOperationType);
    setVisualNumber(currentNumber);
    setCurrentNumber("");
  };

  const inputNumber = (number) => {
    const currentValueIsError = currentNumber === "Error";
    const numberInputOverflow = currentNumber.length >= 9 && !lastCalculation;
    const hasSelectedOperation = selectedOperationType.length;

    if (currentValueIsError) {
      setCurrentNumber("");
      return setCurrentNumber(number);
    }

    if (numberInputOverflow) {
      return null;
    }

    if (hasSelectedOperation) {
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
      <CalculatorDisplay
        value={selectedOperationType.length ? visualNumber : currentNumber}
        type="text"
        placeholder="0"
        readOnly
      />
      <CalculatorNumberContainer>
        <NumberBlock onClick={clearInput}>AC</NumberBlock>
        <NumberBlock onClick={handleAbsClick}>+/-</NumberBlock>
        <NumberBlock onClick={handlePercentClick}>%</NumberBlock>
        <OperationBlock
          selectedOperationType={OperationTypes.DIVIDE}
          isHighlighted={isHighlighted}
          handleOperationOnClick={handleOperationOnClick}
        />
        <NumberBlock onClick={() => inputNumber("7")}>7</NumberBlock>
        <NumberBlock onClick={() => inputNumber("8")}>8</NumberBlock>
        <NumberBlock onClick={() => inputNumber("9")}>9</NumberBlock>
        <OperationBlock
          selectedOperationType={OperationTypes.MULTIPLY}
          isHighlighted={isHighlighted}
          handleOperationOnClick={handleOperationOnClick}
        />
        <NumberBlock onClick={() => inputNumber("4")}>4</NumberBlock>
        <NumberBlock onClick={() => inputNumber("5")}>5</NumberBlock>
        <NumberBlock onClick={() => inputNumber("6")}>6</NumberBlock>
        <OperationBlock
          selectedOperationType={OperationTypes.SUBTRACT}
          isHighlighted={isHighlighted}
          handleOperationOnClick={handleOperationOnClick}
        />
        <NumberBlock onClick={() => inputNumber("1")}>1</NumberBlock>
        <NumberBlock onClick={() => inputNumber("2")}>2</NumberBlock>
        <NumberBlock onClick={() => inputNumber("3")}>3</NumberBlock>
        <OperationBlock
          selectedOperationType={OperationTypes.ADD}
          isHighlighted={isHighlighted}
          handleOperationOnClick={handleOperationOnClick}
        />
      </CalculatorNumberContainer>
      <CalculatorNumberContainerBottomRow>
        <NumberBlock onClick={() => inputNumber("0")} expanded>
          0
        </NumberBlock>
        <NumberBlock onClick={() => inputNumber(".")}>.</NumberBlock>
        <NumberBlock onClick={handleEvaluation} isActionButton>
          =
        </NumberBlock>
      </CalculatorNumberContainerBottomRow>
    </>
  );
};

export default App;
