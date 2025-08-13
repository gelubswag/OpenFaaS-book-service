PASSWORD=$(kubectl get secret -n openfaas basic-auth -o jsonpath="{.data.basic-auth-password}" | base64 --decode)

echo "faas-cli password: $PASSWORD"
echo "press ENTER to log in automatically"
read
# Настройка доступа
kubectl port-forward svc/gateway -n openfaas 8000:8080 &
echo $(kubectl get secret -n openfaas basic-auth -o jsonpath="{.data.basic-auth-password}" | base64 --decode) | faas-cli login --username admin --gateway http://127.0.0.1:8000 --password-stdin

faas-cli new --lang node20 calculator