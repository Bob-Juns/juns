import React, { useEffect, useState, useRef, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import AccountForm from '@components/Account/AccountForm';

import exclamationIcon from '@assets/icons/exclamation.svg';

import { isEmailFormat } from '@utils/formatCheck';
import { toast } from 'react-toastify';

type Props = {
  login: (loginData: LoginData) => any;
};

const LoginForm = ({ login }: Props) => {
  const [inputs, setInputs] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const [messages, setMessages] = useState<{
    email: string;
    password: string;
    common: string;
  }>({
    email: '',
    password: '',
    common: '',
  });

  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === 'email') {
      value === '' || isEmailFormat(value)
        ? setMessages({ ...messages, email: '' })
        : setMessages({ ...messages, email: '올바른 이메일 형식이 아닙니다.' });
    } else {
      value === '' || value.length >= 4
        ? setMessages({ ...messages, password: '' })
        : setMessages({
            ...messages,
            password: '4글자 이상의 비밀번호를 입력해 주세요.',
          });
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClickLink = () => {
    navigate('/register');
  };
  const onSubmitForm = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (inputs.email === '') {
      setMessages({ ...messages, email: '이메일을 입력하세요.' });
      emailRef.current?.focus();
    } else if (inputs.password === '') {
      setMessages({ ...messages, password: '비밀번호를 입력하세요.' });
      passwordRef.current?.focus();
    } else {
      login({ userEmail: inputs.email, password: inputs.password })
        .then((response: { status: number; payload: { message: string } }) => {
          setInputs({ email: '', password: '' });
          navigate('/');
          toast.success(response.payload.message);
        })
        .catch(
          (error: {
            response: { status: number; data: { message: string } };
          }) => {
            if (error.response.status === 404) {
              setMessages({
                ...messages,
                common: error.response.data.message,
              });
              setInputs({ ...inputs, email: '' });
              emailRef.current?.focus();
            } else if (
              error.response.data.message == '비밀번호가 일치하지 않습니다.'
            ) {
              setMessages({
                ...messages,
                common: error.response.data.message,
              });
              setInputs({
                ...inputs,
                password: '',
              });
              passwordRef.current?.focus();
            } else {
              setMessages({
                email: '',
                password: '',
                common: error.response.data.message,
              });
              setInputs({
                email: '',
                password: '',
              });
              emailRef.current?.focus();
            }
          },
        );
    }
  };

  return (
    <AccountForm
      ask="회원이 아니신가요?"
      link="회원가입"
      onClickLink={onClickLink}
      onSubmitForm={onSubmitForm}
    >
      {messages.common !== '' && (
        <Common>
          <Exclamation />
          <Content>{messages.common}</Content>
        </Common>
      )}

      <Wrapper>
        <Message>{messages.email}</Message>
        <Input
          id="email"
          name="email"
          type="email"
          ref={emailRef}
          value={inputs.email}
          placeholder="이메일을 입력하세요."
          onChange={onChangeInputs}
        />
        <Label htmlFor="email">이메일</Label>
      </Wrapper>
      <Wrapper>
        <Message>{messages.password}</Message>
        <Input
          id="password"
          name="password"
          type="password"
          ref={passwordRef}
          value={inputs.password}
          placeholder="비밀번호를 입력하세요."
          onChange={onChangeInputs}
        />
        <Label htmlFor="password">비밀번호</Label>
      </Wrapper>
      <Button type="submit" onClick={onSubmitForm}>
        로그인
      </Button>
    </AccountForm>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column-reverse;
`;

const Message = styled.div`
  margin: 0.375rem 0 0 0.25rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.red};
`;

const Common = styled.div`
  width: 100%;
  height: 2rem;
  margin-top: 2rem;
  padding: 0 1rem;

  background-color: ${(props) => props.theme.color.warning.light};

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const Exclamation = styled(exclamationIcon)`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  color: ${(props) => props.theme.color.warning.dark};

  position: absolute;
  left: 1rem;
`;

const Content = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.warning.dark};
`;

const Label = styled.label`
  width: 100%;

  color: ${(props) => props.theme.color.purple};
  opacity: 0.5;

  font-size: 1rem;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem 0.25rem;
  opacity: 0.5;

  border-bottom: 1px solid ${(props) => props.theme.color.gray};

  &:focus {
    opacity: 1;
    border-bottom: 2px solid ${(props) => props.theme.color.purple};
  }

  &:focus + ${Label} {
    opacity: 1;
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 2rem;
  padding: 1rem 0.5rem;

  color: #fff;
  background-color: ${(props) => props.theme.color.purple};

  font-size: 1rem;
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.375rem;
`;

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  login: (loginData: LoginData) => dispatch(actions.login(loginData)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
