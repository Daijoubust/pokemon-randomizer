// import colors from 'tailwindcss/colors'
// const green = colors.green[600]

function getTypeStyle(typeName) {
  const typeStyles = {
    normal:  "silver" ,
    fighting: "deeppink",
    flying: "powderblue ",
    poison:  "green" ,
    ground:  "peru" ,
    rock:  "sandybrown" ,
    bug:  "yellowgreen" ,
    ghost:"plum",
    steel: "mediumturquoise",
    fire: "darkorange ",
    water: "darkturquoise ",
    grass: "limegreen ",
    electric: "gold",
    psychic: "indianred",
    ice: "deepskyblue",
    dragon: "dodgerblue",
    dark: "dimgray",
    fairy: "lightpink",
    unknown: "lightsteelblue",
    shadow: "lightslategrey",
    // Add more types and their corresponding styles

    default: "white" , // Default style
    };

    const backgroundColor = typeStyles[typeName] || typeStyles.default;
    return { backgroundColor };
}

export default getTypeStyle;