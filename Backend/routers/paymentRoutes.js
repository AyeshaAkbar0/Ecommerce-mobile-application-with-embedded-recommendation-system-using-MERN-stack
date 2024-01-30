const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NbGu3FODGQ4vMLCkR5TSde5wQVgivG2FM5reyjFVx37FUZSnCEof5rPBAt8I4cprbjeQHnuNOjTOaJkUtyALQav008njwvYei');


router.post('/intent', async (req, res) => {
    try {

      const amountInCents = Math.round(req.body.totalPrice * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        //amount: req.body.totalPrice,
        amount: amountInCents,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  });

module.exports = router;