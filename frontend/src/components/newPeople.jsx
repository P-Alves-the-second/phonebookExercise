const NewPeople = ({newName, newNumber, addPerson, handleNewName, handleNewNumber}) => 
  {
    return(
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName}/> 
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
    )
  }
export default NewPeople