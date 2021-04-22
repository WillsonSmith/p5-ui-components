import {LitElement, html, css} from 'lit-element';

class PMessage extends LitElement {
  static get properties() {
    return {
      image: {attribute: 'image', type: String}
    }
  }

  static get styles() {
    return css`
      @font-face {
        font-family: 'Persona 5';
        src: url('../../fonts/p5hatty.ttf');
      }
      :host {
        --message-matting: rgba(255, 255, 255, 1);
        --message-background: rgba(0, 0, 0, 1);
        --message-text-color: rgba(255, 255, 255, 1);
        --font-family: 'Persona 5';
        --matting-padding: 0.2rem;
        --message-padding: 1rem;
      }

      .Message {
        background: var(--message-matting);
        font-family: 'Persona 5';
        padding: var(--matting-padding);
        transform: skew(359deg, 359deg);
      }
      .Content {
        background: var(--message-background);
        color: var(--message-text-color);
        padding: var(--message-padding);
      }
    `;
  }

  constructor() {
    super();
  }

  render() {

    return html`
      <div class="Message">
        <div class="Content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('p-message', PMessage);