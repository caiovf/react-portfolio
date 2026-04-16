export async function clientLoader() {
  return new Response(null, { status: 404 });
}

export default function Silence() {
  return null;
}
