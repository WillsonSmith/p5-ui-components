import { html } from "lit-html";
import "../components/box/p-box.js";

/**
 * Primary UI component for user interaction
 */

export default {
  title: "p-box",
  component: "p-box",
};

const Template = (args) => {
  return html`
    <style>
      body {
        font-family: sans-serif;
        font-size: 1.6rem;
      }
    </style>
    <div
      style="width: 100%; height: 800px; background: #B40001; padding: 1rem; box-sizing: border-box;"
    >
      <div style="max-width: 60rem; margin: 0 auto">
        <p-box
          .transformer=${(coordinates) => {
            const [tl, tr, br, bl] = coordinates;
            return [{ x: tl.x + 10, y: tl.y }, tr, br, bl];
          }}
          style="--box-color: #fff"
          ><div style="padding: 1rem">${args.message}</div></p-box
        >
      </div>
    </div>
  `;
};

export const Basic = Template.bind({});
Basic.args = {
  message: "This is the content of my message!",
};
