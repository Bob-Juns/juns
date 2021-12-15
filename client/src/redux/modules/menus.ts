const SELECT_DASHBOARD_MENU = 'select_dashboard_menu' as const;
const SELECT_CATEGORY_MENU = 'select_category_menu' as const;

export const selectDashboardMenu = (payload: CurrentDashboardMenu) => {
  return {
    type: SELECT_DASHBOARD_MENU,
    payload,
  };
};

export const selectCategoryMenu = (payload: CurrentCategoryMenu) => {
  return {
    type: SELECT_CATEGORY_MENU,
    payload,
  };
};

const initialState: Menu = {
  dashboardMenu: {
    currentDashboardMenu: '홈',
    allDashboardMenus: ['홈', '유저', '채널'],
  },
  categoryMenu: {
    currentCategoryMenu: '전체',
    allCategoryMenus: ['전체', '드라마', '예능', '게임', '영화', '기타'],
  },
};

export const menuReducer = (state = initialState, action: MenuAction) => {
  switch (action.type) {
    case SELECT_DASHBOARD_MENU:
      return {
        ...state,
        dashboardMenu: {
          ...state.dashboardMenu,
          currentDashboardMenu: action.payload,
        },
      };

    case SELECT_CATEGORY_MENU:
      return {
        ...state,
        categoryMenu: {
          ...state.categoryMenu,
          currentCategoryMenu: action.payload,
        },
      };

    default:
      return state;
  }
};
