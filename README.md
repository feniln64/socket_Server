# Socket server

This is a simple socket server that listens on a port and echos back any data it receives.

## Usage

docker compose up -d --build

## deploy with ansible

ansible-playbook -i inventory.ini playbook.yml