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
    <div className="d-flex flex-column flex-fill w-100">
      <div className="opacity-75 flex-fill w-100 d-flex flex-column text-muted fs-5">
        <InspiringImage>
          <figcaption className="text-muted fs-4">
            {t("suzuki_roshi_meditating")}{" "}
            <p className="fs-6  opacity-75">
              {t("with_gratitude_to")}{" "}
              <a target="_blank" href="https://kannondo.org">
                kannondo.org
              </a>
            </p>
          </figcaption>
        </InspiringImage>
      </div>
      <div>
        <NewMeditation vm={vm} />
      </div>
      <button className="main-action mb-3" onClick={playClicked}>
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </div>
  );
}

export default NewMeditationPage;
