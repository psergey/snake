export default class Food {
  private board: HTMLElement;
  private element: HTMLDivElement;
  private x: number;
  private y: number;

  constructor(x: number, y: number, board: HTMLElement) {
    this.board = board;
    this.element = document.createElement("div");
    this.element.className = "food";
    this.x = x;
    this.y = y;
  }

  draw(): void {
    this.element.style.gridRowStart = `${this.y}`;
    this.element.style.gridColumnStart = `${this.x}`;
    this.element.classList.add("food");
    this.board.appendChild(this.element);
  }

  get position(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
}
