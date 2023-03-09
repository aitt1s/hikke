import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";

type FormSectionHeadingProps = {
  heading: string;
};

export function FormSectionHeading({
  heading,
}: FormSectionHeadingProps): ReactElement {
  return (
    <h5 className="text-xs font-bold leading-7 border-b-2 border-gray-500 text-gray-900 sm:truncate sm:text-xs sm:tracking-tight mb-1 pb-1">
      <FormattedMessage id={heading} />
    </h5>
  );
}
