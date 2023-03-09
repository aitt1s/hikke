import { ReactElement } from "react";
import { NumericFormat } from "react-number-format";

type PercentageTextProps = {
  children: number;
};

export function PercentageText({
  children,
}: PercentageTextProps): ReactElement {
  return (
    <NumericFormat
      displayType="text"
      thousandSeparator="&nbsp;"
      suffix="&nbsp;%"
      decimalScale={2}
      decimalSeparator={","}
      value={children}
    />
  );
}
