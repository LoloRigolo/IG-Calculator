"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
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
          <div className="space-y-2  md:col-span-2">
            <Label htmlFor={`name-${form.id}`}>Name</Label>
            <Input
              id={`name-${form.id}`}
              placeholder="e.g., Basmati rice"
              value={form.name}
              onChange={(e) => onChange(form.id, "name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`qty-${form.id}`}>Portion (g/ml)</Label>
            <Input
              id={`qty-${form.id}`}
              type="number"
              inputMode="decimal"
              placeholder="e.g., 150"
              value={form.qty}
              onChange={(e) => onChange(form.id, "qty", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`carbs-${form.id}`}>Carbs /100g</Label>
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
            <Label htmlFor={`sugars-${form.id}`}>Sugars /100g</Label>
            <Input
              id={`sugars-${form.id}`}
              type="number"
              inputMode="decimal"
              placeholder="e.g., 3"
              value={form.sugars}
              onChange={(e) => onChange(form.id, "sugars", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`fiber-${form.id}`}>Fiber /100g</Label>
            <Input
              id={`fiber-${form.id}`}
              type="number"
              inputMode="decimal"
              placeholder="e.g., 2.5"
              value={form.fiber}
              onChange={(e) => onChange(form.id, "fiber", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`fat-${form.id}`}>Fat /100g</Label>
            <Input
              id={`fat-${form.id}`}
              type="number"
              inputMode="decimal"
              placeholder="e.g., 1.2"
              value={form.fat}
              onChange={(e) => onChange(form.id, "fat", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`protein-${form.id}`}>Protein /100g</Label>
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
            <Label>Sugar type</Label>
            <Select
              value={form.sugarType || undefined}
              onValueChange={(v) =>
                onChange(form.id, "sugarType", v as FoodForm["sugarType"])
              }
            >
              <SelectTrigger id={`sugarType-${form.id}`}>
                <SelectValue placeholder="Select sugar type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="glucose">Glucose</SelectItem>
                <SelectItem value="sucrose">Sucrose</SelectItem>
                <SelectItem value="fructose">Fructose</SelectItem>
                <SelectItem value="lactose">Lactose</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Starch processing</Label>
            <Select
              value={form.starchProcessing || undefined}
              onValueChange={(v) =>
                onChange(
                  form.id,
                  "starchProcessing",
                  v as FoodForm["starchProcessing"]
                )
              }
            >
              <SelectTrigger id={`starchProc-${form.id}`}>
                <SelectValue placeholder="Select processing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="intact">Intact</SelectItem>
                <SelectItem value="complet">Complet</SelectItem>
                <SelectItem value="al_dente">Al dente</SelectItem>
                <SelectItem value="raffine">Raffiné</SelectItem>
                <SelectItem value="trop_cuit">Trop cuit</SelectItem>
                <SelectItem value="instantane">Instantané</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3 md:col-span-2">
            <Switch
              id={`cif-${form.id}`}
              checked={!!form.carbsIncludeFiber}
              onCheckedChange={(checked) =>
                onChange(form.id, "carbsIncludeFiber", checked)
              }
            />
            <Label htmlFor={`cif-${form.id}`}>
              Carbs values include fiber (EU label)
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
