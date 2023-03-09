import { RadioGroup } from "@headlessui/react";
import { FormattedMessage } from "react-intl";
import { useFormModel, useFormSetValue } from "../contexts/FormContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const capitalTypeOptions = [
  { value: "income" },
  { value: "reserve" }
];

export function CapitalTypeSwitch() {
  const formModel = useFormModel();
  const setValue = useFormSetValue();

  return (
    <RadioGroup
      value={formModel.capitalType}
      onChange={(value) => setValue("capitalType", value)}
      className="mt-1 flex items-center justify-between"
    >
      <RadioGroup.Label className="block text-xs font-small text-gray-700">
        <FormattedMessage id="capital_type" />
      </RadioGroup.Label>
      <div className="flex bg-gray-100 rounded-sm">
        {capitalTypeOptions.map((option) => (
          <RadioGroup.Option
            key={option.value}
            value={option.value}
            className={({ active, checked }) =>
              classNames(
                active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
                checked
                  ? "bg-gray-600 text-white hover:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-50",
                "p-1 cursor-pointer flex rounded-md items-center py-1 pl-2 pr-2"
              )
            }
          >
            <RadioGroup.Label as="span" className="text-xs font-small">
              <FormattedMessage id={option.value} />
            </RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
