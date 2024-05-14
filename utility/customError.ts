export class CustomError extends Error {
  statusCode: any;
  status: string;
  constructor(message: string | undefined, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
  }
}
