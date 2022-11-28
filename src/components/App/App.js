import Search from "../search/Search";
import RandomPokemons from "../random_Pokemons/randomPokemons";

function App() {
    return (
        <div className='container'>
            <div className='first-page'>
                <div className='first-page__info'>
                    <div>
                        <p className='first-page__title'>Pokemons App</p>
                        <ul className='first-page__list'>
                            <li>get your random 'Pokemon of a day'</li>
                            <li>search Pokemons by name or id</li>
                            <li>filter Pokemons</li>
                            <li>sort Pokemons</li>
                            <li>compare Pokemons</li>
                            <li>get info about any found Pokemon</li>
                        </ul>
                    </div>
                </div>
            </div>
            <RandomPokemons />
            <Search />
        </div>
    );
}

export default App;
