import { Switch } from "@headlessui/react";
import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

type ToggleSwitchProps = {
  label: string;
  value: boolean;
  setValue: (boolean) => void;
};

export function ToggleSwitch({
  label,
  value,
  setValue,
}: ToggleSwitchProps): ReactElement {
  return (
    <Switch.Group as="div" className="mt-1 flex items-center justify-between">
      <Switch.Label
        as="span"
        className="text-xs font-small text-gray-700"
        passive
      >
        <FormattedMessage id={label} />
      </Switch.Label>
      <Switch
        checked={value}
        onChange={() => setValue(!value)}
        className="mt-1 group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        <span className="sr-only"><FormattedMessage id="show_loan_calculator" /></span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute h-full w-full rounded-md bg-white"
        />
        <span
          aria-hidden="true"
          className={classNames(
            value ? "bg-gray-600" : "bg-gray-200",
            "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
          )}
        />
        <span
          aria-hidden="true"
          className={classNames(
            value ? "translate-x-5" : "translate-x-0",
            "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
          )}
        />
      </Switch>
    </Switch.Group>
  );
}
