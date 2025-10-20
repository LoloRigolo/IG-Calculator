import type { Food } from "@/types/food";

export type Meal = {
  id: string;
  title: string;
  foods: Food[];
  ig: number | null;
};
