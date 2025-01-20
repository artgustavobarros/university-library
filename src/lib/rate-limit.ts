import { Ratelimit } from "@upstash/ratelimit";
import redis from "../../database/redis";

const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default rateLimit;
