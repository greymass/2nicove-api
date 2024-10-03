import { Elysia } from 'elysia';

import { getCirculatingSupply } from './apis/supply';

const app = new Elysia()
	.get('/', '🦄')
	.all('/v1/network/supply', getCirculatingSupply)
	.listen(3000);

console.log('Listening on port 3000');
