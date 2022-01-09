import React from 'react';

import styled from 'styled-components';

import spinnerIcon from '@assets/icons/spinner.gif';

const Loader = () => {
  return (
    <Background>
      <Spinner src={spinnerIcon} />
    </Background>
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 9999;
`;

const Spinner = styled.img`
  width: 3.125rem;

  ${(props) =>
    props.theme.device('tablet')(`
width: 5rem;
  `)}
`;

export default Loader;
