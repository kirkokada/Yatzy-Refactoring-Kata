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

  static uniqDice(dice) {
    return (
      dice.filter((elem, index, self) => {
        return index === self.indexOf(elem);
      }).length
    )
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

  static yatzy() {
    var dice = Array.prototype.slice.call(arguments);

    if (this.uniqDice(dice) > 1) {
      return 0;
    } else {
      return 50;
    }
  }

  static fullHouse() {
    var dice = Array.prototype.slice.call(arguments);

    if (this.uniqDice(dice) == 2) {
      return 18;
    } else {
      return 0;
    }
  }

  static straight(dice, expected, score) {
    if (this.arraysAreEqual(dice.sort(), expected)) {
      return score;
    } else {
      return 0;
    }
  }

  static smallStraight() {
    var dice = Array.prototype.slice.call(arguments);
    var expected = [1, 2, 3, 4, 5];
    return this.straight(dice, expected, 15);
  }

  static largeStraight() {
    var dice = Array.prototype.slice.call(arguments);
    var expected = [2, 3, 4, 5, 6];
    return this.straight(dice, expected, 20);
  }

  static arraysAreEqual(a, b) {
    return (
      a.every((elem, index) => {
        return elem == b[index]
      })
    )
  }

  fours() { return this.constructor.sumFaces(this.dice, 4) }
  fives() { return this.constructor.sumFaces(this.dice, 5) }
  sixes() { return this.constructor.sumFaces(this.dice, 6) }

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

module.exports = Yatzy;
