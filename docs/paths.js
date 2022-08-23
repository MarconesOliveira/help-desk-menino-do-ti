const swaggerPaths = {
    "/login": {
        "post": {
            "tags": ["User"],
            "summary": "Log in the app.",
            "description": "Log in the app with employeeID and password, receiveing a JWT to be used in protected operations.",
            "requestBody": {
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "employeeID": {
                                    "type": "string",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "password": {
                                    "type": "string",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "User successfully created on database.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request failed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/all_users": {
        "get": {
            "tags": ["User"],
            "summary": "Get all users on database",
            "description": "Return an array with all users on database. No token required.",
            "responses": {
                "200": {
                    "description": "An array of users.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/User"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } 
        }
    },
    "/all_departments": {
        "get": {
            "tags": ["Department"],
            "summary": "Get all departments on database",
            "description": "Return an array with all departments on database. No token required.",
            "responses": {
                "200": {
                    "description": "An array of departments.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/Department"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/all_tickets": {
        "get": {
            "tags": ["Ticket"],
            "summary": "Get all tickets on database",
            "description": "Return an array with all tickets on database. No token required.",
            "responses": {
                "200": {
                    "description": "An array of tickets.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/Ticket"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/user": {
        "post": {
            "tags": ["User"],
            "summary": "Create new User",
            "description": "Create a new user on database. No token required. 'employeeID' and 'email' are unique.",
            "requestBody": {
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "User successfully created on database.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request failed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "put": {
            "security": [{ "bearerAuth": [ ] }],
            "tags": ["User"],
            "summary": "Update the current User",
            "description": "Update the current User using it's own JWT info. Token required.",
            "requestBody": {
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "User updated in database.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request failed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "delete": {
            "security": [{ "bearerAuth": [ ] }],
            "tags": ["User"],
            "summary": "Delete the current User",
            "description": "Delete the current User using it's own JWT info. Token required.",
            "responses": {
                "200": {
                    "description": "User deleted from database.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request failed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/department": {
        "post": {
            "tags": ["Department"],
            "summary": "Create new Department",
            "description": "Create a new Department on database. No token required. 'code' is unique.",
            "requestBody": {
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Department"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Department successfully created on database.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request failed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/ticket": {
        "post": {
            "security": [{ "bearerAuth": [ ] }],
            "tags": ["Ticket"],
            "summary": "Create new Ticket",
            "description": "Create a new Ticket on database. No token required. 'code' is unique.",
            "requestBody": {
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Ticket"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Ticket successfully created on database.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request failed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/user/{employeeID}": {
        "get": {
            "tags": ["User"],
            "summary": "Get a specific User with his employeeID",
            "description": "Get an user with his employeeID, the employeeID must be in the url request. No token needed.",
            "parameters": [{
                "in": "path",
                "name": "employeeID",
                "schema": {
                    "type": "string"
                },
                "required": "true",
                "description": "The employeeID"
            }],
            "responses": {
                "200": {
                    "description": "Search completed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request failed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/department/{code}": {
        "get": {
            "tags": ["Department"],
            "summary": "Get a specific Department by it's code",
            "description": "Get a Department by it's specific code, the code must be in the url request. No token needed.",
            "parameters": [{
                "in": "path",
                "name": "code",
                "schema": {
                    "type": "string"
                },
                "required": "true",
                "description": "The Department code"
            }],
            "responses": {
                "200": {
                    "description": "Search completed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "$ref": "#/components/schemas/Department"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request failed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "put": {
            "security": [{ "bearerAuth": [ ] }],
            "tags": ["Department"],
            "summary": "Update a Department",
            "description": "Update a Department using it's code, the code must be in the url. Token required.",
            "parameters": [{
                "in": "path",
                "name": "code",
                "schema": {
                    "type": "string"
                },
                "required": "true",
                "description": "The Department code"
            }],
            "requestBody": {
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Department"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Department updated in database.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request failed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "delete": {
            "security": [{ "bearerAuth": [ ] }],
            "tags": ["Department"],
            "summary": "Delete a Department",
            "description": "Delete a Department by it's code, the code must be in the url. Token required.",
            "parameters": [{
                "in": "path",
                "name": "code",
                "schema": {
                    "type": "string"
                },
                "required": "true",
                "description": "The Department code"
            }],
            "responses": {
                "200": {
                    "description": "Department deleted from database.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request failed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/ticket/{code}": {
        "get": {
            "tags": ["Ticket"],
            "summary": "Get a specific Ticket by it's code",
            "description": "Get a Ticket by it's specific code, the code must be in the url request. No token needed.",
            "parameters": [{
                "in": "path",
                "name": "code",
                "schema": {
                    "type": "string"
                },
                "required": "true",
                "description": "The Ticket code"
            }],
            "responses": {
                "200": {
                    "description": "Search completed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "$ref": "#/components/schemas/Ticket"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request failed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "put": {
            "security": [{ "bearerAuth": [ ] }],
            "tags": ["Ticket"],
            "summary": "Update a Ticket",
            "description": "Update a Ticket using it's code, the code must be in the url. Token required.",
            "parameters": [{
                "in": "path",
                "name": "code",
                "schema": {
                    "type": "string"
                },
                "required": "true",
                "description": "The Ticket code"
            }],
            "requestBody": {
                "required": "true",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Ticket"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Ticket updated in database.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request failed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "delete": {
            "security": [{ "bearerAuth": [ ] }],
            "tags": ["Ticket"],
            "summary": "Delete a Ticket",
            "description": "Delete a Ticket by it's code, the code must be in the url. Token required.",
            "parameters": [{
                "in": "path",
                "name": "code",
                "schema": {
                    "type": "string"
                },
                "required": "true",
                "description": "The Ticket code"
            }],
            "responses": {
                "200": {
                    "description": "Ticket deleted from database.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request failed.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "msg": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export default swaggerPaths;
