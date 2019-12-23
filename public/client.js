const apiUrl = 'https://api.thecatapi.com/v1';
const tpl = document.querySelector('template').content;
const container = document.querySelector('ul');

function init () {
  fetch(apiUrl + '/images/search?limit=50')
  .then(response => response.json())
  .then(cats => {
    container.innerHTML = '';
    cats
      .map(cat => {
        const li = document.importNode(tpl, true);
        li.querySelector('img').src = cat.url;
        return li;
      }).forEach(li => container.appendChild(li));
  })
}

init();

document.querySelector('button').addEventListener('click', init);