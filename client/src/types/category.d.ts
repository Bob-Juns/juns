type CurrentCategory = string;

type AllCategory = CurrentCategory[];

interface Category {
  currentCategory: CurrentCategory;
  allCategories: AllCategory;
}

interface SelectCategory extends Action {
  payload: string;
}

type CategoryAction = SelectCategory;
