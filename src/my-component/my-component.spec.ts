import { MyComponent } from "./my-component";

describe("My Component", () => {
  it("should create component", () => {
    const component = new MyComponent();
    expect(component).toBeDefined();
  });
});
