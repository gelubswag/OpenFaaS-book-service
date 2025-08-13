curl -X POST http://127.0.0.1:8000/function/calculator \
  -d "operator=*" \
  -d "num1=5" \
  -d "num2=3"
echo