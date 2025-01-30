## Running the application

Init the redis server locally:

```
redis-server
```

If bind already in use:

```
$ lsof -i tcp:6379
$ kill -9 PID
```

Start the server:

```
cd server/
npm run dev
```
