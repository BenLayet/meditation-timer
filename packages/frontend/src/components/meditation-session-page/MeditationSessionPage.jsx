import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import Preparation from "../preparation/Preparation.jsx";
import Timer from "../timer/Timer.jsx";
import { InspiringImage } from "../inspiring-image/InspiringImage.jsx";

function MeditationSessionPage({ vm }) {
  //actions
  const stopClicked = vm.dispatchers.stopRequested;

  //selectors
  const preparationIsRunning = vm.selectors.preparationIsRunning();
  const meditationIsRunning = vm.selectors.meditationIsRunning();
  const meditationRemainingTime = vm.selectors.meditationRemainingTime();
  return (
    <>
      <InspiringImage />
      <div className="stack-layout fs-1 mb-4 flex-column text-center">
        <div
          className={
            "stack-layout-tallest-child fade-in d-flex flex-column align-items-center " +
            (preparationIsRunning ? "visible" : "hidden")
          }
        >
          <Preparation vm={vm.children.preparation} />
        </div>
        <div
          className={
            "fade-in fs-1 " + (meditationIsRunning ? "visible" : "hidden")
          }
        >
          <Timer displayedTime={meditationRemainingTime} />
        </div>
      </div>
      <button
        className="mt-btn main-action align-self-center mb-3 px-5"
        onClick={stopClicked}
      >
        <FontAwesomeIcon icon={faStop} />
      </button>
    </>
  );
}

export default MeditationSessionPage;
