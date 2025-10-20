"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Meal } from "@/types/meal";

interface MealCardProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (id: string) => void;
}

export default function MealCard({ meal, onEdit, onDelete }: MealCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">{meal.title}</CardTitle>
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold tracking-tight">
            {meal.ig === null ? "N/A" : Math.round(meal.ig)}
          </div>
          <span className="opacity-70">IG</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-2 list-disc pl-6">
          {meal.foods.map((f) => (
            <li key={f.id}>
              <span className="font-bold">{f.name}</span> — {f.qty} g • Carbs{" "}
              {f.carbs} g • Fat {f.fat}% • Fiber {f.fiber}% • Protein{" "}
              {f.protein}%
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="destructive" onClick={() => onDelete(meal.id)}>
            Delete
          </Button>
          <Button variant="secondary" onClick={() => onEdit(meal)}>
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
