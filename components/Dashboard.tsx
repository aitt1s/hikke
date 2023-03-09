import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { FeesDash } from "./dashes/FeesDash";
import { GrossIncomeDash } from "./dashes/GrossIncome";
import { NetIncomeDash } from "./dashes/NetIncome";
import { NetIncomePercentDash } from "./dashes/NetIncomePercentDash";
import { PurchaseDash } from "./dashes/PurchaseDash";
import { RentDash } from "./dashes/RentDash";
import { SizePricesDash } from "./dashes/SizePricesDash";

type DashboardProps = {};

export function Dashboard({ }: DashboardProps): ReactElement {
  return (
    <div className="mx-8 mt-4 mx-auto">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          <FormattedMessage id="summary" />
        </h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-4">
          <PurchaseDash />
          <FeesDash />
          <RentDash />
          <SizePricesDash />
          <GrossIncomeDash />
          <NetIncomePercentDash />
          <NetIncomeDash />
        </dl>
      </div>
    </div>
  );
}
