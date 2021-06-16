import { useState, useEffect } from "react";
import { supabase } from "./lib/api";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Auth from './components/Auth'
//import Home from './components/Home'
import DefaultLayout from './components/Layout'
import Clients from './components/Clients'
import Jobs from './components/Jobs'
import Timesheet from './components/Timesheet'
//import DrawerForm from './components/Table'

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const session = supabase.auth.session();
        console.log(session)
        setUser(session?.user ?? null);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                setUser(currentUser ?? null);
            }
        );

        return () => {
            authListener?.unsubscribe();
        };
    }, [user]);

    return (
        <div className="">
            {/* {!user ? <Auth /> : ( */}
              <Router>
              <DefaultLayout>
                <Switch>
                  <Route path="/jobs">
                    <Jobs />
                  </Route>
                  <Route path="/users">
                    <Timesheet />
                  </Route>
                  <Route path="/">
                    <Clients />
                  </Route>
                </Switch>
              </DefaultLayout>
            </Router>
            {/* )} */}
        </div>
    );
}

export default App;
