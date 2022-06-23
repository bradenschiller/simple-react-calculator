import * as React from "react";
import "./App.css";
import styled from "styled-components";

const CalculatorInput = styled.input`
  width: 293px;
  height: 4rem;
  border: none;
  text-align: end;
  font-size: 2rem;
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
  border: 0.25px solid black;
`;

const calculatorNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO: add function to input numbers
// TODO: abstract the components
// TODO: think on how to add each function action type

/*
- Add Function
- Subtract Function
- Divide Function
- Multiply Function
- Equals Actions
- Preserve last action
*/

const App = () => {
  const [setLastCalculation, lastCalculation] = React.useState(null);
  const [setCurrentNumber, currentNumber] = React.useState(null);
  const [setLastNumber, lastNumber] = React.useState(null);

  return (
    <>
      <CalculatorInput type="text" placeholder="0" />
      <CalculatorNumberContainer>
        <NumberBlock onClick={() => console.log("AC")}>AC</NumberBlock>
        <NumberBlock>+/-</NumberBlock>
        <NumberBlock>%</NumberBlock>
        <NumberBlock action>/</NumberBlock>
        <NumberBlock>7</NumberBlock>
        <NumberBlock>8</NumberBlock>
        <NumberBlock>9</NumberBlock>
        <NumberBlock action>x</NumberBlock>
        <NumberBlock>4</NumberBlock>
        <NumberBlock>5</NumberBlock>
        <NumberBlock>6</NumberBlock>
        <NumberBlock action>-</NumberBlock>
        <NumberBlock>1</NumberBlock>
        <NumberBlock>2</NumberBlock>
        <NumberBlock>3</NumberBlock>
        <NumberBlock action>+</NumberBlock>
      </CalculatorNumberContainer>
      <CalculatorNumberContainerBottomRow>
        <NumberBlock expanded>0</NumberBlock>
        <NumberBlock>.</NumberBlock>
        <NumberBlock action>=</NumberBlock>
      </CalculatorNumberContainerBottomRow>
    </>
  );
};

export default App;
