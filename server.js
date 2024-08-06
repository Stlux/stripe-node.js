require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express(); 
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const YOUR_DOMAIN = 'http://localhost:3000/';

app.post('/create-checkout-session', async (req, res) => {
	console.log(req.body);
	const { price, name } = req.body;
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card', 'klarna', 'giropay', 'paypal', 'sofort'],
		line_items: [
			{
				price_data: {
					currency: 'eur',
					product_data: {
						name: name,
					},
					unit_amount: price * 100,
				},
				quantity: 1,
			},
		],
		mode: 'payment',
		success_url: `${YOUR_DOMAIN}/success`,
		cancel_url: `${YOUR_DOMAIN}/cancel`,
		automatic_tax: { enabled: true },
	});

	res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));
