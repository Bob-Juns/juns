import React, { Dispatch, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import UpdateEditor from '@components/Common/User/UserEditor';

import { toast } from 'react-toastify';

type Props = {
  users: User;
  withdraw: () => any;
};

const Withdraw = ({ users, withdraw }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const navigate = useNavigate();
  const { Kakao } = window as any;

  const onClickConfirm = () => {
    setIsChecked((prev) => !prev);
  };
  const onSubmitForm = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();

    withdraw()
      .then((response: MessageResponse) => {
        if (users.currentUser.registerWith === 'kakao') {
          Kakao.API.request({ url: '/v1/user/unlink' });
        }
        navigate('/', { replace: true });
        toast.success(response.payload.message);
      })
      .catch((error: ErrorMessageResponse) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <UpdateEditor title="서비스 탈퇴" onSubmitForm={onSubmitForm}>
      <Wrapper>
        <Notice>탈퇴 시 모든 정보 및 기록이 삭제 됩니다.</Notice>
        <Notice>삭제된 정보 및 기록은 복구할 수 없습니다.</Notice>
      </Wrapper>
      <Checker>
        <Input
          type="checkbox"
          id="check"
          onChange={onClickConfirm}
          checked={isChecked}
        />
        <Desc isChecked={isChecked} htmlFor="check">
          유의사항을 모두 확인했습니다.
        </Desc>
        <Button type="submit" onClick={onSubmitForm} disabled={!isChecked}>
          탈퇴
        </Button>
      </Checker>
    </UpdateEditor>
  );
};
const Wrapper = styled.ul`
  margin-top: 0.75rem;
  padding: 0.75rem 0;
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid ${(props) => props.theme.color.gray.base};
`;

const Notice = styled.li`
  font-size: 0.75rem;
  margin-top: 0.375rem;
  &:first-child {
    margin-top: 0;
  }

  &:before {
    content: '· ';
  }
`;

const Checker = styled.div`
  width: 100%;
  margin-top: 0.75rem;
  display: flex;
  align-items: flex-start;
`;

const Input = styled.input<{ checked: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.5rem;
  line-height: 0.9;
  position: relative;

  border: 1px solid ${(props) => props.theme.color.gray.base};

  cursor: pointer;

  &: checked {
    border: 1px solid ${(props) => props.theme.color.green};
    &: after {
      content: '';
      width: 0.375rem;
      height: 0.375rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: ${(props) => props.theme.color.green};
    }
  }
`;

const Desc = styled.label<{ isChecked: boolean }>`
  width: fit-content;
  font-size: 0.75rem;
  font-weight: ${(props) => props.isChecked && '700'};

  color: ${(props) =>
    props.isChecked ? props.theme.color.green : props.theme.color.gray.base};

  transform: translateY(-1px);
  cursor: pointer;
`;

const Button = styled.button`
  width: 3rem;
  padding: 0.375rem 0.75rem;
  margin-left: auto;

  color: #fff;
  background-color: ${(props) => props.theme.color.green};

  font-size: 0.625rem;
  font-weight: 700;

  border-radius: 0.375rem;

  &: disabled {
    background-color: ${(props) => props.theme.color.gray.base};
  }
`;

const mapStateToProps = (state: { users: User }) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  withdraw: () => dispatch(actions.withdraw()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw);
