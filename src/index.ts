import { Elysia } from 'elysia';

import { getCirculatingSupply } from './apis/supply';
import {
	getHistoricPrice,
	getMarketPrice,
	MarkethistoryType,
	MarketpriceType
} from './apis/marketprice';

const port = Bun.env.UNICOVE_HTTP_PORT || 3000;

const app = new Elysia()
	.get('/', '🦄')
	.all('/v1/network/supply', getCirculatingSupply)
	.get('/v1/historicprice/:type/:timeframe', ({ params }) => {
		let { type, timeframe } = params;
		const types = ['cpu', 'net', 'ram', 'eosusd', 'btcusd', 'eosbtc', 'btccny'];
		if (params.type && !types.includes(params.type)) {
			throw new Error('Invalid type');
		}
		if (!timeframe) {
			timeframe = '1d';
		}
		return getHistoricPrice(type as MarketpriceType, timeframe as MarkethistoryType);
	})
	.get('/v1/marketprice/:type/:bucket/:range', ({ params }) => {
		let { type, bucket, range } = params;
		const types = ['cpu', 'net', 'ram', 'eosusd', 'btcusd', 'eosbtc', 'btccny'];
		if (params.type && !types.includes(params.type)) {
			throw new Error('Invalid type');
		}
		if (!bucket) {
			bucket = '1h';
		}
		if (!range) {
			range = '30d';
		}
		return getMarketPrice(type as MarketpriceType, bucket, range);
	})
	.listen(port);

console.log(`Listening on port ${port}`);
