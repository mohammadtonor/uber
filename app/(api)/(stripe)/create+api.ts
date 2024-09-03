import { Stripe } from "stripe";
import { key } from "@/constants/key";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, amount } = body;
    if (!name || !email || !amount) {
      return new Response(
        JSON.stringify({
          error: "Please enter a valid email address",
          status: 400,
        }),
      );
    }
    let customer;
    const doesCustomerExist = await stripe.customers.list({ email });
    if (doesCustomerExist.data.length > 0) {
      customer = doesCustomerExist.data[0];
    } else {
      const newCustomer = await stripe.customers.create({
        email,
        name,
      });
      customer = newCustomer;
    }
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2024-06-20" },
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });
    return new Response(
      JSON.stringify({
        paymentIntent: paymentIntent,
        ephemeralKey: ephemeralKey,
        customer: customer.id,
      }),
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error, status: 500 }));
  }
}
