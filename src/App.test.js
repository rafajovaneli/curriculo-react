import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

jest.mock("framer-motion", () => {
  const React = require("react");
  const motionProps = new Set([
    "animate",
    "initial",
    "exit",
    "transition",
    "whileHover",
    "whileTap",
    "whileInView",
    "viewport",
    "layout",
    "layoutId",
    "drag",
    "dragConstraints",
    "onHoverStart",
    "onHoverEnd",
  ]);

  const createMockComponent = (tag) =>
    React.forwardRef(({ children, ...props }, ref) => {
      const filteredProps = Object.fromEntries(
        Object.entries(props).filter(([key]) => !motionProps.has(key))
      );

      return React.createElement(tag, { ref, ...filteredProps }, children);
    });

  return {
    motion: new Proxy(
      {},
      {
        get: (_, tag) => createMockComponent(tag),
      }
    ),
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});

const renderApp = () =>
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );

describe("App", () => {
  test("renders key sections and actions", () => {
    renderApp();

    expect(
      screen.getByRole("button", { name: /about me|sobre mim/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", {
        name: /professional links|links profissionais/i,
      }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("heading", {
        name: /get in touch|entre em contato/i,
      }).length
    ).toBeGreaterThan(0);
  });

  test("toggles language and updates navigation labels", () => {
    renderApp();

    fireEvent.click(screen.getByRole("button", { name: /switch to english/i }));

    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("cycles theme mode", () => {
    renderApp();

    const themeButton = screen.getByRole("button", { name: /auto mode/i });
    fireEvent.click(themeButton);

    expect(screen.getByRole("button", { name: /light mode/i })).toBeInTheDocument();
  });
});
