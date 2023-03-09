import { ReactElement, ReactNode } from "react";
import { FormSectionHeading } from "./FormSectionHeading";

type FormSectionProps = {
  children: ReactNode;
  heading: string;
};

export function FormSection({
  children,
  heading,
}: FormSectionProps): ReactElement {
  return (
    <div className="px-4 pb-4 mt-1 w-full">
      <FormSectionHeading heading={heading} />
      {children}
    </div>
  );
}
