const SearchFilter = ({filterName, handleFilterName}) => <div>Search by: <input value={filterName} onChange={handleFilterName}/></div>

export default SearchFilter