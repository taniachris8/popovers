export default class Tooltip {
  constructor(message, content, element) {
    this.message = message;
    this.content = content;
    this.element = element;

    const container = document.querySelector(".container");

    this.tooltipElement = document.createElement("div");
    this.tooltipElement.classList.add("tooltip");
    this.tooltipElement.innerHTML = `
    <div class="tooltip-title-container">
      <p class="tooltip-title">${this.message}</p>
      </div>
      <p class="tooltip-text">${this.content}</p>
    `;

    container.append(this.tooltipElement);
  }

  toggle() {
    this.tooltipElement.classList.toggle("active");

    if (this.tooltipElement.classList.contains("active")) {
      const containerRect = this.element.getBoundingClientRect();
      const tooltipRect = this.tooltipElement.getBoundingClientRect();

      const top = containerRect.top - tooltipRect.height - 10;
      const left =
        containerRect.left + containerRect.width / 2 - tooltipRect.width / 2;

      this.tooltipElement.style.top = `${top}px`;
      this.tooltipElement.style.left = `${left}px`;
    }
  }
}
