async function fetchLatestBlock() {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log('Latest block number:', blockNumber);
        return blockNumber;
    } catch (error) {
        console.error('Error fetching block data:', error);
    }
}
