import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "9874561230" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index)=><p key={index}>{person.name} {person.number}</p>
      )}

      {/* {persons.map((person, index)=> console.log(person))} */}
    </div>
  )
}


export default App
