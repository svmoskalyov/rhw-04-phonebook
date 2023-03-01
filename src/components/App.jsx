import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Box } from './Box';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const item = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts`);
      return;
    } else {
      setContacts(prevContact => [item, ...prevContact]);
    }
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContact =>
      prevContact.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <Box width="500px" mx="auto" p={4}>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>

      {contacts.length > 0 && (
        <Section title="Contacts">
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={getVisibleContacts()}
            onDeleteContact={deleteContact}
          />
        </Section>
      )}
    </Box>
  );
}

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contact = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contact);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;
//     const item = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     if (name === '' || number === '') {
//       alert('Please enter all fields!');
//       return;
//     }

//     if (contacts.find(contact => contact.name === name)) {
//       alert(`${name} is already in contacts`);
//       return;
//     } else if (contacts.find(contact => contact.number === number)) {
//       alert(`${number} is already in contacts`);
//       return;
//     } else {
//       this.setState(({ contacts }) => ({
//         contacts: [item, ...contacts],
//       }));
//     }
//   };

//   changeFilter = e => {
//     const { value } = e.currentTarget;
//     this.setState({ filter: value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const { contacts, filter } = this.state;

//     return (
//       <Box width="500px" mx="auto" p={4}>
//         <Section title="Phonebook">
//           <ContactForm addContact={this.addContact} />
//         </Section>

//         {contacts.length > 0 && (
//           <Section title="Contacts">
//             <Filter value={filter} onChange={this.changeFilter} />
//             <ContactList
//               contacts={this.getVisibleContacts()}
//               onDeleteContact={this.deleteContact}
//             />
//           </Section>
//         )}
//       </Box>
//     );
//   }
// }
