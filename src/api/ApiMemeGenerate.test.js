const axios = require("axios");
import { render, cleanup, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import Api from "./Api";

describe("API", () => {
  it("Renders Api", async () => {
    const { getByText } = render(<Api />);

    expect(getByText(/API Call/i)).toBeInTheDocument();
    cleanup();
  });
});

describe("Fill the input fields", () => {
  it("Enter Data in title and message", async () => {
    const { getByTestId, getByText } = render(<Api />);

    const toptxt = getByTestId("toptxt"),
      bottomtxt = getByTestId("bottomtxt"),
      generate = getByTestId("generate");

    user.type(toptxt, "Hello top");
    user.type(bottomtxt, "Hello bottom");
    user.click(generate);

    const generatedImage = await waitFor(() => getByTestId("generatedImage"));
    expect(generatedImage).toBeVisible();
  });
});
