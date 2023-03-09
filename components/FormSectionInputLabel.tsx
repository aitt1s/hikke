import { FormattedMessage } from "react-intl";

type FormSectionInputLabelProps = {
  label: string;
  htmlFor: string;
};

export function FormSectionInputLabel({
  label,
  htmlFor,
}: FormSectionInputLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-medium text-gray-700"
    >
      <FormattedMessage id={label} />
    </label>
  );
}
