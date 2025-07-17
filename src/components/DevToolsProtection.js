import { useEffect } from "react";

const DevToolsProtection = () => {
  useEffect(() => {
    // Disable right-click context menu
    const disableRightClick = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    const disableDevTools = (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Detect DevTools opening
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        // Redirect or show warning
        document.body.innerHTML =
          '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-size:24px;color:red;">Access Denied</div>';
      }
    };

    // Disable text selection
    const disableSelection = () => {
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";
      document.body.style.mozUserSelect = "none";
      document.body.style.msUserSelect = "none";
    };

    // Add event listeners
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableDevTools);
    document.addEventListener("selectstart", (e) => e.preventDefault());

    // Check for DevTools periodically
    const devToolsInterval = setInterval(detectDevTools, 500);

    // Apply selection protection
    disableSelection();

    // Console warning
    console.clear();
    console.log("%cSTOP!", "color: red; font-size: 50px; font-weight: bold;");
    console.log(
      "%cThis is a browser feature intended for developers. Content is protected.",
      "color: red; font-size: 16px;"
    );

    // Cleanup
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableDevTools);
      clearInterval(devToolsInterval);
    };
  }, []);

  return null;
};

export default DevToolsProtection;
