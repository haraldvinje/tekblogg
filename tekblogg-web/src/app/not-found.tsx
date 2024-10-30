import Link from "next/link";

export default async function NotFound() {
  return (
    <text className="mt-20 text-center dark:text-white">
      <h2 className="text-2xl font-bold">Siden finnes ikke 👎</h2>
      <Link href="/" className="underline hover:text-blue">
        Tilbake til forsiden
      </Link>
    </text>
  );
}
