import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import Preparation from "../preparation/Preparation.jsx";
import { InspiringImage } from "../inspiring-image/InspiringImage.jsx";

function MeditationSessionPage({ vm }) {
  //actions
  const stopClicked = vm.dispatchers.stopRequested;

  //selectors
  const preparationIsRunning = vm.selectors.preparationIsRunning();
  const meditationIsRunning = vm.selectors.meditationIsRunning();
  const meditationRemainingTime = vm.selectors.meditationRemainingTime();
  return (
    <div className="d-flex flex-column flex-sm-row flex-fill align-items-center text-center">
      <div
        className="
          flex-fill align-self-stretch
          d-flex flex-column align-items-stretch
          text-muted opacity-75"
      >
        <InspiringImage />
      </div>
      <div className="d-flex flex-column mx-3">
        <div className="vstack fs-1 m-3 position-relative">
          <div
            className={"fade " + (preparationIsRunning ? "show" : "pe-none")}
          >
            <Preparation vm={vm.children.preparation} />
          </div>
          <div
            className={
              "position-absolute top-0 bottom-0 w-100 fade vstack justify-content-center" +
              " " +
              (meditationIsRunning ? "show" : "pe-none")
            }
          >
            <div className="mt-time-display">{meditationRemainingTime}</div>
          </div>
        </div>
        <button
          className="btn btn-secondary
         btn-lg border-1 border-primary fs-1 mb-3 px-3"
          aria-label="stop"
          onClick={stopClicked}
          style={{ minWidth: "13rem" }}
        >
          <FontAwesomeIcon icon={faStop} />
        </button>
      </div>
    </div>
  );
}

export default MeditationSessionPage;
