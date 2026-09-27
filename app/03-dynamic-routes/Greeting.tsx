export default async function Greeting({
  searchParams,
}: Pick<PageProps<"/03-dynamic-routes">, "searchParams">) {
  const { name } = await searchParams;
  return <p>Hello, {typeof name === "string" ? name : "stranger"}!</p>;
}
