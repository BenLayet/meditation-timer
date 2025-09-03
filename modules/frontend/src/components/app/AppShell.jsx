/* eslint-disable react/prop-types */
import "../../config/i18n";
import AppPage from "./AppPage.jsx";
import { useEffect, useState } from "react";
import InstallButton from "../install-button/InstallButton.jsx";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const AppShell = ({ stateManager }) => {
  const { i18n } = useTranslation();
  const [vm, setVM] = useState(stateManager.getRootVM());
  useEffect(() => {
    stateManager.addRootVMChangedListener(setVM);
    return () => stateManager.removeRootVMChangedListener(setVM);
  }, []);

  return i18n.isInitialized ? (
    <>
      <InstallButton />
      <AppPage vm={vm} />
    </>
  ) : (
    <FontAwesomeIcon icon={faSpinner} spin />
  );
};
export default AppShell;
