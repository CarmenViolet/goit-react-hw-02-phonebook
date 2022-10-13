import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = (data) => {
    console.log(data);

    const newUser = {
      ...data, 
      id: nanoid()
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newUser]
    })
  )};

  onFilter = (event) => {
    console.log(event);
    this.setState({filter: event.target.value})
  };

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }


  render() {
    const {contacts, filter} = this.state;

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
    console.log(filteredContacts);
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler}/>

        <h2>Contacts</h2>
        <Filter value={filter} onFilter={this.onFilter}/>
        <ContactList contacts={filteredContacts} 
        deleteButton={this.deleteContact}/>
      </div>
    );
  }
}
