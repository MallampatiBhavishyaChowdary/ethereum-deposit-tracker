const Bottleneck = require('bottleneck');
const { ethers } = require('ethers');

// Initialize Bottleneck
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 200, // wait 200ms between requests
});

const provider = new ethers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/9jTnhn8p1RsIYwirWat3HXfeA91p7dex');

// Wrap the method with limiter
const getTransactionByHash = limiter.wrap(provider.getTransaction.bind(provider));

// Use the wrapped function
getTransactionByHash('0xfed68477e0f048ed6439e251c834acb0961ccaed72f0cccf58a5459256e70082')
  .then(transaction => console.log(transaction))
  .catch(error => console.error('Error fetching transaction:', error));
