import React, { Dispatch, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import chevronIcon from '@assets/icons/chevron.svg';
import spinnerIcon from '@assets/icons/spinner.gif';
import trashIcon from '@assets/icons/trash.svg';

import { toast } from 'react-toastify';

type Props = {
  cover: Image;
  messages: ChannelMessages;
  setMessages: React.Dispatch<React.SetStateAction<ChannelMessages>>;
  uploadCover: (file: FormData) => any;
  deleteImage: (fileName: string) => any;
};

const ChannelCover = ({
  cover,
  messages,
  setMessages,
  uploadCover,
  deleteImage,
}: Props) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<{ upload: boolean; delete: boolean }>({
    upload: false,
    delete: false,
  });

  const uploadRef = useRef<HTMLInputElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);

  const onClickOutside = (event: any) => {
    if (focusRef.current && !focusRef.current.contains(event.target)) {
      setIsPreviewOpen(false);
    }
  };

  useEffect(() => {
    isPreviewOpen && document.addEventListener('click', onClickOutside, true);
    return () => {
      document.removeEventListener('click', onClickOutside, true);
    };
  }, [focusRef, isPreviewOpen]);

  const onClickUpload = () => {
    if (!loading.upload) {
      uploadRef.current?.click();
    }
  };

  const onSelectFile = async (event: any) => {
    const formData = new FormData();
    formData.append('image', event.currentTarget.files[0]);
    event.target.value = null;
    setLoading({ ...loading, upload: true });
    await uploadCover(formData).then(() => {
      setLoading({ ...loading, upload: false });
      toast.success('이미지가 업로드 되었습니다.');
      setMessages({ ...messages, channelCover: '' });
    });
  };

  const onClickDelete = () => {
    setLoading({ ...loading, delete: true });
    deleteImage(cover.fileName)
      .then((response: MessageResponse) => {
        toast.success(response.payload.message);
      })
      .catch((error: ErrorMessageResponse) =>
        toast.warning(error.response.data.message),
      )
      .finally(() => {
        setIsPreviewOpen(false);
        setLoading({ ...loading, delete: false });
      });
  };

  return (
    <Container ref={focusRef}>
      <Labels>
        <Label htmlFor="cover">커버 이미지</Label>
        <Wrapper onClick={() => setIsPreviewOpen((prev) => !prev)}>
          <Text>미리보기</Text>
          <ChevronSmall open={isPreviewOpen} />
        </Wrapper>
        <Preview src={cover.filePath} open={isPreviewOpen}>
          <Delete>
            {loading.delete ? (
              <Spinner src={spinnerIcon} />
            ) : (
              <Trash onClick={onClickDelete} />
            )}
          </Delete>
        </Preview>
      </Labels>
      <HiddenUploader
        type="file"
        id="cover"
        accept="image/*"
        ref={uploadRef}
        onChange={onSelectFile}
      />
      <Uploader onClick={onClickUpload} isLoading={loading.upload}>
        {loading.upload ? (
          <Spinner src={spinnerIcon} />
        ) : cover.filePath === '' ? (
          '업로드'
        ) : (
          '변경'
        )}
      </Uploader>
      <Message>{messages.channelCover}</Message>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100vw / 2 - 2rem);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;

  ${(props) =>
    props.theme.device('tablet')(`
  width: calc(100% / 2 - 2rem);
  `)}
`;

const HiddenUploader = styled.input`
  display: none;
`;

const Uploader = styled.div<{ isLoading: boolean }>`
  width: 100%;
  height: 2rem;
  margin-top: 0.75rem;

  color: #fff;
  background-color: ${(props) =>
    props.isLoading ? '#fff' : props.theme.color.purple};

  font-size: 0.75rem;
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50px;

  cursor: pointer;

  ${(props) =>
    props.theme.device('tablet')(`
    height: 2.5rem;
  `)}
`;

const Spinner = styled.img`
  width: 1rem;
`;

const Labels = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  position: relative;
`;

const Label = styled.label`
  color: ${(props) => props.theme.color.purple};

  font-size: 1rem;
  font-weight: 700;
`;

const Wrapper = styled.div`
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

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 0.75rem;
  `)}
`;

const ChevronSmall = styled(chevronIcon)<{ open: boolean }>`
  width: 0.5rem;

  transform: ${(props) => (props.open ? 'rotate(0)' : 'rotate(180deg)')};
  transition: all 0.3s linear;

  ${(props) =>
    props.theme.device('tablet')(`
  width: 0.75rem;
  `)}
`;

const Delete = styled.div`
  width: 1.375rem;
  height: 1.375rem;

  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0.375rem;
  right: 0.375rem;

  box-shadow: ${(props) => props.theme.boxShadow.primary};

  border-radius: 50%;
`;

const Trash = styled(trashIcon)`
  width: 1rem;
  height: 1rem;

  color ${(props) => props.theme.color.purple};
`;

const Preview = styled.figure<{ open: boolean; src: string }>`
  width: 100%;
  height: 0;
  padding-top: 133.34%;

  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;

  position: absolute;
  top: 1.75rem;
  right: 0;

  background-color: #fff;
  border-radius: 1rem;

  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.open ? '1' : '0')};
  box-shadow: ${(props) => props.theme.boxShadow.primary};

  z-index: 9;

  transform: ${(props) =>
    props.open ? 'translateY(0)' : 'translateY( -1rem)'};
  transition: all 0.3s ease-in-out;

  & > ${Delete} {
    display: ${(props) => props.src === '' && 'none'};
  }
`;

const Message = styled.div`
  height: 0.75rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.red};
`;

const mapStateToProps = (state: { file: { cover: Image } }) => ({
  cover: state.file.cover,
});

const mapDispatchToProps = (dispatch: Dispatch<FileAction>) => ({
  uploadCover: (file: FormData) => dispatch(actions.uploadCover(file)),
  deleteImage: (fileName: string) => dispatch(actions.deleteImage(fileName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelCover);
