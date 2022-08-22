const swaggerSchemas = {
    "User": {
        "type": "object",
        "properties":{
            "employeeID": {
                "type": "string",
                "description" : "The unique ID assigned to an employee from the company."
            },
            "name": {
                "type": "string",
                "description" : "Name of the employee."
            },
            "phone": {
                "type": "string",
                "description" : "Phone number of the employee."
            },
            "email": {
                "type": "string",
                "description" : "Email of the employee."
            },
            "password": {
                "type": "string",
                "description" : "Hashed password of the employee."
            }
        },
        "example": {
            "employeeID": "001",
            "name": "Dio Brando",
            "phone": "4002 8922",
            "email": "dio_brando@gmail.com",
            "password": "$2b$10$G5ra9"
        }
    },
    "Department": {
        "type": "object",
        "properties": {
            "name":{
                "type": "string",
                "description": "Name of the employee."
            },
            "supervisor":{
                "type": "string",
                "description": "Name of the departement supervisor."
            },
            "email":{
                "type": "string",
                "description": "Email of the department."
            },
            "code":{
                "type": "string",
                "description": "Unique code assigned to each department."
            }
        },
        "example": {
            "name": "Jornalismo",
            "supervisor": "Giorno Giovanna",
            "email": "jornalismo@jojo.com",
            "code": "001"
        }
    },
    "Ticket": {
        "type": "object",
        "properties": {
            "description": {
                "type": "string",
                "description": "Description of the problem."
            },
            "department": {
                "type": "string",
                "description": "Department that send the request."
            },
            "requester": {
                "type": "string",
                "description": "Name of the person that opened the request."
            },
            "state": {
                "type": "string",
                "description": "Current state of the request."
            },
            "code": {
                "type": "string",
                "description": "Unique code assigned to each ticket."
            }
        },
        example: {
            "description": "O wifi não está funcionando.",
            "department": "Jornalismo",
            "requester": "Peter Parker",
            "state": "Aberto",
            "code": "001"
        }
    }
};

export default swaggerSchemas;
