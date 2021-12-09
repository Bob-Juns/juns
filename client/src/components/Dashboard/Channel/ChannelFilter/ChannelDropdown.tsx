import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import chevronIcon from '@assets/icons/chevron.svg';
import ChannelDropdownMenu from './ChannelDropdownMenu';

const ChannelDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const focusRef = useRef<HTMLDivElement>(null);

  const onClickOutside = (event: any) => {
    if (focusRef.current && !focusRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    isDropdownOpen && document.addEventListener('click', onClickOutside, true);
    return () => {
      document.removeEventListener('click', onClickOutside, true);
    };
  }, [focusRef, isDropdownOpen]);

  return (
    <Container
      onClick={() => setIsDropdownOpen((prev) => !prev)}
      ref={focusRef}
    >
      <ChannelDropdownMenu open={isDropdownOpen} />
      <Selected>카테고리</Selected>
      <Chevron open={isDropdownOpen} />
    </Container>
  );
};

const Container = styled.div`
  width: 6rem;
  height: 2rem;
  margin-left: auto;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  position: relative;
  border-radius: 50px;
  background-color: #fff;

  cursor: pointer;
`;
const Selected = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.purple};
`;

const Chevron = styled(chevronIcon)<{ open: boolean }>`
  width: 0.625rem;
  color: ${(props) => props.theme.color.purple};
  transform: ${(props) => (props.open ? 'rotate(0)' : 'rotate(180deg)')};
  transition: all 0.3s linear;
`;

export default ChannelDropdown;
