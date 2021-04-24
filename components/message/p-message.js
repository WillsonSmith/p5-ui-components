import { LitElement, html, css } from "lit-element";

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
        position: relative;
      }
      .Message::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        transform: rotateY(-1.54deg) skewX(-12.93deg);
      }
      .Content {
        position: relative;
        color: var(--message-text-color);
      }

      .Content-Container {
        padding: var(--matting-padding);
      }

      .Content::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      .Text {
        position: relative;
        padding: var(--message-padding);
      }

      .Message svg {
        position: absolute;
        width: 100%;
        height: 100%;
        fill: var(--message-matting);

        overflow: visible;
      }
      .Content svg {
        fill: var(--message-background);
      }
    `;
  }

  static get properties() {
    return {
      image: { attribute: "image", type: String },
      width: Number,
      height: Number,
      contentWidth: Number,
      contentHeight: Number,
    };
  }

  resize(width, height) {
    if (this.resizeTimeout) window.cancelAnimationFrame(this.resizeTimeout);
    this.resizeTimeout = window.requestAnimationFrame(() => {
      this.width = width;
      this.height = height;
    });
  }

  resizeContent(width, height) {
    if (this.resizeTimeout2) window.cancelAnimationFrame(this.resizeTimeout2);
    this.resizeTimeout2 = window.requestAnimationFrame(() => {
      this.contentWidth = width;
      this.contentHeight = height;
    });
  }

  constructor() {
    super();
    this.width = 0;
    this.height = 0;
    this.contentWidth = 0;
    this.contentHeight = 0;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        console.log(entry);
        const { width, height } = entry.contentRect;
        if (entry.target === this.contentNode) {
          this.resizeContent(width, height);
        }
        if (entry.target === this) {
          this.resize(width, height);
        }
      }
    });

    this.resize = this.resize.bind(this);
    this.resizeContent = this.resizeContent.bind(this);
  }

  firstUpdated() {
    this.contentNode = this.shadowRoot.querySelector(".Content");
    this.resizeObserver.observe(this.contentNode);
  }

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    // these values need to not be bad, do some real maths
    return html`
      <div class="Message">
        <svg xmlns="http://www.w3.org/2000/svg">
          <path d=${this.wrapperBox} />
        </svg>
        <div class="Content-Container">
          <div class="Content">
            <svg xmlns="http://www.w3.org/2000/svg">
              <path d=${this.contentBox} />
            </svg>
            <div class="Text">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  get wrapperBox() {
    // this could probably all be done in the resizeObserver? idk
    const coordinates = [
      { x: 0, y: 0 },
      { x: this.width * 1.05, y: this.height * -0.1 },
      { x: this.width, y: this.height * 1.1 },
      { x: this.width * -0.02, y: this.height },
    ];
    return mapCoordinatesToString(coordinates);
  }
  get contentBox() {
    const coordinates = [
      { x: this.contentWidth * 0.01, y: this.contentHeight * 0.05 },
      { x: this.contentWidth * 1.02, y: this.contentHeight * -0.1 },
      { x: this.contentWidth * 0.99, y: this.contentHeight },
      { x: this.contentWidth * -0.01, y: this.contentHeight * 0.98 },
    ];
    return mapCoordinatesToString(coordinates);
  }
}

customElements.define("p-message", PMessage);

function mapCoordinatesToString(coordinates) {
  return coordinates
    .map((coordinate, index) => {
      const type = index === 0 ? "M" : "L";
      return `${type} ${coordinate.x} ${coordinate.y}`;
    })
    .join(" ");
}
