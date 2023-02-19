export class Gauge extends HTMLElement {
    constructor() {
      super();
      this._trMin=this.getAttribute('min');
      this._trMax=this.getAttribute('max');
      this._trV=this.getAttribute('value');
      this._trT=this.getAttribute('title');
      this._trW=this.getAttribute('w');
      this._trA = -90;
      var slices = document.querySelector('slot');
      this._slice = slices.innerHTML;
      this.attachShadow({mode: 'open'});
    }

    static get observedAttributes() {
        return ['value'];
      }

    get style(){
        return `<style>
        @import url("style.css");
        :root {
            --gauge-width: ${this._trW};
            --min: ${this._trMin};
            --max: ${this._trMax};
            --actual-value: ${this._trV};
          }
          
          @keyframes needleRotation {
            0% {
              transform: rotate(-90deg);
            }
            80% {
              transform: rotate(
                calc(
                  -30deg + (var(--actual-value) - var(--min)) / (var(--max) - var(--min)) *
                    180deg
                )
              );
            }
            100% {
              transform: rotate(
                calc(
                  -50deg + (var(--actual-value) - var(--min)) / (var(--max) - var(--min)) *
                    180deg
                )
              );
            }
          }
          
          @keyframes gaugeRotation {
            0% {
              transform: rotate(0);
            }
            100% {
              transform: rotate(
                calc((var(--trigg) - var(--min)) / (var(--max) - var(--min)) * 180deg)
              );
            }
          }
          
          .wrapper {
            display: inline-block;
            width: auto;
            margin: 0 auto;
            background: inherit;
          }
          
          .gauge {
            --gauge-height: calc(var(--gauge-width) / 2);
            width: var(--gauge-width);
            height: var(--gauge-height);
            border-radius: var(--gauge-height) var(--gauge-height) 0 0 !important;
            position: relative;
            overflow: hidden;
            box-shadow: 0 -3px 6px 2px rgba(0, 0, 0, 0.5);
            background: inherit;
          }
          
          .slices {
            height: 100%;
          }
          
          .slices .marker {
            position: absolute;
            top: 0;
            border-radius: var(--gauge-height) var(--gauge-height) 0 0 !important;
            width: var(--gauge-width);
            height: var(--gauge-height);
            transform-origin: calc(var(--gauge-width) / 2) var(--gauge-height);
            animation: 1.5s ease-in 0s 1 gaugeRotation;
            transform: rotate(
              calc((var(--trigg) - var(--min)) / (var(--max) - var(--min)) * 180deg)
            );
            background: var(--bg);
          }
          
          .gauge-center {
            width: 60%;
            height: 60%;
            background: inherit;
            border-radius: var(--gauge-height) var(--gauge-height) 0 0 !important;
            position: absolute;
            box-shadow: 0 -13px 15px -10px rgba(0, 0, 0, 0.28);
            right: 21%;
            bottom: 0;
          }
          
          .gauge-center .label,
          .gauge-center .number {
            display: block;
            width: 100%;
            text-align: center;
            border: 0 !important;
          }
          .gauge-center .label {
            font-size: 0.75em;
            opacity: 0.6;
            margin: 1.1em 0 0.3em 0;
          }
          .gauge-center .number {
            font-size: 1.2em;
          }
          
          .needle {
            transform: rotate(${this._trA}deg);
            position: absolute;
            bottom: 0;
            left: 50%;
            height: calc(var(--gauge-height) / 1.1);
            width: 2px;
            box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.38);
            background: #15222e;
            transform-origin: bottom;
            animation: 2s ease-in 0s 1 needleRotation;
          }
          
          body {
            background: #15222e;
            color: #fff;
          }
          
        </style>`
    }
    get template(){
        return `<div class="wrapper">
        <div class="gauge" style="--gauge-width: ${this._trW}px; --min:${this._trMin}; --max: ${this._trMax}; --actual-value:${this._trV}">
          <div class="slices">
          ${this._slice}
          </div>
          <div class="needle"></div>
          <div class="gauge-center">
            <div class="label">${this._trT}</div>
            <div class="number">${this._trV}</div>
          </div>
        </div>
      </div>`
    }
    render() {
        this.shadowRoot.innerHTML = `${this.style}${this.template}`;
    }
    
    calculation(){
        this._trA = ((this._trV-this._trMin)/(this._trMax-this._trMin))*180-90;
    }

    connectedCallback() {
        this.render();  
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name ==='value') {this._trV= newValue}
        this.calculation();
        this.render();
    }

    disconnectedCallback() {
        console.log('callback disconnected')
    }
}
customElements.define('my-gauge', Gauge);  
