import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PokemonCard = props => {
    const { item, i, active } = props;

    return (
        <li className={i === active ? "pokemons-cards__item pokemons-cards__item-active" : "pokemons-cards__item"}>
            <div className='pokemons-cards__info'>
                {item.sprites ? (
                    <LazyLoadImage
                        className='pokemons-cards__photo'
                        effect='blur'
                        src={item.sprites.other.dream_world.front_default}
                        alt=''
                    />
                ) : (
                    <LazyLoadImage className='pokemons-cards__photo' effect='blur' src={item.img} alt='' />
                )}
            </div>
        </li>
    );
};

export default PokemonCard;
