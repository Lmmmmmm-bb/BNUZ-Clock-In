import { FC } from 'react';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import './index.css';

import Submit from '../pages/Submit';
import Tutorials from '../pages/Tutorials';

const App: FC = () => {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Submit} />
        <Route exact path='/tutorials' component={Tutorials} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
};

export default App;
