export const getQString = str => {
    const params = new URLSearchParams(window.location.search)
    return params.get(str)
}