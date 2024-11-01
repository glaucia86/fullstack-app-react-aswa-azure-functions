import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { timeStamp } from "console";

export async function employees(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    return {
        jsonBody: {
            message: "Hello", timeStamp: new Date()
        },
        headers: {
            'Content-Type': 'application/json'
        },
        status: 200
    }
};

app.http('employees', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: employees
});
