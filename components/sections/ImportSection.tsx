import { FormattedMessage } from "react-intl";

export function ImportSection({ open, setOpen }) {
  return (
    <div className="px-4 pb-4 mt-1 w-72">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-sm border border-transparent bg-gray-600 px-2 py-2 text-xs font-small leading-4 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        <FormattedMessage id="import_from_oikotie" />
      </button>
    </div>
  );
}
