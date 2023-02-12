export class BlogPost extends HTMLElement {
    title = '';
    description = '';
    link = '';
    
    constructor() {
      super();
      
      this.attachShadow({mode: 'open'});
    }
    
    static get observedAttributes() {
      return ['title', 'description', 'link'];
    }
    
    async connectedCallback() {
      this.render();
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      // make sure it is mounted first
      if (this.isConnected) {
        switch (name) {
          case 'title':
            this.title = newValue || 'NO TITLE';
            break;
          case 'description':
            this.description = newValue || '';
            break;
          case 'link':
            this.link = newValue || '/';
            break;
        }
    
        this.render()
      }
    }
    
    get style() {
      return `
          <style>
              :host {
                  display: block;
              }
              
              :host * {
                  box-sizing: border-box;
              }
              
              .blog-post {
                  max-width: var(--blog-post-width, 300px);
                  height: var(--blog-post-height, auto);
                  padding: 10px 10px 25px;
                  background: #c0e5ff;
                  border-radius: 5px;
                  position: relative;
                  overflow: hidden;
              }

              figure img {
                width: 100%;
                height: auto;}
              
              .blog-post h2 {
                  color:#555;
                  margin: 0;
                  padding: 0 10px;
                  font-family: sans-serif;
                  font-size: 1.6rem;
                  line-height: 135%;
              }
              
              .blog-post p, li {
                  font-size: 1.2rem;
                  line-height: 150%;
                  color: #444;
                  padding: 0 10px;
              }
              
              .blog-post .link:any-link {
                  font-size: 0.9rem;
                  text-decoration: none;
                  font-weight: 900;
                  letter-spacing: 0.05rem;
                  color: #0a66a8;
                  text-transform: capitalize;
                  border-bottom: 1px solid #222;
                  margin-left: 10px;
              }
              h2 a {
                color: #555;
                margin: 0;
                padding: 0 10px;
                font-family: sans-serif;
                font-size: 1.2rem;
                line-height: 135%;
              }
          </style>
        `
    }
    
    get template() {
      return `
          <div class="blog-post">
             <h2>${(this.link >0) ? `<a href="detail.html?id=${this.link}">` :''}${this.title}${(this.link >0) ? '</a>' :''}</h2>
             <p>${this.description}</p>
             <slot name="link"><a href="${this.link}" class="link"  ${(this.link >0) ? 'style=display:inline-block' :'style=display:none'}>learn more</a></slot>
          </div>
        `
    }
    
    async render() {
      this.shadowRoot.innerHTML = `${this.style}${this.template}`;
    }
  }
  
  customElements.define('blog-post', BlogPost);
