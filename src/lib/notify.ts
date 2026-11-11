import { toast } from "sonner";

export function notifyAdded(name: string, onView: () => void) {
  toast.success(`${name} added to cart`, {
    action: { label: "View cart", onClick: onView },
  });
}