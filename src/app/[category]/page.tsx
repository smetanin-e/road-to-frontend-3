export default async function Products({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return (
    <div>
      <h1>Category</h1>
      <p>Category={category}</p>
    </div>
  );
}
