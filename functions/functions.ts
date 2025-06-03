export class Functions {
  checkEvenOdd(number): string {
    if (number % 2 === 0) {
      return "парне";
    } else {
      return "непарне";
    }
  }

  getGreeting(hour): string {
    const MORNING_GREETING = "Доброго ранку!";
    const DAY_GREETING = "Доброго дня!";
    const EVENING_GREETING = "Доброго вечора!";

    if (hour < 12) {
      return MORNING_GREETING;
    } else if (hour <= 18) {
      return DAY_GREETING;
    } else {
      return EVENING_GREETING;
    }
  }

  checkMark(number): string {
    if (number >= 50) {
      return "test pass";
    } else {
      return "test did not pass";
    }
  }

  vote(age): string {
    if (age >= 18) {
      return "You can vote";
    } else {
      return "You can’t vote";
    }
  }

  compareNumbers(a: number, b: number): string {
    if (a > b) {
      return "the first number is bigger";
    } else if (a < b) {
      return "the second number is bigger";
    } else {
      return "the numbers are equal";
    }
  }
}
