import React, { Dispatch } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';

type Props = {
  categories: Category;
  selectCategory: (payload: string) => void;
};

const Category = ({ categories, selectCategory }: Props) => {
  const onClickItem = (category: string) => {
    selectCategory(category);
  };
  return (
    <Container>
      {categories.allCategories.map((category: string) => (
        <Item
          key={category}
          onClick={() => onClickItem(category)}
          selected={categories.currentCategory === category}
        >
          {category}
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.nav`
  width: 100vw;
  height: 2.25rem;
  padding: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 3.125rem;
  left: 50%;
  transform: translateX(-50%);
  border-bottom: 1px solid ${(props) => props.theme.color.yellow};
`;

const Item = styled.div<{ selected?: boolean }>`
  width: calc(100vw / 6);
  height: 100%;
  margin-top: 1px;
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    `
    font-weight: 700;
    color: ${props.theme.color.purple};
    border-bottom: 3px solid ${props.theme.color.purple};
  `}

  &:hover {
    color: ${(props) => props.theme.color.purple};
    font-weight: 700;
    border-bottom: 3px solid ${(props) => props.theme.color.purple};
  }
`;

const mapStateToProps = (state: { categories: Category }) => ({
  categories: state.categories,
});

const mapDispatchToProps = (dispatch: Dispatch<CategoryAction>) => ({
  selectCategory: (payload: string) =>
    dispatch(actions.selectCategory(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
