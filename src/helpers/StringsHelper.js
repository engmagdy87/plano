const getFirstLettersOfString = (text) => {
    if (!text) return
    const words = text.split(" ")
    let letters = ""
    words.forEach(word => {
        letters += word[0]
    });

    return letters
}

export {
    getFirstLettersOfString
}