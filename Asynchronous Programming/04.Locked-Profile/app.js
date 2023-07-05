function lockedProfile() {

    const mainElement = document.querySelector('#main');

    async function getProfilesInfo() {

        const url = 'http://localhost:3030/jsonstore/advanced/profiles';
        const response = await fetch(url);
        const data = await response.json();
        // mainElement.innerHTML = '';
        Object.values(data).map(createProfileCard).map(el => mainElement.append(el));


    }

    function createProfileCard(data) {

        

        const result = e('div', {className: 'profile', id: data._id},
        e('img', { src: './iconProfile2.png', className: 'userIcon'}, ''),
        e('label', {}, 'Lock'),
        e('input', { type: 'radio', name: 'user1Locked', value: 'lock'}, ''),
        e('label', {}, 'Unlock'),
        e('input', { type : 'radio', name: 'user1Locked', value: 'unlock'}, ''),
        e('br', {}, ''), e('hr', {}, ''),
        e('label', {}, 'Username'),
        e('input', { type: 'text', name: 'user1Username', value: data.username, disabled: 'readonly'}, ''),
        e('button', {onClick: showMoreData}, 'Show more'));

        return result;

    }


    async function showMoreData(ev) {
        
        const profile = ev.target.parentNode;
        const url = `http://localhost:3030/jsonstore/advanced/profiles/${profile.id}`;
        const response = await fetch(url);
        const data = await response.json();
        
        const result = e('div', {id: 'user1HiddenFields'},
        e('hr', {}, ''),
        e('label', {}, 'Email:'),
        e('input', {type: 'email', name: 'user1Email', value: data.email, disabled: 'readonly'}, ''),
        e('label', {}, 'Age:'),
        e('input', {type: 'email', name: 'user1Age', value: data.age, disabled: 'readonly'}, ''));


        if(profile.querySelector('input[value="unlock"]').checked == true && ev.target.textContent == 'Show more') {

            
            ev.target.textContent = 'Hide it';

        }  else if(profile.querySelector('input[value="unlock"]').checked == true && ev.target.textContent == 'Hide it') {
            ev.target.textContent = 'Show more';

        } 
        


    }
    
    getProfilesInfo();
    
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
}