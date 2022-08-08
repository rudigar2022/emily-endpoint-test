export class ProcessResponse<T> {
  success: boolean = false;
  errors: Array<string> = [];
  resource: T = null;
}
