import { ReactElement } from "react";
import { useIntl } from "react-intl";
import { useFormModel, useFormSetValue } from "../../contexts/FormContext";
import { EuroInput } from "../EuroInput";
import { FormSection } from "../FormSection";
import { FormSectionInputGroup } from "../FormSectionInputGroup";
import { FormSectionInputLabel } from "../FormSectionInputLabel";
import { IncomeTax } from "../IncomeTax";

type RentSectionProps = {};

export function RentSection({ }: RentSectionProps): ReactElement {
  const formModel = useFormModel();
  const intl = useIntl()
  const setValue = useFormSetValue();

  const setIncomeTax: (value: number) => void = (value) =>
    setValue("incomeTax", value);

  return (
    <FormSection heading="rent">
      <FormSectionInputGroup>
        <FormSectionInputLabel label="rent" htmlFor={"rent"} />
        <EuroInput name="rent" />
        <IncomeTax
          incomeTax={formModel.incomeTax}
          setIncomeTax={setIncomeTax}
        />
      </FormSectionInputGroup>
    </FormSection>
  );
}
