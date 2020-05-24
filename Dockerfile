FROM hayd/alpine-deno:1.0.1

EXPOSE 8080

WORKDIR /app
# ! IMPORTANT for now : because Deno Mongo want to write plugin folder
# For test environment. I decide to use 777 permission
RUN chmod 777 .

# Swith to deno user to use deno cli
USER deno

# Do like npm install
# Cache the remote library to this layer
COPY dependencies.ts .
RUN deno cache --unstable dependencies.ts

COPY . .
RUN deno cache --unstable server.ts

CMD ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-plugin", "--unstable", "server.ts"]