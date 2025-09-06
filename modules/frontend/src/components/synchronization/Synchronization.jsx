import { flow } from "lodash-es";
import { formatLocalizedDateTime } from "@softersoftware/functions/time.functions";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Synchronization = ({ vm }) => {
  const { t, i18n } = useTranslation();
  const isSynchronizing = vm.selectors.isSynchronizing();
  const lastSynchronized = flow(
    vm.selectors.lastSynchronizedEpochSeconds,
    formatLocalizedDateTime(i18n.language),
  )();
  const wasLastSynchronizationInError =
    vm.selectors.wasLastSynchronizationInError();

  return (
    <div className="vstatck text-muted fs-6 align-self-center opacity-50">
      <div className="hstack gap-1 ">
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
      {wasLastSynchronizationInError && (
        <p className="text-error">{t("errorInLastSynchronization")}</p>
      )}
    </div>
  );
};
