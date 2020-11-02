import React, {useState, createContext} from 'react';
import { Route,Switch } from 'react-router-dom';

import SignIn from "./routes/SignIn/SignIn";
import SignUp from "./routes/SignUp/SignUp";
import Chat from "./routes/Chat/Chat";
import NotFound from "./routes/NotFound";

export const UserContext = createContext({currentUser: '', setCurrentUser: () => {}});

function App() {
    const [currentUser, setCurrentUser] = useState('');

  return (
    <div>
        <Switch>
            <Route path="/signup" component={SignUp}/>
            <UserContext.Provider value={{currentUser, setCurrentUser}}>
                <Route path="/signin" component={SignIn}/>
                <Route path="/" exact component={Chat}/>
                <Route component={NotFound}/>
            </UserContext.Provider>
        </Switch>
    </div>
  );
}

export default App;
