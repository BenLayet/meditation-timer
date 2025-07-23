import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { currentTimeInSeconds } from "../../lib/time.functions.js";
import NewMeditation from "./NewMeditation.jsx";

function NewMeditationPage({ vm }) {
  const playClicked = () =>
    vm.dispatchers.startSessionRequested({
      currentTimeInSeconds: currentTimeInSeconds(),
    });
  return (
    <>
      <NewMeditation vm={vm} />
      <button className="main-action" onClick={playClicked}>
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </>
  );
}

export default NewMeditationPage;
