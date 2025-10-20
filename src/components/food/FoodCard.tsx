"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { FoodForm } from "@/types/food";

interface FoodCardProps {
  form: FoodForm;
  onChange: <K extends keyof FoodForm>(
    id: string,
    key: K,
    value: FoodForm[K]
  ) => void;
  onRemove: (id: string) => void;
}

export default function FoodCard({ form, onChange, onRemove }: FoodCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">{form.titre}</CardTitle>
        <Button variant="ghost" onClick={() => onRemove(form.id)}>
          Remove
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`name-${form.id}`}>Name</Label>
            <Input
              id={`name-${form.id}`}
              placeholder="e.g., Basmati rice"
              value={form.name}
              onChange={(e) => onChange(form.id, "name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`qty-${form.id}`}>Quantity (grams)</Label>
            <Input
              id={`qty-${form.id}`}
              type="number"
              inputMode="decimal"
              placeholder="e.g., 100"
              value={form.qty}
              onChange={(e) => onChange(form.id, "qty", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`carbs-${form.id}`}>Carbohydrates (grams)</Label>
            <Input
              id={`carbs-${form.id}`}
              type="number"
              inputMode="decimal"
              placeholder="e.g., 75"
              value={form.carbs}
              onChange={(e) => onChange(form.id, "carbs", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`fat-${form.id}`}>Fat (%)</Label>
            <Input
              id={`fat-${form.id}`}
              type="number"
              inputMode="decimal"
              placeholder="e.g., 5"
              value={form.fat}
              onChange={(e) => onChange(form.id, "fat", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`fiber-${form.id}`}>Fiber (%)</Label>
            <Input
              id={`fiber-${form.id}`}
              type="number"
              inputMode="decimal"
              placeholder="e.g., 2"
              value={form.fiber}
              onChange={(e) => onChange(form.id, "fiber", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`protein-${form.id}`}>Protein (%)</Label>
            <Input
              id={`protein-${form.id}`}
              type="number"
              inputMode="decimal"
              placeholder="e.g., 7"
              value={form.protein}
              onChange={(e) => onChange(form.id, "protein", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`cookTime-${form.id}`}>
              Cooking time (minutes)
            </Label>
            <Input
              id={`cookTime-${form.id}`}
              type="number"
              inputMode="numeric"
              placeholder="e.g., 12"
              value={form.cookTime}
              onChange={(e) => onChange(form.id, "cookTime", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`restTime-${form.id}`}>
              Rest time before eating (minutes)
            </Label>
            <Input
              id={`restTime-${form.id}`}
              type="number"
              inputMode="numeric"
              placeholder="e.g., 5"
              value={form.restTime}
              onChange={(e) => onChange(form.id, "restTime", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
