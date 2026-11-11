import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/toxic")({
  component: () => <div>toxic page</div>,
});
