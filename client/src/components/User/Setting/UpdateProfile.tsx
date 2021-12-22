import React, { Dispatch, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';

import UserEditor from '@components/Common/User/UserEditor';

import { toast } from 'react-toastify';

type Props = {
  users: User;
  checkAuth: () => any;
  updateProfile: (userName: string) => any;
};

const UpdateProfile = ({ users, checkAuth, updateProfile }: Props) => {
  const [input, setInput] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    message !== '' && setMessage('');
    setInput(event.currentTarget.value);
  };

  const onSubmitForm = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (users.currentUser.userName === input) {
      setMessage('기존 이름과 같은 이름입니다.');
      setInput('');
      inputRef.current?.focus();
    } else {
      updateProfile(input)
        .then((response: MessageResponse) => {
          setInput('');
          setMessage('');
          checkAuth().then(() => toast.success(response.payload.message));
        })
        .catch((error: ErrorMessageResponse) => {
          setInput('');
          setMessage(error.response.data.message);
        });
    }
  };

  return (
    <UserEditor title="프로필 편집" onSubmitForm={onSubmitForm}>
      <Wrapper>
        <Label htmlFor="user">이름</Label>
        <Input
          type="text"
          id="user"
          value={input}
          ref={inputRef}
          placeholder={users.currentUser.userName}
          onChange={onChangeInput}
        />
        <Button type="submit" onClick={onSubmitForm}>
          변경
        </Button>
      </Wrapper>
      <Message>{message}</Message>
    </UserEditor>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 0.75rem;
`;

const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.green};
`;

const Input = styled.input`
  width: 100%;
  margin-top: 0.375rem;
  padding-bottom: 0.375rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray.base};
`;

const Button = styled.button`
  width: 3rem;
  padding: 0.375rem 0.75rem;
  color: #fff;
  background-color: ${(props) => props.theme.color.green};
  border-radius: 0.375rem;

  font-size: 0.625rem;
  font-weight: 700;

  position: absolute;
  bottom: 0.375rem;
  right: 0;
`;

const Message = styled.div`
  margin-top: 0.375rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.red};
`;
const mapStateToProps = (state: { users: User }) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  checkAuth: () => dispatch(actions.checkAuth()),
  updateProfile: (userName: string) =>
    dispatch(actions.updateProfile(userName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
