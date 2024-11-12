import { InfluxDB } from '@influxdata/influxdb-client';

import { logger } from './logger';

const INFLUX_URL = Bun.env.UNICOVE_INFLUX_URL;
const INFLUX_TOKEN = Bun.env.UNICOVE_INFLUX_TOKEN;
export const INFLUX_ORG = Bun.env.UNICOVE_INFLUX_ORG || 'unicove';

if (!INFLUX_URL || !INFLUX_TOKEN || !INFLUX_ORG) {
	logger.error('InfluxDB connection details not found in environment, exiting');
	process.exit(1);
}

export const influxdb = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
