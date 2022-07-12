import React from "react";
import styled from "styled-components";

const Block = styled.button`
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

const OperationSymbols = {
  ["ADD"]: "+",
  ["SUBTRACT"]: "-",
  ["MULTIPLY"]: "x",
  ["DIVIDE"]: "/",
};

const operationSymbol = (operation) => operationSymbols[operation];

const OperationBlock = (operation, inputHighlight) => {
  return (
    <Block inputHighlight={inputHighlight} operation={operation}>
      {operationSymbol(operation)}
    </Block>
  );
};

export default OperationBlock;
