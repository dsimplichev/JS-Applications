async function solution() {

    const mainSection = document.querySelector('#main');
    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
    const response = await fetch(url);
    const data = await response.json();
    data.map(createArticles).map(el => mainSection.append(el));

}

function createArticles(data) {

    const result = e('div', {className: 'accordion'},
    e('div', {className: 'head'},
    e('span', {}, data.title),
    e('button', {className: 'button', onClick: getDetailedData, id: data._id}, 'More')
    ));

    return result;
}

async function getDetailedData(ev) {
    const articleId = ev.target.id;
    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${articleId}`;
    const response = await fetch(url);
    const data = await response.json();
    
    const result = e('div', {className: 'extra'}, e('p', {}, data.content));
    ev.target.parentNode.parentNode.append(result);

    if(ev.target.textContent === 'More') {
        result.style.display = 'inline';
        ev.target.textContent = 'Less';
    } else if(ev.target.textContent === 'Less'){
        result.style.display = '';
        ev.target.textContent = 'More';
    }
    

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

window.addEventListener('load', solution);


