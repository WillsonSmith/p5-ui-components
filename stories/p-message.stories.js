import { html } from "lit-html";
import "../components/message/p-message.js";

/**
 * Primary UI component for user interaction
 */

export default {
  title: "p-message",
  component: "p-message",
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
        <p-message
          ?exclamation=${args.exclamation}
          style="display: inline-block;"
          >${args.message}</p-message
        >
      </div>
    </div>
  `;
};

export const Basic = Template.bind({});
Basic.args = {
  message: "This is the content of my message!",
  exclamation: false,
};

export const WithLongText = Template.bind({});
WithLongText.args = {
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ullamcorper nisl sed molestie dignissim. Pellentesque rutrum erat quam, id elementum eros laoreet quis. Nunc posuere vitae arcu ut ornare. Fusce quis laoreet odio. Donec eget aliquam ligula, nec sollicitudin elit. Duis eu tortor magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet tristique arcu. Donec sollicitudin mattis orci, ut porta ligula. Vestibulum dui lorem, euismod a urna ac, euismod dapibus urna. Vestibulum sit amet lacus euismod nibh iaculis pretium egestas porta turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fermentum aliquet odio ut cursus. Duis pulvinar dui leo, et ultrices massa interdum a. Ut tincidunt, arcu eu fringilla fringilla, elit purus gravida justo, quis tristique odio est a urna. In hac habitasse platea dictumst.",
};
