import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Course } from './course';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const HttpOptions = {
  headers: new HttpHeaders({'content-type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:3000';
  private coursesUrl = this.baseUrl + '/api/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl).pipe(
      tap(_ => console.log('fetched courses')),
      catchError(this.handleError('getCourses', []))
    );
  }
  getCourse(id: number): Observable<Course> {
    const url = `${this.coursesUrl}/${id}`;
    return this.http.get<Course>(url).pipe(
      tap(_ => console.log(`fetched course id=${id}`)),
      catchError(this.handleError<Course>(`getCourse id=${id}`))
    );
  }

  updateCourse(course: Course): Observable<any>{
    const url = `${this.coursesUrl}/${course.id}`;
    const body = `{ "name": "${course.name}"}`;
    return this.http.put(url,body,HttpOptions).pipe(
      tap(_ => console.log(`updated course id=${course.id}`)),
      catchError(this.handleError<any>('updateCourse'))
    );
  }

  addCourse(courseName: string): Observable<any>{
    const body = `{ "name": "${courseName}"}`;
    return this.http.post(this.coursesUrl,body,HttpOptions).pipe(
      tap((newCourse: Course) => console.log(`added course w/ id=${newCourse.id}`)),
      catchError(this.handleError<Course>('addCourse'))
    );
  }

  deleteCourse(id: number): Observable<any>{
    const url = `${this.coursesUrl}/${id}`;
    return this.http.delete(url, HttpOptions).pipe(
      tap(_ => console.log(`deleted console id=${id}`)),
      catchError(this.handleError<Console>('deleteConsole'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error : any) => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
