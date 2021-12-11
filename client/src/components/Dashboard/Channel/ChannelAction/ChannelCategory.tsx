import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import chevronIcon from '@assets/icons/chevron.svg';

const ChannelCategory = () => {
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
    <Container>
      <Label>카테고리</Label>
      <Wrapper
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        ref={focusRef}
      >
        <Selected>선택</Selected>
        <Chevron open={isDropdownOpen} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100vw / 2 - 2rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
`;

const Label = styled.div`
  color: ${(props) => props.theme.color.purple};

  font-size: 1rem;
  font-weight: 700;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 2rem;
  margin-top: 0.75rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  background-color: ${(props) => props.theme.color.purple};
  border-radius: 3.125rem;

  cursor: pointer;
`;

const Selected = styled.div`
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
`;

const Chevron = styled(chevronIcon)<{ open: boolean }>`
  width: 0.625rem;
  color: #fff;

  position: absolute;
  right: 1rem;

  transform: ${(props) => (props.open ? 'rotate(0) ' : 'rotate(180deg)')};
  transition: all 0.3s linear;
`;

export default ChannelCategory;
