import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { useFormModel } from "../../contexts/FormContext";
import { DashHeader } from "../DashHeader";
import { NumericText } from "../NumericText";
import { PercentageText } from "../PercentageText";

export function RentDash(): ReactElement {
  const formModel = useFormModel();

  const grossRentalIncomePercentPerYear =
    formModel.calculateGrossRentalIncomePercent().value;

  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <DashHeader name="rent" amount={formModel.rent.value} />
      <dl className="mt-2 space-y-2 text-xs font-small text-gray-500">
        <div className="flex justify-between">
          <dt><FormattedMessage id={'income_tax'} /></dt>
          <dd className="text-gray-900">
            <PercentageText>{formModel.incomeTax.value}</PercentageText>
          </dd>
        </div>
        <div className="flex justify-between">
          <dt><FormattedMessage id={'gross_rental_income_per_year'} /></dt>
          <dd className="text-gray-900">
            <PercentageText>{grossRentalIncomePercentPerYear}</PercentageText>
          </dd>
        </div>
      </dl>
    </div>
  );
}
