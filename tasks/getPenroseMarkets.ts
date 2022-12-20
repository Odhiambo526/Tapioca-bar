import { HardhatRuntimeEnvironment } from 'hardhat/types';
import _ from 'lodash';
import { getDeployment } from './utils';

export const getPenroseMarkets = async (hre: HardhatRuntimeEnvironment) => {
    const penroseContract = await getDeployment(hre, 'Penrose');

    const addresses = await penroseContract.singularityMarkets();
    const markets = [];

    for (const address of addresses) {
        const singularity = await hre.ethers.getContractAt(
            'Singularity',
            address,
        );
        markets.push({
            [await singularity.name()]: address,
        });
    }

    return markets;
};

export const getPenroseMarkets__task = async (
    args: any,
    hre: HardhatRuntimeEnvironment,
) => {
    console.log(await getPenroseMarkets(hre));
};
