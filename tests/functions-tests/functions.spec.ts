import { test, expect } from "@playwright/test";
import { Functions } from "../../functions/functions";

const functions = new Functions();

test.describe("is number even", () => {
  test("check that the number is even", () => {
    expect(functions.checkEvenOdd(2)).toBe("парне");
  });

  test("check that the number is odd", () => {
    expect(functions.checkEvenOdd(7)).toBe("непарне");
  });
});

test.describe("greetings", () => {
  test("morning", () => {
    expect(functions.getGreeting(9)).toBe("Доброго ранку!");
  });

  test("day", () => {
    expect(functions.getGreeting(15)).toBe("Доброго дня!");
  });

  test("evening", () => {
    expect(functions.getGreeting(20)).toBe("Доброго вечора!");
  });
});

test.describe("exam mark", () => {
  test("mark exams pass", () => {
    expect(functions.checkMark(51)).toBe("test pass");
  });

  test("mark exams not pass", () => {
    expect(functions.checkMark(49)).toBe("test did not pass");
  });
});

test.describe("can person vote", () => {
  test("can vote", () => {
    expect(functions.vote(19)).toBe("You can vote");
  });

  test("can’t vote", () => {
    expect(functions.vote(17)).toBe("You can’t vote");
  });
});

test.describe("compare numbers", () => {
  test("the first number is bigger", () => {
    expect(functions.compareNumbers(10, 8)).toBe("the first number is bigger");
  });

  test("the second number is bigger", () => {
    expect(functions.compareNumbers(5, 9)).toBe("the second number is bigger");
  });

  test("the numbers are equal", () => {
    expect(functions.compareNumbers(7, 7)).toBe("the numbers are equal");
  });
});
