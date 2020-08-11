const getFirstLettersOfString = (text) => {
    if (!text || text === '') return
    const words = text.trim().split(" ")
    let letters = ""
    words.forEach(word => {
        letters += word[0]
    });

    return letters
}

export {
    getFirstLettersOfString
}