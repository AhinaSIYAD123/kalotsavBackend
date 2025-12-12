const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.payForWater = async (req, res) => {
  try {
    const { stage, bottles } = req.body;

    if (!stage || !bottles) {
      return res.status(400).json({ error: "Stage and bottle count required" });
    }


    const PRICE_PER_BOTTLE = 50; 
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Drinking Water: Stage ${stage}`,
            },
            unit_amount: PRICE_PER_BOTTLE * 100, 
          },
          quantity: bottles,
        },
      ],
      success_url: "http://localhost:5175/payment-success",
      cancel_url: "http://localhost:5175/payment-failed",
    });

    res.json({ url: session.url });

  } catch (error) {
    console.log("Stripe Error:", error);
    res.status(500).json({ error: "Payment session failed" });
  }
};
