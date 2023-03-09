export type FormValues = {
  netSellingPrice: number;
  purchasePrice: number;
  rent: number;
  maintenanceFee: number;
  chargeForFinancialCosts: number;
  transferTax: number;
  incomeTax: number;

  finance: Finance;
  solFinance: Finance;

  size: number;
  capitalType: CapitalType;
};

export type FormKeys = RecursiveKeyOf<FormValues>;

export type LoanType = "annuity" | "fixedAmortization" | "bullet";

export type Finance = {
  advanced: boolean;
  amount: number;
  loanType: LoanType;
  interestRate: number;
  period: number;
};

export type CapitalType = "reserve" | "income";

export type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends any[]
    ? `${TKey}`
    : TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];
