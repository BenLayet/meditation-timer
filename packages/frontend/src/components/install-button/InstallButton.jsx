import { useEffect, useState } from "react";
import "./InstallButton.css";
import { useTranslation } from "react-i18next";

const InstallButton = () => {
  const [t] = useTranslation();
  const [installPrompt, setInstallPrompt] = useState(null); // Save the install prompt event
  const [isVisible, setIsVisible] = useState(false); // Controls banner visibility
  const [isIos, setIsIos] = useState(false); // Check if the browser is Safari on iOS

  useEffect(() => {
    // Detect if the user is on Safari on iOS
    const userAgent = window.navigator.userAgent;
    const isIosSafari =
      /iPad|iPhone|iPod/.test(userAgent) &&
      !!window.navigator.standalone === false;

    setIsIos(isIosSafari); // Enable banner for iOS Safari

    // Listen for `beforeinstallprompt` on non-iOS platforms
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent automatic prompt display
      setInstallPrompt(e); // Save the prompt event
      setIsVisible(true); // Show banner for supported platforms
    };

    const handleAppInstalled = () => {
      console.log("PWA has been installed.");
      setIsVisible(false); // Hide banner
      setInstallPrompt(null); // Clear saved event
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = () => {
    if (!installPrompt) return;
    installPrompt.prompt(); // Show the install prompt
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("The user accepted the install prompt.");
      } else {
        console.log("The user dismissed the install prompt.");
      }
      setInstallPrompt(null); // Reset prompt after user interaction
      setIsVisible(false); // Hide banner
    });
  };

  const handleCloseBanner = () => {
    setIsVisible(false); // Hide the banner
  };

  // Render the banner based on visibility and platform-specific behavior
  if (!isVisible && !isIos) return null;

  return (
    <div className="install-banner">
      {isIos ? (
        <>
          <p className="install-banner-text">
            {t("installAppIos")}
          </p>
          <button
            className="close-button"
            onClick={handleCloseBanner}
            aria-label={t("closeBanner")}
          >
            ✕
          </button>
        </>
      ) : (
        <>
          <button className="install-button" onClick={handleInstall}>
            {t("installApp")}
          </button>
          <button
            className="close-button"
            onClick={handleCloseBanner}
            aria-label={t("closeBanner")}
          >
            ✕
          </button>
        </>
      )}
    </div>
  );
};

export default InstallButton;