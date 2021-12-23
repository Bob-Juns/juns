import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';

import UserSearch from './UserSearch';
import UserDropdown from './UserDropdown';
import { actions } from 'store';
import { connect } from 'react-redux';

type Props = {
  authorityMenu: AuthorityMenu;
  getFilteredUsers: (payload: FilterState) => void;
  selectAuthorityMenu: (payload: CurrentAuthorityMenu) => void;
};

const UserFilter = ({
  authorityMenu,
  getFilteredUsers,
  selectAuthorityMenu,
}: Props) => {
  const [input, setInput] = useState<string>('');

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    getFilteredUsers({
      query: event.currentTarget.value,
      filter:
        authorityMenu.currentAuthorityMenu === '관리자'
          ? true
          : authorityMenu.currentAuthorityMenu === '일반'
          ? false
          : '권한',
    });
    setInput(event.currentTarget.value);
  };

  const onSelectAuthority = (filter: string) => {
    selectAuthorityMenu(filter);
    getFilteredUsers({
      query: input,
      filter: filter === '관리자' ? true : filter === '일반' ? false : '권한',
    });
  };

  return (
    <Container>
      <UserSearch input={input} onChangeInput={onChangeInput} />
      <UserDropdown onSelectAuthority={onSelectAuthority} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const mapStateToProps = (state: {
  menus: { authorityMenu: AuthorityMenu };
}) => ({
  authorityMenu: state.menus.authorityMenu,
});

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  getFilteredUsers: (payload: FilterState) =>
    dispatch(actions.getFilteredUsers(payload)),
  selectAuthorityMenu: (payload: CurrentAuthorityMenu) =>
    dispatch(actions.selectAuthorityMenu(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserFilter);
