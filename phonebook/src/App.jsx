import { useState, useEffect } from 'react'
import axios from 'axios'

import personsService from './services/persons'

import Filter from './components/Filter';
import Form from './components/Form';
import Person from './components/Person';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('')

//fetching initial persons data from db
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
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

    //posting new data to the db & setting newPerson from the response back
    personsService
      .create(nameObject)
      .then(newPerson => setPersons([...persons, newPerson]))

    // setPersons([...persons, nameObject])

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

  const handleDelete = (id) => {
    console.log(`Deleting ${id} person`)
  }

  // const renderPersons = () => {
  //   if(filter === '') return persons.map((person,index) => <Person key={index} name={person.name} number={person.number} />)

  //   return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map((person,index) => <Person key={index} name={person.name} number={person.number} />)
  // }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Form newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
     
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}


export default App
