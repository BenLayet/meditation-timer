import { flow } from "lodash-es";
import { formatLocalizedDateTime } from "../../lib/time.functions.js";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faRefresh } from "@fortawesome/free-solid-svg-icons";

export const Synchronization = ({ vm }) => {
  const { t, i18n } = useTranslation();
  const isSynchronizing = vm.selectors.isSynchronizing();
  const lastSynchronized = flow(
    vm.selectors.lastSynchronizedEpochSeconds,
    formatLocalizedDateTime(i18n.language),
  )();

  return (
    <div className="hstack gap-1 text-muted fs-6 align-self-center">
      {t("lastSynchronized")}{" "}
      {isSynchronizing ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <>
          {lastSynchronized}{" "}
          <FontAwesomeIcon
            className="btn btn-sm btn-rounded btn-outline-secondary"
            icon={faRefresh}
            onClick={vm.dispatchers.refreshRequested}
          />
        </>
      )}
    </div>
  );
};
