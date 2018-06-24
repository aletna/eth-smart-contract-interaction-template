pragma solidity ^0.4.24;

contract Greeting {
    /* Define variable greeting of the type string */
    string greeting = 'Hello Luis!';

    /* overwrite greeting variable */
    function setGreeting(string _greeting) public {
        greeting = _greeting;
    }

    /* Retrieve the greeting variable */
    function callGreeting() constant public returns (string) {
        return greeting;
    }
}
