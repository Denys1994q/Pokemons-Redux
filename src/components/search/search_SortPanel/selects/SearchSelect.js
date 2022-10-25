import Select from "react-select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPokemons_filterPokemons, fetchPokemonTypes, searchPokemons_setActivePokemon } from "../../searchPokemonsSlice";

const SearchSelect = props => {
    const { type, setSelectedType } = props;

    const dispatch = useDispatch();

    const types = useSelector(state => state.searchPokemonsSlice.pokemonTypes);

    useEffect(() => {
        dispatch(fetchPokemonTypes());
    }, []);

    const optionsTypes =
        types.results && types.results.length > 0
            ? types.results.map(item => {
                  return { value: item.name, label: item.name };
              })
            : null;
    const optionsAbilities = [{ value: "1", label: "1", backgroundColor: "#464646", color: "#fff" }];

    const colorStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? "#464646" : "#616161",
                color: isFocused ? "white" : "#212121",
            };
        },
    };

    const filter = choice => {
        dispatch(searchPokemons_setActivePokemon(null));
        if (choice === null) {
            setSelectedType("");

            dispatch(searchPokemons_filterPokemons(""));
        } else {
            dispatch(searchPokemons_filterPokemons(choice.value));
            setSelectedType(choice.value);
        }
    };

    return (
        <>
            <div className='sorted-types-type'>
                <Select
                    classNamePrefix='custom-select'
                    placeholder={type === "types" ? "type" : "abilities"}
                    isClearable
                    options={type === "types" ? optionsTypes : optionsAbilities}
                    styles={colorStyles}
                    onChange={choice => filter(choice)}
                />
            </div>
        </>
    );
};

export default SearchSelect;
