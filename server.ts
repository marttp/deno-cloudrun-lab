import { Application } from 'https://deno.land/x/oak/mod.ts';
import router from './router.ts';

// Hard code port for POC
const PORT: number = 8080;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port: ${PORT}`);
await app.listen({ port: PORT });
