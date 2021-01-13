## Serverless SWAPI + AWS LAMBDA + Open API Service
---
Servicio creado con NodeJs + Serverless + AWS Lambda + AWS DynamoDB + SWAPI + Jest

#### PreparaciÓn

* Configurar un usuario de AWS usando ACCESS_KEY y SECRET_ACCESS_KEY
Puede utilizar el siguiente comando:
```bash
serverless config credentials --provider aws --key <ACCES_KEY> --secret <SECRET_ACCESS_KEY>
```

* Instalar dependencias
Ejecutar el siguiente comando:
```bash
npm install
```

#### Ejecución

* Despliegue en AWS
Ejecutar el siguiente comando:
```bash
serverless deploy
```

#### Test

Ejecutar el siguiente comando:
```bash
npm run test
```

#### Documentación API

Generar documentación con el siguiente comando:
```bash
serverless openapi generate
```
