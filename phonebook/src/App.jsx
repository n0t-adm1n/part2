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

    const updatePerson = persons.find(person => person.name === newName)


    const nameObject = {
      name: newName,
      number: newNumber,
    }
    

    if(updatePerson) {
      const confirmMessage = `${newName} is already added to the phonebook, replace old number with new one?`;
      if(confirm(confirmMessage)) {    
        personsService
          .update(updatePerson.id, nameObject)
          .then(returnedPerson => setPersons(persons.map(person => 
              person.id !== updatePerson.id ? person : returnedPerson
          )))


          setNewName("")
          setNewNumber("")
          
      } else {
        console.log('dont want to change the number')
      }
      return ;
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

  const handleDelete = (person) => {
    if(confirm(`Delete ${person.name} ?`)) {
      personsService
        .deletePerson(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    } 
  }


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
