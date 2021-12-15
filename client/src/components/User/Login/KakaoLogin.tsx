import React, { Dispatch, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import kakaoLogin from '@assets/kakao.svg';

import { toast } from 'react-toastify';

type Props = {
  checkAuth: () => any;
  linkKakao: (kakaoData: KakaoData) => any;
  messages: LoginInputs | RegisterInputs;
  setMessages: Dispatch<React.SetStateAction<any>>;
};

const KakaoLogin = ({ checkAuth, linkKakao, messages, setMessages }: Props) => {
  const { Kakao } = window as any;
  const kakaoJsKey = process.env.KAKAO_JS_KEY as string;
  const navigate = useNavigate();

  useEffect(() => {
    !Kakao.isInitialized() && Kakao.init(kakaoJsKey);
  }, []);

  const onClickKakaoLogin = () => {
    Kakao.Auth.login({
      success: () => getUserInfo(),
    });
  };

  const getUserInfo = () => {
    Kakao.API.request({
      url: '/v2/user/me',
      success: (res: any) => onLinkKakao(res),
    });
  };

  const onLinkKakao = (res: any) => {
    linkKakao({
      userName: res.kakao_account.profile.nickname,
      userId: res.id.toString(),
      userEmail: res.kakao_account.email
        ? res.kakao_account.email
        : res.id.toString(),
    })
      .then((response: MessageResponse) => {
        navigate('/');
        toast.success(response.payload.message);
      })
      .catch((error: ErrorMessageResponse) =>
        setMessages({
          ...messages,
          common: error.response.data.message,
        }),
      );
  };

  return <KakaoButton onClick={onClickKakaoLogin} />;
};

const KakaoButton = styled(kakaoLogin)`
  width: 100%;
  margin-top: 0.5rem;

  cursor: pointer;
`;

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  checkAuth: () => dispatch(actions.checkAuth()),
  linkKakao: (kakaoData: KakaoData) => dispatch(actions.linkKakao(kakaoData)),
});

export default connect(null, mapDispatchToProps)(KakaoLogin);
