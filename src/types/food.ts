export type Food = {
  id: string;
  title: string;

  name?: string;
  qty: number;

  cookTime?: number;
  restTime?: number;

  carbs?: number;
  sugars?: number;
  fiber?: number;
  fat?: number;
  protein?: number;

  sugarType?: "glucose" | "sucrose" | "fructose" | "lactose";
  starchProcessing?:
    | "intact"
    | "complet"
    | "al_dente"
    | "raffine"
    | "trop_cuit"
    | "instantane";
  carbsIncludeFiber?: boolean;
};

export type FoodForm = {
  id: string;
  titre: string;
  name: string;
  qty: string;
  carbs: string;
  sugars: string;
  fiber: string;
  fat: string;
  protein: string;
  cookTime: string;
  restTime: string;
  igKnown?: string;
  sugarType: "" | "glucose" | "sucrose" | "fructose" | "lactose";
  starchProcessing:
    | ""
    | "intact"
    | "complet"
    | "al_dente"
    | "raffine"
    | "trop_cuit"
    | "instantane";

  carbsIncludeFiber?: boolean;
};
