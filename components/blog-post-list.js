export class BlogPostList extends HTMLElement {
    #posts = [];
    
    constructor() {
      super();
      
      this.attachShadow({mode: 'open'});
    }
    
    set posts(value) {
      this.#posts = value;
      this.render();
    }
    
    get style() {
      return `
        <style>
        :host {
            margin-top: 30px;
            display: block;
        }
        
        :host * {
            box-sizing: border-box;
        }
      
        .blog-posts .posts {
          padding: 0 20px;
          display: grid;
          grid-auto-rows: 1fr;
          grid-gap: 25px;
          --blog-post-width: auto;
          --blog-post-height: 100%;
          --blog-post-thumb-bg: #3d5063;
        }

        .grid{
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }

        h2,
        ::slotted([slot="heading"]) {
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.05rem;
          border-bottom: 1px solid #0a66a8;
          padding: 0 10px 10px;
          margin-bottom: 15px;
        }
        
        a:any-link {
          background: #2c86ce;
          color: #fff;
          padding: 8px 10px;
          border-radius: 3px;
          text-decoration: none;
          margin-top: 15px;
          margin-left: 10px;
          display: inline-block;
        }
        </style>
      `
    }
    
    render() {
      this.shadowRoot.innerHTML = `
        ${this.style}
        <section class="blog-posts">
          <slot name="heading"><h2>Blog Post</h2></slot>
          <div class="posts ${this.#posts.length>1 ? 'grid':''}">
              ${this.#posts.map(post => `
                <blog-post
                  title="${post.title}"
                  description="${post.description}"
                  link="${post.link}"
                  >
                    <a slot="link" aria-label="Read more about ${post.title}" href="detail.html?id=${post.link}" ${(post.link >0) ? 'style=display:inline-block' :'style=display:none'}>Read More</a>
                </blog-post>
              `).join('\n')}
            </div>
        </section>
      `;
    }
  }
  
  customElements.define('blog-post-list', BlogPostList);
