import './styles/SearchBar.css'
import '../library/fontawesome/css/all.min.css'

const SearchBar = () => {
    return (
        <>
            <input id='search_box' placeholder="Search"></input>
            <button id='search_button'><i className="fa-solid fa-search iconAction" style={{marginRight: '5px' }}></i></button>
        </>
    )
}

export default SearchBar