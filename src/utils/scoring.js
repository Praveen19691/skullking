/**
 * Calculate Skull King base points for a round.
 * @param {number} bid - Number of tricks bid by the player.
 * @param {number} tricksWon - Number of tricks actually won.
 * @param {number} round - The round number (number of cards dealt).
 * @returns {number} Score for the player.
 */
export function calculateBaseScore(bid, tricksWon, round) {
  bid = Number(bid);
  tricksWon = Number(tricksWon);
  round = Number(round);

  if (bid === 0) {
    return tricksWon === 0 ? round * 10 : round * -10;
  } else {
    return bid === tricksWon ? bid * 20 : Math.abs(bid - tricksWon) * -10;
  }
}

/**
 * Calculate dense ranking for players based on scores.
 * @param {number[]} scores - Array of player scores.
 * @returns {number[]} Array of ranks for each player.
 */
export function getDenseRanks(scores) {
  const sorted = scores
    .map((score, idx) => ({ idx, score }))
    .sort((a, b) => b.score - a.score);

  const ranks = Array(scores.length);
  let rank = 1;

  sorted.forEach((player, i) => {
    if (i > 0 && player.score === sorted[i - 1].score) {
      ranks[player.idx] = ranks[sorted[i - 1].idx];
    } else {
      ranks[player.idx] = rank;
    }
    rank++;
  });

  return ranks;
}

/**
 * Validate if input is a valid number.
 * @param {string} value - Input value to validate.
 * @returns {boolean} True if valid number, false otherwise.
 */
export function isValidNumber(value) {
  if (value === "") return true;
  return /^\d+$/.test(value);
}
