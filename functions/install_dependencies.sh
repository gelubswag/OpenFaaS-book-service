# Установка инструментов
curl -SLsf https://cli.openfaas.com | sudo sh
curl -SLsf https://get.arkade.dev | sudo sh

# Развёртывание OpenFaaS в Kubernetes
arkade install openfaas

# Шаблон для Node.js
faas-cli template store pull node22
