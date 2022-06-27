import styled from "styled-components";

const Block = styled.button`
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

const handleOnClick = (currentNumber, setCurrentNumber, number) =>
  setCurrentNumber(`${currentNumber}${number}`);

const NumberBlock = ({ number, setCurrentNumber, currentNumber }) => {
  <Block onClick={() => handleOnClick(currentNumber, setCurrentNumber, number)}>
    {number}
  </Block>;
};

export default NumberBlock;
