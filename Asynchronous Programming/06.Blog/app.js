function attachEvents() {
    const postBtn = document.getElementById("btnLoadPosts");
    const post = document.getElementById("posts");


    postBtn.addEventListener('click', async () => {
        const respons = await fetch('http://localhost:3030/jsonstore/blog/posts');
        const data = await respons.json();
        Object.entries(data).map((key, value) => {
            const optionEl = document.createElement('option')
            optionEl.setAttribute('value', key[1].id)
            optionEl.textContent = key[1].title
            post.appendChild(optionEl)
           
        })

    })
    
    const viewBtn = document.getElementById("btnViewPost")
    viewBtn.addEventListener('click', async() => {
        const respons = await fetch(`http://localhost:3030/jsonstore/blog/comments`)
        const dataComments = await respons.json()
        const result = Object.values(dataComments).filter(c => c.postId == post.value)
        console.log(result)

        
    })
   


}


attachEvents();

