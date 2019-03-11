import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from "../course.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[];
  constructor(private courseService : CourseService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void{
    this.courseService.getCourses().subscribe( courses => this.courses = courses );
  }
  addCourse(courseName: string): void{
    courseName = courseName.trim();
    if (!courseName) { return; }
    this.courseService.addCourse(courseName).subscribe(
      course => {
        this.courses.push(course);
      }
    );
  }
  deleteCourse(id: number): void{
    this.courses = this.courses.filter(c => c.id !== id);
    this.courseService.deleteCourse(id).subscribe();
  }
}
