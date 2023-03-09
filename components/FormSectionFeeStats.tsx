import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { useFormModel } from "../contexts/FormContext";
import { NumericText } from "./NumericText";

type FormSectionFeeStatsProps = {};

export function FormSectionFeeStats({ }: FormSectionFeeStatsProps): ReactElement {
  const formModel = useFormModel();
  const finance = formModel.finance.advanced;
  const solFinance = formModel.solFinance.advanced;
  const totalFees = formModel.calculateTotalFees();

  return (
    <dl className="mt-4 space-y-2 text-xs font-small text-gray-500">
      <div className="flex justify-between">
        <dt><FormattedMessage id="maintenance_fee" /></dt>
        <dd className="text-gray-900">
          <NumericText>{totalFees.maintenanceFee.value}</NumericText>
        </dd>
      </div>
      <div className="flex justify-between">
        <dt><FormattedMessage id="charge_for_financial_costs" /></dt>
        <dd className="text-gray-900">
          <NumericText>{totalFees.chargeForFinancialCosts.value}</NumericText>
        </dd>
      </div>
      {finance && (
        <div className="flex justify-between">
          <dt className="flex"><FormattedMessage id="financing_fees" /></dt>
          <dd className="text-gray-900">
            <NumericText>{totalFees.finance.total.value}</NumericText>
          </dd>
        </div>
      )}
      {solFinance && (
        <div className="flex justify-between">
          <dt className="flex"><FormattedMessage id="share_of_liabilities" /></dt>
          <dd className="text-gray-900">
            <NumericText>{totalFees.solFinance.total.value}</NumericText>
          </dd>
        </div>
      )}
      <div className="flex justify-between">
        <dt className="flex"><FormattedMessage id="total_fees" /></dt>
        <dd className="font-bold text-gray-900">
          <NumericText>{totalFees.total.value}</NumericText>
        </dd>
      </div>
    </dl>
  );
}
