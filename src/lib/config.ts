import type { NavigateFunction } from "react-router-dom";

export const REPORTS_URL =
  import.meta.env.VITE_REPORTS_URL ?? "/reportar-estafa";

export const REPORTS_URL_IS_INTERNAL = REPORTS_URL.startsWith("/");

export function navigateToReportWizard(navigate: NavigateFunction) {
  console.log("🔵 navigateToReportWizard invoked", {
    REPORTS_URL,
    REPORTS_URL_IS_INTERNAL,
  });
  if (REPORTS_URL_IS_INTERNAL) {
    navigate(REPORTS_URL);
    return;
  }
  window.location.href = REPORTS_URL;
}
