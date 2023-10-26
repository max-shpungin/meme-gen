/** THE JOY OF TEXT DECORATIONS */
let h1 = document.querySelector('h1');
h1.innerHTML = h1.innerHTML
  .split('')
  .map(char=>char!=' ' ? `<p>${char}</p>` : ``)
  .join('');

function h1Colors(){
  for (let p of document.querySelectorAll('h1>p')){
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    p.style.color = `rgb(${r},${g},${b})`
  }
}

setInterval(h1Colors,1000);


/** FORM INTERACTIONS */
let memeForm = document.querySelector('#meme-form');
let memes = [];

/** submit */
memeForm.addEventListener('submit',function(event){
  event.preventDefault();
  let imgURL = document.querySelector('input[name=url]');
  let textTop = document.querySelector('input[name=text-top]');
  let textBottom = document.querySelector('input[name=text-bottom]');
  appendImage(imgURL.value,textTop.value,textBottom.value);
  /**clear form values */
  imgURL.value = '';
  textTop.value = '';
  textBottom.value = '';
});

/** remove a meme */

//bubble up the dom until we either reach the body or find the target
let body = document.body;
body.addEventListener('click',function(event){
  let target = event.target;
  do {
    if(target.classList.contains('meme')){
      target.remove();
      break;
    }
    target = target.parentElement;
  } while (target && target !== body);
})

/** inspiration clicks */

let samples = document.querySelectorAll('#samples a');

for (let link of samples){
  link.addEventListener('click',(event)=>{
    event.preventDefault();
    let imgLocation = link.getAttribute('href');
    navigator.clipboard.writeText(imgLocation);
    alert('Copied image link to clipboard!');
  })
}

/**append an image function */
function appendImage(imgURL,textTop='',textBottom=''){
  let img = document.createElement('img');
  let landingArea = document.querySelector('section#meme-landing');
  let imgDiv = document.createElement('div');
  imgDiv.classList.add('meme')
  img.src = imgURL;

  //set image text
  let imgTextTop = document.createElement('p');
  let imgTextBottom = document.createElement('p');
  imgTextTop.setAttribute('id','image-text-top');
  imgTextTop.classList.add('image-text');
  imgTextTop.innerText = textTop.toUpperCase();
  imgTextBottom.setAttribute('id','image-text-bottom');
  imgTextBottom.classList.add('image-text');
  imgTextBottom.innerText = textBottom.toUpperCase();

  //add a way to remove
  let x = document.createElement('span');
  x.classList.add('material-symbols-outlined');
  x.innerText='sentiment_very_dissatisfied';

  //append to page
  imgDiv.append(img);
  imgDiv.prepend(imgTextTop);
  imgDiv.append(imgTextBottom);
  imgDiv.append(x);
  landingArea.append(imgDiv);
  memes.push(imgDiv);
}



