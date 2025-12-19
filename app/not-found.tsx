import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-normal text-heading mb-4">
          404
        </h1>
        <h2 className="text-2xl font-heading font-normal text-heading mb-4">
          Page Not Found
        </h2>
        <p className="text-body mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
