import React, { Dispatch, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';

import ChannelHeader from '@components/Dashboard/Channel/ChannelAction/ChannelHeader';
import ChannelFormFirst from '@components/Dashboard/Channel/ChannelAction/ChannelFormFirst';
import ChannelFormSecond from '@components/Dashboard/Channel/ChannelAction/ChannelFormSecond';
import ChannelCover from '@components/Dashboard/Channel/ChannelAction/ChannelCover';
import ChannelCategory from '@components/Dashboard/Channel/ChannelAction/ChannelCategory';

import { toast } from 'react-toastify';

type Props = {
  create?: boolean;
  cover: Cover;
  getChannel: (channelId: string) => any;
  createChannel: (createData: CurrentChannel) => any;
  updateChannel: (channelId: string, updateData: CurrentChannel) => any;
  getCover: (payload: Cover) => void;
  resetCover: () => void;
  selectDashboardMenu: (payload: CurrentDashboardMenu) => any;
};

const ChannelEditor = ({
  create = false,
  cover,
  getChannel,
  createChannel,
  updateChannel,
  getCover,
  resetCover,
  selectDashboardMenu,
}: Props) => {
  const [index, setIndex] = useState<string>('1');
  const [inputs, setInputs] = useState<ChannelInputs>({
    category: '',
    channelId: '',
    channelTitle: '',
    channelProducer: '',
    channelCast: '',
    playlistTitle: '',
    playlistId: '',
  });

  const [messages, setMessages] = useState<ChannelMessages>({
    category: '',
    channelId: '',
    channelTitle: '',
    channelProducer: '',
    channelCover: '',
    channelCast: '',
    playlistTitle: '',
    playlistId: '',
  });
  const [castArray, setCastArray] = useState<CurrentChannel['channelCast']>([]);
  const [playlistArray, setPlaylistArray] = useState<
    CurrentChannel['channelPlaylist']
  >([]);

  const secondFormRef = useRef<HTMLFormElement>(null);

  const { _channelId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    !create &&
      getChannel(_channelId as string).then(
        (response: { payload: CurrentChannel }) => {
          setInputs({
            ...inputs,
            category: response.payload.category,
            channelId: response.payload.channelId,
            channelTitle: response.payload.channelTitle,
            channelProducer: response.payload.channelProducer,
          });
          setCastArray(response.payload.channelCast);
          setPlaylistArray(response.payload.channelPlaylist);
          getCover({
            fileName: response.payload.channelCover.fileName,
            filePath: response.payload.channelCover.filePath,
          });
        },
      );

    window.onpopstate = () => {
      selectDashboardMenu('채널');
    };

    return () => {
      resetState();
      resetCover();
    };
  }, []);

  const resetState = () => {
    setIndex('1');
    setInputs({
      category: '',
      channelId: '',
      channelTitle: '',
      channelProducer: '',
      channelCast: '',
      playlistTitle: '',
      playlistId: '',
    });
    setCastArray([]);
    setPlaylistArray([]);
  };

  const goBackToChannelDashboard = () => {
    selectDashboardMenu('채널');
    navigate(-1);
  };

  const onClickClose = () => {
    resetState();
    goBackToChannelDashboard();
  };

  const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name === 'channelTitle') {
      value === ''
        ? setMessages({
            ...messages,
            channelTitle: '제목(한글)을 입력해주세요.',
          })
        : setMessages({ ...messages, channelTitle: '' });
    } else if (name === 'channelId') {
      value === ''
        ? setMessages({ ...messages, channelId: '제목(영어)을 입력해주세요.' })
        : setMessages({ ...messages, channelId: '' });
    } else if (name === 'channelProducer') {
      value === ''
        ? setMessages({
            ...messages,
            channelProducer: '제작사(자)를 입력해주세요.',
          })
        : setMessages({ ...messages, channelProducer: '' });
    } else if (name === 'channelCast') {
      value === ''
        ? setMessages({ ...messages, channelCast: '출연자를 입력해주세요.' })
        : setMessages({ ...messages, channelCast: '' });
    } else if (name === 'playlistTitle') {
      value === ''
        ? setMessages({
            ...messages,
            playlistTitle: '플레이리스트 제목을 입력해주세요.',
          })
        : setMessages({ ...messages, playlistTitle: '' });
    } else if (name === 'playlistId') {
      value === ''
        ? setMessages({
            ...messages,
            playlistId: '플레이리스트 ID를 입력해주세요.',
          })
        : setMessages({ ...messages, playlistId: '' });
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onScrollToTop = (
    targetRef: React.MutableRefObject<HTMLFormElement | null>,
  ) =>
    setTimeout(() => {
      targetRef.current?.scrollTo(0, 0);
    }, 500);

  const onClickPrev = () => {
    index === '1'
      ? onClickClose()
      : (setIndex('1'), onScrollToTop(secondFormRef));
  };

  const onClickNext = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();

    if (cover.filePath === '') {
      setMessages({ ...messages, channelCover: '커버 이미지를 등록해주세요.' });
    } else if (inputs.category === '') {
      setMessages({ ...messages, category: '카테고리를 선택해주세요.' });
    } else if (inputs.channelTitle === '') {
      setMessages({ ...messages, channelTitle: '제목(한글)을 입력해주세요.' });
    } else if (inputs.channelId === '') {
      setMessages({ ...messages, channelId: '제목(영어)을 입력해주세요.' });
    } else if (inputs.channelProducer === '') {
      setMessages({
        ...messages,
        channelProducer: '제작사(자)를 입력해주세요.',
      });
    } else {
      setIndex('2');
    }
  };

  const onSubmitForm = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (castArray.length === 0) {
      setMessages({ ...messages, channelCast: '출연진을 추가해주세요.' });
    } else if (playlistArray.length === 0) {
      setMessages({
        ...messages,
        playlistTitle: '플레이리스트를 추가해주세요.',
        playlistId: '플레이리스트를 추가해주세요.',
      });
    } else {
      const { category, channelTitle, channelId, channelProducer } = inputs;
      create
        ? createChannel({
            category,
            channelTitle,
            channelId,
            channelProducer,
            channelCover: cover,
            channelCast: castArray,
            channelPlaylist: playlistArray,
          })
            .then((response: MessageResponse) => {
              resetState();
              resetCover();
              selectDashboardMenu('채널');
              navigate('/dashboard', { replace: true });
              toast.success(response.payload.message);
            })
            .catch((error: ErrorMessageResponse) => {
              toast.warning(error.response.data.message);
            })
        : updateChannel(_channelId as string, {
            category,
            channelTitle,
            channelId,
            channelProducer,
            channelCover: cover,
            channelCast: castArray,
            channelPlaylist: playlistArray,
          })
            .then((response: MessageResponse) => {
              resetState();
              resetCover();
              selectDashboardMenu('채널');
              navigate('/dashboard', { replace: true });
              toast.success(response.payload.message);
            })
            .catch((error: ErrorMessageResponse) => {
              toast.warning(error.response.data.message);
            });
    }
  };

  return (
    <Container>
      <ChannelHeader
        headerTitle={create ? '채널 생성' : '채널 수정'}
        currentIndex={index}
        onClickClose={onClickClose}
      />
      <Wrapper isFirst={index === '1'}>
        <ChannelFormFirst
          inputs={inputs}
          onChangeInputs={onChangeInputs}
          messages={messages}
          onClickPrev={onClickPrev}
          onSubmitForm={onClickNext}
        >
          <ChannelCover messages={messages} setMessages={setMessages} />
          <ChannelCategory
            inputs={inputs}
            setInputs={setInputs}
            messages={messages}
            setMessages={setMessages}
          />
        </ChannelFormFirst>
        <ChannelFormSecond
          refs={secondFormRef}
          inputs={inputs}
          setInputs={setInputs}
          onChangeInputs={onChangeInputs}
          messages={messages}
          castArray={castArray}
          setCastArray={setCastArray}
          playlistArray={playlistArray}
          setPlaylistArray={setPlaylistArray}
          onClickPrev={onClickPrev}
          submitButtonText={create ? '생성' : '수정'}
          onSubmitForm={onSubmitForm}
        />
      </Wrapper>
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

  position: fixed;
  top: 0;
  left: 0;

  z-index: 999;
`;

const Wrapper = styled.div<{ isFirst: boolean }>`
  width: 200vw;
  height: calc(100vh - 3.125rem);
  height: calc(var(--vh, 1vh) * 100 - 3.125rem);

  display: flex;

  background-color: ${(props) => props.theme.color.gray.light};

  transform: ${(props) =>
    props.isFirst ? 'translateX(0)' : 'translateX(-100vw)'};
  transition: all 0.3s linear;
`;

const mapStateToProps = (state: { file: { cover: Cover } }) => ({
  cover: state.file.cover,
});

const mapDispatchToProps = (
  dispatch: Dispatch<FileAction | MenuAction | ChannelAction>,
) => ({
  getCover: (payload: Cover) => dispatch(actions.getCover(payload)),
  resetCover: () => dispatch(actions.resetCover()),
  selectDashboardMenu: (payload: CurrentDashboardMenu) =>
    dispatch(actions.selectDashboardMenu(payload)),
  getChannel: (channelId: string) => dispatch(actions.getChannel(channelId)),
  createChannel: (createData: CurrentChannel) =>
    dispatch(actions.createChannel(createData)),
  updateChannel: (channelId: string, updateData: CurrentChannel) =>
    dispatch(actions.updateChannel(channelId, updateData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelEditor);
