import './style/style.scss';
import helloWorld from './script/template/hello';

interface TextNode {
    text : string
}

const intro:TextNode = {
    text : "Typescript application starter"
};

export default function(){
    document.querySelector('#root').innerHTML = `
        ${helloWorld()}
        
        <div class="main">
            ${intro.text}
        </div>
    `;
};
