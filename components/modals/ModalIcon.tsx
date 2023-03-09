import {
  CheckIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ReactElement } from "react";
import { FieldErrorsImpl } from "react-hook-form";
import { Apidata, ModalFormValues } from "./ImportModal";

type ModalIconProps = {
  loading: boolean;
  errors: FieldErrorsImpl<ModalFormValues>;
  apiData: Apidata;
};

export function ModalIcon({
  loading,
  errors,
  apiData,
}: ModalIconProps): ReactElement {
  if (loading) {
    return (
      <svg
        className="animate-spin h-6 w-6 text-gray-900"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  } else if (!loading && errors.url) {
    return <XMarkIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />;
  } else if (apiData) {
    return <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />;
  } else {
    return (
      <QuestionMarkCircleIcon
        className="h-6 w-6 text-gray-600"
        aria-hidden="true"
      />
    );
  }
}
