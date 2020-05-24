## Deno - development run
- drun : if you have drun.json file
- drun watch --entryPoint=./index.ts --cwd=./ --runtimeOptions=--allow-net 

## Run application normally
- deno run --allow-net --allow-read --allow-write --allow-plugin --unstable server.ts

## Deploy to Cloud Run
gcloud builds submit --tag gcr.io/[PROJECT-ID]/deno-oak-cloudrun  
gcloud run deploy --allow-unauthenticated --async --image gcr.io/[PROJECT-ID]/deno-oak-cloudrun --platform managed  

1-ใส่ service name  
2-เลือก region => asia-northeast
