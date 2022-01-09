import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import chevronIcon from '@assets/icons/chevron.svg';
import ChannelDropdownMenu from './ChannelDropdownMenu';

type Props = {
  categoryMenu: CategoryMenu;
  onSelectCategory: (filter: string) => void;
};

const ChannelDropdown = ({ categoryMenu, onSelectCategory }: Props) => {
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
      <ChannelDropdownMenu
        open={isDropdownOpen}
        onSelectCategory={onSelectCategory}
      />
      <Selected>
        {categoryMenu.currentCategoryMenu === '전체'
          ? '카테고리'
          : categoryMenu.currentCategoryMenu}
      </Selected>
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

  background-color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow.primary};
  border-radius: 3.125rem;

  cursor: pointer;

  ${(props) =>
    props.theme.device('tablet')(`
  width: 8rem;
  height: 2.5rem;
  `)}
`;
const Selected = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.purple};

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1rem;
  `)}
`;

const Chevron = styled(chevronIcon)<{ open: boolean }>`
  width: 0.625rem;
  height: 0.625rem;
  color: ${(props) => props.theme.color.purple};
  transform: ${(props) => (props.open ? 'rotate(0)' : 'rotate(180deg)')};
  transition: all 0.3s linear;

  ${(props) =>
    props.theme.device('tablet')(`
  width: 0.75rem;
  height: 0.75rem;
  `)}
`;

const mapStateToProps = (state: { menus: { categoryMenu: CategoryMenu } }) => ({
  categoryMenu: state.menus.categoryMenu,
});

export default connect(mapStateToProps)(ChannelDropdown);
