import React, {useEffect, useState} from 'react';
import "./App.css";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList"
import {v4 as uuid} from 'uuid';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ContactDetail from './components/ContactDetail';
import ContactDeleteConfirm from './components/ContactDeleteConfirm'


function App() {
    const LOCAL_STORAGE_KEY = "contacts";
    const [contacts, setContacts] = useState([]);

    const addContactHandler = (contact) => {
        // console.log(contact);
        setContacts([...contacts, {id: uuid(), ...contact}]);
    };

    useEffect(() => {
        const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if(retriveContacts) setContacts(retriveContacts)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }, [contacts])

    const removeCotnactHandler = (id) => {
        const newContactList = contacts.filter((contact)=> {
            return contact.id !== id;
        });

        setContacts(newContactList);
    }

  return (
    <div className="ui container">
        <Router>
            <Header />
            <Switch>
                <Route
                    path="/"
                    exact
                    render={(props) => (<ContactList
                        {...props}
                        contacts={contacts} removeContact={removeCotnactHandler}
                    />)}



                />
                <Route
                    path="/add"
                    render={(props) => (
                        <AddContact
                            {...props}
                            addContact={addContactHandler} />
                    )}

                />
                <Route
                    path="/contact/:id"
                    component={ContactDetail}
                />

                <Route
                    path="/deleteContactConfirm/:id"
                    render={(props) => (
                        <ContactDeleteConfirm
                            {...props}
                            removeContact={removeCotnactHandler} />
                    )}

                />


            </Switch>



        </Router>

    </div>
  );
}

export default App;
