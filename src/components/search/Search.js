// компоненти
import Search_Panel from "./search_Panel/SearchPanel";
import Search_SortPanel from "./search_SortPanel/SearchSortPanel";
import Search_Cards from "./search_Cards/SearchCards";

const Search = () => {
    // ТРЕБА ЗРОБИТИ ЩОБ НЕ ПОКАЗУВАЛО ЩО ВВЕСТИ ПОВЫДОМЛЕННЯ ТРЕБА

    // зробити, щоб можна було порівняти два покемона! зробити total, додати всі stats
    // скрол хай буде, але значно довший блок... 40 покемонів і тоді

    return (
        <div className='cards'>
            <Search_Panel />
            <Search_SortPanel />
            <Search_Cards />
        </div>
    );
};

export default Search;
