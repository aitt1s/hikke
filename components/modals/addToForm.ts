import { useFormSetValue } from "../../contexts/FormContext";
import { FormKeys } from "../../types/Form";
import { Apidata } from "./ImportModal";

export function useAddToForm() {
  const setValue = useFormSetValue();

  return (apiData: Apidata) => {
    for (const [key, value] of Object.entries(apiData)) {
      setValue(key as FormKeys, value);
    }
  };
}
