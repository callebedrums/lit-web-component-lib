import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import style from "./my-component.style.scss";

@customElement("my-component")
export class MyComponent extends LitElement {
  static styles = [style];

  @property()
  myProp: string = "";

  protected render() {
    console.log('render')
    return html`<h1>${this.myProp}</h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-component": MyComponent;
  }
}