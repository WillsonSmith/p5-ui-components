import { LitElement, html, css } from "lit-element";

import "../box/p-box.js";

class PMessage extends LitElement {
  static get styles() {
    return css`
      @font-face {
        font-family: "Persona 5";
        src: url("../../fonts/p5hatty.ttf");
      }
      :host {
        --message-matting: rgba(255, 255, 255, 1);
        --message-background: rgba(0, 0, 0, 1);
        --message-text-color: rgba(255, 255, 255, 1);
        --font-family: "Persona 5";
        --matting-padding: 0.2rem;
        --message-padding: 1rem;
        display: block;
        box-sizing: border-box;
      }

      :host(*),
      :host(*::before),
      :host(*::after) {
        box-sizing: inherit;
      }

      .Message {
        padding: var(--matting-padding);
      }
      .Content {
        color: var(--message-text-color);
      }

      .Text {
        padding: var(--message-padding);
      }
    `;
  }

  static get properties() {
    return {
      image: { attribute: "image", type: String },
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <p-box
        .transformer=${transformContainerCoordinates}
        style="--box-color: var(--message-matting)"
      >
        <div class="Message">
          <p-box
            .transformer=${transformContentCoordinates}
            style="--box-color: var(--message-background)"
          >
            <div class="Content">
              <div class="Text">
                <slot></slot>
              </div>
            </div>
          </p-box>
          <!-- <div class="Exclaimer"></div> -->
        </div>
      </p-box>
    `;
  }
}

function transformContentCoordinates(coordinates) {
  const [, tr, br] = coordinates;
  const width = tr.x;
  const height = br.y;
  return [
    { x: width * 0.01, y: height * 0.05 },
    { x: width * 1.02, y: height * -0.1 },
    { x: width * 0.99, y: br.y },
    { x: width * -0.01, y: height * 0.98 },
  ];
}

function transformContainerCoordinates(coordinates) {
  const [tl, tr, br, bl] = coordinates;
  const width = tr.x;
  const height = br.y;
  // might want to add w/h to this
  return [
    tl,
    { x: width * 1.05, y: height * -0.1 },
    { x: br.x, y: height * 1.1 },
    { x: width * -0.02, y: bl.y },
  ];
}

customElements.define("p-message", PMessage);
