curl -X POST http://127.0.0.1:8000/function/calculator \
  -H "Content-Type: application/json" \
  -d '{"operator": "*", "num1": 5, "num2": 3}'
echo