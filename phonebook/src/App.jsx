import { useState } from 'react'
import Filter from './components/Filter';
import Form from './components/Form';
import Person from './components/Person';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return ;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    }
    // setPersons(persons.concat(nameObject));
    setPersons([...persons, nameObject])

    setNewName("");
    setNewNumber("");
  }

  const handleNameChange= (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  const renderPersons = () => {
    if(filter === '') return persons.map((person,index) => <Person key={index} name={person.name} number={person.number} />)

    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map((person,index) => <Person key={index} name={person.name} number={person.number} />)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Form newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
     
      <Persons persons={persons} filter={filter} />
    </div>
  )
}


export default App
