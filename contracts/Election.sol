pragma solidity ^0.5.0;

contract Election {

    string public candidate;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;

    // Store accounts that have voted
    mapping(address => bool) public voters;

    event votedEvent (
        uint indexed _candidateId
    );

    uint public candidatesCount;

    constructor() public {
        addCandidate('Hindustan Janta Party');
        addCandidate('Jongress Party');
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that account is not already voted
        require(!voters[msg.sender]);

        // require a valid candidates
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        
        // record that voter is already voted
        voters[msg.sender] = true;

        candidates[_candidateId].voteCount ++;

        emit votedEvent(_candidateId);
    }
 }