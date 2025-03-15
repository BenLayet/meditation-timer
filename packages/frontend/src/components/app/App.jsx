/* eslint-disable react/prop-types */
import './App.css'
import '../../config/i18n';
import AppHeader from "./AppHeader.jsx";
import AppBody from "./AppBody.jsx";
import {useEffect, useState} from "react";

const App = ({stateManager}) => {
    const [vm, setVM] = useState(stateManager.getRootVM());
    useEffect(() => {
        stateManager.addRootVMChangedListener(setVM);
        return () => stateManager.removeRootVMChangedListener(setVM)
    }, []);

    return (<>
        <AppHeader vm={vm}/>
        <AppBody vm={vm}/>
    </>);
}
export default App;