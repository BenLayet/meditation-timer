import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export const PlusMinusControl = ({ minusClicked, plusClicked }) => (
  <div className="hstack justify-content-center gap-2">
    <FontAwesomeIcon
      icon={faMinus}
      onClick={minusClicked}
      className="btn btn-outline-primary rounded-circle p-2 fs-4"
    />
    <FontAwesomeIcon
      icon={faPlus}
      onClick={plusClicked}
      className="btn btn-outline-primary rounded-circle p-2 fs-4"
    />
  </div>
);
