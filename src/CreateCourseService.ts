interface Course {
  name: string;
  duration?: number;
  educator: string;
}

class CreateCourseService {
  execute({ name, duration = 8, educator }: Course) {
    console.log(`name: `, name);
    console.log(`educator: `, educator);
    console.log(`duration: `, duration);
  }
}

export default new CreateCourseService();
