import React from 'react';
import styled from 'styled-components';

import UserSearch from './UserSearch';
import UserDropdown from './UserDropdown';

type Props = {
  intersection: AllUsers;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const UserFilter = ({ intersection, setMessage }: Props) => {
  return (
    <Container>
      <UserSearch intersection={intersection} setMessage={setMessage} />
      <UserDropdown />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
`;

export default UserFilter;
