import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import Form from './components/Form';
import Person from './components/Person';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('')

//fetching data from db
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  },[])


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
