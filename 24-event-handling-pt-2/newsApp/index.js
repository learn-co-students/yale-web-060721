const titleH1 = document.querySelector('h1#news-co')
const allCards = document.querySelectorAll('div.card')



function updateFirstCardPic() {
    // target the element of interest
    const firstCardImg = document.querySelector('[data-id="1"] img')
    // update the property want. Bam!
    firstCardImg.src = "/Users/michelle/Desktop/my-cohorts/yale-web-060721/21-dom-manipulation/newsApp/images/raffy.jpg"
}


function removeAd() {
    // DELETE 
    // find the element we want to delete
    const adCard = document.querySelector('.card.ad')
    adCard.remove()

}


function createOneCard(articleObject) {
    const outerDiv = document.createElement('div')
    outerDiv.classList.add('card')
    outerDiv.dataset.id = articleObject.id

    outerDiv.innerHTML = `
                <div class="img-container">
                    <img src="${articleObject.image}"
                        alt="${articleObject.title}" />
                    <div class="article-title-container">
                        <h4>${articleObject.title}</h4>
                    </div>
                </div>
                <div class="content">
                    <p class='author'>Author: ${articleObject.author}</p>

                    <div class="scroll">
                        <p class='description'>${articleObject.description}</p>
                    </div>
                    <p class="react-count"><span>${articleObject.likes}</span> likes</p>
                    <button class="like-button">♥️ Like</button>
                    <button class='delete-button'>X</button>
                </div>
                `

    const collectionDiv = document.querySelector("div#collection")
    collectionDiv.append(outerDiv)
}


function renderAllCards() {
    articlesArray.forEach(function (articleObj) {
        createOneCard(articleObj)
    })
}



const toggleElement = document.querySelector('input#toggle-dark-mode')

toggleElement.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode')
})


const form = document.querySelector('form#article-form')

form.addEventListener('submit', function (event) {
    event.preventDefault()

    // get the user input
    const titleInput = event.target[0].value // event.target.title.value // document.querySelector('#article-form input').value
    const authorInput = event.target[1].value
    const descriptionInput = event.target[2].value
    const imageInput = event.target[3].value

    // DOM MANIPULATION - add new article card to page using user input
    const newId = articlesArray[articlesArray.length - 1].id + 1

    const articleObject = {
        title: titleInput,
        author: authorInput,
        description: descriptionInput,
        image: imageInput,
        likes: 0,
        id: newId
    }

    articlesArray.push(articleObject)
    createOneCard(articleObject)
    form.reset()
})



/* APP INIT */
removeAd()
renderAllCards()

// document.body.addEventListener('click', (event) => {
//     console.log('Body Clicked', event.target)
// })

// document.querySelector('.delete-button').addEventListener('click', (event) => {
//     console.log('Delete Button Clicked', event.target)
// })


// document.querySelector('div.card').addEventListener('click', (event) => {
//     console.log('Card Clicked', event.target)
// })


// EVENT DELEGATION
// 1. Find first common parent of the elements we care to listen for user interaction on (delete and like buttons)
const collectionDiv = document.querySelector('div#collection')

// 2. Add event listener on it
collectionDiv.addEventListener('click', (event) => {

    // 3. add conditional logic to determinne when the user clicked on either the like button or delete button 
    if (event.target.classList.contains('delete-button')) {
        console.log('delete button clicked!!!!!!')
        // let card = event.target.parentElement.parentElement
        let card = event.target.closest('div.card')
        card.remove()
    }
    else if (event.target.matches('button.like-button')) {
        console.log('LIKE button clicked!!!!')
        // const likesNumSpan = event.target.previousElementSibling.children[0]
        // const currLikes = parseInt(likesNumSpan.textContent)
        // const newLikes = currLikes + 1
        // likesNumSpan.textContent = newLikes


        let card = event.target.closest('div.card')
        let likesNumSpan = card.querySelector('p.react-count span')
        const currLikes = parseInt(likesNumSpan.textContent)
        const newLikes = currLikes + 1
        likesNumSpan.textContent = newLikes
    }
})
