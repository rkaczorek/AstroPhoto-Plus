import React from 'react';
import { NavbarContainer } from '../Navigation/NavbarContainer';
import LoadingContainer from '../containers/LoadingContainer';
import SequencesPage from '../Sequences/SequencesPage';
import INDIServerContainer from '../INDI-Server/INDIServerContainer';
import { NotificationsContainer } from '../Notifications/NotificationsContainer';
import ErrorPageContainer from '../Errors/ErrorPageContainer';
import { CameraContainer } from '../Camera/CameraContainer';
import { SettingsContainer } from '../Settings/SettingsContainer';
import { ImagePage } from '../Image/ImagePage';
import { PlateSolvingPageContainer } from '../PlateSolving/PlateSolvingPageContainer';
import './App.css';
import { Route, Switch} from "react-router";
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from '../routes';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import 'react-image-crop/dist/ReactCrop.css';
import '../index.css';
import { HomeContainer } from '../Home/HomeContainer';

const AppRouter = ({location}) => (
  <div className="App">
    <NavbarContainer location={location}>
        <NotificationsContainer />
        <ErrorPageContainer>
              <Switch location={location}>
                <Route exact path={Routes.ROOT} component={HomeContainer}/>
                <Route path={Routes.SEQUENCES_PAGE} component={SequencesPage} />
                <Route path={Routes.INDI_PAGE} component={INDIServerContainer} />
                <Route path={Routes.CAMERA_PAGE} component={CameraContainer} />
                <Route path={Routes.PLATE_SOLVING_PAGE} component={PlateSolvingPageContainer} />
                <Route path={Routes.SETTINGS_PAGE} component={SettingsContainer} />
                <Route path={Routes.IMAGE_PAGE} render={({match, location}) => <ImagePage id={match.params.id} type={match.params.type} />} />
              </Switch>
        </ErrorPageContainer>
        <LoadingContainer />
    </NavbarContainer>
  </div>
);

export class App extends React.Component {
  setTitle = () => {
    if(this.props.serverName) {
      document.title = `${this.props.serverName} - AstroPhoto Plus`;
    } else {
      document.title = `AstroPhoto Plus`;
    }
  }

  componentDidMount = () => this.setTitle();
  componentDidUpdate = ({serverName: previousServerName}) => (previousServerName !== this.props.serverName) && this.setTitle();

  render = () => (
    <Router>
        <Route path={Routes.ROOT}>
            {({location}) => <AppRouter location={location} /> }
        </Route>
    </Router>
  )
};
