import { Asset } from '@wharfkit/antelope';
import { tokenContract } from '../wharf';

export async function getCirculatingSupply() {
	const supply = await tokenContract.table('stat', 'EOS').get();
	if (!supply) {
		throw new Error('Could not find supply');
	}
	const locked = await tokenContract.table('accounts', 'eosio').get();
	if (!locked) {
		throw new Error('Could not find locked');
	}

	const difference = supply.max_supply.units.subtracting(locked.balance.units);
	const circulating = Asset.fromUnits(difference, supply.max_supply.symbol);
	return circulating.quantity;
}
