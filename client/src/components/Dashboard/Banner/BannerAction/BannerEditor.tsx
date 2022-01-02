import React, { Dispatch, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';

import BannerHeader from './BannerHeader';
import BannerImage from './BannerImage';

import { toast } from 'react-toastify';

type Props = {
  create?: boolean;
  banner: Image;
  selectDashboardMenu: (payload: CurrentDashboardMenu) => void;
  getBanner: (bannerId: string) => any;
  getBannerImage: (payload: Image) => void;
  createBanner: (createData: CurrentBanner) => any;
  updateBanner: (bannerId: string, updateData: CurrentBanner) => any;
  resetBannerImage: () => void;
};

const BannerEditor = ({
  create = false,
  banner,
  selectDashboardMenu,
  getBanner,
  getBannerImage,
  createBanner,
  updateBanner,
  resetBannerImage,
}: Props) => {
  const [inputs, setInputs] = useState<BannerInputs>({
    bannerId: '',
    bannerTitle: '',
    bannerLink: '',
  });

  const [messages, setMessages] = useState<BannerMessages>({
    bannerId: '',
    bannerTitle: '',
    bannerImage: '',
    bannerLink: '',
  });

  const { _bannerId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    !create &&
      getBanner(_bannerId as string).then(
        (response: { payload: CurrentBanner }) => {
          setInputs({
            ...inputs,
            bannerId: response.payload.bannerId,
            bannerTitle: response.payload.bannerTitle,
            bannerLink: response.payload.bannerLink,
          });
          getBannerImage(response.payload.bannerImage);
        },
      );

    return () => resetBannerImage();
  }, []);

  useEffect(() => {
    banner.filePath !== '' && setMessages({ ...messages, bannerImage: '' });
  }, [banner.filePath]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;

    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  const onClickClose = () => {
    selectDashboardMenu('배너');
    navigate(-1);
  };

  const onSubmitForm = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (banner.filePath == '') {
      setMessages({ ...messages, bannerImage: '배너 이미지를 등록해주세요.' });
    } else if (inputs.bannerId === '') {
      setMessages({ ...messages, bannerId: '배너 ID를 입력해주세요.' });
    } else if (inputs.bannerTitle === '') {
      setMessages({ ...messages, bannerTitle: '배너 제목을 입력해주세요.' });
    } else if (inputs.bannerLink === '') {
      setMessages({ ...messages, bannerLink: '채널 ID를 입력해주세요.' });
    } else {
      create
        ? createBanner({
            bannerId: inputs.bannerId,
            bannerTitle: inputs.bannerTitle,
            bannerImage: banner,
            bannerLink: inputs.bannerLink,
          })
            .then((response: MessageResponse) => {
              onClickClose();
              toast.success(response.payload.message);
            })
            .catch((error: ErrorMessageResponse) =>
              toast.error(error.response.data.message),
            )
        : updateBanner(_bannerId as string, {
            bannerId: inputs.bannerId,
            bannerTitle: inputs.bannerTitle,
            bannerImage: banner,
            bannerLink: inputs.bannerLink,
          })
            .then((response: MessageResponse) => {
              onClickClose();
              toast.success(response.payload.message);
            })
            .catch((error: ErrorMessageResponse) =>
              toast.error(error.response.data.message),
            );
    }
  };

  return (
    <Container>
      <BannerHeader
        headerTitle={create ? '배너 생성' : '배너 수정'}
        onClickClose={onClickClose}
      />
      <Form onSubmit={onSubmitForm}>
        <BannerImage />
        <Message>{messages.bannerImage}</Message>
        <Wrapper>
          <Label htmlFor="bannerId">배너 ID</Label>
          <Input
            type="text"
            id="bannerId"
            value={inputs.bannerId}
            placeholder="short-paper-banner"
            onChange={onChangeInput}
          />
          <Message>{messages.bannerId}</Message>
        </Wrapper>
        <Wrapper>
          <Label htmlFor="bannerId">배너 타이틀</Label>
          <Input
            type="text"
            id="bannerTitle"
            value={inputs.bannerTitle}
            placeholder="짧은 대본 배너"
            onChange={onChangeInput}
          />
          <Message>{messages.bannerTitle}</Message>
        </Wrapper>
        <Wrapper>
          <Label htmlFor="bannerId">채널 ID</Label>
          <Input
            type="text"
            id="bannerLink"
            value={inputs.bannerLink}
            placeholder="short-paper"
            onChange={onChangeInput}
          />
          <Message>{messages.bannerLink}</Message>
        </Wrapper>
        <ButtonGroup>
          <Cancel type="button" onClick={onClickClose}>
            취소
          </Cancel>
          <Confirm type="submit" onClick={onSubmitForm}>
            {create ? '생성' : ' 수정'}
          </Confirm>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  background-color: ${(props) => props.theme.color.gray.light};

  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.theme.device('tablet')(`
  max-width: 700px;
  margin: 0 auto;
  `)}
`;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-top: 0;
  }
`;

const Label = styled.label`
  width: 100%;

  color: ${(props) => props.theme.color.purple};

  font-size: 1rem;
  font-weight: 700;

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1.125rem;
  `)}
`;

const Input = styled.input`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem 0.25rem;

  font-size: 0.75rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray.base};

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1rem;
  `)}
`;

const Message = styled.div`
  height: 0.75rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.red};

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1rem;
  `)}
`;

const ButtonGroup = styled.div`
  width: 100%;
  height: 2rem;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  algin-items: flex-end;

  ${(props) =>
    props.theme.device('tablet')(`
  height: 2.5rem;
    `)}
`;

const Cancel = styled.button`
  width: 6rem;
  height: 100%;

  font-weight: 700;
  color: #fff;
  background-color: ${(props) => props.theme.color.red};
  border-radius: 3.125rem;

  ${(props) =>
    props.theme.device('tablet')(`
    width: 8rem;
    font-size: 1.125rem;
    `)}
`;

const Confirm = styled(Cancel)`
  color: #fff;
  background-color: ${(props) => props.theme.color.green};
`;

const mapStateToProps = (state: { file: { banner: Image } }) => ({
  banner: state.file.banner,
});

const mapDispatchToProps = (dispatch: Dispatch<MenuAction | BannerAction>) => ({
  selectDashboardMenu: (payload: CurrentDashboardMenu) =>
    dispatch(actions.selectDashboardMenu(payload)),
  getBanner: (bannerId: string) => dispatch(actions.getBanner(bannerId)),
  getBannerImage: (payload: Image) => dispatch(actions.getBannerImage(payload)),
  createBanner: (createData: CurrentBanner) =>
    dispatch(actions.createBanner(createData)),
  updateBanner: (bannerId: string, updateData: CurrentBanner) =>
    dispatch(actions.updateBanner(bannerId, updateData)),
  resetBannerImage: () => dispatch(actions.resetBannerImage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BannerEditor);
