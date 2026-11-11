import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout")({
  component: () => <div>checkout page</div>,
});
