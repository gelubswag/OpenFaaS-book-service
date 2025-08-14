# 🖩 Serverless Calculator — OpenSource Edition

Пример развёртывания serverless-функции с использованием [OpenFaaS](https://www.openfaas.com/) **без облачных провайдеров**.  
Проект демонстрирует принцип **Function as a Service (FaaS)** на примере математического калькулятора.

---

## 📦 Состав виртуальной машины (OVA)

В предустановленной VM уже есть:
- Kubernetes + OpenFaaS
- Инструменты: `faas-cli`, `arkade`, `kubectl`
- Общая папка c репозиторием
- Преднастроенный кластер OpenFaaS
- Вход в VM login: `root`, password:`123456`

**Учётные данные OpenFaaS:**
- Логин: `admin`
- Пароль: `V1dTiP47LIOf`

---

## 🚀 Первый запуск (с VM)

### 1. Авторизация в DockerHub
```bash
docker login --username <ваш_логин> --password <ваш_пароль>
```

### 2. Переход в директорию репозитория с функциями
```bash
cd /media/sf_OpenFaaS-calculator-service/functions
```

### 3. Получение пароля OpenFaaS и авторизация
```bash
PASSWORD=$(kubectl get secret -n openfaas basic-auth   -o jsonpath="{.data.basic-auth-password}" | base64 --decode)
echo "Ваш пароль OpenFaaS: $PASSWORD"
echo "$PASSWORD" | faas-cli login --username admin --password-stdin
```

### 4. Запуск туннеля до кластера
```bash
kubectl port-forward svc/gateway -n openfaas 8000:8080 &
```
---

## ⚙ Автоматизация входа
Скрипт `login.sh` делает всё сразу:
- Получает пароль
- Запускает port-forward
- Логинится в `faas-cli`

```bash
chmod +x login.sh
./login.sh
```

---

## 🛠 Быстрый старт (после настройки VM)

1. **Укажите свой DockerHub-репозиторий** в `stack.yml`:
```yaml
image: docker.io/<ваш_ник>/calculator:latest
```

2. **Сборка и деплой**:
```bash
faas-cli build
faas-cli push
faas-cli deploy
```

3. **Тестирование**:
```bash
./get_test.sh          # GET-запрос
./json_test.sh         # POST JSON
./form-data_test.sh    # POST form-data
./zero-div_test.sh     # Деление на ноль
```

**Пример ответа:**
```json
{
  "status": 200,
  "result": 15
}
```

---

## 🔧 Установка с нуля (без виртуалки)
1. Клонируйте репозиторий и перейдите в директорию с функциями
```bash
git clone https://github.com/gelubswag/OpenFaaS-calculator-service.git
cd OpenFaaS-book-service/functions
```

2. Установите зависимости:
```bash
chmod +x install_dependencies.sh
./install_dependencies.sh
```

3. Разверните OpenFaaS:
```bash
arkade install openfaas
faas-cli template store pull node22
```

4. Настройте авторизацию и туннель:
```bash
PASSWORD=$(kubectl get secret -n openfaas basic-auth   -o jsonpath="{.data.basic-auth-password}" | base64 --decode)

kubectl port-forward svc/gateway -n openfaas 8000:8080 &
echo $PASSWORD | faas-cli login --username admin --password-stdin
```

---

## 📊 OpenFaaS vs AWS Lambda

| Параметр        | OpenFaaS (Self-Hosted) | AWS Lambda (Cloud) |
|-----------------|------------------------|--------------------|
| Цена            | Бесплатно              | Плата за вызовы    |
| Развёртывание   | На своих серверах      | В облаке           |
| Масштабирование | Автоматическое         | Автоматическое     |
| Cold start      | < 100ms                | До 10 сек          |

---

## 💡 Когда использовать?
✅ Обработка форм  
✅ Фоновые задачи (email, PDF)  
✅ API с переменной нагрузкой  

❌ Длительные процессы (>15 мин)  
❌ WebSocket-соединения  

---

## 📜 Лицензия
MIT License
