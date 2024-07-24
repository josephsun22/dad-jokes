export function highlightTerm(text, term) {
    if (!term) return text; // Return text as is if term is empty

    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, (match) => `${match.toUpperCase()}`);; //Convert matched term to upper case
}