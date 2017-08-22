import { Injectable }   from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoggerService{

    constructor(private http:Http) {
    }

    log(level: string, content: string) {
        let body = {level: level, text: content};
        return this.http.post('./api/log', body)
            .map((response: Response) => {
                let x = response.json();
                return x;
        });
    }
}