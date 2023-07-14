function attachEvents() {

    const posts = document.querySelector('#posts');
    const viewBtn = document.querySelector('#btnViewPost')
    viewBtn.addEventListener('click', displayPost);
    viewBtn.disabled = true;
    document.querySelector('#btnLoadPosts').addEventListener('click', () => getPosts(viewBtn));

}

attachEvents();


async function getPosts(viewBtn) {
    //getting data from server
    const url = 'http://localhost:3030/jsonstore/blog/posts';
    const respons = await fetch(url);
    const data = await respons.json();

    const posts = document.getElementById('posts');
    posts.innerHTML = '';
    Object.values(data).map(el => e('option', { value: el.id }, el.title)).map(el => posts.append(el));
    viewBtn.disabled = false;

}

async function getComments(postId) {

    const [comments, post] = await Promise.all([
        fetch('http://localhost:3030/jsonstore/blog/comments'),
        fetch(`http://localhost:3030/jsonstore/blog/posts/${postId}`)
    ]);

    const dataComments = await comments.json();
    const dataPost = await post.json();

    const result = Object.values(dataComments).filter(c => c.postId == postId);


    const postHeader = document.querySelector('#post-title');
    postHeader.textContent = dataPost.title;
    const postBody = document.querySelector('#post-body');
    postBody.textContent = dataPost.body;
    const postComments = document.querySelector('#post-comments');
    postComments.innerHTML = '';
    result.map(el => e('li', { id: el.id }, el.text)).map(li => postComments.append(li));


}

function displayPost() {
    postId = document.getElementById('posts').value;
    getComments(postId);
}


function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == "on") {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        }
        else {
            result[attr] = value;
        }
    }

    content = content.reduce(
        (a, c) => a.concat(Array.isArray(c) ? c : [c]),
        []
    );

    content.forEach((e) => {
        if (typeof e == "string" || typeof e == "number") {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}