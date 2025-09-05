import { useEffect, useState } from "react";
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
      console.log("beforeinstallprompt");
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
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
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
  if (!isVisible) return null;

  return (
    <div
      data-bs-theme="light"
      className="
    position-fixed top-0 start-0 w-100 z-1
    d-flex justify-content-center
    bg-light border border-secondary shadow p-2 "
    >
      {isIos ? (
        <p className="m-1 text-dark">{t("installAppIos")}</p>
      ) : (
        <button className="btn btn-secondary" onClick={handleInstall}>
          {t("installApp")}
        </button>
      )}
      <button
        className="btn btn-close m-2 position-absolute top-0 end-0"
        onClick={handleCloseBanner}
        aria-label={t("closeBanner")}
      />
    </div>
  );
};

export default InstallButton;
