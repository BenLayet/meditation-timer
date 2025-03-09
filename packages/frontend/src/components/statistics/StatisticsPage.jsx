import {useContext} from "react";
import {AppStateContext} from "../app/AppStateProvider.jsx";
import {Statistics} from "./Statistics.jsx";
import {navigationEvents} from "domain/src/components/navigation/navigation.events.js";
import {useTranslation} from "react-i18next";

function StatisticsPage({statisticsState}) {
    const {t} = useTranslation();
    const {dispatch} = useContext(AppStateContext);

    const goBackHomeClicked = () => dispatch(navigationEvents.navigationRequested, {page: 'HOME'})

    return <>
        <p>{t('sessionCompleted')}</p>
        <div className="flex-grow">
            <Statistics statisticsState={statisticsState}/>
        </div>
        <a className="main-action" onClick={goBackHomeClicked}>
            {t('continue')}
        </a>
    </>
}

export default StatisticsPage;