import React, { Dispatch, useEffect, useState } from 'react';

import styled from 'styled-components';

import searchIcon from '@assets/icons/search.svg';
import { actions } from 'store';
import { connect } from 'react-redux';

type Props = {
  intersection: AllUsers;
  authorityMenu: AuthorityMenu;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  getSearchedUsers: (payload: string) => any;
};

const UserSearch = ({
  intersection,
  setMessage,
  authorityMenu,
  getSearchedUsers,
}: Props) => {
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (intersection.length < 1) {
      setMessage('일치하는 유저가 없습니다.');
    } else {
      setMessage('');
    }
    getSearchedUsers(input);
  }, [authorityMenu.currentAuthorityMenu]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length > 0 && intersection.length < 1) {
      setMessage('일치하는 유저가 없습니다.');
    } else {
      setMessage('');
    }
    getSearchedUsers(event.currentTarget.value.toLowerCase());
    setInput(event.currentTarget.value);
  };
  return (
    <Container>
      <Wrapper>
        <Icon />
      </Wrapper>
      <Input
        type="search"
        name="search"
        value={input}
        onChange={onChangeInput}
        inputMode="search"
        placeholder="검색"
      />
    </Container>
  );
};

const Container = styled.div`
  height: 2rem;
  display: flex;
  position: relative;
  border-radius: 3.125rem;
  box-shadow: ${(props) => props.theme.boxShadow.primary};
`;

const Wrapper = styled.div`
  width: 2.2rem;
  height: 2rem;

  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 3.125rem 0 0 3.125rem;
`;

const Icon = styled(searchIcon)`
  width: 0.75rem;
  height: 0.75rem;

  color: ${(props) => props.theme.color.purple};
`;

const Input = styled.input`
  width: 3rem;
  height: 2rem;
  padding-right: 0.75rem;

  background-color: #fff;

  font-size: 0.75rem;

  border-radius: 0 3.125rem 3.125rem 0;
  transition: width 0.3s ease-in-out;

  &:focus {
    width: 7.5rem;
  }
`;

const mapStateToProps = (state: {
  menus: { authorityMenu: AuthorityMenu };
}) => ({
  authorityMenu: state.menus.authorityMenu,
});

const mapDispatchToProps = (dispatch: Dispatch<UserAction | MenuAction>) => ({
  getSearchedUsers: (payload: string) =>
    dispatch(actions.getSearchedUsers(payload)),
  selectAuthorityMenu: (payload: string) =>
    dispatch(actions.getFilteredUsers(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
