const list = document.querySelector('ul');

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