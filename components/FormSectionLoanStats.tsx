import { FormattedMessage } from "react-intl";
import { FinanceExpenses } from "../models/FormModel";
import { NumericText } from "./NumericText";

type FormSectionLoanStatsProps = {
  expenses: FinanceExpenses;
};

export function FormSectionLoanStats({ expenses }: FormSectionLoanStatsProps) {
  return (
    <dl className="mt-4 space-y-2 text-xs font-small text-gray-500">
      <div className="flex justify-between">
        <dt className="flex"><FormattedMessage id="instalment" /></dt>
        <dd className="text-gray-900">
          <NumericText>{expenses.instalment.value}</NumericText>
        </dd>
      </div>
      <div className="flex justify-between">
        <dt className="flex"><FormattedMessage id="interest_instalment" /></dt>
        <dd className="text-gray-900">
          <NumericText>{expenses.interestInstalment.value}</NumericText>
        </dd>
      </div>
      <div className="flex justify-between">
        <dt><FormattedMessage id="loan_expenses" /></dt>
        <dd className="font-bold text-gray-900">
          <NumericText>{expenses.total.value}</NumericText>
        </dd>
      </div>
    </dl>
  );
}
