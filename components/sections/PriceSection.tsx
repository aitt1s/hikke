import { ReactElement } from "react";
import { FormSection } from "../FormSection";
import { FormSectionInputGroup } from "../FormSectionInputGroup";
import { FormSectionInputLabel } from "../FormSectionInputLabel";
import { FormSectionLoanCalculator } from "../FormSectionLoanCalculator";

import { ToggleSwitch } from "../ToggleSwitch";
import { TransferTax } from "../TransferTax";

import { EuroInput } from "../EuroInput";
import { useFormModel, useFormSetValue } from "../../contexts/FormContext";

type PriceSectionProps = {};

export function PriceSection({ }: PriceSectionProps): ReactElement {
  const formModel = useFormModel();
  const setValue = useFormSetValue();

  const toggleFinanceValue = (value: boolean) =>
    setValue("finance.advanced", value);

  const toggleSolFinanceValue = (value: boolean) =>
    setValue("solFinance.advanced", value);

  const setTransferTax = (value: number) => setValue("transferTax", value);

  return (
    <FormSection heading={"price"}>
      <FormSectionInputGroup>
        <FormSectionInputLabel
          label="net_purchase_price"
          htmlFor={"netSellingPrice"}
        />
        <EuroInput name="netSellingPrice" />

        <TransferTax
          transferTax={formModel.transferTax}
          setTransferTax={setTransferTax}
        />
      </FormSectionInputGroup>

      <FormSectionInputGroup>
        <FormSectionInputLabel
          label="purchase_price"
          htmlFor={"purchasePrice"}
        />
        <EuroInput name="purchasePrice" />

        <ToggleSwitch
          label="finance_purchase_price"
          value={formModel.finance.advanced}
          setValue={toggleFinanceValue}
        />
        {formModel.finance.advanced && (
          <FormSectionLoanCalculator
            financeName={"finance"}
            expenses={formModel.calculateFinanceExpenses()}
          />
        )}
      </FormSectionInputGroup>

      <FormSectionInputGroup>
        <FormSectionInputLabel
          label="share_of_liabilities"
          htmlFor={"solFinance.amount"}
        />
        <EuroInput name="solFinance.amount" />

        <ToggleSwitch
          label="finance_liabilities"
          value={formModel.solFinance.advanced}
          setValue={toggleSolFinanceValue}
        />
        {formModel.solFinance.advanced && (
          <FormSectionLoanCalculator
            financeName={"solFinance"}
            expenses={formModel.calculateSolFinanceExpenses()}
          />
        )}
      </FormSectionInputGroup>
    </FormSection>
  );
}
