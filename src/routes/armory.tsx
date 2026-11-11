import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/armory")({
  component: () => <div>armory page</div>,
});
