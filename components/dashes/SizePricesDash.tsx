import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { useFormModel } from "../../contexts/FormContext";
import { DashHeader } from "../DashHeader";
import { NumericText } from "../NumericText";
import { PricePerSquareText } from "../PricePerSquareText";

export function SizePricesDash(): ReactElement {
  const formModel = useFormModel();

  const pricePerSquare = formModel.calculateNetSellingPricePerSquare().value;
  const maintenanceFeePerSquare =
    formModel.calculateMaintenanceFeePerSquare().value;
  const rentPerSquare = formModel.calculateRentPerSquare().value;

  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <DashHeader name="price_per_square" amount={pricePerSquare} />
      <dl className="mt-2 space-y-2 text-xs font-small text-gray-500">
        <div className="flex justify-between">
          <dt><FormattedMessage id="maintenance_fee_per_square" /></dt>
          <dd className="text-gray-900">
            <PricePerSquareText>{maintenanceFeePerSquare}</PricePerSquareText>
          </dd>
        </div>
        <div className="flex justify-between">
          <dt><FormattedMessage id="rent_per_square" /></dt>
          <dd className="text-gray-900">
            <PricePerSquareText>{rentPerSquare}</PricePerSquareText>
          </dd>
        </div>
      </dl>
    </div>
  );
}
