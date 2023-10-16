import { del } from "@vercel/blob";

export const runtime = "edge";

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get("url");

  if (!urlToDelete) {
    return new Response(
      "URL parameter is missing. Expected 'url' in search parameters.",
      { status: 400 }
    );
  }

  try {
    new URL(urlToDelete);
  } catch (e) {
    return new Response(`Malformed URL: ${urlToDelete}.`, { status: 400 });
  }

  console.log("Attempting to delete:", urlToDelete);

  await del(urlToDelete);

  return new Response(`URL ${urlToDelete} successfully deleted.`, {
    status: 200,
  });
}
