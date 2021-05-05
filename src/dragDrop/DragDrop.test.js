import { render, screen } from "@testing-library/react";
import DragDrop from "./DragDrop";

const completedArray = [
  { name: "one", category: "complete", bgcolor: "skyblue" },
];

const pendingArray = [
  { name: "Two", category: "progress", bgcolor: "yellow" },
  { name: "Three", category: "progress", bgcolor: "pink" },
];

test("renders learn react link", () => {
  render(
    <DragDrop completedArray={completedArray} pendingArray={pendingArray} />
  );
  const Two = screen.getByText(/Two/i);
  expect(Two).toBeInTheDocument();
});
