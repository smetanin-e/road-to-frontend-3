import { Text, Button, Html, Head, Preview, Body, Container } from '@react-email/components';

interface PayOrderTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate = ({ orderId, totalAmount, paymentUrl }: PayOrderTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Оплатите заказ</Preview>
      <Body style={{ fontFamily: 'sans-serif' }}>
        <Container>
          <Text>Заказ №{orderId}</Text>
          <Text>
            Сумма: <b>{totalAmount} ₽</b>
          </Text>
          <Button
            href={paymentUrl}
            style={{ background: '#000', color: '#fff', padding: '12px 20px' }}
          >
            Оплатить заказ
          </Button>
        </Container>
      </Body>
    </Html>
  );
};
