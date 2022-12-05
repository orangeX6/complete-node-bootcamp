/* eslint-disable */
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51KcWRuSHDR30OyTDjBUNfK9aE4hxhAGvd6SCAMqmzIpEpB30TuHa1xueesU4mLeAtV83plYLo3795ub9dxQBeL3u00yWYAhWEf'
    );

    //  1) Get checkout session from API
    const session = await fetch(`/api/v1/bookings/checkout-session/${tourId}`);
    const data = await session.json();

    await stripe.redirectToCheckout({
      sessionId: data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
