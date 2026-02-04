import React from 'react'
import Person from './Person'

const Persons = ({persons, filter}) => {

    const renderPersons = () => {
        if(filter === '') return persons.map((person,index) => <Person key={index} name={person.name} number={person.number} />)

        return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map((person,index) => <Person key={index} name={person.name} number={person.number} />)
    }

  return (
    <>
        {renderPersons()}
    </>
  )
}

export default Persons