export class Utils {
  static sleep(s: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, s * 1000);
    });
  }

  static inRange(count: number): number[] {
    return Array(count)
      .fill(0)
      .map((_, index) => index + 1);
  }

  static deepCopy<T>(obj: T): T {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    const copy: any = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] == this.deepCopy(obj[key]);
      }
    }
    return copy;
  }

  static shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }
}
