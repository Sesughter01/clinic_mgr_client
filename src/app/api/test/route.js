export async function GET() {
  console.log("✅ Test API hit");
  return Response.json({ hello: "world" });
}
