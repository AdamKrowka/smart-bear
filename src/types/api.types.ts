export interface SwaggerResponse {
  swagger: string;
  info: SwaggerInfo;
  host: string;
  basePath: string;
  tags: Tag[];
  schemes: string[];
  paths: Record<string, Path>;
  securityDefinitions: Record<string, SecurityDefinition>;
}

export interface SecurityDefinition {
  type: string;
  name?: string;
  in?: string;
  authorizationUrl?: string;
  flow?: string;
  scopes?: Record<string, string>;
}

export type Method =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "trace"
  | "options"
  | "head"
  | "connect";

export type Path = Partial<Record<Method, PathMethod>>;

export interface PathMethod {
  tags: string[];
  summary: string;
  description: string;
  operationId: string;
  consumes: string[];
  produces: string[];
  parameters: Parameter[];
  responses: Record<string, Response>;
  security: Array<Record<string, Array<string>>>;
}
export interface Response {
  description: string;
  schema?: {
    $ref: string;
  };
}
export interface Parameter {
  name: string;
  in: string;
  description: string;
  required: boolean;
  type: string;
  format?: string;
}

export interface Tag {
  name: string;
  description: string;
  externalDocs?: {
    description: string;
    url: string;
  };
}

export interface SwaggerInfo {
  description: string;
  version: string;
  title: string;
  termsOfService: string;
  contact: {
    email: string;
  };
  license: {
    name: string;
    url: string;
  };
}
