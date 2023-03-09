import { ReactElement, ReactNode } from "react";

type FormSectionInputGroupProps = {
  children: ReactNode;
};

export function FormSectionInputGroup({
  children,
}: FormSectionInputGroupProps): ReactElement {
  return <div className="pt-2">{children}</div>;
}
