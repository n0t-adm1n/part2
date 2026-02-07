import React from 'react'
import Person from './Person'

const Persons = ({persons, filter, handleDelete}) => {

    const renderPersons = () => {
        if(filter === '') return persons.map((person,index) => <Person key={person.id} name={person.name} number={person.number} handleDelete={() => handleDelete(person)} />)

        return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map((person,index) => <Person key={person.id} name={person.name} number={person.number} handleDelete={() => handleDelete(person)} />)
    }

  return (
    <>
        {renderPersons()}
    </>
  )
}

export default Persons