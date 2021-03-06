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

  static uniqFaces(dice) {
    return (
      dice.filter((elem, index, self) => {
        return index === self.indexOf(elem);
      })
    )
  }

  static faceCounts(dice) {
    var counts = {};
    var count = 0;
    this.uniqFaces(dice).forEach((e1) => {
      count = 0
      dice.forEach((e2) => {
        if (e1 === e2) {
          count++
        }
      });

      if(counts[count] === undefined) {
        counts[count] = [e1];
      } else {
        counts[count].push(e1);
      }
    });

    return counts
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

    if (this.uniqFaces(dice).length > 1) {
      return 0;
    } else {
      return 50;
    }
  }

  static fullHouse() {
    var dice = Array.prototype.slice.call(arguments);
    var counts = Object.keys(this.faceCounts(dice)).sort();

    if (this.arraysAreEqual(counts, ['2', '3'])) {
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

  static score_pair() {
    var dice = Array.prototype.slice.call(arguments);
    return this.ofAKind(2, dice)
  }

  static two_pair() {
    var dice = Array.prototype.slice.call(arguments);
    return this.ofAKind(2, dice, 2)
  }

  static three_of_a_kind() {
    var dice = Array.prototype.slice.call(arguments);
    return this.ofAKind(3, dice)
  }

  static four_of_a_kind() {
    var dice = Array.prototype.slice.call(arguments);
    return this.ofAKind(4, dice)
  }

  static ofAKind(numKind, dice, numSets=1) {
    var counts = this.faceCounts(dice);
    var matches = [];

    for (var i = numKind; i < 6; i++) {
      if (counts[i] === undefined) { continue }
      matches = matches.concat(counts[i]);
    }

    return (
      matches
        .sort()
        .reverse()
        .slice(0, numSets)
        .map((n) => n * numKind)
        .reduce((sum, n) => sum + n)
    )
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

module.exports = Yatzy;
