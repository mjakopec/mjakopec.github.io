const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />

  <style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
  *{font-family:Roboto;}
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  
  /* Modal Content */
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius:5px;
    max-width:400px;
  }
  
  /* The Close Button */
  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
  input[type="button"]
  {
    background-color: grey;
    color:white;
    border-radius:5px;
    padding: 5px 5px 5px 5px;
  }
  h1 {
    font-size:2rem;
  }
  </style>
  <div class="my-alert">
    <div id="myModal" class="modal">
      <div class="modal-content" part="content">
      <span class="close" part="close"><i></i></span>
      <h3 part="modal-head"></h3>
      <p part="modal-text" >Some text in the Modal..</p><br>
      <img src="" width="50%" alt="cookies-img" /><br>
      <input part="modal-btn" type="button" value="Consent"/>
      </div>
    </div>
    <h1>Modal alerter demo</h1>
    <p><slot name="some_data" /></p>
    <input class="my-alerter" type="button" value="Show modal" />
  </div>
`;
/*https://meowni.ca/posts/part-theme-explainer/ */
class MyAlert extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    //let slottedSpan = document.querySelector('my-alert div')
    //console.log(slottedSpan.slot.value); // logs 'my-text'
  }


clicked(){
  this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.modal');
    const toggleBtn = this.shadowRoot.querySelector('.my-alerter');

    if(this.showInfo) {
      info.style.display = 'none';
      toggleBtn.value="Show modal";
    } else {
      info.style.display = 'block';
      toggleBtn.value="Hide modal";
    }
  
}

connectedCallback() {
  this.shadowRoot.querySelector('.my-alert').addEventListener('click', () => this.clicked());
  this.shadowRoot.querySelector('h3').innerText = this.getAttribute('data-head');
  this.shadowRoot.querySelector('p').innerText = this.getAttribute('data-text');
  this.shadowRoot.querySelector('img').src = this.getAttribute('data-url');
  this.shadowRoot.querySelector('i').setAttribute("class", this.getAttribute('data-icon'));
}

disconnectedCallback() {
  this.shadowRoot.querySelector('.my-alert').removeEventListener();
}
}

window.customElements.define('my-alert', MyAlert);
