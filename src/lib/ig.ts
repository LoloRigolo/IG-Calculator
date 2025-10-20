import type { Food } from "@/types/food";

function qtyOfFood(nbr: number, qty: number): number {
  const raw = (nbr * qty) / 100;
  return Math.max(0, Math.min(100, raw));
}

function computeFoodIG(f: Food): number {
  // IG_food ≈ 100 − 2×fiber − 0.5×fat − 0.3×protein
  const raw =
    100 -
    2 * (qtyOfFood(f.fiber, f.qty) || 0) -
    0.5 * (qtyOfFood(f.fat, f.qty) || 0) -
    0.3 * (qtyOfFood(f.protein, f.qty) || 0);
  return Math.max(0, Math.min(100, raw));
}

export function computeMealIG(foods: Food[]): number | null {
  const totalWeighted = foods.reduce(
    (acc, f) => acc + computeFoodIG(f) * (f.carbs || 1),
    0
  );
  const totalCarbs = foods.reduce((acc, f) => acc + (f.carbs || 1), 0);
  if (totalCarbs <= 0) return null;
  return totalWeighted / totalCarbs;
}
