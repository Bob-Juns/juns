import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

type Props = {
  open: boolean;
  categoryMenu: CategoryMenu;
  inputs: ChannelInputs;
  setInputs: React.Dispatch<React.SetStateAction<ChannelInputs>>;
  messages: ChannelMessages;
  setMessages: React.Dispatch<React.SetStateAction<ChannelMessages>>;
};

const ChannelCategoryMenu = ({
  open,
  categoryMenu,
  inputs,
  setInputs,
  messages,
  setMessages,
}: Props) => {
  const onSelectCategory = (menu: string) => {
    setInputs({ ...inputs, category: menu });
    setMessages({ ...messages, category: '' });
  };

  return (
    <Container open={open}>
      {categoryMenu.allCategoryMenus
        .filter((menu: string) => menu !== '전체')
        .map((menu: string) => (
          <Menu key={menu} onClick={() => onSelectCategory(menu)}>
            {menu}
          </Menu>
        ))}
    </Container>
  );
};

const Container = styled.div<{ open: boolean }>`
  width: 100%;

  position: absolute;
  top: 2.25rem;
  right: 0;

  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.open ? '1' : '0')};

  background-color: #fff;

  box-shadow: ${(props) => props.theme.boxShadow.primary};
  border-radius: 0.375rem;
  z-index: 9;

  transform: ${(props) =>
    props.open ? 'translateY(0)' : 'translateY( -1rem)'};
  transition: all 0.3s ease-in-out;
`;

const Menu = styled.div`
  width: 100%;
  padding: 0.375rem 1.25rem;

  color: #000;
  font-size: 0.75rem;

  display: flex;
  justify-content: center;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  cursor: pointer;

  &: first-child {
    border-radius: 0.375rem 0.375rem 0 0;
  }

  &:last-child {
    border-bottom: none;
    border-radius: 0 0 0.375rem 0.375rem;
  }

  &:hover {
    color: ${(props) => props.theme.color.purple};
    background-color: ${(props) => props.theme.color.gray.light};
    font-weight: 700;
  }
`;

const mapStateToProps = (state: { menus: { categoryMenu: CategoryMenu } }) => ({
  categoryMenu: state.menus.categoryMenu,
});

export default connect(mapStateToProps)(ChannelCategoryMenu);
