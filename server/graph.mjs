import {
  execute,
  defaultFieldResolver,
  graphql,
  validate,
  parse,
  subscribe,
  buildSchema,
  validateSchema,
} from 'graphql'

export function parseSchema(schemaString){
  const schema = buildSchema(schemaString)
  // Validate Schema
  const schemaValidationErrors = validateSchema(schema);
  if (schemaValidationErrors.length > 0) {
    throw { errors: schemaValidationErrors };
  }
  return schema
}

export async function graphqlRequest(args) {
  const {
    schema,
    source,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    typeResolver,
  } = args;



  // Parse
  let document = source;

  if (typeof document === 'string') {
    try {
      document = parse(source);
    } catch (syntaxError) {
      return { errors: [syntaxError] };
    }
  }

  // Validate
  const validationErrors = validate(schema, document);
  if (validationErrors.length > 0) {
    return { errors: validationErrors };
  }

  // Execute
  return execute({
    schema,
    document,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    typeResolver,
  });
}

export async function subscribeRequest(args, cb){
  const {
    schema,
    document,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    subscribeFieldResolver,
  } = args;

  const subscribtion = subscribe({
    schema,
    document,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    subscribeFieldResolver,
  })

  const response = await subscribtion
  if (Symbol.asyncIterator in response) {
    for await (const data of response) {
      cb(data)
    }
  } else {
    cb(response)
  }
}