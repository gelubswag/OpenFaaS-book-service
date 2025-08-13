# Serverless (Без серверов) — OpenSource Edition

Пример развёртывания serverless-функции с использованием [OpenFaaS](https://www.openfaas.com/) без облачных провайдеров.  
Проект демонстрирует работу принципа **Function as a Service (FaaS)** на примере математического калькулятора.

---

## 📌 Что такое Serverless
> Serverless — это модель, при которой вы пишете функции и разворачиваете их без заботы об инфраструктуре.  
> Код выполняется только при запросе и не потребляет ресурсы в простое.

В данном примере мы используем **OpenFaaS** — OpenSource-аналог AWS Lambda, который можно запустить у себя.

---

## 🚀 Возможности
- Запуск функций без управления серверами
- Автоматическое масштабирование под нагрузку
- Оплата (в облаках) или использование ресурсов — только во время выполнения
- Поддержка Node.js, Python, Go и других языков

---

## ⚙️ Установка и настройка

### 1. Клонируйте репозиторий
```bash
git clone https://github.com/<ваш_ник>/serverless-opensource-calculator.git
cd serverless-opensource-calculator
```

### 2. Установите зависимости
```bash
chmod +x install_dependencies.sh
./install_dependencies.sh
```
В скрипте производится установка:
- OpenFaaS CLI  
- Arkade  
- Kubernetes зависимости

### 3. Установите OpenFaaS
```bash
arkade install openfaas
```

### 4. Подключите шаблон функции Node.js
```bash
faas-cli template store pull node20
```

---

## 🔑 Авторизация в OpenFaaS Gateway
```bash
chmod +x login.sh
./login.sh
```
Скрипт:
- Получает пароль из Kubernetes Secret
- Выполняет `kubectl port-forward`
- Логинится в OpenFaaS CLI

---

## 🛠 Создание функции
```bash
faas-cli new --lang node20 calculator
```
В `stack.yml` укажите свой DockerHub-репозиторий:
```yaml
image: docker.io/<ваш_ник>/calculator:latest
```

---

## 📦 Сборка и деплой
```bash
faas-cli build
faas-cli push
faas-cli deploy
```

---

## 🧪 Тестирование

### GET-запрос
```bash
curl "http://127.0.0.1:8000/function/calculator?operator=*&num1=5&num2=3"
```

### POST JSON
```bash
curl -X POST http://127.0.0.1:8000/function/calculator   -H "Content-Type: application/json"   -d '{"operator": "*", "num1": 5, "num2": 3}'
```

### POST form-data
```bash
curl -X POST http://127.0.0.1:8000/function/calculator   -d "operator=*"   -d "num1=5"   -d "num2=3"
```

Ожидаемый ответ:
```json
{
  "status": 200,
  "result": 15
}
```

---

## 📜 Логирование
```bash
kubectl get pods -n openfaas-fn
kubectl logs -n openfaas-fn <имя_pod>
```

---

## 🔧 Полезные команды
Удалить все деплои:
```bash
kubectl delete deployments -n openfaas-fn --all
```
Повторно собрать и задеплоить:
```bash
faas-cli up
```

---

## 📊 Сравнение OpenFaaS и AWS Lambda

| Параметр         | OpenFaaS (Self-Hosted) | AWS Lambda (Cloud) |
|------------------|------------------------|--------------------|
| Цена             | Бесплатно              | Плата за вызовы    |
| Развёртывание    | На своих серверах       | В облаке           |
| Масштабирование  | Автоматическое          | Автоматическое     |
| Языки            | Node.js, Python, Go и др. | + Java, C#         |
| Cold start       | Минимальный             | Может быть значительным |

---

## 💡 Когда использовать?
✅ Обработка форм  
✅ Фоновые задачи (email, PDF)  
✅ API с переменной нагрузкой  

❌ Долгие процессы (>15 мин)  
❌ WebSocket-соединения  

---

---

## 📜 Лицензия
MIT License
