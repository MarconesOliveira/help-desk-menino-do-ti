import swaggerSetup from "./setup.js";
import swaggerPaths from "./paths.js";
import swaggerSchemas from "./schemas.js";
import swaggerTags from "./tags.js";

const swaggerConfig = {
    ...swaggerSetup,
    "tags": swaggerTags,
    "paths": {
        ...swaggerPaths
    },
    "components": {
        "schemas": {
            ...swaggerSchemas
        },
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT",
                "description": "Insert your JWT, if you don't have one go to 'login'."
            }
        }
    }
}

export default swaggerConfig;
