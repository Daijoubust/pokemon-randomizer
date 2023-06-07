    export const generateRandomId = () => {
        const min = 1;
        const max = 10200;
        const exceptions = Array.from({ length: 899 }, (_, index) => 1011 + index);
        const validNumbers = Array.from({ length: max - min + 1 }, (_, index) => index + min)
            .filter(number => number <= 1010 || (number >= 9999 && number <= 10001 && !exceptions.includes(number)));
        const randomId = Math.floor(Math.random() * validNumbers.length);
        return randomId;
    }

    export const pokemonId = generateRandomId();

    export const capitalizePokemonName = (pokemonName) => {
        const capitalized = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        return capitalized;
    }

    export const getPokemonInfoLink = (randomId, buttonClicked) => {
        if (buttonClicked) {
            return `https://pokemon.gameinfo.io/en/pokemon/${randomId}`;
        } else {
            return 'not found';
        }
};

    export const pokeBall = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"

export const blankImage = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="

export const pokemonTypeList = [
            'normal',
            'fighting',
            'flying',
            'poison',
            'ground',
            'rock',
            'bug',
            'ghost',
            'steel',
            'fire',
            'water',
            'grass',
            'electric',
            'psychic',
            'ice',
            'dragon',
            'dark',
            'fairy',
            'unknown',
            'shadow',
        ]