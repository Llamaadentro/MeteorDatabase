import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import PageRoutes, { NoMatch } from './Routes';
import { AppHeader } from './components/UtilityComponents';
import { AppStyle } from './components/StyledComponents';

const App = () =>
<Router>  
    <AppStyle>
        <AppHeader/>
        <Switch>
            {Object.keys(PageRoutes).map(function (route) {
                const {path, exact, main: Main} = PageRoutes[route];
        
                return <Route key={route}
                                path={path}
                                exact={exact}
                                render={() => path === PageRoutes.ROOT.path ? <Redirect to={PageRoutes.METEORS.path} exact/> : <Main/>
                    }/>
            })}
            <Route><NoMatch/></Route>
        </Switch>
    </AppStyle>
</Router>;

export default App;
