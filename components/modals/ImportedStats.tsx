import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { NumericText } from "../NumericText";
import { SquaremeterTextText } from "../SquaremeterText";
import { Apidata } from "./ImportModal";

type ImportedProps = {
  apiData: Apidata;
};

export function ImportedStats({ apiData }: ImportedProps): ReactElement {
  return (
    <div className="mt-5 sm:mt-6">
      {apiData?.size >= 0 && (
        <dl className="mt-4 space-y-2 text-xs font-small text-gray-500">
          <div className="flex justify-between">
            <dt className="flex"><FormattedMessage id="size" /></dt>
            <dd className="text-gray-900">
              <SquaremeterTextText>{apiData.size}</SquaremeterTextText>
            </dd>
          </div>
        </dl>
      )}
      {apiData?.netSellingPrice >= 0 && (
        <dl className="mt-4 space-y-2 text-xs font-small text-gray-500">
          <div className="flex justify-between">
            <dt className="flex"><FormattedMessage id="net_purchase_price" /></dt>
            <dd className="text-gray-900">
              <NumericText>{apiData.netSellingPrice}</NumericText>
            </dd>
          </div>
        </dl>
      )}
      {apiData?.purchasePrice >= 0 && (
        <dl className="mt-4 space-y-2 text-xs font-small text-gray-500">
          <div className="flex justify-between">
            <dt className="flex"><FormattedMessage id="purchase_price" /></dt>
            <dd className="text-gray-900">
              <NumericText>{apiData.purchasePrice}</NumericText>
            </dd>
          </div>
        </dl>
      )}
      {apiData?.["solFinance.amount"] >= 0 && (
        <dl className="mt-4 space-y-2 text-xs font-small text-gray-500">
          <div className="flex justify-between">
            <dt className="flex"><FormattedMessage id="share_of_liabilities" /></dt>
            <dd className="text-gray-900">
              <NumericText>{apiData["solFinance.amount"]}</NumericText>
            </dd>
          </div>
        </dl>
      )}
      {apiData?.maintenanceFee >= 0 && (
        <dl className="mt-4 space-y-2 text-xs font-small text-gray-500">
          <div className="flex justify-between">
            <dt className="flex"><FormattedMessage id="maintenance_fee" /></dt>
            <dd className="text-gray-900">
              <NumericText>{apiData.maintenanceFee}</NumericText>
            </dd>
          </div>
        </dl>
      )}
      {apiData?.chargeForFinancialCosts >= 0 && (
        <dl className="mt-4 space-y-2 text-xs font-small text-gray-500">
          <div className="flex justify-between">
            <dt className="flex"><FormattedMessage id="charge_for_financial_costs" /></dt>
            <dd className="text-gray-900">
              <NumericText>{apiData.chargeForFinancialCosts}</NumericText>
            </dd>
          </div>
        </dl>
      )}
    </div>
  );
}
