const imgContainer = document.querySelector('.image-container')

const state = {
    cards: []
}

function getCards() {
    return fetch('http://localhost:3000/images').then(function (resp) {
        return resp.json()
    })
}
getCards().then(function (cardsFromServer) {
    state.cards = cardsFromServer
    render()
})


function renderCards() {

    imgContainer.innerHTML = ''

    for (const card of state.cards) {

        const articleEl = document.createElement('article')
        articleEl.setAttribute('class', 'image-card')

        const h2El = document.createElement('h2')
        h2El.setAttribute('class', 'title')
        h2El.textContent = card.title

        const imgEl = document.createElement('img')
        imgEl.setAttribute('class', 'image')
        imgEl.setAttribute('src', `${card.image}`)

        const divEl = document.createElement('div')
        divEl.setAttribute('class', 'likes-section')

        const spanEl = document.createElement('span')
        spanEl.setAttribute('class', 'likes')
        spanEl.textContent = card.likes

        const buttonEl = document.createElement('button')
        buttonEl.setAttribute('class', 'like-button')
        buttonEl.textContent = ''

        const ulEl = document.createElement('ul')
        ulEl.setAttribute('class', 'comments')

        for (const comment of card.comments) {

            const liEl = document.createElement('li')
            liEl.textContent = `${comment.content}`
            ulEl.append(liEl)

        }

        imgContainer.append(articleEl)
        articleEl.append(h2El, imgEl, divEl, ulEl)
        divEl.append(spanEl, buttonEl)

    }
}

function render() {
    renderCards()
}
render()