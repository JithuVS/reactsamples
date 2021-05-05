import renderer from "react-test-renderer";
import Forms from "./Forms";

it("renders correctly when there are no items", () => {
  const tree = renderer.create(<Forms />).toJSON();
  expect(tree).toMatchSnapshot();
});
