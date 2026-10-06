import BookingFlow from '../../../components/booking/BookingFlow.jsx';

export default async function BookingPage({ params }) {
  const { token } = await params;
  return <BookingFlow token={token} />;
}
