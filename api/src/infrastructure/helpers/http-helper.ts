import { HttpResponseInit } from "@azure/functions";

export function badRequest(message: string): HttpResponseInit {
  return {
    status: 400,
    jsonBody: {
      error: message
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };
}

export function notFound(message: string): HttpResponseInit {
  return {
    status: 404,
    jsonBody: {
      error: message
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };
}

export function serviceUnavailable(message: string): HttpResponseInit {
  return {
    status: 503,
    jsonBody: {
      error: message
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };
}

export function internalServerError(message: string): HttpResponseInit {
  return {
    status: 500,
    jsonBody: {
      error: message
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };
}

export function ok(body?: object): HttpResponseInit {
  return body
    ? {
      status: 200,
      jsonBody: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    : {
      status: 204,
      headers: {
        'Content-Type': 'application/json'
      }
    };
}

export function created(body: object): HttpResponseInit {
  return {
    status: 201,
    jsonBody: body,
    headers: {
      'Content-Type': 'application/json'
    }
  };
}

