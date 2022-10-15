import "../../style/style.sass";
import "../App/app.sass";
//
import Search from "../search/Search";
import RandomPokemons from "../random_Pokemons/randomPokemons";

function App() {
    // зробити пульсуючу кнопку
    // додати спінер загрузки на карточки можна й скелетон на кожну

    // гра вгадай по абілітіс покемона
    // показується опис і назва абіліті і знизу 5 фото покемонів, 1 правильний

    return (
        <div className='container'>
            <div className='navbar'>
                <div className='navbar-img'>
                    <img
                        src='https://lh3.googleusercontent.com/3TSaKxXGo2wT0lu0AyNUBnkk6wkCC2AzOhJyy3JXIPm-AmZ1k9DSAroWeBUyePswCZSs5lVp3mPF7HzUpY9VPlyOV5eddITONINr3WSqLNLm=e365-w600'
                        alt=''
                    />
                </div>
            </div>
            <div className='coverPage'>
                <div className='coverPage-wrapper'>
                    <p className='coverPage-title'>Pokemons App</p>
                </div>
            </div>
            <RandomPokemons />
            <Search />
        </div>
    );
}

export default App;
