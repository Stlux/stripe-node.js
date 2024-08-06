import React, { useState, useEffect } from 'react';
import './App.css';

const ProductDisplay = ({ product, clickIt }) => (
	<section>
		<div className='product'>
			<img src='https://i.imgur.com/EHyR2nP.png' alt='The cover of Stubborn Attachments' />
			<div className='description'>
				<h3>{product.name}</h3>
				<h5>{product.price}</h5>
			</div>
		</div>
		<form action='/create-checkout-session' method='POST'>
			<input type='hidden' name='price' id='price' value={product.price} />
			<input type='hidden' name='name' id='name' value={product.name} />
			<button
				type='submit'
				onClick={() => {
					clickIt(true);
				}}>
				Checkout
			</button>
		</form>
	</section>
);

export default function App() {
	const [product, setProduct] = useState({
		name: 'Test',
		price: 40,
	});
	const [click, setClick] = useState(false);

	useEffect(() => {
		if (click) {
			fetch('/create-checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: product.name,
					price: product.price,
				}),
			});
		}
	}, [click]);

	return <ProductDisplay product={product} clickIt={setClick} />;
}
