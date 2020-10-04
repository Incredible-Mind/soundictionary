let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let defBox = document.querySelector('.def');
const API_KEY = '327f4c6b-2284-4007-a14a-cdf5d8b43c18';
let notFound = document.querySelector('.not_found');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');
searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';
    let word = input.value;
    if(word === '') {
        alert('Type a word');
        return;
    }
    getData(word);
})

const getData = async (word) => {
    loading.style.display = 'block';
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${API_KEY}`);
    const data = await response.json();
    if (!data.length) {
        loading.style.display = 'none ';
        notFound.innerText = 'No Result Found';
        return;
    }
    if (typeof data[0] === 'string') {
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'Did You Mean ?';
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add("suggested");
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
        })
        return;
    }
    loading.style.display = 'none';
    let defination = data[0].shortdef[0];
    defBox.innerText = defination;
    const soundName = data[0].hwi.prs[0].sound.audio;
    if (soundName) {
        renderSound(soundName);
    }
    console.log(data);
}
function renderSound(soundName) {
    // https://media.merriam-webster.com/soundc11
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${API_KEY}`;
    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);
}