import './App.css'
import '../../config/i18n';
import {AppStateProvider} from "./AppStateProvider.jsx";
import AppHeader from "./AppHeader.jsx";
import AppBody from "./AppBody.jsx";

const App = () => {
    return (<AppStateProvider>
            <AppHeader/>
            <AppBody/>
        </AppStateProvider>);
}
export default App;