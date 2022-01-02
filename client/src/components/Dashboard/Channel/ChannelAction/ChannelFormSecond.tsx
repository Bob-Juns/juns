import React from 'react';
import styled from 'styled-components';
import plusIcon from '@assets/icons/plus.svg';

import ChannelInput from '@components/Common/Channel/ChannelInput';
import ChannelButton from '@components/Common/Channel/ChannelButton';

type Props = {
  refs: React.MutableRefObject<HTMLFormElement | null>;
  onSubmitForm: (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => void;
  inputs: ChannelInputs;
  setInputs: React.Dispatch<React.SetStateAction<ChannelInputs>>;
  messages: ChannelMessages;
  setMessages: React.Dispatch<React.SetStateAction<ChannelMessages>>;
  castArray: CurrentChannel['channelCast'];
  setCastArray: React.Dispatch<
    React.SetStateAction<CurrentChannel['channelCast']>
  >;
  playlistArray: CurrentChannel['channelPlaylist'];
  setPlaylistArray: React.Dispatch<
    React.SetStateAction<CurrentChannel['channelPlaylist']>
  >;
  onChangeInputs: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickPrev: () => void;
  submitButtonText: string;
};

const ChannelFormSecond = ({
  refs,
  inputs,
  setInputs,
  messages,
  setMessages,
  onSubmitForm,
  castArray,
  setCastArray,
  playlistArray,
  setPlaylistArray,
  onChangeInputs,
  submitButtonText,
  onClickPrev,
}: Props) => {
  const onClickAddCast = () => {
    if (inputs.channelCast === '') {
      setMessages({ ...messages, channelCast: '출연자를 입력해주세요.' });
    } else {
      setCastArray([...castArray, inputs.channelCast]);
      setInputs({ ...inputs, channelCast: '' });
    }
  };

  const onClickAddPlaylist = () => {
    if (inputs.playlistTitle === '') {
      setMessages({
        ...messages,
        playlistTitle: '플레이리스트 제목을 입력해주세요.',
      });
    } else if (inputs.playlistId === '') {
      setMessages({
        ...messages,
        playlistId: '플레이리스트 ID를 입력해주세요.',
      });
    } else {
      setPlaylistArray([
        ...playlistArray,
        {
          playlistTitle: inputs.playlistTitle,
          playlistId: inputs.playlistId,
        },
      ]);
      setInputs({ ...inputs, playlistTitle: '', playlistId: '' });
    }
  };

  return (
    <Form onSubmit={onSubmitForm} ref={refs}>
      <Inputs cast>
        <ChannelInput
          type="text"
          id="channelCast"
          value={inputs.channelCast}
          onChange={onChangeInputs}
          placeholder="ex) 홍길동"
          label="출연진"
          message={messages.channelCast}
        />
        <Add onClick={onClickAddCast}>추가</Add>
      </Inputs>
      <Wrapper cast>
        {castArray.length === 0 ? (
          <Cast example>
            <Name>홍길동</Name>
            <Delete />
          </Cast>
        ) : (
          castArray.map((cast: string) => (
            <Cast
              key={cast}
              onClick={() =>
                setCastArray(
                  castArray.filter((selectedCast) => selectedCast !== cast),
                )
              }
            >
              <Name>{cast}</Name>
              <Delete />
            </Cast>
          ))
        )}
      </Wrapper>
      <ChannelInput
        type="text"
        id="playlistTitle"
        value={inputs.playlistTitle}
        onChange={onChangeInputs}
        placeholder="ex) 짧게 말해서"
        label="플레이리스트 제목"
        message={messages.playlistTitle}
      />
      <Inputs>
        <ChannelInput
          type="text"
          id="playlistId"
          value={inputs.playlistId}
          onChange={onChangeInputs}
          placeholder="ex) PLcaCoeQoNHj8la8dDg-AuYV8T_9o0xXra"
          label="플레이리스트 ID"
          message={messages.playlistId}
        />
        <Add onClick={onClickAddPlaylist}>추가</Add>
      </Inputs>
      <Wrapper>
        {playlistArray.length === 0 ? (
          <Playlist example>
            <Title>짧게 말해서</Title>
            <Id>PLcaCoeQoNHj8la8dDg-AuYV8T_9o0xXra</Id>
            <Delete />
          </Playlist>
        ) : (
          playlistArray.map(
            (playlist: { playlistTitle: string; playlistId: string }) => (
              <Playlist
                key={playlist.playlistTitle}
                onClick={() =>
                  setPlaylistArray(
                    playlistArray.filter(
                      (selectedPlaylist) =>
                        selectedPlaylist.playlistId !== playlist.playlistId,
                    ),
                  )
                }
              >
                <Title>{playlist.playlistTitle}</Title>
                <Id>{playlist.playlistId}</Id>
                <Delete />
              </Playlist>
            ),
          )
        )}
      </Wrapper>
      <ButtonGroup>
        <ChannelButton type="button" text="이전" onClick={onClickPrev} />
        <ChannelButton
          type="submit"
          text={submitButtonText}
          backgroundColor="green"
          onClick={onSubmitForm}
        />
      </ButtonGroup>
    </Form>
  );
};

const Form = styled.form`
  width: 100vw;

  padding: 1.25rem 1rem 1rem;

  background-color: ${(props) => props.theme.color.gray.light};

  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;

  ${(props) =>
    props.theme.device('tablet')(`
  max-width: 700px;
  margin: 0 auto;
  `)}
`;

const Inputs = styled.div<{ cast?: boolean }>`
  position: relative;
  margin-top: ${(props) => !props.cast && '2rem'};
`;

const Add = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.purple};

  position: absolute;
  bottom: 1.625rem;
  right: 0.25rem;

  cursor: pointer;

  &:hover {
    font-weight: 700;
  }
`;

const Wrapper = styled.div<{ cast?: boolean }>`
  width: 100%;

  margin: ${(props) => (props.cast ? '1rem 0 0 ' : '1rem 0')};
  padding: 0.75rem;

  display: grid;
  grid-template-columns: ${(props) =>
    props.cast ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)'};
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-row-gap: 0.375rem;
  grid-column-gap: 0.375rem;

  background-color: #fff;
  border-radius: 0.5rem;

  ${(props) =>
    props.theme.device('tablet')(`
  grid-template-columns: ${props.cast ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
  `)}
`;

const Cast = styled.div<{ example?: boolean }>`
  width: 100%;
  height: 1.75rem;
  padding: 0 1rem;
  color: #fff;
  background-color: ${(props) =>
    props.example ? props.theme.color.gray.base : props.theme.color.purple};

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: ${(props) => props.theme.boxShadow.primary};
  border-radius: 3.125rem;
`;

const Name = styled.div`
  width: 100%;
  font-size: 0.75rem;
  font-weight: 700;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Delete = styled(plusIcon)`
  width: 0.625rem;
  transform: rotate(45deg);
`;

const Playlist = styled(Cast)`
  padding: 0 1rem;
`;
const Title = styled(Name)`
  width: 3.5rem;
  font-size: 0.625rem;
`;

const Id = styled(Name)`
  width: calc(100% - 5.525rem);
  font-size: 0.625rem;
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

export default ChannelFormSecond;
