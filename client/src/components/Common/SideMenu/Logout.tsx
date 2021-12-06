import React from 'react';
import styled from 'styled-components';

type Props = {
  onClick: () => any;
};

const Logout = ({ onClick }: Props) => {
  return <_Logout onClick={onClick}>로그아웃</_Logout>;
};

const _Logout = styled.div`
  width: 100%;
  height: 3rem;
  margin-top: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;

  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: ${(props) => props.theme.color.gray};
  }
`;

export default Logout;
