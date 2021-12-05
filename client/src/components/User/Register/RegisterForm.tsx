import React, { useEffect, useState, useRef, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';

import AccountWarning from '@components/Account/AccountWarning';
import AccountForm from '@components/Account/AccountForm';
import AccountInput from '@components/Account/AccountInput';
import AccountButton from '@components/Account/AccountButton';

import spinnerIcon from '@assets/icons/spinner.gif';

import { isEmailFormat } from '@utils/formatCheck';
import { toast } from 'react-toastify';

type Props = {
  registerConfirmation: (userEmail: {
    userEmail: string;
    location: string;
  }) => any;
  register: (registerData: RegisterData) => any;
};

type EmailState = {
  isLoading: boolean;
  isSent: boolean;
  isConfirmed: boolean;
};

type InputState = {
  userEmail: string;
  confirmationCode: string;
  userName: string;
  userPassword: string;
  userPasswordRecheck: string;
};
interface MessageState extends InputState {
  common: string;
}

const RegisterForm = ({ registerConfirmation, register }: Props) => {
  const [emailState, setEmailState] = useState<EmailState>({
    isLoading: false,
    isSent: false,
    isConfirmed: false,
  });
  const [inputs, setInputs] = useState<InputState>({
    userEmail: '',
    confirmationCode: '',
    userName: '',
    userPassword: '',
    userPasswordRecheck: '',
  });

  const [messages, setMessages] = useState<MessageState>({
    userEmail: '',
    confirmationCode: '',
    userName: '',
    userPassword: '',
    userPasswordRecheck: '',
    common: '',
  });

  const [confirmationCode, setConfirmationCode] = useState<string>('');

  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const recheckRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      value === '' || isEmailFormat(value)
        ? setMessages({ ...messages, userEmail: '' })
        : setMessages({
            ...messages,
            userEmail: '올바른 이메일 형식이 아닙니다.',
          });
    } else if (name === 'confirmationCode') {
      value === '' || value.length === 6
        ? setMessages({ ...messages, confirmationCode: '' })
        : setMessages({
            ...messages,
            confirmationCode: '6자리 인증번호를 입력해주세요. ',
          });
    } else if (name === 'userName') {
      value === '' || value.length < 10
        ? setMessages({ ...messages, userName: '' })
        : setMessages({
            ...messages,
            userName: '2 ~ 10자리의 이름을 입력해주세요.',
          });
    } else if (name === 'userPassword') {
      value === '' || value.length >= 4
        ? setMessages({ ...messages, userPassword: '' })
        : value.length < 4
        ? setMessages({
            ...messages,
            userPassword: '4자리 이상의 비밀번호를 입력해주세요.',
          })
        : value.length > 16 &&
          setMessages({
            ...messages,
            userPassword: '16자리 이하의 비밀번호를 입력해주세요.',
          });
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClickSendEmail = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setEmailState({ ...emailState, isLoading: true });
    if (!isEmailFormat(inputs.userEmail)) {
      setMessages({
        ...messages,
        common: '올바른 이메일 형식이 아닙니다.',
      });
      setInputs({ ...inputs, userEmail: '' });
      setEmailState({ ...emailState, isLoading: false });
      emailRef.current?.focus();
    } else {
      registerConfirmation({
        userEmail: inputs.userEmail,
        location: 'register',
      })
        .then((response: { payload: { message: string; code: string } }) => {
          console.log(response.payload.code);
          setConfirmationCode(response.payload.code);
          setEmailState({
            ...emailState,
            isSent: true,
            isLoading: false,
          });
          setMessages({ ...messages, common: '' });
          codeRef.current?.focus();
        })
        .catch((error: { response: { data: { message: string } } }) => {
          setMessages({
            ...messages,
            userEmail: '',
            confirmationCode: '',
            common: error.response.data.message,
          });
          setEmailState({ ...emailState, isLoading: false });
          setInputs({ ...inputs, userEmail: '', confirmationCode: '' });
          emailRef.current?.focus();
        });
    }
  };

  const onClickConfirmEmail = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (inputs.confirmationCode === '') {
      setMessages({ ...messages, common: '인증번호를 입력해주세요.' });
      codeRef.current?.focus();
    } else if (inputs.confirmationCode.length !== 6) {
      setMessages({
        ...messages,
        common: '6자리 인증번호를 입력해주세요.',
      });
      setInputs({ ...inputs, confirmationCode: '' });
      codeRef.current?.focus();
    } else if (inputs.confirmationCode !== confirmationCode) {
      setMessages({
        ...messages,
        common: '인증번호가 일치하지 않습니다.',
      });
      setInputs({ ...inputs, confirmationCode: '' });
      codeRef.current?.focus();
    } else {
      setEmailState({ ...emailState, isConfirmed: true });
      nameRef.current?.focus();
    }
  };

  const onClickReset = () => {
    setEmailState({
      isSent: false,
      isLoading: false,
      isConfirmed: false,
    });
    setConfirmationCode('');
    setMessages({ ...messages, common: '' });
    setInputs({ ...inputs, userEmail: '', confirmationCode: '' });

    emailRef.current?.focus();
  };

  const onSubmitForm = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (inputs.userName === '') {
      setMessages({ ...messages, common: '이름을 입력해주세요.' });
      nameRef.current?.focus();
    } else if (inputs.userPassword === '') {
      setMessages({ ...messages, common: '비밀번호를 입력해주세요.' });
      passwordRef.current?.focus();
    } else if (inputs.userPassword !== inputs.userPasswordRecheck) {
      setMessages({ ...messages, common: '비밀번호가 일치하지 않습니다.' });
      setInputs({ ...inputs, userPasswordRecheck: '' });
      recheckRef.current?.focus();
    } else {
      register({
        userName: inputs.userName,
        userId: inputs.userEmail,
        userEmail: inputs.userEmail,
        userPassword: inputs.userPassword,
        registerWith: 'email',
      })
        .then((response: { payload: { message: string } }) => {
          navigate('/login', { replace: true });
          toast.success(response.payload.message);
        })
        .catch(
          (error: {
            response: { status: number; data: { message: string } };
          }) => console.log(error),
        );
    }
  };

  return (
    <AccountForm
      ask="이미 회원이신가요?"
      link="로그인"
      onClickLink={() => navigate('/login')}
      onSubmitForm={
        emailState.isConfirmed
          ? onSubmitForm
          : emailState.isSent
          ? onClickConfirmEmail
          : onClickSendEmail
      }
    >
      {messages.common !== '' && <AccountWarning message={messages.common} />}
      <Wrapper>
        <AccountInput
          message={messages.userEmail}
          type="email"
          id="userEmail"
          mode="email"
          refs={emailRef}
          value={inputs.userEmail}
          placeholder="이메일을 입력하세요"
          onChange={onChangeInputs}
          label="이메일"
          disabled={emailState.isSent ? true : false}
        />
        {emailState.isLoading ? (
          <Spinner src={spinnerIcon} />
        ) : (
          emailState.isSent && <Reset onClick={onClickReset}>변경</Reset>
        )}
      </Wrapper>
      {emailState.isSent && !emailState.isConfirmed && (
        <AccountInput
          message={messages.confirmationCode}
          type="text"
          id="confirmationCode"
          refs={codeRef}
          value={inputs.confirmationCode}
          placeholder="인증번호를 입력하세요."
          onChange={onChangeInputs}
          label="인증번호"
        />
      )}
      {emailState.isConfirmed && (
        <>
          <AccountInput
            message={messages.userName}
            type="text"
            id="userName"
            refs={nameRef}
            value={inputs.userName}
            placeholder="이름을 입력하세요."
            onChange={onChangeInputs}
            label="이름"
          />
          <AccountInput
            message={messages.userPassword}
            type="password"
            id="userPassword"
            refs={passwordRef}
            value={inputs.userPassword}
            placeholder="비밀번호를 입력하세요."
            onChange={onChangeInputs}
            max={18}
            label="비밀번호"
          />
          <AccountInput
            message={messages.userPasswordRecheck}
            type="password"
            id="userPasswordRecheck"
            refs={recheckRef}
            value={inputs.userPasswordRecheck}
            placeholder="비밀번호를 한번 더 입력하세요."
            onChange={onChangeInputs}
            max={18}
            label="비밀번호 확인"
          />
        </>
      )}
      <AccountButton
        type="submit"
        onClick={
          emailState.isConfirmed
            ? onSubmitForm
            : emailState.isSent
            ? onClickConfirmEmail
            : onClickSendEmail
        }
        text={
          emailState.isConfirmed
            ? '가입하기'
            : emailState.isSent
            ? '인증하기'
            : '인증메일 발송'
        }
      />
    </AccountForm>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const Spinner = styled.img`
  width: 1.25rem;

  position: absolute;
  top: 50%;
  right: 0.25rem;
  transform: translateY(-50%);
`;

const Reset = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.purple};

  position: absolute;
  bottom: 1.875rem;
  right: 0.25rem;

  cursor: pointer;

  &:hover {
    font-weight: 700;
  }
`;

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  registerConfirmation: (userEmail: { userEmail: string; location: string }) =>
    dispatch(actions.registerConfirmation(userEmail)),
  register: (registerData: RegisterData) =>
    dispatch(actions.register(registerData)),
});

export default connect(null, mapDispatchToProps)(RegisterForm);
