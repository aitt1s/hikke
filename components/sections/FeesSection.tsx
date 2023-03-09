import { ReactElement } from "react";
import { FormSection } from "../FormSection";
import { FormSectionFeeStats } from "../FormSectionFeeStats";
import { FormSectionInputGroup } from "../FormSectionInputGroup";
import { FormSectionInputLabel } from "../FormSectionInputLabel";
import { EuroInput } from "../EuroInput";
import { CapitalTypeSwitch } from "../CapitalTypeSwitch";

type FeesSectionProps = {};

export function FeesSection({ }: FeesSectionProps): ReactElement {
  return (
    <FormSection heading={"fees"}>
      <FormSectionInputGroup>
        <FormSectionInputLabel
          label="maintenance_fee"
          htmlFor={"maintenanceFee"}
        />
        <EuroInput name="maintenanceFee" />
      </FormSectionInputGroup>

      <FormSectionInputGroup>
        <FormSectionInputLabel
          label="charge_for_financial_costs"
          htmlFor={"chargeForFinancialCosts"}
        />
        <EuroInput name="chargeForFinancialCosts" />
        <CapitalTypeSwitch />
      </FormSectionInputGroup>
      <FormSectionFeeStats />
    </FormSection>
  );
}
