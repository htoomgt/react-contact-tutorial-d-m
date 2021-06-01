import React, {useEffect, useState} from 'react';
import "./App.css";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList"
import {v4 as uuid} from 'uuid';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ContactDetail from './components/ContactDetail';
import ContactDeleteConfirm from './components/ContactDeleteConfirm'
import api from './api/Contact'



function App() {
    const LOCAL_STORAGE_KEY = "contacts";
    const [contacts, setContacts] = useState([]);




    //RetrieveContacts
    const retrieveContacts = async () => {
        const response = await api.get('/contacts');
        return response.data;
    }

    const addContactHandler = async (contact) => {
        console.log(contact);
        const request = {
            id : uuid(),
            ...contact
        }
        const response =  await api.post("/contacts", request);
        console.log(response);

        setContacts([...contacts, response.data]);
    };

    useEffect(() => {

        // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        // if (retriveContacts) setContacts(retriveContacts);

        const getAllCOntacts = async () => {
            const allContacts = await retrieveContacts();
            if (allContacts) setContacts(allContacts);
        };

        getAllCOntacts();
    }, []);

    useEffect(() => {
        // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }, [contacts])

    const removeCotnactHandler = async (id) => {
        const response = await api.delete(`/contacts/${id}/`);
        const getAllCOntacts = async () => {
            const allContacts = await retrieveContacts();
            if (allContacts) setContacts(allContacts);
        };

        getAllCOntacts();

        // const newContactList = contacts.filter((contact)=> {
        //     return contact.id !== id;
        // });
        //
        // setContacts(newContactList);


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
