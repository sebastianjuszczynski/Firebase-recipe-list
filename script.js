const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = (recipe, id) => {
    let time = recipe.created_at.toDate();
    let html = `
        <li data-id="${id}">
            <p class="my-0">${recipe.title}</p>
            <p class="my-0">${time}</p>
            <button class="btn btn-danger btn-sm my-2">Delete</button>
        </li>
    `;
    list.innerHTML += html;
}

const deleteRecipe = (id) => {
    const recipes = document.querySelectorAll("li");
    recipes.forEach(recipe => {
        if(recipe.getAttribute('data-id') === id) {
            recipe.remove()
        }
    })
}

db.collection("recipes").onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        const doc = change.doc;
        if(change.type === "added") {
            addRecipe(doc.data(), doc.id)
        } else if (change.type === "removed") {
            deleteRecipe(doc.id)
        }
    })
})


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const now = new Date();
    const recipe = {
        title: form.recipe.value.trim(),
        created_at: firebase.firestore.Timestamp.fromDate(now)
    };

    db.collection('recipes').add(recipe).then(() => {
        console.log("added recipe")
    }).catch(err => {
        console.log(err)
    })
    form.reset();
});

list.addEventListener("click", e => {
    if(e.target.tagName === "BUTTON") {
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('recipes').doc(id).delete().then(() => {

        })
    }
});