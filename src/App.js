import { useState, useEffect } from "react";
import { supabase } from "./lib/api";

import Auth from './components/Auth'
import Home from './components/Home'
import Table from './components/Demo'
import DrawerForm from './components/Table'

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
        <div className="w-5/6 mx-auto">
            {!user ? <Auth /> : <Table />}
        </div>
    );
}

export default App;