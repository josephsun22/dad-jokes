export function groupJokesByLength(jokes) {
    const groups = {
        Short: [],
        Medium: [],
        Long: []
    };

    jokes.forEach(joke => {
        const wordCount = joke.split(' ').length;
        if (wordCount < 10) {
            groups.Short.push(joke);
        } else if (wordCount < 20) {
            groups.Medium.push(joke);
        } else {
            groups.Long.push(joke);
        }
    });

    return groups;
}