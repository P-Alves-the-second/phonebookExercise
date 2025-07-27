import { useState, useEffect } from 'react'
import axios from 'axios'
import NewPeople from './components/newPeople'
import Person from './components/person'
import SearchFilter from './components/searchFilter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState(0)

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, []) 
  console.log('render', persons.length, 'persons')

  const resetNotification = () => {
    setTimeout(() => {
          setNotification('')      
        }, 5000) 
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      const confirmUpdate = window.confirm(
      `${newName} is already added to phonebook. Replace the old number with the new one?`
    )

    if (confirmUpdate) {
    const updatedPerson = { ...existingPerson, number: newNumber }

    personService.update(updatedPerson.id, updatedPerson).then(returnedPerson => {
      setPersons(persons.map(person =>
        person.id === returnedPerson.id ? returnedPerson : person
      ))
      setNotificationType(0)
      setNotification(`${returnedPerson.name} has been updated`)
      resetNotification()
    })
  }
  setNewName('')
  setNewNumber('')

  return
    }
    if(newNumber === ''){
      alert(`Must insert a number`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setNotificationType(0)
      setNotification(`${returnedPerson.name} has been added`)
      resetNotification()
    })
  }
  const deletePerson = (id) => {
      personService.deletePerson(id).then(response => {
      console.log(target)
      const target = persons.find(person => person.id === id)
      setPersons(persons.filter(person => person.id !== id))
      setNotificationType(0)
      setNotification(`${target.name} was deleted`)
      resetNotification()
    })
    .catch(error => {
      const target = persons.find(person => person.id === id)
      setPersons(persons.filter(person => person.id !== id))
      setNotificationType(1)
      setNotification(`${target.name} was already deleted`)
      resetNotification()
    }
    )
  }
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }
  const personToShow = filterName
  ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  : persons
  return (
    <div>
      <h1>Phonebook</h1>
        <div>{notification && <Notification message={notification} type={notificationType}/>}</div>
        <SearchFilter 
        filterName={filterName} 
        handleFilterName={handleFilterName}>
        </SearchFilter>
      <h3>Add New</h3>
        <NewPeople 
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}> 
        </NewPeople>
      <h2>Numbers</h2>
        <ul>
          {personToShow.map(person => (
          <Person 
          key={person.name} 
          person={person}
          deletePerson={() => deletePerson(person.id)}
          >
          </Person>
        ))}
        </ul>
    </div>
  )
}


export default App