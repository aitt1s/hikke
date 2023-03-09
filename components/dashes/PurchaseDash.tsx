import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { useFormModel } from "../../contexts/FormContext";
import { DashHeader } from "../DashHeader";
import { NumericText } from "../NumericText";

type PurchaseDashProps = {};

export function PurchaseDash({ }: PurchaseDashProps): ReactElement {
  const formModel = useFormModel();

  const sellingPriceTransferTaxIncluded =
    formModel.calculateSellingPriceTransferTaxIncluded().value;

  const transferTaxAmount = formModel.calculateTransferTaxAmount().value;

  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <DashHeader name="price_of_purchase" amount={sellingPriceTransferTaxIncluded} />
      <dl className="mt-2 space-y-2 text-xs font-small text-gray-500">
        <div className="flex justify-between">
          <dt><FormattedMessage id="net_purchase_price" /></dt>
          <dd className="text-gray-900">
            <NumericText>{formModel.netSellingPrice.value}</NumericText>
          </dd>
        </div>
      </dl>
      <dl className="mt-2 space-y-2 text-xs font-small text-gray-500">
        <div className="flex justify-between">
          <dt><FormattedMessage id="purchase_price" /></dt>
          <dd className="text-gray-900">
            <NumericText>{formModel.purchasePrice.value}</NumericText>
          </dd>
        </div>
      </dl>
      <dl className="mt-2 space-y-2 text-xs font-small text-gray-500">
        <div className="flex justify-between">
          <dt><FormattedMessage id="share_of_liabilities" /></dt>
          <dd className="text-gray-900">
            <NumericText>{formModel.solFinance.amount.value}</NumericText>
          </dd>
        </div>
      </dl>
      <dl className="mt-2 space-y-2 text-xs font-small text-gray-500">
        <div className="flex justify-between">
          <dt><FormattedMessage id="transfer_tax_amount" /></dt>
          <dd className="text-gray-900">
            <NumericText>{transferTaxAmount}</NumericText>
          </dd>
        </div>
      </dl>
    </div>
  );
}
