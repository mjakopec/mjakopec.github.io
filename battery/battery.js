export class Battery extends HTMLElement {
    constructor() {
      super();
      this._trV=this.getAttribute('value');
      this._trC=this.getAttribute('color');
      this.attachShadow({mode: 'open'});
    }

    static get observedAttributes() {
        return ['value', 'color'];
      }

    get style(){
        return `<style>
        @import url("style.css");
        .batteryContainer {
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        
        .batteryOuter {
            border-radius: 9px;
            width: 250px;
            height: 90px;
            background-color: #888888;
        }
        
        .batteryBump {
            border-radius: 2px;
            background-color: #888888;
            margin: 2px;
            width: 10px;
            height: 30px;
        }
        
        #batteryLevel {
            border-radius: 8px 0px 0px 8px;
            width: ${this._trV};
            height: 90px;
        }
        .green  {background-color: #73AD21; color:#000;}
        .red    {background-color: #a10606; color:#000;}
        .yellow {background-color: #d7d715; color:#000;}
        #batteryText{
            font-size: 40px;
            text-align: center;
            margin: auto;
            width: 50%;
            padding: 25px;
        }
        </style>`
    }
    get template(){
        return `<div class="batteryContainer">
        <div class="batteryOuter">
        <div id="batteryLevel" class="${this._trC}">
        <div id="batteryText">${this._trV}</div>
        </div>
        </div>
        <div class="batteryBump"></div>
        </div>`
    }
    render() {
        this.shadowRoot.innerHTML = `${this.style}${this.template}`;
    }
    
    connectedCallback() {
        this.render();  
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name ==='value') {this._trV= newValue}
        if (name ==='color') {this._trC= newValue}
        this.render();
    }

    disconnectedCallback() {
        console.log('callback disconnected')
    }
}
customElements.define('my-battery', Battery);  
