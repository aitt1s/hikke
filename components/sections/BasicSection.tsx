import { ReactElement } from "react";
import { useIntl } from "react-intl";
import { useFormModel, useFormSetValue } from "../../contexts/FormContext";
import { FormSection } from "../FormSection";
import { FormSectionInputGroup } from "../FormSectionInputGroup";
import { FormSectionInputLabel } from "../FormSectionInputLabel";
import { IncomeTax } from "../IncomeTax";
import { SquareMeterInput } from "../SquareMeterInput";

type BasicSectionProps = {};

export function BasicSection({ }: BasicSectionProps): ReactElement {
  return (
    <FormSection heading={"basic_information"}>
      <FormSectionInputGroup>
        <FormSectionInputLabel label="size" htmlFor={"size"} />
        <SquareMeterInput name="size" />
      </FormSectionInputGroup>
    </FormSection>
  );
}
