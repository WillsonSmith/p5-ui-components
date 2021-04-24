import { html } from "lit-html";
import "../components/message/p-message.js";

/**
 * Primary UI component for user interaction
 */

export default {
  title: "p-message",
  component: "p-message",
};

const Template = () => {
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
      <p-message>Some text here</p-message>
    </div>
  `;
};

export const Basic = Template.bind({});
