import { ReactElement } from "react";
import { NumericFormat } from "react-number-format";

type SquaremeterTextTextProps = {
  children: number;
};

export function SquaremeterTextText({
  children,
}: SquaremeterTextTextProps): ReactElement {
  return (
    <NumericFormat
      displayType="text"
      thousandSeparator="&nbsp;"
      suffix="&nbsp;m&#178;"
      decimalScale={2}
      decimalSeparator={","}
      value={children}
    />
  );
}
