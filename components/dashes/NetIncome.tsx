import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { useFormModel } from "../../contexts/FormContext";
import { DashHeader } from "../DashHeader";
import { NumericText } from "../NumericText";

export function NetIncomeDash(): ReactElement {
  const formModel = useFormModel();
  const netRentalIncome = formModel.calculateNetIncome().value;
  const rentTaxAmount = formModel.calculateRentTaxAmount().value;
  const rentTaxable = formModel.calculateRentTaxable().value;

  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <DashHeader name="net_income_per_month" amount={netRentalIncome} />
      <dl className="mt-2 space-y-2 text-xs font-small text-gray-500">
        <div className="flex justify-between">
          <dt><FormattedMessage id={'rent'} /></dt>
          <dd className="text-gray-900">
            <NumericText>{formModel.rent.value}</NumericText>
          </dd>
        </div>
        <div className="flex justify-between">
          <dt><FormattedMessage id={'taxable_rent_amount'} /></dt>
          <dd className="text-gray-900">
            <NumericText>{rentTaxable}</NumericText>
          </dd>
        </div>
        <div className="flex justify-between">
          <dt><FormattedMessage id={'tax'} /></dt>
          <dd className="text-gray-900">
            <NumericText>{rentTaxAmount}</NumericText>
          </dd>
        </div>
      </dl>
    </div>
  );
}
