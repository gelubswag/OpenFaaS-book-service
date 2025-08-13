'use strict'

const querystring = require('querystring');

module.exports = async (event, context) => {
  let operator, num1, num2;
  
  if (event.method === 'POST') {
    try {
      // Определяем тип контента
      const contentType = event.headers['content-type'] || '';
      
      if (contentType.includes('application/json')) {
        // Обработка JSON
        const body = typeof event.body === 'string' 
          ? JSON.parse(event.body) 
          : event.body;
        
        operator = body.operator;
        num1 = parseFloat(body.num1);
        num2 = parseFloat(body.num2);
      } else {
        // Обработка form-data и x-www-form-urlencoded
        const body = typeof event.body === 'string' 
          ? querystring.parse(event.body) 
          : event.body;
        
        operator = body.operator;
        num1 = parseFloat(body.num1);
        num2 = parseFloat(body.num2);
      }
    } catch (e) {
      return context
        .status(400)
        .fail('Invalid request body: ' + e.message);
    }
  } else {
    // GET запрос
    operator = event.query.operator;
    num1 = parseFloat(event.query.num1);
    num2 = parseFloat(event.query.num2);
  }

  // Проверяем обязательные параметры
  if (!operator || isNaN(num1) || isNaN(num2)) {
    return context
      .status(400)
      .fail('Required parameters: operator, num1, num2. ' + 
            `Received: operator=${operator}, num1=${num1}, num2=${num2}`)
  }

  // Проверяем валидность оператора
  const validOperators = ['+', '-', '*', '/']
  if (!validOperators.includes(operator)) {
    return context
      .status(400)
      .fail('Invalid operator. Use: +, -, *, /')
  }

  // Выполняем операцию
  let result
  switch (operator) {
    case '+':
      result = num1 + num2
      break
    case '-':
      result = num1 - num2
      break
    case '*':
      result = num1 * num2
      break
    case '/':
      if (num2 === 0) {
        return context
          .status(400)
          .fail('Division by zero')
      }
      result = num1 / num2
      break
  }

  // Возвращаем результат
  return context
    .status(200)
    .succeed({
      status: 200,
      result: result
    })
}