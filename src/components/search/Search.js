import Panel from "./panel/SearchPanel";
import SortPanel from "./sort-panel/SearchSortPanel";
import Cards from "./cards/SearchCards";

const Search = () => {
    return (
        <div className='cards-wrapper'>
            <Panel />
            <SortPanel />
            <Cards />
        </div>
    );
};

export default Search;
