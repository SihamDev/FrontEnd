import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

const agentCall: CreateAssistantDTO | any = {
    name: "",
    model: {
        provider: "",
        model: "",
        temperature: 0,
        systemPrompt: "",
        functions: [
            {
                name: "",
                async: true,
                description: "",
                parameters: {
                    type: "object",
                    properties: {
                        location: {
                            type: "string",
                            description: "",
                        },
                        date: {
                            type: "string",
                            description: "",
                        },
                    },
                },
            },
            {
                name: "",
                async: true,
                description: "",
                parameters: {
                    type: "object",
                    properties: {
                        show: {
                            type: "string",
                            description: "",
                        },
                        date: {
                            type: "string",
                            description: "",
                        },
                        location: {
                            type: "string",
                            description: "",
                        },
                        numberOfTickets: {
                            type: "number",
                            description: "",
                        },
                    },
                },
            },
            {
                name: "",
                async: true,
                description: "",
                parameters: {
                    type: "object",
                    properties: {
                        show: {
                            type: "string",
                            description: "",
                        },
                        date: {
                            type: "string",
                            description: "",
                        },
                        location: {
                            type: "string",
                            description: "",
                        },
                        numberOfTickets: {
                            type: "number",
                            description: "",
                        },
                    },
                },
            },
        ],
    },
    voice: {
        provider: "",
        voiceId: "",
    },
    firstMessage: "",
    serverUrl: "",
};

export default agentCall




