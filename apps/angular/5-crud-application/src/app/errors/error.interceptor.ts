import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            let errorMessage = '';
            if (err.error instanceof ErrorEvent) {
                errorMessage = `An error occured: ${err.error.message}`;
            } else {
                errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
            }
            return throwError(() => errorMessage);

        })
    )
};