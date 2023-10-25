import { GetCurrentDate } from './utils.get.current-date';

export class GenerateCode {
  private currentDate: GetCurrentDate = new GetCurrentDate();
  private randomCode: number = Math.random();

  public getRandomCode(length: number) {
    return Math.floor(
      Math.pow(10, length - 1) + this.randomCode * 9 * Math.pow(10, length - 1),
    );
  }

  public getCodeUser(length: number) {
    const number = this.getRandomCode(length);
    const year = this.currentDate.getYear();
    const code = `${year}${number}`;

    return code;
  }
}
