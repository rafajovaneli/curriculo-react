import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { axe } from "jest-axe";
import App from "./App";
import { detectInitialLanguage, translations } from "./contexts/LanguageContext";

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
    MotionConfig: ({ children }) => <>{children}</>,
  };
});

const renderApp = () =>
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );

const setBrowserLanguages = (languages) => {
  jest
    .spyOn(window.navigator, "languages", "get")
    .mockReturnValue(languages);
  jest
    .spyOn(window.navigator, "language", "get")
    .mockReturnValue(languages[0]);
};

beforeEach(() => {
  window.localStorage.clear();
  window.localStorage.setItem("language", "pt");
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("App", () => {
  test("renders key sections and actions", () => {
    renderApp();

    const cvLink = screen.getByRole("link", {
      name: /download resume|baixar cv/i,
    });
    expect(cvLink).toHaveAttribute("href", "/CV_RAFAEL_JOVANELI_PT.pdf");
    expect(cvLink).toHaveAttribute("rel", expect.stringContaining("noopener"));
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

  test("toggles language, updates labels and remembers the choice", () => {
    renderApp();

    fireEvent.click(screen.getByRole("button", { name: /mudar para inglês/i }));

    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /switch to portuguese/i })
    ).toBeInTheDocument();
    expect(window.localStorage.getItem("language")).toBe("en");
  });

  test("cycles theme mode with translated labels", () => {
    renderApp();

    fireEvent.click(screen.getByRole("button", { name: /tema automático/i }));

    expect(
      screen.getByRole("button", { name: /tema claro/i })
    ).toBeInTheDocument();
  });

  test("exposes valid landmarks and a plain navigation list", () => {
    renderApp();

    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getAllByRole("navigation")).toHaveLength(1);
    expect(screen.queryByRole("menubar")).not.toBeInTheDocument();
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  test("contact cards are real links with safe attributes", () => {
    renderApp();

    const whatsapp = screen.getByRole("link", { name: /whatsapp/i });
    expect(whatsapp.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/\d+/);
    expect(whatsapp).toHaveAttribute("rel", "noopener noreferrer");

    const email = screen.getByRole("link", { name: /e-?mail/i });
    expect(email.getAttribute("href")).toMatch(/^mailto:/);
  });

  test("timeline cards expand through a real button", () => {
    renderApp();

    const [firstToggle] = screen.getAllByRole("button", {
      name: /ver detalhes/i,
    });
    expect(firstToggle).toHaveAttribute("aria-expanded", "false");

    const panelId = firstToggle.getAttribute("aria-controls");
    expect(document.getElementById(panelId)).not.toBeInTheDocument();

    fireEvent.click(firstToggle);

    const [expandedToggle] = screen.getAllByRole("button", {
      name: /ocultar detalhes/i,
    });
    expect(expandedToggle).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById(panelId)).toBeInTheDocument();
  });
});

describe("accessibility (axe)", () => {
  // jsdom has no layout engine, so color-contrast is checked separately in a real browser.
  const axeOptions = { rules: { "color-contrast": { enabled: false } } };

  test.each([
    ["pt", "Portuguese"],
    ["en", "English"],
  ])("has no axe violations in %s (%s)", async (language) => {
    window.localStorage.setItem("language", language);
    const { container } = renderApp();

    const results = await axe(container, axeOptions);

    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});

describe("accessibility with everything expanded", () => {
  test("has no axe violations with download options, timeline and skills open", async () => {
    const { container } = renderApp();

    fireEvent.click(
      screen.getByRole("button", { name: /mais opções de download/i })
    );
    screen
      .getAllByRole("button", { name: /ver detalhes/i })
      .forEach((button) => fireEvent.click(button));
    container
      .querySelectorAll("button.skill-category-toggle")
      .forEach((button) => fireEvent.click(button));

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});

describe("language detection", () => {
  test("PT and EN define exactly the same keys", () => {
    expect(Object.keys(translations.en).sort()).toEqual(
      Object.keys(translations.pt).sort()
    );
  });

  test("uses the saved choice before the browser language", () => {
    setBrowserLanguages(["en-US"]);
    window.localStorage.setItem("language", "pt");
    expect(detectInitialLanguage()).toBe("pt");
  });

  test("falls back to the browser language", () => {
    window.localStorage.clear();
    setBrowserLanguages(["en-US"]);
    expect(detectInitialLanguage()).toBe("en");

    setBrowserLanguages(["pt-BR", "en"]);
    expect(detectInitialLanguage()).toBe("pt");
  });
});
