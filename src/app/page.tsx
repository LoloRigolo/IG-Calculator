"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import FoodCard from "@/components/food/FoodCard";
import MealCard from "@/components/meal/MealCard";
import type { FoodForm, Food as FoodModel } from "@/types/food";
import type { Meal } from "@/types/meal";
import { computeMealIG } from "@/lib/ig";

const s = (v?: number) => (v == null ? "" : String(v));
const parseOpt = (txt: string): number | undefined =>
  txt.trim() === "" ? undefined : Number(txt);
const parseReq = (txt: string): number => Number(txt || 0);

export default function Home() {
  const [open, setOpen] = useState(false);
  const [forms, setForms] = useState<FoodForm[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [editingMealId, setEditingMealId] = useState<string | null>(null);

  function makeBlankForm(n: number): FoodForm {
    return {
      id: crypto.randomUUID(),
      titre: `Food ${n}`,
      name: "",
      qty: "",
      carbs: "",
      sugars: "",
      fiber: "",
      fat: "",
      protein: "",
      cookTime: "",
      restTime: "",
      sugarType: "",
      starchProcessing: "",
      carbsIncludeFiber: false,
    };
  }

  function openMeal() {
    setOpen(true);
    setEditingMealId(null);
    setForms((prev) => (prev.length === 0 ? [makeBlankForm(1)] : prev));
  }

  function addForm() {
    setForms((prev) => [...prev, makeBlankForm(prev.length + 1)]);
  }

  function updateForm<K extends keyof FoodForm>(
    id: string,
    key: K,
    value: FoodForm[K]
  ) {
    setForms((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: value } : f))
    );
  }

  function removeForm(id: string) {
    setForms((prev) =>
      prev
        .filter((f) => f.id !== id)
        .map((f, i) => ({ ...f, titre: `Food ${i + 1}` }))
    );
  }

  function onCancel() {
    setOpen(false);
    setForms([]);
    setEditingMealId(null);
  }

  function createFoodsFromForms(): FoodModel[] {
    return forms
      .filter((f) => f.name && f.qty.trim() !== "")
      .map((f, idx) => ({
        id: crypto.randomUUID(),
        title: f.titre || `Food ${idx + 1}`,
        name: f.name || undefined,
        qty: parseReq(f.qty),

        carbs: parseOpt(f.carbs),
        sugars: parseOpt(f.sugars),
        fiber: parseOpt(f.fiber),
        fat: parseOpt(f.fat),
        protein: parseOpt(f.protein),

        sugarType: f.sugarType || undefined,
        starchProcessing: f.starchProcessing || undefined,
        carbsIncludeFiber: !!f.carbsIncludeFiber,
      }));
  }

  function onSubmit() {
    const foods = createFoodsFromForms();
    const ig = computeMealIG(foods as any); // compatible structurellement

    if (editingMealId) {
      setMeals((prev) =>
        prev.map((m) => (m.id === editingMealId ? { ...m, foods, ig } : m))
      );
    } else {
      const mealNumber = meals.length + 1;
      const meal: Meal = {
        id: crypto.randomUUID(),
        title: `Meal ${mealNumber}`,
        foods,
        ig,
      };
      setMeals((prev) => [meal, ...prev]);
    }

    setOpen(false);
    setForms([]);
    setEditingMealId(null);
  }

  function editMeal(meal: Meal) {
    const nextForms: FoodForm[] = meal.foods.map((f, i) => ({
      id: crypto.randomUUID(),
      titre: `Food ${i + 1}`,
      name: f.name ?? "",
      qty: s(f.qty),

      carbs: s(f.carbs),
      sugars: s(f.sugars),
      fiber: s(f.fiber),
      fat: s(f.fat),
      protein: s(f.protein),

      cookTime: s(f.cookTime),
      restTime: s(f.restTime),

      sugarType: (f.sugarType ?? "") as FoodForm["sugarType"],
      starchProcessing: (f.starchProcessing ??
        "") as FoodForm["starchProcessing"],
      carbsIncludeFiber: !!f.carbsIncludeFiber,
    }));

    setEditingMealId(meal.id);
    setOpen(true);
    setForms(nextForms);
  }

  function deleteMeal(id: string) {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold my-10 text-center">IG-Calculator</h1>

      {!open && (
        <div className="flex items-center justify-center w-full mb-5">
          <Button className="text-lg px-6 py-3" onClick={openMeal}>
            New meal
          </Button>
        </div>
      )}

      {open && (
        <div className="w-full max-w-5xl space-y-6 pb-24">
          {forms.map((form) => (
            <FoodCard
              key={form.id}
              form={form}
              onChange={updateForm}
              onRemove={removeForm}
            />
          ))}
        </div>
      )}

      {meals.length > 0 && !open && (
        <section className="w-full max-w-5xl space-y-4 pb-24">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onEdit={editMeal}
              onDelete={deleteMeal}
            />
          ))}
        </section>
      )}

      {open && (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
          <div className="max-w-5xl mx-auto flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={addForm}>
              new food
            </Button>
            <Button variant="ghost" onClick={onCancel}>
              cancel
            </Button>
            <Button onClick={onSubmit}>
              {editingMealId ? "save" : "submit"}
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
