import { createContext, ReactElement, ReactNode, useContext } from "react";
import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormModel } from "../models/FormModel";
import { FormKeys, FormValues } from "../types/Form";

type FormProviderProps = {
  formModel: FormModel;
  children: ReactNode;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  control: Control<FormValues, FormKeys>;
};

const FormContext = createContext(undefined);
const FormRegisterContext = createContext(undefined);
const FormSetValueContext = createContext(undefined);
const FormControlContext = createContext(undefined);

export function FormProvider({
  formModel,
  children,
  register,
  setValue,
  control,
}: FormProviderProps): ReactElement {
  return (
    <FormRegisterContext.Provider value={register}>
      <FormSetValueContext.Provider value={setValue}>
        <FormControlContext.Provider value={control}>
          <FormContext.Provider value={formModel}>
            {children}
          </FormContext.Provider>
        </FormControlContext.Provider>
      </FormSetValueContext.Provider>
    </FormRegisterContext.Provider>
  );
}

export function useFormModel(): FormModel {
  return useContext(FormContext);
}

export function useFormRegister(): UseFormRegister<FormValues> {
  return useContext(FormRegisterContext);
}

export function useFormSetValue(): UseFormSetValue<FormValues> {
  return useContext(FormSetValueContext);
}

export function useFormControl(): Control<FormValues, FormKeys> {
  return useContext(FormControlContext);
}
