import React, { Dispatch, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import spinnerIcon from '@assets/icons/spinner.gif';

import UserEditor from '@components/Common/User/UserEditor';

import { isEmailFormat } from '@utils/formatCheck';
import { toast } from 'react-toastify';

type Props = {
  emailConfirmation: (userEmail: string) => any;
  updateEmail: (userEmail: string) => any;
};

const UpdateEmail = ({ emailConfirmation, updateEmail }: Props) => {
  const [emailState, setEmailState] = useState({
    isLoading: false,
    isSent: false,
  });

  const [confirmationCode, setConfirmationCode] = useState<string>('');

  const [inputs, setInputs] = useState({
    userEmail: '',
    confirmationCode: '',
  });

  const [messages, setMessages] = useState({
    userEmail: '',
    confirmationCode: '',
  });

  const navigate = useNavigate();

  const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;

    if (id === 'userEmail') {
      value === '' || isEmailFormat(value)
        ? setMessages({ ...messages, userEmail: '' })
        : setMessages({
            ...messages,
            userEmail: '올바른 이메일 형식이 아닙니다.',
          });
    }

    setInputs({ ...inputs, [id]: value });
  };

  const onClickSend = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();

    setEmailState({ ...emailState, isLoading: true });
    if (!isEmailFormat(inputs.userEmail)) {
      setMessages({ ...messages, userEmail: '올바른 이메일 형식이 아닙니다.' });
      setInputs({ ...inputs, userEmail: '' });
      setEmailState({ ...emailState, isLoading: false });
    } else {
      emailConfirmation(inputs.userEmail)
        .then((response: { payload: { message: string; code: string } }) => {
          setConfirmationCode(response.payload.code);
          setEmailState({
            ...emailState,
            isSent: true,
            isLoading: false,
          });
          setMessages({ ...messages, userEmail: '' });
          toast.success(response.payload.message);
        })
        .catch((error: ErrorMessageResponse) => {
          setMessages({
            ...messages,
            userEmail: error.response.data.message,
            confirmationCode: '',
          });
          setInputs({
            ...inputs,
            userEmail: '',
          });
          setEmailState({
            ...emailState,
            isLoading: false,
          });
        });
    }
  };

  const onClickReset = () => {
    setEmailState({
      isSent: false,
      isLoading: false,
    });
    setConfirmationCode('');
    setMessages({ userEmail: '', confirmationCode: '' });
    setInputs({ userEmail: '', confirmationCode: '' });
  };

  const onSubmitForm = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();

    if (inputs.confirmationCode === '') {
      setMessages({
        ...messages,
        confirmationCode: '인증번호를 입력해주세요.',
      });
    } else if (inputs.confirmationCode !== confirmationCode) {
      setMessages({
        ...messages,
        confirmationCode: '인증번호가 일치하지 않습니다.',
      });
      setInputs({ ...inputs, confirmationCode: '' });
    } else {
      updateEmail(inputs.userEmail).then((response: MessageResponse) => {
        onClickReset();
        navigate('/');
        toast.success(response.payload.message);
      });
    }
  };

  return (
    <UserEditor
      title="이메일 등록"
      onSubmitForm={emailState.isSent ? onSubmitForm : onClickSend}
    >
      <Wrapper>
        <Label htmlFor="userEmail">이메일</Label>
        <Input
          type="email"
          id="userEmail"
          value={inputs.userEmail}
          placeholder="인증번호를 받을 이메일을 입력하세요."
          onChange={onChangeInputs}
          disabled={emailState.isSent ? true : false}
        />

        {emailState.isLoading ? (
          <Spinner src={spinnerIcon} />
        ) : emailState.isSent ? (
          <Change type="button" onClick={onClickReset}>
            변경
          </Change>
        ) : (
          <Send type="submit" onClick={onClickSend}>
            발송
          </Send>
        )}
      </Wrapper>
      <Message>{messages.userEmail}</Message>
      {emailState.isSent && (
        <>
          <Wrapper>
            <Label htmlFor="confirmationCode">인증번호</Label>
            <Input
              type="text"
              id="confirmationCode"
              value={inputs.confirmationCode}
              placeholder="인증번호를 입력해주세요."
              onChange={onChangeInputs}
            />
            <Message>{messages.confirmationCode}</Message>
          </Wrapper>
          <Button type="submit" onClick={onSubmitForm}>
            인증
          </Button>
        </>
      )}
    </UserEditor>
  );
};

const Wrapper = styled.div`
  margin-top: 1rem;
  position: relative;
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

  &: disabled {
    color: ${(props) => props.theme.color.gray.base};
  }
`;

const Message = styled.div`
  margin-top: 0.375rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.red};
`;

const Send = styled.button`
  width: 3rem;

  padding: 0.375rem 0.75rem;
  color: #fff;
  background-color: ${(props) => props.theme.color.green};
  border-radius: 0.375rem;

  font-size: 0.625rem;
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0.375rem;
  right: 0;
`;

const Change = styled(Send)`
  color: ${(props) => props.theme.color.gray.base};
  background-color: ${(props) => props.theme.color.gray.light};

  &: hover {
    color: #fff;
    background-color: ${(props) => props.theme.color.gray.base};
  }
`;

const Spinner = styled.img`
  width: 1rem;

  position: absolute;
  bottom: 0.375rem;
  right: 0;
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
  emailConfirmation: (userEmail: string) =>
    dispatch(actions.emailConfirmation(userEmail)),
  updateEmail: (userEmail: string) => dispatch(actions.updateEmail(userEmail)),
});

export default connect(null, mapDispatchToProps)(UpdateEmail);
