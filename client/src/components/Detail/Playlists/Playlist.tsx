import React, { useState } from 'react';
import styled from 'styled-components';

import PlaylistMenu from './PlaylistMenu';
import PlaylistItems from './PlaylistItems';

const Playlist = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Container>
      <PlaylistMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <PlaylistItems />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default Playlist;
