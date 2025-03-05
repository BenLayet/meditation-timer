import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {Statistics} from "./Statistics.jsx";
import {navigationRequested} from "domain/src/features/navigation/navigation.events.js";
import {useTranslation} from "react-i18next";

function StatisticsPage() {
    const {t} = useTranslation();
    const {dispatch} = useContext(AppStateContext);

    const goBackHomeClicked = () => dispatch(navigationRequested('HOME'))

    return <>
        <p>{t('sessionCompleted')}</p>
        <div className="flex-grow">
            <Statistics/>
        </div>
        <a className="main-action" onClick={goBackHomeClicked}>
            {t('continue')}
        </a>
    </>
}

export default StatisticsPage;