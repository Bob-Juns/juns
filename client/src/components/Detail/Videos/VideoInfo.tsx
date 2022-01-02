import React from 'react';

import { connect } from 'react-redux';

import styled from 'styled-components';

type Props = {
  details: Detail;
};

const VideoInfo = ({ details }: Props) => {
  return (
    <Container>
      <Title>{details.video.items[0]?.snippet.title}</Title>
      <Info>
        <Wrapper>
          <Subtitle>게시</Subtitle>
          <Date>
            {details.video.items[0]?.snippet.publishedAt.slice(0, 10)}
          </Date>
        </Wrapper>
        <Wrapper>
          <Subtitle>조회</Subtitle>
          <Date>
            {Number(
              details.video.items[0]?.statistics.viewCount,
            ).toLocaleString()}{' '}
            회
          </Date>
        </Wrapper>
        <Wrapper>
          <Subtitle>좋아요</Subtitle>
          <Date>
            {Number(
              details.video.items[0]?.statistics.likeCount,
            ).toLocaleString()}{' '}
            개
          </Date>
        </Wrapper>
      </Info>
      <Desc>{details.video.items[0]?.snippet.description}</Desc>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: calc(100vw * 9 / 16 + 3.75rem);
  padding: 1rem;

  display: flex;
  flex-direction: column;

  ${(props) =>
    props.theme.device('tablet')(`
  margin-top: calc(700px * 9 /16 + 3.75rem);
  `)}
`;

const Title = styled.div`
  width: 100%;
  color: ${(props) => props.theme.color.purple};

  font-size: 1rem;
  font-weight: 700;

  ${(props) =>
    props.theme.device('tablet')(`
    font-size: 1.25rem;
    `)}
`;

const Info = styled.div`
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #000;

  display: flex;

  ${(props) =>
    props.theme.device('tablet')(`
    font-size: 1rem;
    `)}
`;

const Wrapper = styled.div`
  display: flex;
  margin-right: 0.875rem;
`;

const Subtitle = styled.div`
  font-weight: 700;
  margin-right: 0.375rem;
`;

const Date = styled.time``;

const Desc = styled.div`
  width: 100%;
  margin-top: 1.25rem;
  color: ${(props) => props.theme.color.lightGray};

  font-size: 0.75rem;
  font-weight: 400;

  white-space: pre-line;
  word-break: keep-all;
  word-wrap: break-word;

  line-height: 1.25;

  ${(props) =>
    props.theme.device('tablet')(`
    font-size: 1rem;
    `)}
`;

const mapStateToProps = (state: { details: Detail }) => ({
  details: state.details,
});

export default connect(mapStateToProps)(VideoInfo);
