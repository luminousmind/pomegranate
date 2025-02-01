.PHONY: start-client start-server start

start-client:
	cd client && npm run dev

start-server:
	cd server && npm run dev

start:
	$(MAKE) start-client &
	$(MAKE) start-server