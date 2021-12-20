type CurrentDashboardMenu = string;

type AllDashboardMenus = CurrentDashboardMenu[];

interface DashboardMenu {
  currentDashboardMenu: CurrentDashboardMenu;
  allDashboardMenus: AllDashboardMenus;
}

interface SelectDashboardMenu extends Action {
  payload: CurrentDashboardMenu;
}

type CurrentCategoryMenu = string;

type AllCategoryMenus = CurrentCategoryMenu[];

interface CategoryMenu {
  currentCategoryMenu: CurrentCategoryMenu;
  allCategoryMenus: AllCategoryMenus;
}

type CurrentAuthorityMenu = string;

type AllAuthorityMenu = CurrentAuthorityMenu[];

interface AuthorityMenu {
  currentAuthorityMenu: CurrentAuthorityMenu;
  allAuthorityMenus: AllAuthorityMenu;
}

interface Menu {
  dashboardMenu: DashboardMenu;
  categoryMenu: CategoryMenu;
  authorityMenu: AuthorityMenu;
}

interface SelectCategoryMenu extends Action {
  payload: CurrentCategoryMenu;
}

type MenuAction = SelectDashboardMenu | SelectCategoryMenu;
