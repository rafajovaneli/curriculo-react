import { render, screen } from "@testing-library/react";
import ExperienceResult from "./ExperienceResult";

describe("ExperienceResult", () => {
  test("renders nothing without a result, so no placeholder is shown", () => {
    const { container } = render(<ExperienceResult label="Resultado:" />);
    expect(container).toBeEmptyDOMElement();
  });

  test("shows the label and the text when a result is provided", () => {
    render(<ExperienceResult label="Resultado:" text="Texto de exemplo." />);
    expect(screen.getByText("Resultado:")).toBeInTheDocument();
    expect(screen.getByText(/Texto de exemplo\./)).toBeInTheDocument();
  });
});
