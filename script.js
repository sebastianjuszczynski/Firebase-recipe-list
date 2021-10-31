const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = (recipe) => {
    let time = recipe.created_at.toDate();
    let html = `
        <li>
            <p>${recipe.title}</p>
            <p>${time}</p>
        </li>
    `;
    list.innerHTML += html;
}


db.collection('recipes').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        addRecipe(doc.data());
    })
}).catch(err => {
    console.log(err)
});

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
})