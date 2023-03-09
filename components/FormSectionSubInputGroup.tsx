import { ReactNode, ReactElement } from "react";

type FormSectionSubInputGroupProps = {
  children: ReactNode;
};

export function FormSectionSubInputGroup({
  children,
}: FormSectionSubInputGroupProps): ReactElement {
  return (
    <div className="mt-1 mb-2 border-l-4 border-gray-500 pl-2">{children}</div>
  );
}
