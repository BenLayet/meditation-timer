import "./MeditationSessionPage.css";
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
      <div className="stack-layout timer-zone flex-column">
        <div
          className={
            "stack-layout-tallest-child fade-in " +
            (preparationIsRunning ? "visible" : "hidden")
          }
        >
          <Preparation vm={vm.children.preparation} />
        </div>
        <div
          className={"fade-in  " + (meditationIsRunning ? "visible" : "hidden")}
        >
          <Timer displayedTime={meditationRemainingTime} />
        </div>
      </div>
      <button className="main-action" onClick={stopClicked}>
        <FontAwesomeIcon icon={faStop} />
      </button>
    </>
  );
}

export default MeditationSessionPage;
