import { Container, ProductCard } from '@/shared/components';
import { Api } from '@/shared/services';

export default async function Products({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { type, name, data } = await Api.products.getProductsBySlug(slug);
  console.log(data);
  return (
    <div className='mt-8 pb-15 '>
      <Container>
        {/* Шапка */}
        <div className='mb-8'>
          <h2 className='text-4xl'>{name}</h2>
        </div>

        {/* контент */}

        <div className='ml-0 flex gap-15 flex-wrap'>
          {data.map((book, index) => (
            <div key={index} className='w-[278px]'>
              <div className='h-full'>
                <ProductCard book={book} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
