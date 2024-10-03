import { APIClient } from '@wharfkit/antelope';
import { Contract as TokenContract } from './contracts/eosio.token';

if (!process.env.NODEOS_API) {
	throw new Error('The NODEOS_API value must be provided in an .env file or on the command line.');
}

export const client = new APIClient({ url: process.env.NODEOS_API });
export const tokenContract = new TokenContract({ client });
