import Settings from "../settings/Settings.jsx";

export default ({ vm }) => {
  const canSettingsBeOpened = vm.selectors.canSettingsBeOpened();
  return (
    <div className="app-header">
      <span
        className={" fadeIn " + (canSettingsBeOpened ? "visible" : "hidden")}
      >
        <Settings vm={vm} />
      </span>
    </div>
  );
};
