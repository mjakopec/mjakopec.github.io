export class Footer extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({mode: 'open'});
      }
async connectedCallback() {
        this.render();
}
  
get style(){
    return `
    <style>
    .wrapper {
        --max-width: 960px;
        --min-gap: 25px;
        --side-gap: calc((100vw - min(var(--max-width), calc(100vw - (var(--min-gap) * 2)))) / 2);
        padding-left: var(--side-gap);
        padding-right: var(--side-gap);
    }

    footer {
        background:#0a66a8;
        color:white;
        border-top: 1px solid #eee;
        padding-top: 35px;
        padding-bottom: 50px;
        display: flex;
        justify-content: space-between;
        position: relative;
    }
    
    footer .copyright {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        margin: 0;
        font-size: 0.8rem;
        color: #fff;
        font-style: italic;
    }
    
    footer .menu-list {
        flex: 1;
        margin-bottom: 35px;
        margin-right: 45px;
    }
    
    footer .menu-list h3 {
        font-size: 1rem;
        font-weight: 300;
    }
    
    footer .menu-list ul {
        margin: 0;
        padding: 10px 0;
        border-radius: 5px;
        list-style: none;
    }
    
    footer .menu-list ul li {
        height: 35px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        font-size: 0.9rem;
    }
    
    footer .menu-list:last-of-type {
        margin-right: 0;
    }
    </style>`
}
get template(){
    return `<footer class="wrapper">
		<div class="menu-list">
			<h3>Learn</h3>
			<ul role="menu">
				<li>Videos</li>
				<li>Articles</li>
				<li>Tutoring</li>
				<li>1 on 1</li>
			</ul>
		</div>
		<div class="menu-list">
			<h3>Products/Service</h3>
			<ul role="menu">
				<li>Frontend</li>
				<li>Backend</li>
				<li>Databases</li>
				<li>Hosting</li>
			</ul>
		</div>
		<div class="menu-list">
			<h3>Company</h3>
			<ul role="menu">
				<li>About</li>
				<li>Blog</li>
				<li>Careers</li>
				<li>Store</li>
			</ul>
		</div>
		<div class="menu-list">
			<h3>Social</h3>
			<ul>
				<li>Youtube</li>
				<li>Twitter</li>
				<li>Reddit</li>
				<li>Instagram</li>
			</ul>
		</div>
		<p class="copyright">copyright &copy; 2023. All rights reserved.</p>
	</footer>`
}

async render() {
    this.shadowRoot.innerHTML = `${this.style}${this.template}`;
  }  
}    
customElements.define('my-footer', Footer);
