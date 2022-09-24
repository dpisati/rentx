"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayjsDateProvider = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
class DayjsDateProvider {
    compareInHours(start_date, end_date) {
        const endDateUTC = this.convertToUTC(end_date);
        const startDateUTC = this.convertToUTC(start_date);
        return (0, dayjs_1.default)(endDateUTC).diff(startDateUTC, "hours");
    }
    convertToUTC(date) {
        return (0, dayjs_1.default)(date).utc().local().format();
    }
    dateNow() {
        return (0, dayjs_1.default)().toDate();
    }
    compareInDays(start_date, end_date) {
        const endDateUTC = this.convertToUTC(end_date);
        const startDateUTC = this.convertToUTC(start_date);
        return (0, dayjs_1.default)(endDateUTC).diff(startDateUTC, "days");
    }
    addDays(days) {
        return (0, dayjs_1.default)().add(days, "days").toDate();
    }
    addHours(hours) {
        return (0, dayjs_1.default)().add(hours, "hour").toDate();
    }
    compareIfBefore(start_date, end_date) {
        return (0, dayjs_1.default)(start_date).isBefore(end_date);
    }
}
exports.DayjsDateProvider = DayjsDateProvider;
