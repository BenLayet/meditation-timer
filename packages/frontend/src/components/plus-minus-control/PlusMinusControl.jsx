import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export const PlusMinusControl = ({ minusClicked, plusClicked }) => (
  <div className="round-button-group">
    <FontAwesomeIcon
      icon={faMinus}
      onClick={minusClicked}
      className="round-button"
    />
    <FontAwesomeIcon
      icon={faPlus}
      onClick={plusClicked}
      className="round-button"
    />
  </div>
);
