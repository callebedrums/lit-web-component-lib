import { Given, Then } from "@cucumber/cucumber";
import { OurWorld } from "../../features/types";
import { expect } from "@playwright/test";

Given(/^User goes to '([^']*)'$/, async function (this: OurWorld, path: string) {
  await this.page.goto(new URL(path, this.parameters.baseUrl || "http://localhost:8080/").toString());
});

Then(/^My Component shows '([^']*)'$/, async function (this: OurWorld, text: string) {
  await expect(this.page.locator("my-component h1")).toHaveText(text);
});
