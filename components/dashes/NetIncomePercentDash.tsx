import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { useFormModel } from "../../contexts/FormContext";
import { DashHeader } from "../DashHeader";
import { NumericText } from "../NumericText";
import { PercentageText } from "../PercentageText";

export function NetIncomePercentDash(): ReactElement {
  const formModel = useFormModel();

  const netRentalIncomePercentPerYear =
    formModel.calculateNetRentalIncomePercent().value;

  const netRentalIncomePercentPerCapita =
    formModel.calculateNetRentalIncomePercentPerCapita().value;

  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:py-6">
      <DashHeader name="net_income_percent" amount={netRentalIncomePercentPerYear} />
      <dl className="mt-2 space-y-2 text-xs font-small text-gray-500">
        <div className="flex justify-between">
          <dt><FormattedMessage id={'net_income_per_invested_capita'} /></dt>
          <dd className="text-gray-900">
            <PercentageText>{netRentalIncomePercentPerCapita}</PercentageText>
          </dd>
        </div>
      </dl>
    </div>
  );
}
