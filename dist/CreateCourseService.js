"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCourseService {
    execute({ name, duration = 8, educator }) {
        console.log(`name: `, name);
        console.log(`educator: `, educator);
        console.log(`duration: `, duration);
    }
}
exports.default = new CreateCourseService();
