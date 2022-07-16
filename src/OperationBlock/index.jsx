import React from "react";
import styled from "styled-components";
import { OperationSymbols } from "../Constants";

const Block = styled.button`
  width: ${(props) => (props.expanded ? "200px" : "100px")};
  height: 100px;
  background-color: ${(props) =>
    props.isHighlighted === props.operationType ? "white" : "orange"};
  color: ${(props) =>
    props.isHighlighted === props.operationType ? "orange" : "white"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border: 0.25rem solid black;
  border-radius: 50%;
`;

const operationSymbol = (selectedOperationType) =>
  OperationSymbols[selectedOperationType];

const OperationBlock = ({
  selectedOperationType,
  isHighlighted,
  handleOperationOnClick,
}) => {
  return (
    <Block
      onClick={() => handleOperationOnClick(selectedOperationType)}
      isHighlighted={isHighlighted}
      operationType={selectedOperationType}
    >
      {operationSymbol(selectedOperationType)}
    </Block>
  );
};

export default OperationBlock;
