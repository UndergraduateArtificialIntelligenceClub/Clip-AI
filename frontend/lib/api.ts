// Every page gets data through `api`. Set NEXT_PUBLIC_API_MODE=real to use the backend.

import { mockApi } from "./mockApi";
import { realApi } from "./realApi";

export const api = process.env.NEXT_PUBLIC_API_MODE === "real" ? realApi : mockApi;
