const swaggerSetup = {
    "openapi": "3.0.0",
    "info": {
        "title": "Menino_do_TI API",
        "version": "1.0.0",
        "description": "A simple API for a help desk application.",
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "contact": {
            "name": "Marcones Oliveira",
            "url": "https://www.linkedin.com/in/marcones-oliveira-a088a1133/"
        }
    },
    "servers": [
        {
            "url": "http://localhost:3000",
            "description": "Dev Server"
        },
        {
            "url": "https://menino-do-ti.herokuapp.com/",
            "description": "Production Server"
        }
    ]    
};

export default swaggerSetup;
