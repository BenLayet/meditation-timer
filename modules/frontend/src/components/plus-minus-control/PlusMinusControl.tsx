import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export const PlusMinusControl = ({ minusClicked, plusClicked }) => (
  <span className="d-inline-flex justify-content-center gap-2">
    <FontAwesomeIcon
      icon={faMinus}
      onClick={minusClicked}
      className="btn btn-secondary text-primary rounded-circle p-2 fs-4"
    />
    <FontAwesomeIcon
      icon={faPlus}
      onClick={plusClicked}
      className="btn btn-secondary text-primary rounded-circle p-2 fs-4"
    />
  </span>
);
