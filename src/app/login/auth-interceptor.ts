import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = localStorage.getItem('appthletics_token');
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });
        return next.handle(authRequest);
    }
}
