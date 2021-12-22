import React, { Dispatch, useState, useRef } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';

import UserEditor from '@components/Common/User/UserEditor';
import { toast } from 'react-toastify';

type Props = {
  updatePassword: (userPassword: string, newPassword: string) => any;
};

const UpdatePassword = ({ updatePassword }: Props) => {
  const [inputs, setInputs] = useState<PasswordState>({
    userPassword: '',
    newPassword: '',
    recheck: '',
  });

  const [messages, setMessages] = useState<PasswordState>({
    userPassword: '',
    newPassword: '',
    recheck: '',
  });

  const userPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const recheckRef = useRef<HTMLInputElement>(null);

  const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;

    if (inputs.userPassword !== '') {
      setMessages({ ...messages, userPassword: '' });
    }
    if (inputs.newPassword !== '') {
      setMessages({ ...messages, newPassword: '' });
    }
    if (inputs.recheck !== '') {
      setMessages({ ...messages, recheck: '' });
    }

    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  const onSubmitForm = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();

    if (inputs.userPassword === '') {
      setMessages({
        ...messages,
        userPassword: '기존 비밀번호를 확인해주세요.',
      });
      userPasswordRef.current?.focus();
    } else if (inputs.newPassword === '') {
      setMessages({ ...messages, newPassword: '새 비밀번호를 입력해주세요.' });
      newPasswordRef.current?.focus();
    } else if (inputs.recheck === '') {
      setMessages({
        ...messages,
        recheck: '새 비밀번호를 다시 한번 입력해주세요.',
      });
      recheckRef.current?.focus();
    } else if (inputs.newPassword !== inputs.recheck) {
      setMessages({ ...messages, recheck: '비밀번호가 일치하지 않습니다.' });
      setInputs({
        ...inputs,
        recheck: '',
      });
      recheckRef.current?.focus();
    } else {
      updatePassword(inputs.userPassword, inputs.newPassword)
        .then((response: MessageResponse) => {
          setInputs({
            userPassword: '',
            newPassword: '',
            recheck: '',
          });
          setMessages({
            userPassword: '',
            newPassword: '',
            recheck: '',
          });
          toast.success(response.payload.message);
        })
        .catch((error: ErrorResponse) => {
          if (error.response.status === 409) {
            setInputs({ ...inputs, userPassword: '' });
            userPasswordRef.current?.focus();
            setMessages({
              ...messages,
              userPassword: error.response.data.message,
            });
          } else if (error.response.status === 400) {
            setInputs({ ...inputs, newPassword: '', recheck: '' });
            newPasswordRef.current?.focus();
            setMessages({
              ...messages,
              newPassword: error.response.data.message,
            });
            toast.warning(error.response.data.message);
          } else {
            setInputs({
              userPassword: '',
              newPassword: '',
              recheck: '',
            });
            toast.warning(error.response.data.message);
            userPasswordRef.current?.focus();
          }
        });
    }
  };

  return (
    <UserEditor title="비밀번호 변경" onSubmitForm={onSubmitForm}>
      <Wrapper>
        <Label htmlFor="userPassword">기존 비밀번호</Label>
        <Input
          type="password"
          id="userPassword"
          value={inputs.userPassword}
          ref={userPasswordRef}
          placeholder="기존 비밀번호를 입력하세요."
          onChange={onChangeInputs}
        />
        <Message>{messages.userPassword}</Message>
      </Wrapper>
      <Wrapper>
        <Label htmlFor="newPassword">새 비밀번호</Label>
        <Input
          type="password"
          id="newPassword"
          value={inputs.newPassword}
          ref={newPasswordRef}
          placeholder="새 비밀번호를 입력하세요."
          onChange={onChangeInputs}
        />
        <Message>{messages.newPassword}</Message>
      </Wrapper>
      <Wrapper>
        <Label htmlFor="recheck">비밀번호 확인</Label>
        <Input
          type="password"
          id="recheck"
          value={inputs.recheck}
          ref={recheckRef}
          placeholder="비밀번호를 다시 한번 입력하세요."
          onChange={onChangeInputs}
        />
        <Message>{messages.recheck}</Message>
      </Wrapper>

      <Button type="submit">변경</Button>
    </UserEditor>
  );
};

const Wrapper = styled.div`
  margin-top: 1rem;
  &: first-child {
    margin-top: 0.75rem;
  }
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

const Message = styled.div`
  margin-top: 0.375rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.red};
`;

const Button = styled.button`
  width: 3rem;
  padding: 0.375rem 0.75rem;
  margin: 1rem 0 0 auto;

  color: #fff;
  background-color: ${(props) => props.theme.color.green};

  font-size: 0.625rem;
  font-weight: 700;

  border-radius: 0.375rem;
`;

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  updatePassword: (userPassword: string, newPassword: string) =>
    dispatch(actions.updatePassword(userPassword, newPassword)),
});

export default connect(null, mapDispatchToProps)(UpdatePassword);
