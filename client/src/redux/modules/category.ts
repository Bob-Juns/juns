const SELECT_CATEGORY = 'select_category' as const;

export const selectCategory = (payload: string) => {
  return {
    type: SELECT_CATEGORY,
    payload,
  };
};

const initialState: Category = {
  currentCategory: '전체',
  allCategories: ['전체', '드라마', '예능', '영화', '게임'],
};

export const categoryReducer = (
  state = initialState,
  action: CategoryAction,
) => {
  if (action.type === SELECT_CATEGORY) {
    return {
      ...state,
      currentCategory: state.allCategories.find(
        (category: string) => category === action.payload,
      ),
    };
  } else {
    return state;
  }
};
