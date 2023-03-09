import { ReactElement } from "react";
import { NumericFormat } from "react-number-format";

type PricePerSquareTextProps = {
  children: number;
};

export function PricePerSquareText({
  children,
}: PricePerSquareTextProps): ReactElement {
  return (
    <NumericFormat
      displayType="text"
      thousandSeparator={" "}
      suffix=" €/m&#178;"
      decimalScale={2}
      decimalSeparator={","}
      value={children}
    />
  );
}
