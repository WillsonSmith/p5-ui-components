import { LitElement, html, css } from "lit-element";

class PBox extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      width: Number,
      height: Number,
      coordinates: { attribute: false },
    };
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
  }

  render() {
    return html`
      <div>
        <svg xmlns="http://www.w3.org/2000/svg">
          <path d=${this.box} />
        </svg>
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
