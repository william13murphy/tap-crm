export PATH:= node_modules/.bin:$(PATH)

PROJECT_NAME = TAP
DIST_TIME = $(shell date +'%Y%m%d_%H%M')

dist:
	npm run build
	zip -r ../Releases_frontend/$(PROJECT_NAME)_$(DIST_TIME).zip built/
