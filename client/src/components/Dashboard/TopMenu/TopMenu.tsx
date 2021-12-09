import React, { Dispatch } from 'react';

import styled from 'styled-components';
import TopMenuItem from '@components/Dashboard/TopMenu/TopMenuItem';

type Props = {
  menus: string[];
  currentMenu: string;
  setCurrentMenu: React.Dispatch<React.SetStateAction<string>>;
};

const TopMenu = ({ menus, currentMenu, setCurrentMenu }: Props) => {
  return (
    <Container>
      {menus.map((menu: string) => (
        <TopMenuItem
          key={menu}
          menu={menu}
          onClick={() => setCurrentMenu(menu)}
          selected={currentMenu === menu}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 3rem;

  padding: 0 3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 3.75rem;
  left: 50%;

  transform: translateX(-50%);
  border-bottom: 1px solid ${(props) => props.theme.color.yellow};
`;

export default TopMenu;
