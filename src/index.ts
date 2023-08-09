// export it to be included in the bundle
export { MyComponent } from "./my-component";

const myComponent = document.createElement("my-component");
myComponent.myProp = "Lit Web Component Lib";
document.getElementsByTagName("body")[0].appendChild(myComponent);
