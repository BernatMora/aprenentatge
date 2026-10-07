import { scales } from "@/data/scales";
import EscalaDetall from "./EscalaDetall";

// Per a l'export estatic: Next ha de saber TOTES les escales a la compilacio.
export function generateStaticParams() {
  return scales.map((s) => ({ id: s.id }));
}

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EscalaDetall id={id} />;
}
