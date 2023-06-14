type ApiErrorType = { detail: string };

export default class ApiError {
  error!: ApiErrorType;
  constructor(error: unknown) {
    this.error = error as ApiErrorType;
  }
}
