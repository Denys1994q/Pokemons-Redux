import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PokemonCard = props => {
    const { item, i, active } = props;

    return (
        <li
            className={
                i === active
                    ? "random-pokemons__right-cards-item random-pokemons__right-cards-item-active"
                    : "random-pokemons__right-cards-item"
            }>
            <div>
                {item.sprites ? (
                    <LazyLoadImage effect='blur' src={item.sprites.other.dream_world.front_default} alt='' />
                ) : (
                    <LazyLoadImage effect='blur' src={item.img} alt='' />
                )}
            </div>
        </li>
    );
};

export default PokemonCard;
