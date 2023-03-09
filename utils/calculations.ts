import currency from "currency.js";
import { pmt } from "financial";
import { FinanceExpenses } from "../models/FormModel";

export function calculateGrossRentalIncomePerYear(
  rent: number,
  maintenanceFee: number = 0,
  transferTaxRatePercent: number = 2,
  netSellingPrice: number
): currency {
  if (!rent || !netSellingPrice) {
    return;
  }

  const netIncome = calculateNetIncome(rent, maintenanceFee).multiply(12);
  const sellingPriceTransferTaxIncluded =
    calculateSellingPriceTransferTaxIncluded(
      netSellingPrice,
      transferTaxRatePercent
    );

  return netIncome.divide(sellingPriceTransferTaxIncluded).multiply(100);
}

export function calculateTransferTax(
  netSellingPrice,
  transferTaxRatePercent = 2
) {
  const transferTaxRate = currency(transferTaxRatePercent, {
    precision: 2,
  }).divide(100);

  return currency(netSellingPrice).multiply(transferTaxRate);
}

export function calculateSellingPriceTransferTaxIncluded(
  netSellingPrice,
  transferTaxRate = 2
) {
  const transferTaxAmount = calculateTransferTax(
    netSellingPrice,
    transferTaxRate
  );

  return transferTaxAmount.add(netSellingPrice);
}

export function calculateLoanExpenses(
  loanType = "annuity",
  amount = 0,
  interestRate = 0,
  period = 1
) {
  const interestInstalment = calculateInterestInstallment(
    amount,
    interestRate,
  );

  switch (loanType) {
    case "annuity":
      const annuityTotal = calculateAnnuityLoan(amount, interestRate, period);

      return {
        total: annuityTotal,
        instalment: calculateInstalment(annuityTotal, interestInstalment),
        interestInstalment,
      };

    case "fixedAmortization":
      const fixedAmortizationTotal = calculatefixedAmortizationLoan(
        amount,
        interestRate,
        period
      );

      return {
        total: fixedAmortizationTotal,
        instalment: calculateInstalment(
          fixedAmortizationTotal,
          interestInstalment
        ),
        interestInstalment,
      };

    case "bullet":
      return {
        total: currency(0),
        instalment: interestInstalment,
        interestInstalment,
      };

    default:
      return currency(0);
  }
}

export function calculateAnnuityLoan(amount = 0, interest = 0, period = 1) {
  const interestFraction = calculateInterestFractionPerPeriod(interest);
  const result = pmt(interestFraction.value, period * 12, -amount);

  return currency(result, { precision: 2 });
}

export function calculatefixedAmortizationLoan(
  amount = 0,
  interest = 0,
  period = 1
) {
  const interestFraction = calculateInterestFractionPerPeriod(interest);

  const upper = currency(amount, { precision: 2 }).divide(period * 12);
  const lower = currency(amount, { precision: 2 }).multiply(
    interestFraction.value
  );

  return upper.add(lower);
}

export function calculateInterestFractionPerPeriod(interest = 0) {
  return currency(interest, { precision: 9 }).divide(100).divide(12);
}

export function calculateInterestInstallment(amount, interest) {
  const interestFraction = calculateInterestFractionPerPeriod(interest);

  return currency(amount, { precision: 2 }).multiply(interestFraction);
}

export function calculateInstalment(totalAmount, interestAmount) {
  return totalAmount.subtract(interestAmount);
}

export function calculateFeeTotals(values) {
  const maintenanceFee = currency(values.maintenanceFee, { precision: 4 });
  const chargeForFinancialCosts = currency(values.chargeForFinancialCosts, {
    precision: 2,
  });

  const loanFees = calculateFinancingFees(values);

  const total = maintenanceFee
    .add(chargeForFinancialCosts)
    .add(loanFees.total.total);

  return { total, finance: loanFees.finance, solFinance: loanFees.solFinance };
}

export function calculateFinancingFees(values) {
  const hasFinance = values.finance.advanced;
  const hasSolFinance = values.solFinance.advanced;
  let financingTotal = createEmptyFinance();
  let finance;
  let solFinance;

  if (hasFinance) {
    finance = createEmptyFinance();

    const { loanType, amount, interestRate, period } = values.finance;
    finance = calculateLoanExpenses(loanType, amount, interestRate, period);
    financingTotal = addFinanceFees(financingTotal, finance);
  }

  if (hasSolFinance) {
    solFinance = createEmptyFinance();

    const { loanType, amount, interestRate, period } = values.solFinance;
    solFinance = calculateLoanExpenses(loanType, amount, interestRate, period);
    financingTotal = addFinanceFees(financingTotal, solFinance);
  }

  return { total: financingTotal, finance, solFinance };
}

// small utils
export function createEmptyFinance(): FinanceExpenses {
  return {
    total: castCurrency(),
    instalment: castCurrency(),
    interestInstalment: castCurrency(),
  };
}

export function calculateNetIncome(rent: number, maintenanceFee: number = 0) {
  return currency(rent, { precision: 4 }).subtract(maintenanceFee);
}

export function castCurrency(
  value: number | string | currency = 0,
  precision: number = 9
): currency {
  return currency(value, { precision });
}

export function addFinanceFees(target: FinanceExpenses, from: FinanceExpenses) {
  const { total, instalment, interestInstalment } = target;

  return {
    total: total.add(from.total),
    instalment: instalment.add(from.instalment),
    interestInstalment: interestInstalment.add(from.interestInstalment),
  };
}
