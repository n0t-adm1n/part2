import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return ;
    }

    const nameObject = {
      name: newName,
    }
    setPersons(persons.concat(nameObject));
    setNewName("");
  }

  const handleNameChange= (e) => {
    
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index)=><p key={index}>{person.name}</p>
      )}
    </div>
  )
}


export default App
