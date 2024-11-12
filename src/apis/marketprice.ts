import { INFLUX_ORG, influxdb } from '../influx';

export interface Marketprice {
	result: string;
	table: number;
	_start: string;
	_stop: string;
	_time: string;
	_value: number;
	_field: string;
	_measurement: string;
}

export type MarketpriceType = 'cpu' | 'net' | 'ram' | 'btccny' | 'btcusd' | 'eosbtc' | 'eosusd';

export async function getMarketPrice(measurement: MarketpriceType, bucket = '1h', range = '30d') {
	const marketprice = influxdb.getQueryApi(INFLUX_ORG);

	const query = `
        from(bucket: "marketprice-${bucket}")
        |> range(start: -${range})
        |> filter(fn: (r) => r._measurement == "${measurement}")
    `;

	const result = await marketprice.collectRows<Marketprice>(query);
	return result.map((row) => ({
		date: row._time,
		value: row._value
	}));
}
