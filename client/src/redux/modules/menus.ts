const SELECT_DASHBOARD_MENU = 'select_dashboard_menu' as const;
const SELECT_CATEGORY_MENU = 'select_category_menu' as const;
const SELECT_AUTHORITY_MENU = 'select_authority_menu' as const;

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

export const selectAuthorityMenu = (payload: CurrentAuthorityMenu) => {
  return {
    type: SELECT_AUTHORITY_MENU,
    payload,
  };
};

export const initialState: Menu = {
  dashboardMenu: {
    currentDashboardMenu: '홈',
    allDashboardMenus: ['홈', '유저', '채널', '배너'],
  },
  categoryMenu: {
    currentCategoryMenu: '카테고리',
    allCategoryMenus: ['전체', '드라마', '예능', '게임', '영화', '종합'],
  },
  authorityMenu: {
    currentAuthorityMenu: '권한',
    allAuthorityMenus: ['전체', '관리자', '일반'],
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

    case SELECT_AUTHORITY_MENU:
      return {
        ...state,
        authorityMenu: {
          ...state.authorityMenu,
          currentAuthorityMenu: action.payload,
        },
      };

    default:
      return state;
  }
};
