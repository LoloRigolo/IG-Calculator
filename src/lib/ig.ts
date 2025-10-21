import type { Food } from "@/types/food";

function clamp01_100(x: number) {
  return Math.max(0, Math.min(100, x));
}

function gramsInPortion(per100: number | undefined, qty: number): number {
  return Math.max(0, ((per100 ?? 0) * (qty || 0)) / 100);
}

function availableCarbsPer100(f: Food): number {
  const carbs = f.carbs ?? 0;
  const fiber = f.fiber ?? 0;
  return f.carbsIncludeFiber ? Math.max(0, carbs - fiber) : carbs;
}

function baseIGForSugarType(t?: Food["sugarType"]): number {
  switch (t) {
    case "glucose":
      return 100;
    case "fructose":
      return 20;
    case "lactose":
      return 46;
    case "sucrose":
    default:
      return 65;
  }
}

function baseIGForStarch(proc?: Food["starchProcessing"]): number {
  let ig = 70;
  switch (proc) {
    case "intact":
    case "complet":
    case "al_dente":
      ig -= 10;
      break;
    case "raffine":
      ig += 0;
      break;
    case "trop_cuit":
      ig += 10;
      break;
    case "instantane":
      ig += 15;
      break;
    default:
      ig += 0;
  }
  return clamp01_100(ig);
}

export function computeFoodIG(f: Food): number {
  const qty = f.qty || 0;

  const carbsPer100Avail = availableCarbsPer100(f);

  const gSugars = gramsInPortion(f.sugars ?? 0, qty);
  const gFiber = gramsInPortion(f.fiber ?? 0, qty);
  const gFat = gramsInPortion(f.fat ?? 0, qty);
  const gProt = gramsInPortion(f.protein ?? 0, qty);

  const gCarbsAvail = gramsInPortion(carbsPer100Avail, qty);
  const gStarch = Math.max(0, gCarbsAvail - gSugars);

  const igSugars = baseIGForSugarType(f.sugarType);
  const igStarch = baseIGForStarch(f.starchProcessing);

  let igBase: number;
  const denom = gSugars + gStarch;
  if (denom <= 0) {
    igBase = 0;
  } else {
    igBase = (igSugars * gSugars + igStarch * gStarch) / denom;
  }

  if (denom > 0) {
    const fiberRatio = gFiber / denom;
    const fatRatio = gFat / denom;
    const proteinRatio = gProt / denom;

    const delta = 10 * fiberRatio + 5 * fatRatio + 3 * proteinRatio;

    igBase = igBase - delta;
  }

  return clamp01_100(igBase);
}

export function computeMealIG(foods: Food[]): number | null {
  let weighted = 0;
  let totalAvailCarbs = 0;

  for (const f of foods) {
    const ig = computeFoodIG(f);
    const carbsAvailPer100 = availableCarbsPer100(f);
    const gCarbsAvail = gramsInPortion(carbsAvailPer100, f.qty || 0);

    weighted += ig * gCarbsAvail;
    totalAvailCarbs += gCarbsAvail;
  }

  if (totalAvailCarbs <= 0) return null;
  const raw = weighted / totalAvailCarbs;
  return raw - 10;
}
