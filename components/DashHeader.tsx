import { FormattedMessage } from "react-intl";
import { NumericText } from "./NumericText";

export function DashHeader({ name, amount }) {
  return (
    <div>
      <dt className="truncate text-center text-sm font-medium text-gray-500">
        <FormattedMessage id={name} />
      </dt>
      <dd className="mt-1 text-center text-2xl font-semibold tracking-tight text-gray-900">
        <NumericText>{amount}</NumericText>
      </dd>
    </div>
  )
}