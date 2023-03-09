import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { useFormModel } from "../../contexts/FormContext";
import { DashHeader } from "../DashHeader";
import { NumericText } from "../NumericText";
import { PercentageText } from "../PercentageText";

export function GrossIncomeDash(): ReactElement {
  const formModel = useFormModel();

  const grossRentalIncomePercentPerYear =
    formModel.calculateGrossRentalIncomePercent().value;

  const grossRentalIncomePerYear =
    formModel.calculateGrossRentalIncomePerYear().value;

  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <DashHeader name="gross_income_percent" amount={grossRentalIncomePercentPerYear} />
      <dl className="mt-2 space-y-2 text-xs font-small text-gray-500">
        <div className="flex justify-between">
          <dt><FormattedMessage id={'gross_income_per_year'} /></dt>
          <dd className="text-gray-900">
            <NumericText>{grossRentalIncomePerYear}</NumericText>
          </dd>
        </div>
      </dl>
    </div>
  );
}
