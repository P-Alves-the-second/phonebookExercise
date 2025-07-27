const Person = ({person, deletePerson}) => {
    return(
        <li>{person.name} {person.number} <button onClick={() => {
            if(window.confirm(`Delete ${person.name}?`)){deletePerson()}
        }}>Delete</button></li>
    )
}
    
export default Person