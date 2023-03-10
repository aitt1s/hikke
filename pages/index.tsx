import { useForm } from "react-hook-form";
import { Dashboard } from "../components/Dashboard";
import { PriceSection } from "../components/sections/PriceSection";
import { FeesSection } from "../components/sections/FeesSection";
import { RentSection } from "../components/sections/RentSection";
import { FormKeys, FormValues } from "../types/Form";
import { FormModel } from "../models/FormModel";
import { FormProvider } from "../contexts/FormContext";
import { BasicSection } from "../components/sections/BasicSection";
import { ImportSection } from "../components/sections/ImportSection";
import { useState } from "react";
import ImportModal from "../components/modals/ImportModal";
import { FormattedMessage } from "react-intl";
import { StickyMobileNav } from "../components/StickyMobileNav";


const defaultValues: FormValues = {
  size: 54.5,

  capitalType: "income",

  netSellingPrice: 150000,
  purchasePrice: 50000,
  rent: 750,
  maintenanceFee: 130,
  chargeForFinancialCosts: 0,
  transferTax: 2,
  incomeTax: 20,

  finance: {
    advanced: false,
    amount: 0,
    loanType: "annuity",
    interestRate: 1,
    period: 25,
  },

  solFinance: {
    advanced: false,
    amount: 0,
    loanType: "annuity",
    interestRate: 0.9,
    period: 20,
  },
};

export default function Home() {
  const { register, setValue, control, watch } = useForm<FormValues, FormKeys>({
    defaultValues,
  });

  const [open, setOpen] = useState(false);
  const [dashboard, setDashboard] = useState(false);

  const showDashboard = (bool: boolean) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setDashboard(bool)
  }

  const values: FormValues = watch();
  const formModel = new FormModel(values);

  return (
    <FormProvider
      formModel={formModel}
      register={register}
      setValue={setValue}
      control={control}
    >
      <div className="container mx-auto flex">
        <div className={`sm:w-72 w-full p-2 ${dashboard ? 'sm:block hidden' : ''}`}>
          <BasicSection />
          <PriceSection />
          <RentSection />
          <FeesSection />
          <ImportSection open={open} setOpen={setOpen} />
        </div>
        <div className={`grow p-2 ${dashboard ? '' : 'sm:block hidden'}`}>
          <Dashboard />
        </div>
      </div>
      <ImportModal open={open} setOpen={setOpen} />
      <StickyMobileNav dashboard={dashboard} showDashboard={showDashboard} />
    </FormProvider >
  );
}