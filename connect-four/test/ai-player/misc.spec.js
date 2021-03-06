import utils from './utils.js';

import AIPlayer from '../../app/scripts/models/ai-player.js';
import Game from '../../app/scripts/models/game.js';

describe('AI player', function () {

  it('should initialize', function () {
    const aiPlayer = new AIPlayer({
      name: 'HAL',
      color: 'red'
    });
    expect(aiPlayer).to.have.property('name', 'HAL');
    expect(aiPlayer).to.have.property('color', 'red');
    expect(aiPlayer).to.have.property('score', 0);
    expect(aiPlayer).to.have.property('type', 'ai');
  });

  it('should wait when instructed', function () {
    const aiPlayer = new AIPlayer({
      name: 'HAL',
      color: 'red'
    });
    const clock = sinon.useFakeTimers();
    const callback = sinon.spy();
    aiPlayer.wait(callback);
    expect(callback).not.to.have.been.calledOnce;
    clock.tick(500);
    expect(callback).to.have.been.calledOnce;
    clock.restore();
  });

  it('should wrap around if right side of grid is full', function () {
    const game = new Game();
    game.setPlayers({ gameType: '1P' });
    utils.placeChips({
      game,
      startingPlayer: game.players[1],
      columns: [3, 4, 3, 3, 3, 4, 5, 1, 3, 4, 4, 1, 1, 1, 1, 4, 3, 5, 5, 0, 4, 5, 5, 1, 5, 2, 6, 6, 6, 6, 6, 6]
    });
    return game.players[1].getNextMove({ game }).then((nextMove) => {
      expect(nextMove.column).to.be.oneOf([0, 2]);
    });
  });

});
