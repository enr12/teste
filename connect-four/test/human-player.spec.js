import HumanPlayer from '../app/scripts/models/human-player.js';

describe('human player', function () {

  it('should initialize', function () {
    const humanPlayer = new HumanPlayer({
      name: 'Super Player',
      color: 'blue'
    });
    expect(humanPlayer).to.have.property('name', 'Super Player');
    expect(humanPlayer).to.have.property('color', 'blue');
    expect(humanPlayer).to.have.property('score', 0);
    expect(humanPlayer).to.have.property('type', 'human');
  });

});
