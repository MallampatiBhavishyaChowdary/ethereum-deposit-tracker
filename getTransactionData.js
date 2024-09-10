async function getTransactionData(transactionHash) {
    try {
        const transaction = await provider.getTransaction(transactionHash);
        console.log(transaction);  // Contains details like from, to, value, gasPrice, etc.
        return transaction;
    } catch (error) {
        console.error('Error fetching transaction data:', error);
    }
}