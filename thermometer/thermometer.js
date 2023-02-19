export class Thermometer extends HTMLElement {
    constructor() {
      super();
      this._trV=this.getAttribute('value');
      this._trMin=this.getAttribute('min');
      this._trMax=this.getAttribute('max');
      this._trPer=100-(((this._trV-this._trMin)/(this._trMax-this._trMin))*100);
      this._color=this.getAttribute('color');
      this.attachShadow({mode: 'open'});
    }

    static get observedAttributes() {
        return ['value','color'];
      }

    get style(){
        return `<style>
        @import url("style.css");      
      /* Thermometer column and text */
      .thermometer{
          width:22px;
          height:150px;
          background: -webkit-linear-gradient(top, #fff 0%, #fff ${this._trPer}%, ${this._color} ${this._trPer}%, ${this._color} 100%);
          border-radius:22px 22px 0 0;
          border:5px solid #4a1c03;
          border-bottom:none;
          position:relative;
          box-shadow:inset 0 0 0 4px #fff;
          color:#fff;
      }
      
      /* Thermometer Bulb */
      .thermometer:before{
          content:' ';
          width:44px;
          height:44px;
          display:block;
          position:relative;
          top:142px;
          left:-16px;
          z-index:-1; /* Place the bulb under the column */
          background:${this._color};
          border-radius:44px;
          border:5px solid #4a1c03;
          box-shadow:inset 0 0 0 4px #fff;
      }
      
      /* This piece here connects the column with the bulb */
      .thermometer:after{
          content:' ';
          width:14px;
          height:7px;
          display:block;
          position:absolute;
          top:146px;
          left:4px;
          background:${this._color};
      }
      .holder{
        display:block;
        height:200px;
      }
      .Tvalue{
        padding-left:30px;
      }      
        </style>`
    }
    get template(){
        return `<div class="holder"><div class="thermometer"><span class="Tvalue">${this._trV}&deg;C</span></div></div>`
    }
    render() {
        this.shadowRoot.innerHTML = `${this.style}${this.template}`;
    }
    
    connectedCallback() {
        this.render();  
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name ==='value') {this._trV= newValue}
        if (name ==='color') {this._color= newValue}
        this._trPer=100-(((this._trV-this._trMin)/(this._trMax-this._trMin))*100);
        this.render();
    }

    disconnectedCallback() {
        console.log('callback disconnected')
    }
}
customElements.define('my-thermometer', Thermometer);  
