import { useForm } from "react-hook-form";
import { ajvResolver } from "@hookform/resolvers/ajv";
import type { JSONSchemaType } from "ajv";

interface LoginFormData {
    email: string;
    password: string;
}

const schema: JSONSchemaType<LoginFormData> = {
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string" }
    },
    required: ["email", "password"],
    additionalProperties: false
};

export const useLoginForm = () => {
    return useForm<LoginFormData>({
        resolver: ajvResolver(schema)
    });
}