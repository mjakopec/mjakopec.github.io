export class Header extends HTMLElement {
    constructor() {
        super();        
        this.attachShadow({mode: 'open'});
      }
async connectedCallback() {
        this.render();
}
  
get style(){
    return `<style>
    .wrapper {
        --max-width: 960px;
        --min-gap: 25px;
        --side-gap: calc((100vw - min(var(--max-width), calc(100vw - (var(--min-gap) * 2)))) / 2);
        padding-left: var(--side-gap);
        padding-right: var(--side-gap);
    }

    *, *::before, *::after {
        box-sizing: border-box;
    }
    
    h1, h2, h3, h4, h5, h6, p {
        margin-top: 0;
    }

    header {
        background: #0a66a8;
        color:white;
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    #logo {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 100;
        letter-spacing: 0.05rem;
    }
    
    nav ul {
        margin: 0;
        display: flex;
        list-style: none;
        padding: 0;
    }
    
    nav ul li {
        padding: 5px 15px;
        margin: 0 15px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        font-size: 0.9rem;
        letter-spacing: 0.05rem;
        font-weight: 100;
    }
    
    nav ul li:hover {
        border-color: #35e4ff;
    }
    
    #banner {
        background: #0a66a8;
        margin: 25px auto;
        padding: 50px;
        max-width: min(960px, calc(100vw - 50px));
        border-radius: 10px;
        color: #fff;
    }
    
    #banner h2 {
        margin: 0 0 40px;
        font-size: 3rem;
        /*max-width: 450px;*/
        font-weight: 900;
        line-height: 100%;
    }
        
    #banner a {
        padding: 10px 25px;
        background: #0cbf8f;
        color: #fff;
        border-radius: 3px;
        text-transform: uppercase;
        letter-spacing: 0.05rem;
        font-weight: 900;
        text-decoration: none;
    }
    </style>`
}
get template(){
    return `<header class="wrapper">
    <h1 id="logo">Testing purpose</h1>
    <nav>
        <ul>
            <li>Videos</li>
            <li>Blog</li>
            <li>Contact</li>
        </ul>
    </nav>
</header>

<section role="banner" id="banner">
    <h2>Create web apps that lasts forever - web components</h2>
    <p>*all the greatest thanks to <a href="https://beforesemicolon.com/">Before Semicolon</a></p><br>
    <a href="index.html">Show post list</a>
</section>`
}

async render() {
    this.shadowRoot.innerHTML = `${this.style}${this.template}`;
  }  
}    
customElements.define('my-header', Header);
