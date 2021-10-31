const list = document.querySelector('ul');

const addRecipe = (recipe) => {
    let html = `
        <li>
            <p>${recipe.title}</p>
        </li>
    `;
    list.innerHTML += html;
}


db.collection('recipes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        addRecipe(doc.data());
    })
}).catch(err => {
    console.log(err)
});