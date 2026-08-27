import { handleFitRequest } from '../server/role-fit/handler.js';

export async function POST(request: Request): Promise<Response> {
  return handleFitRequest(request);
}
