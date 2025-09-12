import { Loader } from "lucide-react";

export function Spinner() {
  return (
    <div className="w-full justify-center items-center mx-auto">
      <Loader className="animate-spin text-accent-foreground" />
    </div>
  );
}
