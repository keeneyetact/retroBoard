TARGET_ARCHS?=linux/amd64,linux/arm64,linux/arm/v7
BUILDX_VERSION?=v0.4.1
PACKAGE_VERSION?=local

# This is used by Travis to install Docker & Buildx

install:
	curl -fsSL https://get.docker.com | sh
	echo '{"experimental":"enabled"}' | sudo tee /etc/docker/daemon.json
	mkdir -p ~/.docker
	echo '{"experimental":"enabled"}' | sudo tee ~/.docker/config.json
	sudo service docker start
	docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
	docker buildx create --name xbuilder --use
	docker buildx inspect --bootstrap

build:
	docker buildx build --cache-from=antoinejaussoin/retro-board-maintenance:${PACKAGE_VERSION} --pull --platform ${TARGET_ARCHS} -f ./retro-board-maintenance/Dockerfile -t antoinejaussoin/retro-board-maintenance:${PACKAGE_VERSION} ./retro-board-maintenance
	docker buildx build --cache-from=antoinejaussoin/retro-board-backend:${PACKAGE_VERSION} --pull --platform ${TARGET_ARCHS} -f ./retro-board-server/Dockerfile -t antoinejaussoin/retro-board-backend:${PACKAGE_VERSION} .
	docker buildx build --cache-from=antoinejaussoin/retro-board-frontend:${PACKAGE_VERSION} --pull --platform ${TARGET_ARCHS} -f ./retro-board-app/Dockerfile -t antoinejaussoin/retro-board-frontend:${PACKAGE_VERSION} .