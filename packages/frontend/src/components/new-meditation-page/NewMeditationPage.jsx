import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { currentTimeInSeconds } from "../../lib/time.functions.js";
import NewMeditation from "./NewMeditation.jsx";
import { InspiringImage } from "../inspiring-image/InspiringImage.jsx";

function NewMeditationPage({ vm }) {
  const playClicked = () =>
    vm.dispatchers.startSessionRequested({
      currentTimeInSeconds: currentTimeInSeconds(),
    });
  return (
    <div className="d-flex flex-column flex-fill w-100">
      <div className="opacity-75 flex-fill w-100 d-flex">
        <InspiringImage />
      </div>
      <div>
        <NewMeditation vm={vm} />
      </div>
      <button className="main-action" onClick={playClicked}>
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </div>
  );
}

export default NewMeditationPage;
