const { ethers } = require('ethers');

// Alchemy URL with your API key
const providerURL = 'https://eth-mainnet.alchemyapi.io/v2/9jTnhn8p1RsIYwirWat3HXfeA91p7dex';

// Create the provider
const provider = new ethers.JsonRpcProvider(providerURL);

// Beacon Deposit Contract address
const beaconDepositAddress = '0x00000000219ab540356cBB839Cbe05303d7705Fa';

// Listen for incoming transactions to the Beacon Deposit Contract
provider.on('pending', async (txHash) => {
    try {
        const transaction = await provider.getTransaction(txHash);

        // Check if the transaction is to the Beacon Deposit Contract
        if (transaction && transaction.to && transaction.to.toLowerCase() === beaconDepositAddress.toLowerCase()) {
            console.log(`Deposit detected! Transaction hash: ${txHash}`);
            
            // Fetch transaction details
            const receipt = await provider.getTransactionReceipt(txHash);
            const { from, to, value, blockNumber, timestamp } = await getTransactionDetails(txHash);

            // Record and store deposit details
            storeDepositDetails({
                amount: ethers.utils.formatEther(value),
                sender: from,
                timestamp: new Date(timestamp * 1000).toISOString(), // Convert timestamp to ISO string
                transactionHash: txHash,
                blockNumber
            });
        }
    } catch (error) {
        console.error('Error processing transaction:', error);
    }
});

// Function to fetch transaction details
async function getTransactionDetails(txHash) {
    const transaction = await provider.getTransaction(txHash);
    const receipt = await provider.getTransactionReceipt(txHash);
    const block = await provider.getBlock(receipt.blockNumber);
    return {
        from: transaction.from,
        to: transaction.to,
        value: transaction.value,
        blockNumber: receipt.blockNumber,
        timestamp: block.timestamp
    };
}

// Function to store deposit details
function storeDepositDetails(details) {
    // Example of storing deposit details
    // You can save this data to a database or file
    console.log('Deposit Details:', details);
    // Implement your storage logic here
}

// Example to start listening for deposits
console.log('Listening for deposits to the Beacon Deposit Contract...');
