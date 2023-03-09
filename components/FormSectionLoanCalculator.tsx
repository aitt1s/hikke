import { FormattedMessage } from "react-intl";
import { useFormControl, useFormRegister } from "../contexts/FormContext";
import { FinanceExpenses, FormModel } from "../models/FormModel";
import { CapitalTypeSwitch } from "./CapitalTypeSwitch";
import { EuroInput } from "./EuroInput";
import { FormSectionInputGroup } from "./FormSectionInputGroup";
import { FormSectionInputLabel } from "./FormSectionInputLabel";
import { FormSectionLoanStats } from "./FormSectionLoanStats";
import { FormSectionSubInputGroup } from "./FormSectionSubInputGroup";
import { PercentageInput } from "./PercentageInput";
import { YearInput } from "./YearInput";

type FormSectionLoanCalculatorProps = {
  financeName: "finance" | "solFinance";
  expenses: FinanceExpenses;
};

export function FormSectionLoanCalculator({
  financeName,
  expenses,
}: FormSectionLoanCalculatorProps) {
  const register = useFormRegister();

  return (
    <FormSectionSubInputGroup>
      {financeName === "finance" && (
        <FormSectionInputGroup>
          <FormSectionInputLabel
            label="finance_amount"
            htmlFor={"finance.amount"}
          />
          <EuroInput name="finance.amount" />
        </FormSectionInputGroup>
      )}

      <FormSectionInputGroup>
        <FormSectionInputLabel
          label="loan_type"
          htmlFor={`${financeName}.loanType`}
        />

        <select
          className="w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
          {...register(`${financeName}.loanType`)}
        >
          <option value="annuity"><FormattedMessage id="annuity" /></option>
          <option value="fixedAmortization">
            <FormattedMessage id="fixed_amortization" />
          </option>
          <option value="bullet"><FormattedMessage id="bullet" /></option>
        </select>
      </FormSectionInputGroup>

      <FormSectionInputGroup>
        <FormSectionInputLabel
          label="interest_rate"
          htmlFor={`${financeName}.interestRate`}
        />
        <PercentageInput name={`${financeName}.interestRate`} />
      </FormSectionInputGroup>

      <FormSectionInputGroup>
        <FormSectionInputLabel
          label="loan_period_in_years"
          htmlFor={`${financeName}.period`}
        />
        <YearInput name={`${financeName}.period`} />
      </FormSectionInputGroup>
      {financeName === "solFinance" && <CapitalTypeSwitch />}

      <FormSectionLoanStats expenses={expenses} />
    </FormSectionSubInputGroup>
  );
}
