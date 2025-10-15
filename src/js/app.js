import Tooltip from "./tooltip";

const button = document.querySelector(".btn");

const tooltip = new Tooltip(
  "Popover title",
  "And here's some amazing content. It's very engaging. Right?",
  button,
);

button.addEventListener("click", () => {
  tooltip.toggle();
});

button.addEventListener("blur", () => {
  tooltip.toggle();
});
