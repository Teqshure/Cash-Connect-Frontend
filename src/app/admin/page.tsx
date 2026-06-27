import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">

      <Link
        href="/"
        className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors shadow-sm"
      >
        Go to Home
      </Link>
    </div>
  );
}
