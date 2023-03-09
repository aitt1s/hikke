import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { useFormModel } from "../../contexts/FormContext";
import { DashHeader } from "../DashHeader";
import { NumericText } from "../NumericText";

export function FeesDash(): ReactElement {
  const formModel = useFormModel();
  const totalFees = formModel.calculateTotalFees();
  const total = totalFees.total.value;
  const finance = formModel.finance.advanced;
  const solFinance = formModel.solFinance.advanced;

  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <DashHeader name="total_fees" amount={total} />
      <dl className="mt-2 space-y-2 text-xs font-small text-gray-500">
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
      </dl>
    </div>
  );
}
