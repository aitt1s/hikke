import currency from "currency.js";
import { pmt } from "financial";
import { CapitalType, Finance, FormValues, LoanType } from "../types/Form";
import {
  addFinanceFees,
  castCurrency,
  createEmptyFinance,
} from "../utils/calculations";

export type TotalFinanceFees = {
  total: FinanceExpenses;
  finance: FinanceExpenses;
  solFinance: FinanceExpenses;
};

export type FinanceExpenses = {
  total: currency;
  instalment: currency;
  interestInstalment: currency;
};

export class FinanceModel {
  advanced: boolean;
  amount: currency;
  loanType: LoanType;
  interestRate: currency;
  period: currency;

  constructor(finance: Finance) {
    this.advanced = finance.advanced;
    this.amount = castCurrency(finance.amount);
    this.loanType = finance.loanType;
    this.interestRate = castCurrency(finance.interestRate);
    this.period = castCurrency(finance.period);
  }
}

export class FormModel {
  size: currency;
  netSellingPrice: currency;
  purchasePrice: currency;
  rent: currency;
  maintenanceFee: currency;
  chargeForFinancialCosts: currency;
  transferTax: currency;
  incomeTax: currency;

  finance: FinanceModel;
  solFinance: FinanceModel;

  capitalType: CapitalType;

  constructor(form: FormValues) {
    this.size = castCurrency(form.size);
    this.netSellingPrice = castCurrency(form.netSellingPrice);
    this.purchasePrice = castCurrency(form.purchasePrice);
    this.rent = castCurrency(form.rent);
    this.maintenanceFee = castCurrency(form.maintenanceFee);
    this.chargeForFinancialCosts = castCurrency(form.chargeForFinancialCosts);
    this.transferTax = castCurrency(form.transferTax, 9);
    this.incomeTax = castCurrency(form.incomeTax, 9);

    this.finance = new FinanceModel(form.finance);
    this.solFinance = new FinanceModel(form.solFinance);
    this.capitalType = form.capitalType;
  }

  public calculateGrossRentalIncomePerYear(): currency {
    return this.calculateGrossIncome().multiply(12);
  }

  public calculateNetRentalIncomePerYear(): currency {
    return this.calculateNetIncome().multiply(12);
  }

  public calculateNetRentalIncomePercentPerCapita(): currency {
    const capita = this.purchasePrice.subtract(
      this.finance.advanced ? this.finance.amount : castCurrency(0)
    );

    return this.calculateNetRentalIncomePerYear().divide(capita).multiply(100);
  }

  public calculateNetRentalIncomePercent(): currency {
    const sellingPriceTransferTaxIncluded =
      this.calculateSellingPriceTransferTaxIncluded();

    return this.calculateNetRentalIncomePerYear()
      .divide(sellingPriceTransferTaxIncluded)
      .multiply(100);
  }

  public calculateGrossRentalIncomePercent(): currency {
    const sellingPriceTransferTaxIncluded =
      this.calculateSellingPriceTransferTaxIncluded();

    return this.calculateGrossRentalIncomePerYear()
      .divide(sellingPriceTransferTaxIncluded)
      .multiply(100);
  }

  public calculateGrossIncome(): currency {
    return this.rent.subtract(this.maintenanceFee);
  }

  public calculateFinanceTaxFreeAmount(): currency {
    return this.calculateFinanceExpenses().interestInstalment;
  }

  public calculateChargeForFinancialCostsTaxFreeAmount(): currency {
    const taxFree = this.capitalType === "income";
    return taxFree ? this.chargeForFinancialCosts : castCurrency(0);
  }

  public calculateSolFinanceTaxFreeAmount(): currency {
    const taxFree = this.capitalType === "income";

    return taxFree ? this.calculateSolFinanceExpenses().total : castCurrency(0);
  }

  public calculateRentTaxable(): currency {
    const taxable = this.rent
      .subtract(this.maintenanceFee)
      .subtract(this.calculateFinanceTaxFreeAmount())
      .subtract(this.calculateSolFinanceTaxFreeAmount())
      .subtract(this.calculateChargeForFinancialCostsTaxFreeAmount());

    return this.rent > taxable ? taxable : castCurrency(0);
  }

  public calculateRentTaxAmount(): currency {
    const taxRateMultiplier = this.incomeTax.divide(100);
    return this.calculateRentTaxable().multiply(taxRateMultiplier);
  }

  public calculateNetIncome(): currency {
    return this.rent
      .subtract(this.maintenanceFee)
      .subtract(this.chargeForFinancialCosts)
      .subtract(this.calculateFinanceExpenses().total)
      .subtract(this.calculateSolFinanceExpenses().total)
      .subtract(this.calculateRentTaxAmount());
  }

  public calculateSellingPriceTransferTaxIncluded(): currency {
    return this.calculateTransferTaxAmount().add(this.netSellingPrice);
  }

  public calculateTransferTaxAmount(): currency {
    const transferTaxRate = this.transferTax.divide(100);

    return this.netSellingPrice.multiply(transferTaxRate);
  }

  public calculateFinanceExpenses(): FinanceExpenses {
    return this.finance.advanced
      ? this.calculateLoanExpenses(this.finance)
      : createEmptyFinance();
  }

  public calculateSolFinanceExpenses(): FinanceExpenses {
    return this.solFinance.advanced
      ? this.calculateLoanExpenses(this.solFinance)
      : createEmptyFinance();
  }

  private calculateLoanExpenses(finance: FinanceModel): FinanceExpenses {
    const interestInstalment = this.calculateInterestInstallment(finance);

    switch (finance.loanType) {
      case "annuity":
        const annuityTotal = this.calculateAnnuityLoan(finance);

        return {
          total: annuityTotal,
          instalment: this.calculateInstalment(
            annuityTotal,
            interestInstalment
          ),
          interestInstalment,
        };

      case "fixedAmortization":
        const fixedAmortizationTotal =
          this.calculatefixedAmortizationLoan(finance);

        return {
          total: fixedAmortizationTotal,
          instalment: this.calculateInstalment(
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
        throw Error("Undefined loan type");
    }
  }

  public calculateInterestInstallment(finance: FinanceModel): currency {
    const interestFraction = this.calculateInterestFractionPerPeriod(
      finance.interestRate
    );

    return finance.amount.multiply(interestFraction);
  }

  public calculateInterestFractionPerPeriod(interestRate: currency): currency {
    return castCurrency(interestRate).divide(100).divide(12);
  }

  private calculateAnnuityLoan(finance: FinanceModel): currency {
    const interestFraction = this.calculateInterestFractionPerPeriod(
      finance.interestRate
    );

    const result = pmt(
      interestFraction.value,
      finance.period.value * 12,
      -finance.amount.value
    );

    return castCurrency(result);
  }

  private calculatefixedAmortizationLoan(finance: FinanceModel): currency {
    const interestFraction = this.calculateInterestFractionPerPeriod(
      finance.interestRate
    );

    const upper = castCurrency(finance.amount).divide(
      finance.period.value * 12
    );

    const lower = castCurrency(finance.amount).multiply(interestFraction.value);
    return upper.add(lower);
  }

  public calculateInstalment(
    totalAmount: currency,
    interestAmount: currency
  ): currency {
    return totalAmount.subtract(interestAmount);
  }

  public calculateTotalFees(): {
    total: currency;
    maintenanceFee: currency;
    chargeForFinancialCosts: currency;
    finance: FinanceExpenses;
    solFinance: FinanceExpenses;
  } {
    const loanFees = this.calculateFinancingFees();

    const total = this.maintenanceFee
      .add(this.chargeForFinancialCosts)
      .add(loanFees.total.total);

    return {
      total,
      maintenanceFee: this.maintenanceFee,
      chargeForFinancialCosts: this.chargeForFinancialCosts,
      finance: loanFees.finance,
      solFinance: loanFees.solFinance,
    };
  }

  public calculateFinancingFees(): TotalFinanceFees {
    const hasFinance = this.finance.advanced;
    const hasSolFinance = this.solFinance.advanced;
    let financingTotal = createEmptyFinance();
    let finance;
    let solFinance;

    if (hasFinance) {
      finance = this.calculateFinanceExpenses();
      financingTotal = addFinanceFees(financingTotal, finance);
    }

    if (hasSolFinance) {
      solFinance = this.calculateSolFinanceExpenses();
      financingTotal = addFinanceFees(financingTotal, solFinance);
    }

    return { total: financingTotal, finance, solFinance };
  }

  public calculateNetSellingPricePerSquare(): currency {
    return this.netSellingPrice.divide(this.size);
  }

  public calculateMaintenanceFeePerSquare(): currency {
    return this.maintenanceFee.divide(this.size);
  }

  public calculateRentPerSquare(): currency {
    return this.rent.divide(this.size);
  }
}
