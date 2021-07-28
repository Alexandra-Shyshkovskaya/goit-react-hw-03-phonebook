import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "./Components/Container/Container";
import ContactForm from "./Components/ContactsForm/ContactsForm";
import Filter from "./Components/SearchFilter/Filter";
import ContactList from "./Components/ContactsList/ContactsList";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContacts = (contactFormState) => {
    const { name, number } = contactFormState;
    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };

    const isRepeat = this.state.contacts.find(
      ({ name }) => name === contactFormState.name
    );
    isRepeat
      ? alert(`${name} is already in contacts`)
      : this.setState((prevState) => ({
          contacts: [contact, ...prevState.contacts],
        }));
  };
  changeFilter = (event) => {
    const { value } = event.currentTarget;
    this.setState({
      filter: value,
    });
  };
  deleteContacts = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <>
        <Container>
          <h1>Phonebook</h1>
          <ContactForm addContacts={this.addContacts} />

          <h2>Contacts</h2>
          <Filter filter={filter} onHandleChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            deleteContacts={this.deleteContacts}
          />
        </Container>
      </>
    );
  }
}

export default App;
