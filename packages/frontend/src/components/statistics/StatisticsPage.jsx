import {useTranslation} from "react-i18next";
import {Statistics} from "./Statistics.jsx";

function StatisticsPage({vm}) {
    const {t} = useTranslation();

    const goBackHomeClicked = () => vm.dispatchers.navigationRequested({page: 'HOME'})

    return <>
        <p>{t('sessionCompleted')}</p>
        <div className="flex-grow">
            <Statistics vm={vm.children.statistics}/>
        </div>
        <a className="main-action" onClick={goBackHomeClicked}>
            {t('continue')}
        </a>
    </>
}

export default StatisticsPage;