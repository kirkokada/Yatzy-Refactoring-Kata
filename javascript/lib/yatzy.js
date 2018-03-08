class Yatzy {
  constructor(d1, d2, d3, d4, d5) {
    this.dice = Array.prototype.slice.call(arguments);
  }

  static sumFaces(dice, faceNumber) {
    var sum = 0;
    for (var i = 0; i < 5; i++) {
      if (dice[i] == faceNumber) {
        sum += faceNumber;
      }
    }
    return sum;
  }

  static chance(d1, d2, d3, d4, d5) {
    var dice = Array.prototype.slice.call(arguments);
    return dice.reduce((sum, n) => sum + n, 0)
  }

  static ones(d1, d2, d3, d4, d5) {
    var dice = Array.prototype.slice.call(arguments);
    return this.sumFaces(dice, 1);
  }

  static twos(d1, d2, d3, d4, d5) {
    var dice = Array.prototype.slice.call(arguments);
    return this.sumFaces(dice, 2);
  }

  static threes(d1, d2, d3, d4, d5) {
    var dice = Array.prototype.slice.call(arguments);
    return this.sumFaces(dice, 3);
  }

  fours() { return this.constructor.sumFaces(this.dice, 4) }
  fives() { return this.constructor.sumFaces(this.dice, 5) }
  sixes() { return this.constructor.sumFaces(this.dice, 6) }
}

Yatzy.yatzy = function() {
    var counts = [0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i != arguments.length; ++i) {
    var die = arguments[i];
    counts[die-1]++; }
    for (i = 0; i != 6; i++)
        if (counts[i] == 5)
            return 50;
    return 0;
}

Yatzy.score_pair = function(d1, d2, d3, d4, d5)
{
    var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    counts[d1-1]++;
    counts[d2-1]++;
    counts[d3-1]++;
    counts[d4-1]++;
    counts[d5-1]++;
    var at;
    for (at = 0; at != 6; at++)
        if (counts[6-at-1] >= 2)
            return (6-at)*2;
    return 0;
}

Yatzy.two_pair = function(d1, d2, d3, d4, d5)
{
    var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    counts[d1-1]++;
    counts[d2-1]++
    counts[d3-1]++
    counts[d4-1]++;
    counts[d5-1]++;
    var n = 0;
    var score = 0;
    for (i = 0; i < 6; i += 1)
        if (counts[6-i-1] >= 2) {
            n++;
            score += (6-i);
        }
    if (n == 2)
        return score * 2;
    else
        return 0;
}

Yatzy.four_of_a_kind = function(_1, _2, d3, d4, d5)
{
    var tallies;
    tallies = [0, 0, 0, 0, 0, 0, 0, 0]
    tallies[_1-1]++;
    tallies[_2-1]++;
    tallies[d3-1]++;
    tallies[d4-1]++;
    tallies[d5-1]++;
    for (i = 0; i < 6; i++)
        if (tallies[i] >= 4)
            return (i+1) * 4;
    return 0;
}

Yatzy.three_of_a_kind = function(d1, d2, d3, d4, d5)
{
    var t;
    t = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    t[d1-1]++;
    t[d2-1]++;
    t[d3-1]++;
    t[d4-1]++;
    t[d5-1]++;
    for (i = 0; i < 6; i++)
        if (t[i] >= 3)
            return (i+1) * 3;
    return 0;
}

Yatzy.smallStraight = function(d1, d2, d3, d4, d5)
{
    var tallies;
    tallies = [0, 0, 0, 0, 0, 0, 0]
    tallies[d1-1] += 1;
    tallies[d2-1] += 1;
    tallies[d3-1] += 1;
    tallies[d4-1] += 1;
    tallies[d5-1] += 1;
    if (tallies[0] == 1 &&
        tallies[1] == 1 &&
        tallies[2] == 1 &&
        tallies[3] == 1 &&
        tallies[4] == 1)
        return 15;
    return 0;
}

Yatzy.largeStraight = function(d1, d2, d3, d4, d5)
{
    var tallies;
    tallies = [0, 0, 0, 0,0,0,0,0];
    tallies[d1-1] += 1;
    tallies[d2-1] += 1;
    tallies[d3-1] += 1;
    tallies[d4-1] += 1;
    tallies[d5-1] += 1;
    if (tallies[1] == 1 &&
        tallies[2] == 1 &&
        tallies[3] == 1 &&
        tallies[4] == 1
        && tallies[5] == 1)
        return 20;
    return 0;
}

Yatzy.fullHouse = function(d1, d2, d3, d4, d5)
{
    var tallies;
    var  _2 = false;
    var i;
    var _2_at = 0;
    var _3 = false;
    var _3_at = 0;




    tallies = [0, 0, 0, 0, 0, 0, 0, 0];
    tallies[d1-1] += 1;
    tallies[d2-1] += 1;
    tallies[d3-1] += 1;
    tallies[d4-1] += 1;
    tallies[d5-1] += 1;

    for (i = 0; i != 6; i += 1)
        if (tallies[i] == 2) {
            _2 = true;
            _2_at = i+1;
        }

    for (i = 0; i != 6; i += 1)
        if (tallies[i] == 3) {
            _3 = true;
            _3_at = i+1;
        }

    if (_2 && _3)
        return _2_at * 2 + _3_at * 3;
    else
        return 0;
}

module.exports = Yatzy;


