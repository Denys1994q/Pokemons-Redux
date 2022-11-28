// компоненти
import Panel from "./panel/SearchPanel";
import SortPanel from "./sort-panel/SearchSortPanel";
import Cards from "./cards/SearchCards";

const Search = () => {
    // ТРЕБА ЗРОБИТИ ЩОБ НЕ ПОКАЗУВАЛО ЩО ВВЕСТИ ПОВЫДОМЛЕННЯ ТРЕБА

    // зробити, щоб можна було порівняти два покемона! зробити total, додати всі stats
    // скрол хай буде, але значно довший блок... 40 покемонів і тоді

    return (
        <div className='cards'>
            <Panel />
            <SortPanel />
            <Cards />
        </div>
    );
};

export default Search;
