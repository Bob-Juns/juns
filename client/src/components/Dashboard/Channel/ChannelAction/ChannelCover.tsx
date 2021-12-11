import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import chevronIcon from '@assets/icons/chevron.svg';

type Props = {};

const ChannelCover = ({}: Props) => {
  const [file, setFile] = useState<object | null>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  const onClickUpload = () => {
    uploadRef.current?.click();
  };

  const onSelectFile = (event: any) => {
    setFile(event.currentTarget.files[0]);
  };
  return (
    <Container>
      <Labels>
        <Label htmlFor="cover">커버 이미지</Label>
        <Preview>
          <Text>미리보기</Text>
          <ChevronSmall />
        </Preview>
      </Labels>
      <HiddenUploader
        type="file"
        id="cover"
        accept="image/*"
        ref={uploadRef}
        onChange={onSelectFile}
      />
      <Cover onClick={onClickUpload}>업로드</Cover>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100vw / 2 - 2rem);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
`;

const HiddenUploader = styled.input`
  display: none;
`;

const Cover = styled.div`
  width: 100%;
  height: 2rem;
  margin-top: 0.75rem;

  color: #fff;
  background-color: ${(props) => props.theme.color.purple};

  font-size: 0.75rem;
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50px;

  cursor: pointer;
`;

const Labels = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  color: ${(props) => props.theme.color.purple};

  font-size: 1rem;
  font-weight: 700;
`;

const Preview = styled.div`
  display: flex;
  align-items: flex-end;
  color: ${(props) => props.theme.color.green};

  cursor: pointer;
`;

const Text = styled.div`
  margin-right: 0.25rem;
  font-size: 0.5rem;
  font-weight: 700;
  transform: translateY(1px);
`;

const ChevronSmall = styled(chevronIcon)`
  width: 0.5rem;

  transform: rotate(180deg);
`;

export default ChannelCover;
