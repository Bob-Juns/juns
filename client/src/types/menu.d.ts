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

interface Menu {
  dashboardMenu: DashboardMenu;
  categoryMenu: CategoryMenu;
}

interface SelectCategoryMenu extends Action {
  payload: CurrentCategoryMenu;
}

type MenuAction = SelectDashboardMenu | SelectCategoryMenu;
