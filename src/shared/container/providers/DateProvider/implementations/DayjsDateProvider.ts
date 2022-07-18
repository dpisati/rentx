import { IDateProvider } from "../IDateProvider";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const endDateUTC = this.convertToUTC(end_date);
    const startDateUTC = this.convertToUTC(start_date);
    return dayjs(endDateUTC).diff(startDateUTC, "hours");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const endDateUTC = this.convertToUTC(end_date);
    const startDateUTC = this.convertToUTC(start_date);
    return dayjs(endDateUTC).diff(startDateUTC, "days");
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }
}

export { DayjsDateProvider };
