import { LitElement, html, css } from "lit-element";

class PBox extends LitElement {
  static get styles() {
    return css`
      :host {
        --box-color: transparent;
        position: relative;
        display: block;
      }

      svg {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: visible;
        fill: var(--box-color);
      }

      .Content {
        position: relative;
      }
    `;
  }

  static get properties() {
    return {
      width: Number,
      height: Number,
      coordinates: { attribute: false },
      transformer: { attribute: false },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this);
  }

  constructor() {
    super();
    this.coordinates = calculateCoordinates(0, 0);

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this) {
          const { width, height } = entry.contentRect;
          this.handleUpdateSize(width, height);
        }
      }
    });

    this.handleUpdateSize = this.handleUpdateSize.bind(this);
  }

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg">
        <path d=${this.box} />
      </svg>
      <div class="Content">
        <slot></slot>
      </div>
    `;
  }

  get box() {
    return coordinatesToSvgPath(this.coordinates);
  }

  handleUpdateSize(width, height) {
    if (this.resizeTimeout) window.cancelAnimationFrame(this.resizeTimeout);
    this.resizeTimeout = window.requestAnimationFrame(() => {
      const initialCoordinates = calculateCoordinates(width, height);
      if (this.transformer) {
        this.coordinates = this.transformer(initialCoordinates);
      } else {
        this.coordinates = initialCoordinates;
      }
    });
  }
}

function calculateCoordinates(width, height) {
  return [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ];
}

function coordinatesToSvgPath(coordinates) {
  return coordinates
    .map((coordinate, index) => {
      const type = index === 0 ? "M" : "L";
      return `${type} ${coordinate.x} ${coordinate.y}`;
    })
    .join(" ");
}

customElements.define("p-box", PBox);
