import { Container, ProductList } from '@/shared/components';
import { Api } from '@/shared/services';

export default async function Products({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { name } = await Api.products.getProductsBySlug(slug);

  return (
    <div className='mt-8 pb-15 '>
      <Container>
        <h2 className='text-4xl mb-8'>{name}</h2>
        <ProductList slug={slug} />
      </Container>
    </div>
  );
}
