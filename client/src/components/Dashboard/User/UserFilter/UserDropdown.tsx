import React, { useState, useEffect, useRef } from 'react';

import { connect } from 'react-redux';

import styled from 'styled-components';
import UserDropdownMenu from './UserDropdownMenu';

import chevronIcon from '@assets/icons/chevron.svg';

type Props = {
  authorityMenu: AuthorityMenu;
  onSelectAuthority: (filter: string) => void;
};

const UserDropdown = ({ authorityMenu, onSelectAuthority }: Props) => {
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
      <UserDropdownMenu
        open={isDropdownOpen}
        onSelectAuthority={onSelectAuthority}
      />
      <Selected>
        {authorityMenu.currentAuthorityMenu === '전체'
          ? '권한'
          : authorityMenu.currentAuthorityMenu}
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
  width: 7rem;
  height: 3rem;
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

const mapStateToProps = (state: {
  menus: { authorityMenu: AuthorityMenu };
}) => ({
  authorityMenu: state.menus.authorityMenu,
});

export default connect(mapStateToProps)(UserDropdown);
