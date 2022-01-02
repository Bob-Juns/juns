import React, { Dispatch, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import spinnerIcon from '@assets/icons/spinner.gif';
import plusIcon from '@assets/icons/plus.svg';
import trashIcon from '@assets/icons/trash.svg';

import { useDropzone } from 'react-dropzone';

type Props = {
  banner: Image;
  uploadBanner: (file: FormData) => any;
  resetBannerImage: () => void;
};

const BannerImage = ({ banner, uploadBanner, resetBannerImage }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();

    formData.append('image', acceptedFiles[0]);
    setIsLoading(true);
    await uploadBanner(formData).then(() => setIsLoading(false));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const rootProps = {
    ...getRootProps(),
  };

  const inputProps = {
    ...getInputProps(),
    multiple: false,
    accept: 'image/jpg, image/jpeg, image/png, image/webp',
  };

  const onClearImage = () => {
    resetBannerImage();
  };
  return (
    <Container>
      {banner.filePath === '' ? (
        <Upload {...rootProps}>
          <input {...inputProps} />
          {isLoading ? (
            <Spinner src={spinnerIcon} />
          ) : (
            <Wrapper>
              <Add />
              <Text>배너 이미지 업로드</Text>
            </Wrapper>
          )}
        </Upload>
      ) : (
        <Preview>
          <Image src={banner.filePath} />
          <Delete onClick={onClearImage} />
        </Preview>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;

  ${(props) =>
    props.theme.device('tablet')(`
  min-height: 300px;
    `)}
`;

const Upload = styled.div`
  width: 100%;
  height: 100%;

  padding: 1rem 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;

  border: 1px dashed ${(props) => props.theme.color.green};
  border-radius: 0.25rem;
  cursor: pointer;

  ${(props) =>
    props.theme.device('tablet')(`
    border: 2px dashed ${props.theme.color.green};
    `)}
`;

const Spinner = styled.img`
  width: 1.25rem;

  ${(props) =>
    props.theme.device('tablet')(`
  width: 3.125rem;
    `)}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Add = styled(plusIcon)`
  width: 1.125rem;
  height: 1.125rem;
  padding: 0.25rem;

  color: #fff;
  background-color: ${(props) => props.theme.color.green};

  border-radius: 50%;

  ${(props) =>
    props.theme.device('tablet')(`
  width: 3rem;
  height: 3rem;
  padding: 1rem;
    `)}
`;

const Text = styled.div`
  margin-top: 0.75rem;
  color: ${(props) => props.theme.color.green};
  font-size: 0.625rem;
  font-weight: 700;

  ${(props) =>
    props.theme.device('tablet')(`
    font-size: 1.125rem;
    `)}
`;

const Preview = styled.div`
  width: 100%;
  position: relative;
`;

const Image = styled.figure<{ src: string }>`
  width: 100%;
  height: 0;
  padding-top: 50%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;

  border-radius: 0.25rem;
`;

const Delete = styled(trashIcon)`
  width: 1.5rem;
  height: 1.5rem;

  padding: 0.375rem;

  color: ${(props) => props.theme.color.purple};
  background-color: #fff;

  position: absolute;
  top: 0.375rem;
  right: 0.375rem;

  border-radius: 50%;

  cursor: pointer;

  &: hover {
    color: #fff;
    background-color: ${(props) => props.theme.color.purple};
  }
  }

  ${(props) =>
    props.theme.device('tablet')(`
  width: 2rem;
  height: 2rem;

  top: 0.75rem;
  right: 0.75rem;
    `)}
`;

const mapStateToProps = (state: { file: { banner: Image } }) => ({
  banner: state.file.banner,
});

const mapDispatchToProps = (dispatch: Dispatch<FileAction>) => ({
  uploadBanner: (file: FormData) => dispatch(actions.uploadBanner(file)),
  resetBannerImage: () => dispatch(actions.resetBannerImage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BannerImage);
