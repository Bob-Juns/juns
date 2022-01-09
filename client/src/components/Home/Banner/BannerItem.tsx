import React from 'react';
import styled from 'styled-components';

type Props = {
  src: string;
  onMouseMove: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
};

const BannerItem = ({ src, onMouseMove, onMouseDown, onMouseUp }: Props) => {
  return (
    <Item
      src={src}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

const Item = styled.figure<{ src: string }>`
  width: 100%;
  height: 0;
  padding-top: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;
`;

export default BannerItem;
