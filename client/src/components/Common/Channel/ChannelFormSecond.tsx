import React from 'react';
import styled from 'styled-components';
import plusIcon from '@assets/icons/plus.svg';

import ChannelInput from '@components/Common/Channel/ChannelInput';
import ChannelButton from '@components/Common/Channel/ChannelButton';

type Props = {
  refs: React.MutableRefObject<HTMLFormElement | null>;
  isComponentOpen: boolean;
  currentIndex: string;
  onClickClose: () => void;
  onSubmitForm: (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => void;
  channelCast: string;
  playlistTitle: string;
  playlistId: string;
  onChangeInputs: (event: React.ChangeEvent<HTMLInputElement>) => void;
  leftButtonType: 'button' | 'submit';
  leftButtonText: string;
  leftButtonBackgroundColor?: 'none' | 'white' | 'green' | 'yellow';
  onClickLeftButton: () => void;
  rightButtonType: 'button' | 'submit';
  rightButtonText: string;
  rightButtonBackgroundColor?: 'none' | 'white' | 'green' | 'yellow';
  onClickRightButton: () => void;
};

const ChannelFormSecond = ({
  refs,
  onSubmitForm,
  channelCast,
  playlistTitle,
  playlistId,
  onChangeInputs,
  leftButtonType,
  leftButtonText,
  leftButtonBackgroundColor,
  onClickLeftButton,
  rightButtonType,
  rightButtonText,
  rightButtonBackgroundColor,
  onClickRightButton,
}: Props) => {
  return (
    <Form onSubmit={onSubmitForm} ref={refs}>
      <ChannelInput
        type="text"
        id="channelCast"
        value={channelCast}
        onChange={onChangeInputs}
        placeholder="ex) 홍길동  (최대 5명)"
        label="출연진"
      />
      <Wrapper cast>
        <Cast example>
          <Name>홍길동</Name>
          <Delete />
        </Cast>
        <Cast>
          <Name>김철수</Name>
          <Delete />
        </Cast>
        <Cast>
          <Name>김철수</Name>
          <Delete />
        </Cast>
        <Cast>
          <Name>김철수</Name>
          <Delete />
        </Cast>
        <Cast>
          <Name>김철수</Name>
          <Delete />
        </Cast>
        <Cast>
          <Name>김철수</Name>
          <Delete />
        </Cast>
      </Wrapper>
      <ChannelInput
        type="text"
        id="playlistTitle"
        value={playlistTitle}
        onChange={onChangeInputs}
        placeholder="ex) 짧게 말해서"
        label="플레이리스트 제목"
      />
      <ChannelInput
        type="text"
        id="playlistId"
        value={playlistId}
        onChange={onChangeInputs}
        placeholder="ex) PLcaCoeQoNHj8la8dDg-AuYV8T_9o0xXra"
        label="플레이리스트 ID"
      />
      <Wrapper>
        <Playlist example>
          <Title>짧게 말해서</Title>
          <Id>PLcaCoeQoNHj8la8dDg-AuYV8T_9o0xXra</Id>
          <Delete />
        </Playlist>
        <Playlist>
          <Title>짧게 말해서</Title>
          <Id>PLcaCoeQoNHj8la8dDg-AuYV8T_9o0xXra</Id>
          <Delete />
        </Playlist>
        <Playlist>
          <Title>짧게 말해서</Title>
          <Id>PLcaCoeQoNHj8la8dDg-AuYV8T_9o0xXra</Id>
          <Delete />
        </Playlist>
        <Playlist>
          <Title>짧게 말해서</Title>
          <Id>PLcaCoeQoNHj8la8dDg-AuYV8T_9o0xXra</Id>
          <Delete />
        </Playlist>
        <Playlist>
          <Title>짧게 말해서</Title>
          <Id>PLcaCoeQoNHj8la8dDg-AuYV8T_9o0xXra</Id>
          <Delete />
        </Playlist>
      </Wrapper>
      <ButtonGroup>
        <ChannelButton
          type={leftButtonType}
          text={leftButtonText}
          backgroundColor={leftButtonBackgroundColor}
          onClick={onClickLeftButton}
        />
        <ChannelButton
          type={rightButtonType}
          text={rightButtonText}
          backgroundColor={rightButtonBackgroundColor}
          onClick={onClickRightButton}
        />
      </ButtonGroup>
    </Form>
  );
};

const Form = styled.form`
  width: 100vw;
  height: 100%;
  padding: 1.25rem 1rem 1rem;

  background-color: ${(props) => props.theme.color.gray.light};

  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;
`;

const Wrapper = styled.div<{ cast?: boolean }>`
  width: 100%;

  margin: 1rem 0;
  padding: 0.75rem;

  display: grid;
  grid-template-columns: ${(props) =>
    props.cast ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)'};
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-row-gap: 0.375rem;
  grid-column-gap: 0.375rem;

  background-color: #fff;
  border-radius: 0.5rem;
`;

const Cast = styled.div<{ example?: boolean }>`
  width: 100%;
  height: 1.75rem;
  padding: 0 0.75rem;
  color: #fff;
  background-color: ${(props) =>
    props.example ? props.theme.color.gray.base : props.theme.color.purple};

  display: flex;
  justify-content: space-around;
  align-items: center;

  box-shadow: ${(props) => props.theme.boxShadow.primary};
  border-radius: 3.125rem;
`;

const Name = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
`;

const Delete = styled(plusIcon)`
  width: 0.625rem;
  transform: rotate(45deg);
`;

const Playlist = styled(Cast)``;
const Title = styled(Name)`
  width: 2.5rem;
  font-size: 0.625rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const Id = styled(Name)`
  width: calc(100% - 4.525rem);
  font-size: 0.625rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ButtonGroup = styled.div`
  width: 100%;
  height: 2rem;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  algin-items: flex-end;
`;

export default ChannelFormSecond;
