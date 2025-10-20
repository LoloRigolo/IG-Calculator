export type Food = {
  id: string;
  title: string;
  name: string;
  qty: number; // grams
  carbs: number; // grams
  fat: number; // %
  fiber: number; // %
  protein: number; // %
  cookTime: number;
  restTime: number;
};

export type FoodForm = {
  id: string;
  titre: string;
  name: string;
  qty: string;
  carbs: string;
  fat: string;
  fiber: string;
  protein: string;
  cookTime: string;
  restTime: string;
};
