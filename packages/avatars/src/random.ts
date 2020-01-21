import * as seedrandom from 'seedrandom/seedrandom';

export default class Random {
  private prng: seedrandom.prng;
  public readonly seed: string;
  public readonly genes: number[];
  private genesIndex = 0;

  constructor(seed: string, genes?: number[]) {
    this.seed = seed;
    // console.log('seed', seed);
    this.genes = genes;
    // console.log('genes', genes);

    this.prng = seedrandom(seed);
  }

  bool(likelihood: number = 50) {
    if (!this.genes) {
      const temp = this.prng() * 100 < likelihood;
      console.log('bool(prng)', temp);
      return temp;
    } else {
      const temp = Boolean(this.genes[this.genesIndex++]);
      console.log('bool(genes)', temp);
      if (!temp) {
        this.genesIndex++;
      }
      return temp;
    }
  }

  integer(min: number, max: number) {
    if (!this.genes) {
      const temp = Math.floor(this.prng() * (max - min + 1) + min);
      console.log('integer(prng)', temp);
      return temp;
    } else {
      const temp = this.genes[this.genesIndex++];
      console.log('integer(genes)', temp);
      return temp;
    }
  }

  pickone<T>(arr: T[]): T {
    return arr[this.integer(0, arr.length - 1)];
  }
}
