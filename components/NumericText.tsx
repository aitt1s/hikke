import { ReactElement } from "react";
import { NumericFormat } from "react-number-format";

type NumericTextProps = {
  children: number;
};

export function NumericText({ children }: NumericTextProps): ReactElement {
  return (
    <NumericFormat
      displayType="text"
      thousandSeparator="&nbsp;"
      suffix="&nbsp;€"
      decimalScale={2}
      decimalSeparator={","}
      value={children}
    />
  );
}
