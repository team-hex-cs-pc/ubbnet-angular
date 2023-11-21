import { HttpClient } from '@angular/common/http';

export abstract class CrudService<T> {
  constructor(protected http: HttpClient, protected resource: string) {}
}
