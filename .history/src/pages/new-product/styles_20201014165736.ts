import styled from 'styled-components';

const Button = styled.button`
  border-radius: 5px;
  display: inline-grid;
  height: 40px;
  place-items: center;
  font-weight: bold;
  font-size: 14px;
  border: none;
  cursor: pointer;
  width: 100px;
`;

export const ResetButton = styled(Button)`
  background: var(--primary-light);
  color: var(--primary-dark);
  :hover {
    background: var(--secondary-light);
    color: var(--secondary-dark);
  }
`;

export const SendButton = styled(Button)`
  background: var(--primary);
  color: var(--secondary-light);
  margin-left: 12px;
  :hover {
    background: var(--secondary-light);
    color: var(--secondary-dark);
  }
`;

export const Error = styled.p`
  color: red;
`;

export const DeleteImg = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background: lightgray;
  color: red;
  border-radius: 50%;
  height: 14px;
  width: 14px;
  cursor: pointer;
`;

export const ButtonsDiv = styled.div`
  display: flex;
  width: 100%;
  align-content: flex-end;
  flex-flow: row nowrap;
  line-height: 1.4285em;
  margin-bottom: 60px;
`;