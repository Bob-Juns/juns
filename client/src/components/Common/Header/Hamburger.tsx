import React from 'react';
import styled from 'styled-components';

type Props = {
  isMenuOpen: boolean;
  onClickBurger: () => void;
};

const Hamburger = ({ isMenuOpen, onClickBurger }: Props) => {
  return (
    <Burger open={isMenuOpen} onClick={onClickBurger}>
      <div />
      <div />
      <div />
    </Burger>
  );
};

const Burger = styled.button<{ open: boolean }>`
  width: 1.125rem;
  height: 1.125rem;
  padding: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);

  background-color: transparent;

  border: none;
  cursor: pointer;
  z-index: 999;

  &:focus {
    outline: none;
  }

  div {
    width: 100%;
    height: 2px;

    position: relative;
    transition: all 0.3s linear;

    :nth-child(2): after {
      content: '';
      width: 100%;
      height: 100%;
      background-color: #000;
      position: absolute;
      top: 0;
      right: 0;
    }

    ${(props) =>
      props.open
        ? `
    :first-child, :last-child {
      opacity: 0;
    }

    :first-child {
      transform: translateX(1rem);
    }

    :last-child {
      transform: translateX(-1rem);
    }

    :nth-child(2) {
      background-color: #fff;
      transform: rotate(45deg);
      &:after {
        transform: rotate(90deg);
        background-color: #fff;
      }
    }`
        : `
    background-color: #000;
    :first-child, :last-child {
      opacity: 1;
      transform: translateX(0);
    }

    :nth-child(2) {
      transform: rotate(0);
      &:after {
        transform: rotate(0);
        background-color: #000;
      }
    `}
  }
`;

export default Hamburger;
