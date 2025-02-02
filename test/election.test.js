
var Election = artifacts.require('./Election.sol');

contract('Election', (accounts) => {
    before(async () => {
      this.election = await Election.deployed()
    })
  
    it('deploy sucessfully', async () => {
      const address = await this.election.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    }),

    it('two candidate initialise', async () => {
        var count = await this.election.candidatesCount()
        assert.equal(count, 2)
      }),

    it('is correct candidates initialised', async () => {
        var candidate1 = await this.election.candidates(1)
        assert.equal(candidate1.id.toNumber(), 1)
        assert.equal(candidate1.name, 'Hindustan Janta Party')
        assert.equal(candidate1.voteCount.toNumber(), 0)

        var candidate2 = await this.election.candidates(2)
        assert.equal(candidate2.id.toNumber(), 2)
        assert.equal(candidate2.name, 'Jongress Party')
        assert.equal(candidate2.voteCount.toNumber(), 0)
    }),

    it('cast vote', async () => {
        await this.election.vote(1, {from : accounts[0]})
        var candidate1 = await this.election.candidates(1)
        assert.equal(candidate1.voteCount.toNumber(), 1)

        var result = await this.election.voters(accounts[0])
        assert.equal(result, true)

      })

      it("throws an exception for invalid candiates", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.vote(99, { from: accounts[1] })
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return electionInstance.candidates(1);
        }).then(function(candidate1) {
          var voteCount = candidate1[2];
          assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
          return electionInstance.candidates(2);
        }).then(function(candidate2) {
          var voteCount = candidate2[2];
          assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
        });
      });
    
    //   it("throws an exception for double voting", function() {
    //     return Election.deployed().then(function(instance) {
    //       electionInstance = instance;
    //       candidateId = 2;
    //       electionInstance.vote(candidateId, { from: accounts[1] });
    //       return electionInstance.candidates(candidateId);
    //     }).then(function(candidate) {
    //       var voteCount = candidate[2];
    //       assert.equal(voteCount, 1, "accepts first vote");
    //       // Try to vote again
    //       return electionInstance.vote(candidateId, { from: accounts[1] });
    //     }).then(assert.fail).catch(function(error) {
    //       assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
    //       return electionInstance.candidates(1);
    //     }).then(function(candidate1) {
    //       var voteCount = candidate1[2];
    //       assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
    //       return electionInstance.candidates(2);
    //     }).then(function(candidate2) {
    //       var voteCount = candidate2[2];
    //       assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
    //     });
    //   });  
})