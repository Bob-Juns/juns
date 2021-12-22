import React, { Dispatch, useState, useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import lockIcon from '@assets/icons/lock.svg';

import styled from 'styled-components';
import Modal from '@components/Common/Modal/Modal';

import { isEmailFormat } from '@utils/formatCheck';
import { toast } from 'react-toastify';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetPassword: (userEmail: string) => any;
};

const ResetPasswordModal = ({
  isModalOpen,
  setIsModalOpen,
  resetPassword,
}: Props) => {
  const [input, setInput] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const focusRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setInput('');
    setMessage('');
  };

  useEffect(() => {
    isModalOpen ? focusRef.current?.focus() : resetState();
    return () => resetState();
  }, [isModalOpen]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (!isEmailFormat(value) || value === '') {
      setMessage('올바른 이메일 형식이 아닙니다.');
    } else {
      setMessage('');
    }
    setInput(value);
  };
  const onSubmitForm = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (input === '') {
      setMessage('이메일을 입력해주세요.');
      focusRef.current?.focus();
    } else {
      resetPassword(input)
        .then((response: MessageResponse) => {
          setIsModalOpen(false);
          toast.success(response.payload.message);
        })
        .catch((error: ErrorResponse) => {
          if (error.response.status === 409) {
            toast.warning(error.response.data.message);
            setMessage(error.response.data.message);
            setTimeout(() => {
              setIsModalOpen(false);
            }, 1000);
          } else {
            setMessage(error.response.data.message);
            setInput('');
          }
        });
    }
  };
  return (
    <Modal
      open={isModalOpen}
      icon={<Lock />}
      title="비밀번호 재설정"
      onClickCancel={() => setIsModalOpen(false)}
      onClickConfirm={onSubmitForm}
    >
      <div>재설정된 비밀번호를 이메일로 발송합니다.</div>
      <form onSubmit={onSubmitForm}>
        <Input
          type="text"
          id="reset"
          inputMode="email"
          value={input}
          ref={focusRef}
          placeholder="가입시 등록한 이메일을 입력해주세요."
          onChange={onChangeInput}
        />
        <Message>{message}</Message>
      </form>
    </Modal>
  );
};

const Lock = styled(lockIcon)`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 1.25rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray.base};
`;

const Message = styled.div`
  height: 0.75rem;
  font-size: 0.75rem;
  margin: 0.25rem 0 1.25rem 0;
  color: ${(props) => props.theme.color.red};
`;

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  resetPassword: (userEmail: string) =>
    dispatch(actions.resetPassword(userEmail)),
});

export default connect(null, mapDispatchToProps)(ResetPasswordModal);
