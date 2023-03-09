import { FormattedMessage } from "react-intl";

export function StickyMobileNav({ dashboard, showDashboard }) {
  return (
    <div className="sticky bottom-2 px-4 sm:hidden block">
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-sm border border-transparent bg-gray-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:ring-gray-500 sm:text-sm"
        onClick={() => showDashboard(!dashboard)}
      >
        {dashboard ? <FormattedMessage id="edit" /> : <FormattedMessage id="show_dashboard" />}
      </button>
    </div>
  )
}