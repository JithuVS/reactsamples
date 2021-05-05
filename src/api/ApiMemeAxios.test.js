const axios = require("axios");

const dummyData = [
  {
    url: "https://api.memegen.link/images/aag/_/aliens.jpg",
    template: "https://api.memegen.link/templates/aag",
  },
  {
    url: "https://api.memegen.link/images/ackbar/_/it's_a_trap!.jpg",
    template: "https://api.memegen.link/templates/ackbar",
  },
];

jest.mock("axios");
describe("Mocking Success", () => {
  it("returns the memes", async () => {
    axios.get.mockResolvedValue({
      data: dummyData,
    });

    const data = await axios.get("https://api.memegen.link/images");
    expect(data.data[0].url).toEqual(
      "https://api.memegen.link/images/aag/_/aliens.jpg"
    );
  });
});

//axios.get.mockRejectedValue(null);
