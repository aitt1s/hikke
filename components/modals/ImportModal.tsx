import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ModalIcon } from "./ModalIcon";
import { ImportedStats } from "./ImportedStats";
import { getError } from "./modalHelpers";
import { useAddToForm } from "./addToForm";
import { FormattedMessage, useIntl } from "react-intl";

export type Apidata = {
  size?: number;
  netSellingPrice?: number;
  purchasePrice?: number;
  ["solFinance.amount"]?: number;
  maintenanceFee?: number;
  chargeForFinancialCosts?: number;
};

type ImportModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type ModalFormValues = {
  url: string;
};

export default function ImportModal({ open, setOpen }: ImportModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState<Apidata | undefined>();
  const addToForm = useAddToForm();
  const intl = useIntl()


  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<{ url: string }>();

  const onSubmit = async (formData: ModalFormValues) => {
    if (apiData) {
      addToForm(apiData);
      closeAndClear();
      return;
    }

    try {
      setLoading(true);
      setApiData(undefined);
      const { data }: { data: Apidata } = await axios.get("/api/oikotie", {
        params: {
          url: encodeURI(formData.url),
        },
      });

      if (data) {
        setApiData(data);
        return;
      }

      throw new Error();
    } catch (error) {
      setError("url", { type: "not_found" });
    } finally {
      setLoading(false);
    }
  };

  const closeAndClear = () => {
    setApiData(undefined);
    setOpen(false);
    setValue("url", undefined);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform w-full overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center text-center sm:items-center  justify-center rounded-full bg-gray-100">
                      <ModalIcon
                        errors={errors}
                        apiData={apiData}
                        loading={loading}
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        <FormattedMessage id="enter_oikotie_url" />
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          <FormattedMessage id="add_oikotie_url_placeholder" />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <label
                      htmlFor="url"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <FormattedMessage id="oikotie_url" />
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        disabled={loading}
                        placeholder="https://asunnot.oikotie.fi/myytavat-asunnot/espoo/16997601"
                        {...register("url", { required: true })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                      {errors.url && (
                        <span className="text-xs py-2">{getError(errors)}</span>
                      )}
                    </div>
                  </div>

                  {apiData && <ImportedStats apiData={apiData} />}

                  <div className="mt-5 sm:mt-6">
                    <input
                      value={apiData ? intl.formatMessage({ id: "add" }) : intl.formatMessage({ id: "import" })}
                      type="submit"
                      className="cursor-pointer inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm"
                    />
                  </div>
                  <div className="mt-2 sm:mt-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm"
                      onClick={closeAndClear}
                    >
                      <FormattedMessage id="back_to_dashboard" />
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
