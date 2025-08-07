import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { currentTimeInSeconds } from "../../lib/time.functions.js";
import NewMeditation from "./NewMeditation.jsx";
import { InspiringImage } from "../inspiring-image/InspiringImage.jsx";
import { useTranslation } from "react-i18next";

function NewMeditationPage({ vm }) {
  const { t } = useTranslation();
  const playClicked = () =>
    vm.dispatchers.startSessionRequested({
      currentTimeInSeconds: currentTimeInSeconds(),
    });
  return (
    <div className="d-flex flex-column flex-lg-row flex-fill align-items-center">
      <div
        className="
          flex-fill align-self-stretch
          d-flex flex-column align-items-stretch
          text-muted opacity-75"
      >
        <InspiringImage>
          <figcaption className="text-muted fs-5 text-center">
            {t("suzuki_roshi_meditating")}{" "}
            <p className="fs-6  opacity-75">
              {t("source")}{" "}
              <a target="_blank" href="https://kannondo.org">
                kannondo.org
              </a>
            </p>
          </figcaption>
        </InspiringImage>
      </div>
      <div>
        <NewMeditation vm={vm} />
        <button className="mt-btn main-action mb-3 px-5" onClick={playClicked}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>
    </div>
  );
}

export default NewMeditationPage;
