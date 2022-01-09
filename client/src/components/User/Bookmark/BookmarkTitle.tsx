import React from 'react';

import styled from 'styled-components';

type Props = {
  userName: string;
};

const BookmarkTitle = ({ userName }: Props) => {
  return (
    <Container>
      <Name>{userName}</Name>님의 찜 목록
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 3.75rem;
  padding: 1rem 0.5rem;

  display: flex;
  justify-content: center;

  color: ${(props) => props.theme.color.purple};

  font-size: 0.875rem;

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1.125rem;
  `)}
`;

const Name = styled.div`
  font-weight: 700;
`;

export default BookmarkTitle;
