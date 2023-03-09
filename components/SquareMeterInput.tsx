import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useFormControl } from "../contexts/FormContext";
import { FormKeys } from "../types/Form";

type SquareMeterInputProps = {
  name: FormKeys;
};

export function SquareMeterInput({ name }: SquareMeterInputProps) {
  const control = useFormControl();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, name, value } }) => (
        <NumericFormat
          name={name}
          value={value as number}
          suffix=" m&#178;"
          className="w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
          thousandSeparator={""}
          onValueChange={(event) => {
            if (!event.floatValue) {
              onChange(0);
              return;
            }

            onChange(event.floatValue);
          }}
          decimalScale={1}
          decimalSeparator={","}
        />
      )}
    />
  );
}
