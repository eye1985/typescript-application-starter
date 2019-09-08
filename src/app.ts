import './style/main.css';

interface TextNode {
    text : string
}

const intro:TextNode = {
    text : "Typescript application starter"
};


// Your scripting here
document.addEventListener('DOMContentLoaded',function(){
    document.querySelector('#root').innerHTML = `
        Hello world
        <div class="main">
            ${intro.text}
        </div>
    `;
});
