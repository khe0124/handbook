export type Plan = {
  version: number;
  asOf: string;
  birthDate: string;
  retirementAge: number;
  totalAssets: number;
  debt: number;
  monthlyRent: number;
  monthlySaving: number;
  retirementMonthly: number;
  illustrativePrincipal: number;
  allocations: { name: string; percent: number; note: string }[];
  holdings: { name: string; group: string; amount: number; gain: number; returnPercent: number; note: string }[];
  crypto: { name: string; quantity: string }[];
  goals: string[];
};
