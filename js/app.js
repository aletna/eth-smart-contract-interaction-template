var Web3 = require('web3');

window.App = {
	instance: "No instance has been initiated, yet.",

	network: "No network connected yet.",

  start: function(){
    let self = this

    self.fetchAccount()
    .then(function(account){

      $(document).on('click', '#getGreetingBtn', (event) => {
        App.callGreeting(account)
      });

			$(document).on('click', '#setGreetingBtn', (event) => {
				let input = document.getElementById("newGreeting").value;
				App.setGreeting(account,input)
      });

      return account
    })


  },

  fetchAccount: function(){
    let self = this;

    return new Promise(function(res, rej){

      // Get the initial account balance so it can be displayed.
      web3.eth.getAccounts(function(err, accounts) {
        if (err != null) {
          rej("There was an error fetching your accounts.")
        }

        if (accounts.length == 0) {
          rej("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        }

        // resolve with account
        res(accounts[0])

      });
    })
  },

  callGreeting: function(account) {
    let self = this;

    let greeting = new Promise(function(resolve, reject){
      self.instance.callGreeting({from: account}, function(err, res){
        resolve(res)
      })
    })

    Promise.resolve(greeting)
    .then(function(string){
			document.getElementById("greetingOutput").innerHTML = " >>>>> " + string;
    })
  },

  setGreeting: function(account, input) {
		let self = this;
		
		let greeting = new Promise(function(resolve, reject){
      self.instance.setGreeting(input, {from: account}, function(err, res){
        resolve(res)
      })
    })

    Promise.resolve(greeting)
    .then(function(string){
			console.log("setting new greeting to: '"+input+"'");
    })
  }

};


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts / players don't appear or you have 0 ETH, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);

    web3.version.getNetwork((err, netId) => {

      switch (netId) {

        // NetId = 1 is Ethereum Main Net

        /*
        case "1":
          console.warn('You are using the Ethereum Main Network')
          var abi = // PASTE ABI HERE
          var SharesContract = web3.eth.contract(abi);
          var contractAddress = // PASTE 'CONTRACT' HERE
          var instance = SharesContract.at(contractAddress);
          App.instance = instance;
          App.network = 1;
          App.start();
          break
        */

        // NetId = 3 is Ropsten Test Net
        case "3":
          console.warn('You are using the Ropsten Test Network.')
          var abi = [
          	{
          		"constant": true,
          		"inputs": [],
          		"name": "callGreeting",
          		"outputs": [
          			{
          				"name": "",
          				"type": "string"
          			}
          		],
          		"payable": false,
          		"stateMutability": "view",
          		"type": "function"
          	},
          	{
          		"constant": false,
          		"inputs": [
          			{
          				"name": "_greeting",
          				"type": "string"
          			}
          		],
          		"name": "setGreeting",
          		"outputs": [],
          		"payable": false,
          		"stateMutability": "nonpayable",
          		"type": "function"
          	}
          ]
          var SharesContract = web3.eth.contract(abi);
          var contractAddress = '0x72c334893ab0493debf4eac516ee70a59244aec3'
          var instance = SharesContract.at(contractAddress);
          App.instance = instance;
          App.network = 3;
          App.start();
          break
        default:
          console.warn('This is an unknown network. Please switch to either the Ropsten Test Network or the Ethereum Main Network.')
      }
    })

  } else {
    console.warn("No web3 detected.");
  }

});
