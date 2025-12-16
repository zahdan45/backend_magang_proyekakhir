
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model incidents
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type incidents = $Result.DefaultSelection<Prisma.$incidentsPayload>
/**
 * Model devices
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type devices = $Result.DefaultSelection<Prisma.$devicesPayload>
/**
 * Model warehouses
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type warehouses = $Result.DefaultSelection<Prisma.$warehousesPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Incidents
 * const incidents = await prisma.incidents.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Incidents
   * const incidents = await prisma.incidents.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.incidents`: Exposes CRUD operations for the **incidents** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Incidents
    * const incidents = await prisma.incidents.findMany()
    * ```
    */
  get incidents(): Prisma.incidentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.devices`: Exposes CRUD operations for the **devices** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Devices
    * const devices = await prisma.devices.findMany()
    * ```
    */
  get devices(): Prisma.devicesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.warehouses`: Exposes CRUD operations for the **warehouses** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Warehouses
    * const warehouses = await prisma.warehouses.findMany()
    * ```
    */
  get warehouses(): Prisma.warehousesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    incidents: 'incidents',
    devices: 'devices',
    warehouses: 'warehouses'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "incidents" | "devices" | "warehouses"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      incidents: {
        payload: Prisma.$incidentsPayload<ExtArgs>
        fields: Prisma.incidentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.incidentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incidentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.incidentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incidentsPayload>
          }
          findFirst: {
            args: Prisma.incidentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incidentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.incidentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incidentsPayload>
          }
          findMany: {
            args: Prisma.incidentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incidentsPayload>[]
          }
          create: {
            args: Prisma.incidentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incidentsPayload>
          }
          createMany: {
            args: Prisma.incidentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.incidentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incidentsPayload>[]
          }
          delete: {
            args: Prisma.incidentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incidentsPayload>
          }
          update: {
            args: Prisma.incidentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incidentsPayload>
          }
          deleteMany: {
            args: Prisma.incidentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.incidentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.incidentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incidentsPayload>[]
          }
          upsert: {
            args: Prisma.incidentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incidentsPayload>
          }
          aggregate: {
            args: Prisma.IncidentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIncidents>
          }
          groupBy: {
            args: Prisma.incidentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<IncidentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.incidentsCountArgs<ExtArgs>
            result: $Utils.Optional<IncidentsCountAggregateOutputType> | number
          }
        }
      }
      devices: {
        payload: Prisma.$devicesPayload<ExtArgs>
        fields: Prisma.devicesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.devicesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.devicesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicesPayload>
          }
          findFirst: {
            args: Prisma.devicesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.devicesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicesPayload>
          }
          findMany: {
            args: Prisma.devicesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicesPayload>[]
          }
          create: {
            args: Prisma.devicesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicesPayload>
          }
          createMany: {
            args: Prisma.devicesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.devicesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicesPayload>[]
          }
          delete: {
            args: Prisma.devicesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicesPayload>
          }
          update: {
            args: Prisma.devicesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicesPayload>
          }
          deleteMany: {
            args: Prisma.devicesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.devicesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.devicesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicesPayload>[]
          }
          upsert: {
            args: Prisma.devicesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$devicesPayload>
          }
          aggregate: {
            args: Prisma.DevicesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDevices>
          }
          groupBy: {
            args: Prisma.devicesGroupByArgs<ExtArgs>
            result: $Utils.Optional<DevicesGroupByOutputType>[]
          }
          count: {
            args: Prisma.devicesCountArgs<ExtArgs>
            result: $Utils.Optional<DevicesCountAggregateOutputType> | number
          }
        }
      }
      warehouses: {
        payload: Prisma.$warehousesPayload<ExtArgs>
        fields: Prisma.warehousesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.warehousesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$warehousesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.warehousesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$warehousesPayload>
          }
          findFirst: {
            args: Prisma.warehousesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$warehousesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.warehousesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$warehousesPayload>
          }
          findMany: {
            args: Prisma.warehousesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$warehousesPayload>[]
          }
          create: {
            args: Prisma.warehousesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$warehousesPayload>
          }
          createMany: {
            args: Prisma.warehousesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.warehousesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$warehousesPayload>[]
          }
          delete: {
            args: Prisma.warehousesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$warehousesPayload>
          }
          update: {
            args: Prisma.warehousesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$warehousesPayload>
          }
          deleteMany: {
            args: Prisma.warehousesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.warehousesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.warehousesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$warehousesPayload>[]
          }
          upsert: {
            args: Prisma.warehousesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$warehousesPayload>
          }
          aggregate: {
            args: Prisma.WarehousesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWarehouses>
          }
          groupBy: {
            args: Prisma.warehousesGroupByArgs<ExtArgs>
            result: $Utils.Optional<WarehousesGroupByOutputType>[]
          }
          count: {
            args: Prisma.warehousesCountArgs<ExtArgs>
            result: $Utils.Optional<WarehousesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    incidents?: incidentsOmit
    devices?: devicesOmit
    warehouses?: warehousesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model incidents
   */

  export type AggregateIncidents = {
    _count: IncidentsCountAggregateOutputType | null
    _avg: IncidentsAvgAggregateOutputType | null
    _sum: IncidentsSumAggregateOutputType | null
    _min: IncidentsMinAggregateOutputType | null
    _max: IncidentsMaxAggregateOutputType | null
  }

  export type IncidentsAvgAggregateOutputType = {
    id: number | null
  }

  export type IncidentsSumAggregateOutputType = {
    id: bigint | null
  }

  export type IncidentsMinAggregateOutputType = {
    id: bigint | null
    created_at: Date | null
    incident_type: string | null
    source_device_id: string | null
    is_cleared: boolean | null
  }

  export type IncidentsMaxAggregateOutputType = {
    id: bigint | null
    created_at: Date | null
    incident_type: string | null
    source_device_id: string | null
    is_cleared: boolean | null
  }

  export type IncidentsCountAggregateOutputType = {
    id: number
    created_at: number
    incident_type: number
    source_device_id: number
    data: number
    is_cleared: number
    _all: number
  }


  export type IncidentsAvgAggregateInputType = {
    id?: true
  }

  export type IncidentsSumAggregateInputType = {
    id?: true
  }

  export type IncidentsMinAggregateInputType = {
    id?: true
    created_at?: true
    incident_type?: true
    source_device_id?: true
    is_cleared?: true
  }

  export type IncidentsMaxAggregateInputType = {
    id?: true
    created_at?: true
    incident_type?: true
    source_device_id?: true
    is_cleared?: true
  }

  export type IncidentsCountAggregateInputType = {
    id?: true
    created_at?: true
    incident_type?: true
    source_device_id?: true
    data?: true
    is_cleared?: true
    _all?: true
  }

  export type IncidentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which incidents to aggregate.
     */
    where?: incidentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of incidents to fetch.
     */
    orderBy?: incidentsOrderByWithRelationInput | incidentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: incidentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` incidents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` incidents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned incidents
    **/
    _count?: true | IncidentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IncidentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IncidentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IncidentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IncidentsMaxAggregateInputType
  }

  export type GetIncidentsAggregateType<T extends IncidentsAggregateArgs> = {
        [P in keyof T & keyof AggregateIncidents]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIncidents[P]>
      : GetScalarType<T[P], AggregateIncidents[P]>
  }




  export type incidentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: incidentsWhereInput
    orderBy?: incidentsOrderByWithAggregationInput | incidentsOrderByWithAggregationInput[]
    by: IncidentsScalarFieldEnum[] | IncidentsScalarFieldEnum
    having?: incidentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IncidentsCountAggregateInputType | true
    _avg?: IncidentsAvgAggregateInputType
    _sum?: IncidentsSumAggregateInputType
    _min?: IncidentsMinAggregateInputType
    _max?: IncidentsMaxAggregateInputType
  }

  export type IncidentsGroupByOutputType = {
    id: bigint
    created_at: Date
    incident_type: string | null
    source_device_id: string | null
    data: JsonValue | null
    is_cleared: boolean | null
    _count: IncidentsCountAggregateOutputType | null
    _avg: IncidentsAvgAggregateOutputType | null
    _sum: IncidentsSumAggregateOutputType | null
    _min: IncidentsMinAggregateOutputType | null
    _max: IncidentsMaxAggregateOutputType | null
  }

  type GetIncidentsGroupByPayload<T extends incidentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IncidentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IncidentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IncidentsGroupByOutputType[P]>
            : GetScalarType<T[P], IncidentsGroupByOutputType[P]>
        }
      >
    >


  export type incidentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    incident_type?: boolean
    source_device_id?: boolean
    data?: boolean
    is_cleared?: boolean
  }, ExtArgs["result"]["incidents"]>

  export type incidentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    incident_type?: boolean
    source_device_id?: boolean
    data?: boolean
    is_cleared?: boolean
  }, ExtArgs["result"]["incidents"]>

  export type incidentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    incident_type?: boolean
    source_device_id?: boolean
    data?: boolean
    is_cleared?: boolean
  }, ExtArgs["result"]["incidents"]>

  export type incidentsSelectScalar = {
    id?: boolean
    created_at?: boolean
    incident_type?: boolean
    source_device_id?: boolean
    data?: boolean
    is_cleared?: boolean
  }

  export type incidentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "incident_type" | "source_device_id" | "data" | "is_cleared", ExtArgs["result"]["incidents"]>

  export type $incidentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "incidents"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      created_at: Date
      incident_type: string | null
      source_device_id: string | null
      data: Prisma.JsonValue | null
      is_cleared: boolean | null
    }, ExtArgs["result"]["incidents"]>
    composites: {}
  }

  type incidentsGetPayload<S extends boolean | null | undefined | incidentsDefaultArgs> = $Result.GetResult<Prisma.$incidentsPayload, S>

  type incidentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<incidentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IncidentsCountAggregateInputType | true
    }

  export interface incidentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['incidents'], meta: { name: 'incidents' } }
    /**
     * Find zero or one Incidents that matches the filter.
     * @param {incidentsFindUniqueArgs} args - Arguments to find a Incidents
     * @example
     * // Get one Incidents
     * const incidents = await prisma.incidents.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends incidentsFindUniqueArgs>(args: SelectSubset<T, incidentsFindUniqueArgs<ExtArgs>>): Prisma__incidentsClient<$Result.GetResult<Prisma.$incidentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Incidents that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {incidentsFindUniqueOrThrowArgs} args - Arguments to find a Incidents
     * @example
     * // Get one Incidents
     * const incidents = await prisma.incidents.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends incidentsFindUniqueOrThrowArgs>(args: SelectSubset<T, incidentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__incidentsClient<$Result.GetResult<Prisma.$incidentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Incidents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incidentsFindFirstArgs} args - Arguments to find a Incidents
     * @example
     * // Get one Incidents
     * const incidents = await prisma.incidents.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends incidentsFindFirstArgs>(args?: SelectSubset<T, incidentsFindFirstArgs<ExtArgs>>): Prisma__incidentsClient<$Result.GetResult<Prisma.$incidentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Incidents that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incidentsFindFirstOrThrowArgs} args - Arguments to find a Incidents
     * @example
     * // Get one Incidents
     * const incidents = await prisma.incidents.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends incidentsFindFirstOrThrowArgs>(args?: SelectSubset<T, incidentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__incidentsClient<$Result.GetResult<Prisma.$incidentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Incidents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incidentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Incidents
     * const incidents = await prisma.incidents.findMany()
     * 
     * // Get first 10 Incidents
     * const incidents = await prisma.incidents.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const incidentsWithIdOnly = await prisma.incidents.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends incidentsFindManyArgs>(args?: SelectSubset<T, incidentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$incidentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Incidents.
     * @param {incidentsCreateArgs} args - Arguments to create a Incidents.
     * @example
     * // Create one Incidents
     * const Incidents = await prisma.incidents.create({
     *   data: {
     *     // ... data to create a Incidents
     *   }
     * })
     * 
     */
    create<T extends incidentsCreateArgs>(args: SelectSubset<T, incidentsCreateArgs<ExtArgs>>): Prisma__incidentsClient<$Result.GetResult<Prisma.$incidentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Incidents.
     * @param {incidentsCreateManyArgs} args - Arguments to create many Incidents.
     * @example
     * // Create many Incidents
     * const incidents = await prisma.incidents.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends incidentsCreateManyArgs>(args?: SelectSubset<T, incidentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Incidents and returns the data saved in the database.
     * @param {incidentsCreateManyAndReturnArgs} args - Arguments to create many Incidents.
     * @example
     * // Create many Incidents
     * const incidents = await prisma.incidents.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Incidents and only return the `id`
     * const incidentsWithIdOnly = await prisma.incidents.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends incidentsCreateManyAndReturnArgs>(args?: SelectSubset<T, incidentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$incidentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Incidents.
     * @param {incidentsDeleteArgs} args - Arguments to delete one Incidents.
     * @example
     * // Delete one Incidents
     * const Incidents = await prisma.incidents.delete({
     *   where: {
     *     // ... filter to delete one Incidents
     *   }
     * })
     * 
     */
    delete<T extends incidentsDeleteArgs>(args: SelectSubset<T, incidentsDeleteArgs<ExtArgs>>): Prisma__incidentsClient<$Result.GetResult<Prisma.$incidentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Incidents.
     * @param {incidentsUpdateArgs} args - Arguments to update one Incidents.
     * @example
     * // Update one Incidents
     * const incidents = await prisma.incidents.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends incidentsUpdateArgs>(args: SelectSubset<T, incidentsUpdateArgs<ExtArgs>>): Prisma__incidentsClient<$Result.GetResult<Prisma.$incidentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Incidents.
     * @param {incidentsDeleteManyArgs} args - Arguments to filter Incidents to delete.
     * @example
     * // Delete a few Incidents
     * const { count } = await prisma.incidents.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends incidentsDeleteManyArgs>(args?: SelectSubset<T, incidentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Incidents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incidentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Incidents
     * const incidents = await prisma.incidents.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends incidentsUpdateManyArgs>(args: SelectSubset<T, incidentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Incidents and returns the data updated in the database.
     * @param {incidentsUpdateManyAndReturnArgs} args - Arguments to update many Incidents.
     * @example
     * // Update many Incidents
     * const incidents = await prisma.incidents.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Incidents and only return the `id`
     * const incidentsWithIdOnly = await prisma.incidents.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends incidentsUpdateManyAndReturnArgs>(args: SelectSubset<T, incidentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$incidentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Incidents.
     * @param {incidentsUpsertArgs} args - Arguments to update or create a Incidents.
     * @example
     * // Update or create a Incidents
     * const incidents = await prisma.incidents.upsert({
     *   create: {
     *     // ... data to create a Incidents
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Incidents we want to update
     *   }
     * })
     */
    upsert<T extends incidentsUpsertArgs>(args: SelectSubset<T, incidentsUpsertArgs<ExtArgs>>): Prisma__incidentsClient<$Result.GetResult<Prisma.$incidentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Incidents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incidentsCountArgs} args - Arguments to filter Incidents to count.
     * @example
     * // Count the number of Incidents
     * const count = await prisma.incidents.count({
     *   where: {
     *     // ... the filter for the Incidents we want to count
     *   }
     * })
    **/
    count<T extends incidentsCountArgs>(
      args?: Subset<T, incidentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IncidentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Incidents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IncidentsAggregateArgs>(args: Subset<T, IncidentsAggregateArgs>): Prisma.PrismaPromise<GetIncidentsAggregateType<T>>

    /**
     * Group by Incidents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incidentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends incidentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: incidentsGroupByArgs['orderBy'] }
        : { orderBy?: incidentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, incidentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncidentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the incidents model
   */
  readonly fields: incidentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for incidents.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__incidentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the incidents model
   */
  interface incidentsFieldRefs {
    readonly id: FieldRef<"incidents", 'BigInt'>
    readonly created_at: FieldRef<"incidents", 'DateTime'>
    readonly incident_type: FieldRef<"incidents", 'String'>
    readonly source_device_id: FieldRef<"incidents", 'String'>
    readonly data: FieldRef<"incidents", 'Json'>
    readonly is_cleared: FieldRef<"incidents", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * incidents findUnique
   */
  export type incidentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidents
     */
    select?: incidentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incidents
     */
    omit?: incidentsOmit<ExtArgs> | null
    /**
     * Filter, which incidents to fetch.
     */
    where: incidentsWhereUniqueInput
  }

  /**
   * incidents findUniqueOrThrow
   */
  export type incidentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidents
     */
    select?: incidentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incidents
     */
    omit?: incidentsOmit<ExtArgs> | null
    /**
     * Filter, which incidents to fetch.
     */
    where: incidentsWhereUniqueInput
  }

  /**
   * incidents findFirst
   */
  export type incidentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidents
     */
    select?: incidentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incidents
     */
    omit?: incidentsOmit<ExtArgs> | null
    /**
     * Filter, which incidents to fetch.
     */
    where?: incidentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of incidents to fetch.
     */
    orderBy?: incidentsOrderByWithRelationInput | incidentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for incidents.
     */
    cursor?: incidentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` incidents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` incidents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of incidents.
     */
    distinct?: IncidentsScalarFieldEnum | IncidentsScalarFieldEnum[]
  }

  /**
   * incidents findFirstOrThrow
   */
  export type incidentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidents
     */
    select?: incidentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incidents
     */
    omit?: incidentsOmit<ExtArgs> | null
    /**
     * Filter, which incidents to fetch.
     */
    where?: incidentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of incidents to fetch.
     */
    orderBy?: incidentsOrderByWithRelationInput | incidentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for incidents.
     */
    cursor?: incidentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` incidents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` incidents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of incidents.
     */
    distinct?: IncidentsScalarFieldEnum | IncidentsScalarFieldEnum[]
  }

  /**
   * incidents findMany
   */
  export type incidentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidents
     */
    select?: incidentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incidents
     */
    omit?: incidentsOmit<ExtArgs> | null
    /**
     * Filter, which incidents to fetch.
     */
    where?: incidentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of incidents to fetch.
     */
    orderBy?: incidentsOrderByWithRelationInput | incidentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing incidents.
     */
    cursor?: incidentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` incidents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` incidents.
     */
    skip?: number
    distinct?: IncidentsScalarFieldEnum | IncidentsScalarFieldEnum[]
  }

  /**
   * incidents create
   */
  export type incidentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidents
     */
    select?: incidentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incidents
     */
    omit?: incidentsOmit<ExtArgs> | null
    /**
     * The data needed to create a incidents.
     */
    data?: XOR<incidentsCreateInput, incidentsUncheckedCreateInput>
  }

  /**
   * incidents createMany
   */
  export type incidentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many incidents.
     */
    data: incidentsCreateManyInput | incidentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * incidents createManyAndReturn
   */
  export type incidentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidents
     */
    select?: incidentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the incidents
     */
    omit?: incidentsOmit<ExtArgs> | null
    /**
     * The data used to create many incidents.
     */
    data: incidentsCreateManyInput | incidentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * incidents update
   */
  export type incidentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidents
     */
    select?: incidentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incidents
     */
    omit?: incidentsOmit<ExtArgs> | null
    /**
     * The data needed to update a incidents.
     */
    data: XOR<incidentsUpdateInput, incidentsUncheckedUpdateInput>
    /**
     * Choose, which incidents to update.
     */
    where: incidentsWhereUniqueInput
  }

  /**
   * incidents updateMany
   */
  export type incidentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update incidents.
     */
    data: XOR<incidentsUpdateManyMutationInput, incidentsUncheckedUpdateManyInput>
    /**
     * Filter which incidents to update
     */
    where?: incidentsWhereInput
    /**
     * Limit how many incidents to update.
     */
    limit?: number
  }

  /**
   * incidents updateManyAndReturn
   */
  export type incidentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidents
     */
    select?: incidentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the incidents
     */
    omit?: incidentsOmit<ExtArgs> | null
    /**
     * The data used to update incidents.
     */
    data: XOR<incidentsUpdateManyMutationInput, incidentsUncheckedUpdateManyInput>
    /**
     * Filter which incidents to update
     */
    where?: incidentsWhereInput
    /**
     * Limit how many incidents to update.
     */
    limit?: number
  }

  /**
   * incidents upsert
   */
  export type incidentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidents
     */
    select?: incidentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incidents
     */
    omit?: incidentsOmit<ExtArgs> | null
    /**
     * The filter to search for the incidents to update in case it exists.
     */
    where: incidentsWhereUniqueInput
    /**
     * In case the incidents found by the `where` argument doesn't exist, create a new incidents with this data.
     */
    create: XOR<incidentsCreateInput, incidentsUncheckedCreateInput>
    /**
     * In case the incidents was found with the provided `where` argument, update it with this data.
     */
    update: XOR<incidentsUpdateInput, incidentsUncheckedUpdateInput>
  }

  /**
   * incidents delete
   */
  export type incidentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidents
     */
    select?: incidentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incidents
     */
    omit?: incidentsOmit<ExtArgs> | null
    /**
     * Filter which incidents to delete.
     */
    where: incidentsWhereUniqueInput
  }

  /**
   * incidents deleteMany
   */
  export type incidentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which incidents to delete
     */
    where?: incidentsWhereInput
    /**
     * Limit how many incidents to delete.
     */
    limit?: number
  }

  /**
   * incidents without action
   */
  export type incidentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incidents
     */
    select?: incidentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incidents
     */
    omit?: incidentsOmit<ExtArgs> | null
  }


  /**
   * Model devices
   */

  export type AggregateDevices = {
    _count: DevicesCountAggregateOutputType | null
    _min: DevicesMinAggregateOutputType | null
    _max: DevicesMaxAggregateOutputType | null
  }

  export type DevicesMinAggregateOutputType = {
    id: string | null
    name: string | null
    location_area: string | null
    warehouse_id: string | null
    status: string | null
    last_seen: Date | null
  }

  export type DevicesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    location_area: string | null
    warehouse_id: string | null
    status: string | null
    last_seen: Date | null
  }

  export type DevicesCountAggregateOutputType = {
    id: number
    name: number
    location_area: number
    warehouse_id: number
    status: number
    last_seen: number
    _all: number
  }


  export type DevicesMinAggregateInputType = {
    id?: true
    name?: true
    location_area?: true
    warehouse_id?: true
    status?: true
    last_seen?: true
  }

  export type DevicesMaxAggregateInputType = {
    id?: true
    name?: true
    location_area?: true
    warehouse_id?: true
    status?: true
    last_seen?: true
  }

  export type DevicesCountAggregateInputType = {
    id?: true
    name?: true
    location_area?: true
    warehouse_id?: true
    status?: true
    last_seen?: true
    _all?: true
  }

  export type DevicesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which devices to aggregate.
     */
    where?: devicesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of devices to fetch.
     */
    orderBy?: devicesOrderByWithRelationInput | devicesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: devicesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned devices
    **/
    _count?: true | DevicesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DevicesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DevicesMaxAggregateInputType
  }

  export type GetDevicesAggregateType<T extends DevicesAggregateArgs> = {
        [P in keyof T & keyof AggregateDevices]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDevices[P]>
      : GetScalarType<T[P], AggregateDevices[P]>
  }




  export type devicesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: devicesWhereInput
    orderBy?: devicesOrderByWithAggregationInput | devicesOrderByWithAggregationInput[]
    by: DevicesScalarFieldEnum[] | DevicesScalarFieldEnum
    having?: devicesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DevicesCountAggregateInputType | true
    _min?: DevicesMinAggregateInputType
    _max?: DevicesMaxAggregateInputType
  }

  export type DevicesGroupByOutputType = {
    id: string
    name: string
    location_area: string
    warehouse_id: string
    status: string
    last_seen: Date | null
    _count: DevicesCountAggregateOutputType | null
    _min: DevicesMinAggregateOutputType | null
    _max: DevicesMaxAggregateOutputType | null
  }

  type GetDevicesGroupByPayload<T extends devicesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DevicesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DevicesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DevicesGroupByOutputType[P]>
            : GetScalarType<T[P], DevicesGroupByOutputType[P]>
        }
      >
    >


  export type devicesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location_area?: boolean
    warehouse_id?: boolean
    status?: boolean
    last_seen?: boolean
  }, ExtArgs["result"]["devices"]>

  export type devicesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location_area?: boolean
    warehouse_id?: boolean
    status?: boolean
    last_seen?: boolean
  }, ExtArgs["result"]["devices"]>

  export type devicesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location_area?: boolean
    warehouse_id?: boolean
    status?: boolean
    last_seen?: boolean
  }, ExtArgs["result"]["devices"]>

  export type devicesSelectScalar = {
    id?: boolean
    name?: boolean
    location_area?: boolean
    warehouse_id?: boolean
    status?: boolean
    last_seen?: boolean
  }

  export type devicesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "location_area" | "warehouse_id" | "status" | "last_seen", ExtArgs["result"]["devices"]>

  export type $devicesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "devices"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      location_area: string
      warehouse_id: string
      status: string
      last_seen: Date | null
    }, ExtArgs["result"]["devices"]>
    composites: {}
  }

  type devicesGetPayload<S extends boolean | null | undefined | devicesDefaultArgs> = $Result.GetResult<Prisma.$devicesPayload, S>

  type devicesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<devicesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DevicesCountAggregateInputType | true
    }

  export interface devicesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['devices'], meta: { name: 'devices' } }
    /**
     * Find zero or one Devices that matches the filter.
     * @param {devicesFindUniqueArgs} args - Arguments to find a Devices
     * @example
     * // Get one Devices
     * const devices = await prisma.devices.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends devicesFindUniqueArgs>(args: SelectSubset<T, devicesFindUniqueArgs<ExtArgs>>): Prisma__devicesClient<$Result.GetResult<Prisma.$devicesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Devices that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {devicesFindUniqueOrThrowArgs} args - Arguments to find a Devices
     * @example
     * // Get one Devices
     * const devices = await prisma.devices.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends devicesFindUniqueOrThrowArgs>(args: SelectSubset<T, devicesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__devicesClient<$Result.GetResult<Prisma.$devicesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Devices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {devicesFindFirstArgs} args - Arguments to find a Devices
     * @example
     * // Get one Devices
     * const devices = await prisma.devices.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends devicesFindFirstArgs>(args?: SelectSubset<T, devicesFindFirstArgs<ExtArgs>>): Prisma__devicesClient<$Result.GetResult<Prisma.$devicesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Devices that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {devicesFindFirstOrThrowArgs} args - Arguments to find a Devices
     * @example
     * // Get one Devices
     * const devices = await prisma.devices.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends devicesFindFirstOrThrowArgs>(args?: SelectSubset<T, devicesFindFirstOrThrowArgs<ExtArgs>>): Prisma__devicesClient<$Result.GetResult<Prisma.$devicesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Devices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {devicesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Devices
     * const devices = await prisma.devices.findMany()
     * 
     * // Get first 10 Devices
     * const devices = await prisma.devices.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const devicesWithIdOnly = await prisma.devices.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends devicesFindManyArgs>(args?: SelectSubset<T, devicesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$devicesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Devices.
     * @param {devicesCreateArgs} args - Arguments to create a Devices.
     * @example
     * // Create one Devices
     * const Devices = await prisma.devices.create({
     *   data: {
     *     // ... data to create a Devices
     *   }
     * })
     * 
     */
    create<T extends devicesCreateArgs>(args: SelectSubset<T, devicesCreateArgs<ExtArgs>>): Prisma__devicesClient<$Result.GetResult<Prisma.$devicesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Devices.
     * @param {devicesCreateManyArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const devices = await prisma.devices.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends devicesCreateManyArgs>(args?: SelectSubset<T, devicesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Devices and returns the data saved in the database.
     * @param {devicesCreateManyAndReturnArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const devices = await prisma.devices.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Devices and only return the `id`
     * const devicesWithIdOnly = await prisma.devices.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends devicesCreateManyAndReturnArgs>(args?: SelectSubset<T, devicesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$devicesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Devices.
     * @param {devicesDeleteArgs} args - Arguments to delete one Devices.
     * @example
     * // Delete one Devices
     * const Devices = await prisma.devices.delete({
     *   where: {
     *     // ... filter to delete one Devices
     *   }
     * })
     * 
     */
    delete<T extends devicesDeleteArgs>(args: SelectSubset<T, devicesDeleteArgs<ExtArgs>>): Prisma__devicesClient<$Result.GetResult<Prisma.$devicesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Devices.
     * @param {devicesUpdateArgs} args - Arguments to update one Devices.
     * @example
     * // Update one Devices
     * const devices = await prisma.devices.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends devicesUpdateArgs>(args: SelectSubset<T, devicesUpdateArgs<ExtArgs>>): Prisma__devicesClient<$Result.GetResult<Prisma.$devicesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Devices.
     * @param {devicesDeleteManyArgs} args - Arguments to filter Devices to delete.
     * @example
     * // Delete a few Devices
     * const { count } = await prisma.devices.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends devicesDeleteManyArgs>(args?: SelectSubset<T, devicesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {devicesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Devices
     * const devices = await prisma.devices.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends devicesUpdateManyArgs>(args: SelectSubset<T, devicesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices and returns the data updated in the database.
     * @param {devicesUpdateManyAndReturnArgs} args - Arguments to update many Devices.
     * @example
     * // Update many Devices
     * const devices = await prisma.devices.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Devices and only return the `id`
     * const devicesWithIdOnly = await prisma.devices.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends devicesUpdateManyAndReturnArgs>(args: SelectSubset<T, devicesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$devicesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Devices.
     * @param {devicesUpsertArgs} args - Arguments to update or create a Devices.
     * @example
     * // Update or create a Devices
     * const devices = await prisma.devices.upsert({
     *   create: {
     *     // ... data to create a Devices
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Devices we want to update
     *   }
     * })
     */
    upsert<T extends devicesUpsertArgs>(args: SelectSubset<T, devicesUpsertArgs<ExtArgs>>): Prisma__devicesClient<$Result.GetResult<Prisma.$devicesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {devicesCountArgs} args - Arguments to filter Devices to count.
     * @example
     * // Count the number of Devices
     * const count = await prisma.devices.count({
     *   where: {
     *     // ... the filter for the Devices we want to count
     *   }
     * })
    **/
    count<T extends devicesCountArgs>(
      args?: Subset<T, devicesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DevicesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DevicesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DevicesAggregateArgs>(args: Subset<T, DevicesAggregateArgs>): Prisma.PrismaPromise<GetDevicesAggregateType<T>>

    /**
     * Group by Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {devicesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends devicesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: devicesGroupByArgs['orderBy'] }
        : { orderBy?: devicesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, devicesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDevicesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the devices model
   */
  readonly fields: devicesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for devices.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__devicesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the devices model
   */
  interface devicesFieldRefs {
    readonly id: FieldRef<"devices", 'String'>
    readonly name: FieldRef<"devices", 'String'>
    readonly location_area: FieldRef<"devices", 'String'>
    readonly warehouse_id: FieldRef<"devices", 'String'>
    readonly status: FieldRef<"devices", 'String'>
    readonly last_seen: FieldRef<"devices", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * devices findUnique
   */
  export type devicesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the devices
     */
    select?: devicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the devices
     */
    omit?: devicesOmit<ExtArgs> | null
    /**
     * Filter, which devices to fetch.
     */
    where: devicesWhereUniqueInput
  }

  /**
   * devices findUniqueOrThrow
   */
  export type devicesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the devices
     */
    select?: devicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the devices
     */
    omit?: devicesOmit<ExtArgs> | null
    /**
     * Filter, which devices to fetch.
     */
    where: devicesWhereUniqueInput
  }

  /**
   * devices findFirst
   */
  export type devicesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the devices
     */
    select?: devicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the devices
     */
    omit?: devicesOmit<ExtArgs> | null
    /**
     * Filter, which devices to fetch.
     */
    where?: devicesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of devices to fetch.
     */
    orderBy?: devicesOrderByWithRelationInput | devicesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for devices.
     */
    cursor?: devicesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of devices.
     */
    distinct?: DevicesScalarFieldEnum | DevicesScalarFieldEnum[]
  }

  /**
   * devices findFirstOrThrow
   */
  export type devicesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the devices
     */
    select?: devicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the devices
     */
    omit?: devicesOmit<ExtArgs> | null
    /**
     * Filter, which devices to fetch.
     */
    where?: devicesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of devices to fetch.
     */
    orderBy?: devicesOrderByWithRelationInput | devicesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for devices.
     */
    cursor?: devicesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of devices.
     */
    distinct?: DevicesScalarFieldEnum | DevicesScalarFieldEnum[]
  }

  /**
   * devices findMany
   */
  export type devicesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the devices
     */
    select?: devicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the devices
     */
    omit?: devicesOmit<ExtArgs> | null
    /**
     * Filter, which devices to fetch.
     */
    where?: devicesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of devices to fetch.
     */
    orderBy?: devicesOrderByWithRelationInput | devicesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing devices.
     */
    cursor?: devicesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` devices.
     */
    skip?: number
    distinct?: DevicesScalarFieldEnum | DevicesScalarFieldEnum[]
  }

  /**
   * devices create
   */
  export type devicesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the devices
     */
    select?: devicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the devices
     */
    omit?: devicesOmit<ExtArgs> | null
    /**
     * The data needed to create a devices.
     */
    data: XOR<devicesCreateInput, devicesUncheckedCreateInput>
  }

  /**
   * devices createMany
   */
  export type devicesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many devices.
     */
    data: devicesCreateManyInput | devicesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * devices createManyAndReturn
   */
  export type devicesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the devices
     */
    select?: devicesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the devices
     */
    omit?: devicesOmit<ExtArgs> | null
    /**
     * The data used to create many devices.
     */
    data: devicesCreateManyInput | devicesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * devices update
   */
  export type devicesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the devices
     */
    select?: devicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the devices
     */
    omit?: devicesOmit<ExtArgs> | null
    /**
     * The data needed to update a devices.
     */
    data: XOR<devicesUpdateInput, devicesUncheckedUpdateInput>
    /**
     * Choose, which devices to update.
     */
    where: devicesWhereUniqueInput
  }

  /**
   * devices updateMany
   */
  export type devicesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update devices.
     */
    data: XOR<devicesUpdateManyMutationInput, devicesUncheckedUpdateManyInput>
    /**
     * Filter which devices to update
     */
    where?: devicesWhereInput
    /**
     * Limit how many devices to update.
     */
    limit?: number
  }

  /**
   * devices updateManyAndReturn
   */
  export type devicesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the devices
     */
    select?: devicesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the devices
     */
    omit?: devicesOmit<ExtArgs> | null
    /**
     * The data used to update devices.
     */
    data: XOR<devicesUpdateManyMutationInput, devicesUncheckedUpdateManyInput>
    /**
     * Filter which devices to update
     */
    where?: devicesWhereInput
    /**
     * Limit how many devices to update.
     */
    limit?: number
  }

  /**
   * devices upsert
   */
  export type devicesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the devices
     */
    select?: devicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the devices
     */
    omit?: devicesOmit<ExtArgs> | null
    /**
     * The filter to search for the devices to update in case it exists.
     */
    where: devicesWhereUniqueInput
    /**
     * In case the devices found by the `where` argument doesn't exist, create a new devices with this data.
     */
    create: XOR<devicesCreateInput, devicesUncheckedCreateInput>
    /**
     * In case the devices was found with the provided `where` argument, update it with this data.
     */
    update: XOR<devicesUpdateInput, devicesUncheckedUpdateInput>
  }

  /**
   * devices delete
   */
  export type devicesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the devices
     */
    select?: devicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the devices
     */
    omit?: devicesOmit<ExtArgs> | null
    /**
     * Filter which devices to delete.
     */
    where: devicesWhereUniqueInput
  }

  /**
   * devices deleteMany
   */
  export type devicesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which devices to delete
     */
    where?: devicesWhereInput
    /**
     * Limit how many devices to delete.
     */
    limit?: number
  }

  /**
   * devices without action
   */
  export type devicesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the devices
     */
    select?: devicesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the devices
     */
    omit?: devicesOmit<ExtArgs> | null
  }


  /**
   * Model warehouses
   */

  export type AggregateWarehouses = {
    _count: WarehousesCountAggregateOutputType | null
    _min: WarehousesMinAggregateOutputType | null
    _max: WarehousesMaxAggregateOutputType | null
  }

  export type WarehousesMinAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    created_at: Date | null
  }

  export type WarehousesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    created_at: Date | null
  }

  export type WarehousesCountAggregateOutputType = {
    id: number
    name: number
    location: number
    created_at: number
    _all: number
  }


  export type WarehousesMinAggregateInputType = {
    id?: true
    name?: true
    location?: true
    created_at?: true
  }

  export type WarehousesMaxAggregateInputType = {
    id?: true
    name?: true
    location?: true
    created_at?: true
  }

  export type WarehousesCountAggregateInputType = {
    id?: true
    name?: true
    location?: true
    created_at?: true
    _all?: true
  }

  export type WarehousesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which warehouses to aggregate.
     */
    where?: warehousesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of warehouses to fetch.
     */
    orderBy?: warehousesOrderByWithRelationInput | warehousesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: warehousesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` warehouses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned warehouses
    **/
    _count?: true | WarehousesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WarehousesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WarehousesMaxAggregateInputType
  }

  export type GetWarehousesAggregateType<T extends WarehousesAggregateArgs> = {
        [P in keyof T & keyof AggregateWarehouses]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWarehouses[P]>
      : GetScalarType<T[P], AggregateWarehouses[P]>
  }




  export type warehousesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: warehousesWhereInput
    orderBy?: warehousesOrderByWithAggregationInput | warehousesOrderByWithAggregationInput[]
    by: WarehousesScalarFieldEnum[] | WarehousesScalarFieldEnum
    having?: warehousesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WarehousesCountAggregateInputType | true
    _min?: WarehousesMinAggregateInputType
    _max?: WarehousesMaxAggregateInputType
  }

  export type WarehousesGroupByOutputType = {
    id: string
    name: string
    location: string | null
    created_at: Date
    _count: WarehousesCountAggregateOutputType | null
    _min: WarehousesMinAggregateOutputType | null
    _max: WarehousesMaxAggregateOutputType | null
  }

  type GetWarehousesGroupByPayload<T extends warehousesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WarehousesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WarehousesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WarehousesGroupByOutputType[P]>
            : GetScalarType<T[P], WarehousesGroupByOutputType[P]>
        }
      >
    >


  export type warehousesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["warehouses"]>

  export type warehousesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["warehouses"]>

  export type warehousesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["warehouses"]>

  export type warehousesSelectScalar = {
    id?: boolean
    name?: boolean
    location?: boolean
    created_at?: boolean
  }

  export type warehousesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "location" | "created_at", ExtArgs["result"]["warehouses"]>

  export type $warehousesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "warehouses"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      location: string | null
      created_at: Date
    }, ExtArgs["result"]["warehouses"]>
    composites: {}
  }

  type warehousesGetPayload<S extends boolean | null | undefined | warehousesDefaultArgs> = $Result.GetResult<Prisma.$warehousesPayload, S>

  type warehousesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<warehousesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WarehousesCountAggregateInputType | true
    }

  export interface warehousesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['warehouses'], meta: { name: 'warehouses' } }
    /**
     * Find zero or one Warehouses that matches the filter.
     * @param {warehousesFindUniqueArgs} args - Arguments to find a Warehouses
     * @example
     * // Get one Warehouses
     * const warehouses = await prisma.warehouses.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends warehousesFindUniqueArgs>(args: SelectSubset<T, warehousesFindUniqueArgs<ExtArgs>>): Prisma__warehousesClient<$Result.GetResult<Prisma.$warehousesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Warehouses that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {warehousesFindUniqueOrThrowArgs} args - Arguments to find a Warehouses
     * @example
     * // Get one Warehouses
     * const warehouses = await prisma.warehouses.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends warehousesFindUniqueOrThrowArgs>(args: SelectSubset<T, warehousesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__warehousesClient<$Result.GetResult<Prisma.$warehousesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Warehouses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warehousesFindFirstArgs} args - Arguments to find a Warehouses
     * @example
     * // Get one Warehouses
     * const warehouses = await prisma.warehouses.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends warehousesFindFirstArgs>(args?: SelectSubset<T, warehousesFindFirstArgs<ExtArgs>>): Prisma__warehousesClient<$Result.GetResult<Prisma.$warehousesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Warehouses that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warehousesFindFirstOrThrowArgs} args - Arguments to find a Warehouses
     * @example
     * // Get one Warehouses
     * const warehouses = await prisma.warehouses.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends warehousesFindFirstOrThrowArgs>(args?: SelectSubset<T, warehousesFindFirstOrThrowArgs<ExtArgs>>): Prisma__warehousesClient<$Result.GetResult<Prisma.$warehousesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Warehouses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warehousesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Warehouses
     * const warehouses = await prisma.warehouses.findMany()
     * 
     * // Get first 10 Warehouses
     * const warehouses = await prisma.warehouses.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const warehousesWithIdOnly = await prisma.warehouses.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends warehousesFindManyArgs>(args?: SelectSubset<T, warehousesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$warehousesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Warehouses.
     * @param {warehousesCreateArgs} args - Arguments to create a Warehouses.
     * @example
     * // Create one Warehouses
     * const Warehouses = await prisma.warehouses.create({
     *   data: {
     *     // ... data to create a Warehouses
     *   }
     * })
     * 
     */
    create<T extends warehousesCreateArgs>(args: SelectSubset<T, warehousesCreateArgs<ExtArgs>>): Prisma__warehousesClient<$Result.GetResult<Prisma.$warehousesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Warehouses.
     * @param {warehousesCreateManyArgs} args - Arguments to create many Warehouses.
     * @example
     * // Create many Warehouses
     * const warehouses = await prisma.warehouses.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends warehousesCreateManyArgs>(args?: SelectSubset<T, warehousesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Warehouses and returns the data saved in the database.
     * @param {warehousesCreateManyAndReturnArgs} args - Arguments to create many Warehouses.
     * @example
     * // Create many Warehouses
     * const warehouses = await prisma.warehouses.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Warehouses and only return the `id`
     * const warehousesWithIdOnly = await prisma.warehouses.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends warehousesCreateManyAndReturnArgs>(args?: SelectSubset<T, warehousesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$warehousesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Warehouses.
     * @param {warehousesDeleteArgs} args - Arguments to delete one Warehouses.
     * @example
     * // Delete one Warehouses
     * const Warehouses = await prisma.warehouses.delete({
     *   where: {
     *     // ... filter to delete one Warehouses
     *   }
     * })
     * 
     */
    delete<T extends warehousesDeleteArgs>(args: SelectSubset<T, warehousesDeleteArgs<ExtArgs>>): Prisma__warehousesClient<$Result.GetResult<Prisma.$warehousesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Warehouses.
     * @param {warehousesUpdateArgs} args - Arguments to update one Warehouses.
     * @example
     * // Update one Warehouses
     * const warehouses = await prisma.warehouses.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends warehousesUpdateArgs>(args: SelectSubset<T, warehousesUpdateArgs<ExtArgs>>): Prisma__warehousesClient<$Result.GetResult<Prisma.$warehousesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Warehouses.
     * @param {warehousesDeleteManyArgs} args - Arguments to filter Warehouses to delete.
     * @example
     * // Delete a few Warehouses
     * const { count } = await prisma.warehouses.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends warehousesDeleteManyArgs>(args?: SelectSubset<T, warehousesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Warehouses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warehousesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Warehouses
     * const warehouses = await prisma.warehouses.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends warehousesUpdateManyArgs>(args: SelectSubset<T, warehousesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Warehouses and returns the data updated in the database.
     * @param {warehousesUpdateManyAndReturnArgs} args - Arguments to update many Warehouses.
     * @example
     * // Update many Warehouses
     * const warehouses = await prisma.warehouses.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Warehouses and only return the `id`
     * const warehousesWithIdOnly = await prisma.warehouses.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends warehousesUpdateManyAndReturnArgs>(args: SelectSubset<T, warehousesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$warehousesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Warehouses.
     * @param {warehousesUpsertArgs} args - Arguments to update or create a Warehouses.
     * @example
     * // Update or create a Warehouses
     * const warehouses = await prisma.warehouses.upsert({
     *   create: {
     *     // ... data to create a Warehouses
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Warehouses we want to update
     *   }
     * })
     */
    upsert<T extends warehousesUpsertArgs>(args: SelectSubset<T, warehousesUpsertArgs<ExtArgs>>): Prisma__warehousesClient<$Result.GetResult<Prisma.$warehousesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Warehouses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warehousesCountArgs} args - Arguments to filter Warehouses to count.
     * @example
     * // Count the number of Warehouses
     * const count = await prisma.warehouses.count({
     *   where: {
     *     // ... the filter for the Warehouses we want to count
     *   }
     * })
    **/
    count<T extends warehousesCountArgs>(
      args?: Subset<T, warehousesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WarehousesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Warehouses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarehousesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WarehousesAggregateArgs>(args: Subset<T, WarehousesAggregateArgs>): Prisma.PrismaPromise<GetWarehousesAggregateType<T>>

    /**
     * Group by Warehouses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warehousesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends warehousesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: warehousesGroupByArgs['orderBy'] }
        : { orderBy?: warehousesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, warehousesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWarehousesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the warehouses model
   */
  readonly fields: warehousesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for warehouses.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__warehousesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the warehouses model
   */
  interface warehousesFieldRefs {
    readonly id: FieldRef<"warehouses", 'String'>
    readonly name: FieldRef<"warehouses", 'String'>
    readonly location: FieldRef<"warehouses", 'String'>
    readonly created_at: FieldRef<"warehouses", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * warehouses findUnique
   */
  export type warehousesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouses
     */
    select?: warehousesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the warehouses
     */
    omit?: warehousesOmit<ExtArgs> | null
    /**
     * Filter, which warehouses to fetch.
     */
    where: warehousesWhereUniqueInput
  }

  /**
   * warehouses findUniqueOrThrow
   */
  export type warehousesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouses
     */
    select?: warehousesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the warehouses
     */
    omit?: warehousesOmit<ExtArgs> | null
    /**
     * Filter, which warehouses to fetch.
     */
    where: warehousesWhereUniqueInput
  }

  /**
   * warehouses findFirst
   */
  export type warehousesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouses
     */
    select?: warehousesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the warehouses
     */
    omit?: warehousesOmit<ExtArgs> | null
    /**
     * Filter, which warehouses to fetch.
     */
    where?: warehousesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of warehouses to fetch.
     */
    orderBy?: warehousesOrderByWithRelationInput | warehousesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for warehouses.
     */
    cursor?: warehousesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` warehouses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of warehouses.
     */
    distinct?: WarehousesScalarFieldEnum | WarehousesScalarFieldEnum[]
  }

  /**
   * warehouses findFirstOrThrow
   */
  export type warehousesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouses
     */
    select?: warehousesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the warehouses
     */
    omit?: warehousesOmit<ExtArgs> | null
    /**
     * Filter, which warehouses to fetch.
     */
    where?: warehousesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of warehouses to fetch.
     */
    orderBy?: warehousesOrderByWithRelationInput | warehousesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for warehouses.
     */
    cursor?: warehousesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` warehouses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of warehouses.
     */
    distinct?: WarehousesScalarFieldEnum | WarehousesScalarFieldEnum[]
  }

  /**
   * warehouses findMany
   */
  export type warehousesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouses
     */
    select?: warehousesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the warehouses
     */
    omit?: warehousesOmit<ExtArgs> | null
    /**
     * Filter, which warehouses to fetch.
     */
    where?: warehousesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of warehouses to fetch.
     */
    orderBy?: warehousesOrderByWithRelationInput | warehousesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing warehouses.
     */
    cursor?: warehousesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` warehouses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` warehouses.
     */
    skip?: number
    distinct?: WarehousesScalarFieldEnum | WarehousesScalarFieldEnum[]
  }

  /**
   * warehouses create
   */
  export type warehousesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouses
     */
    select?: warehousesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the warehouses
     */
    omit?: warehousesOmit<ExtArgs> | null
    /**
     * The data needed to create a warehouses.
     */
    data: XOR<warehousesCreateInput, warehousesUncheckedCreateInput>
  }

  /**
   * warehouses createMany
   */
  export type warehousesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many warehouses.
     */
    data: warehousesCreateManyInput | warehousesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * warehouses createManyAndReturn
   */
  export type warehousesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouses
     */
    select?: warehousesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the warehouses
     */
    omit?: warehousesOmit<ExtArgs> | null
    /**
     * The data used to create many warehouses.
     */
    data: warehousesCreateManyInput | warehousesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * warehouses update
   */
  export type warehousesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouses
     */
    select?: warehousesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the warehouses
     */
    omit?: warehousesOmit<ExtArgs> | null
    /**
     * The data needed to update a warehouses.
     */
    data: XOR<warehousesUpdateInput, warehousesUncheckedUpdateInput>
    /**
     * Choose, which warehouses to update.
     */
    where: warehousesWhereUniqueInput
  }

  /**
   * warehouses updateMany
   */
  export type warehousesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update warehouses.
     */
    data: XOR<warehousesUpdateManyMutationInput, warehousesUncheckedUpdateManyInput>
    /**
     * Filter which warehouses to update
     */
    where?: warehousesWhereInput
    /**
     * Limit how many warehouses to update.
     */
    limit?: number
  }

  /**
   * warehouses updateManyAndReturn
   */
  export type warehousesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouses
     */
    select?: warehousesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the warehouses
     */
    omit?: warehousesOmit<ExtArgs> | null
    /**
     * The data used to update warehouses.
     */
    data: XOR<warehousesUpdateManyMutationInput, warehousesUncheckedUpdateManyInput>
    /**
     * Filter which warehouses to update
     */
    where?: warehousesWhereInput
    /**
     * Limit how many warehouses to update.
     */
    limit?: number
  }

  /**
   * warehouses upsert
   */
  export type warehousesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouses
     */
    select?: warehousesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the warehouses
     */
    omit?: warehousesOmit<ExtArgs> | null
    /**
     * The filter to search for the warehouses to update in case it exists.
     */
    where: warehousesWhereUniqueInput
    /**
     * In case the warehouses found by the `where` argument doesn't exist, create a new warehouses with this data.
     */
    create: XOR<warehousesCreateInput, warehousesUncheckedCreateInput>
    /**
     * In case the warehouses was found with the provided `where` argument, update it with this data.
     */
    update: XOR<warehousesUpdateInput, warehousesUncheckedUpdateInput>
  }

  /**
   * warehouses delete
   */
  export type warehousesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouses
     */
    select?: warehousesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the warehouses
     */
    omit?: warehousesOmit<ExtArgs> | null
    /**
     * Filter which warehouses to delete.
     */
    where: warehousesWhereUniqueInput
  }

  /**
   * warehouses deleteMany
   */
  export type warehousesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which warehouses to delete
     */
    where?: warehousesWhereInput
    /**
     * Limit how many warehouses to delete.
     */
    limit?: number
  }

  /**
   * warehouses without action
   */
  export type warehousesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the warehouses
     */
    select?: warehousesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the warehouses
     */
    omit?: warehousesOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const IncidentsScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    incident_type: 'incident_type',
    source_device_id: 'source_device_id',
    data: 'data',
    is_cleared: 'is_cleared'
  };

  export type IncidentsScalarFieldEnum = (typeof IncidentsScalarFieldEnum)[keyof typeof IncidentsScalarFieldEnum]


  export const DevicesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location_area: 'location_area',
    warehouse_id: 'warehouse_id',
    status: 'status',
    last_seen: 'last_seen'
  };

  export type DevicesScalarFieldEnum = (typeof DevicesScalarFieldEnum)[keyof typeof DevicesScalarFieldEnum]


  export const WarehousesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    created_at: 'created_at'
  };

  export type WarehousesScalarFieldEnum = (typeof WarehousesScalarFieldEnum)[keyof typeof WarehousesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type incidentsWhereInput = {
    AND?: incidentsWhereInput | incidentsWhereInput[]
    OR?: incidentsWhereInput[]
    NOT?: incidentsWhereInput | incidentsWhereInput[]
    id?: BigIntFilter<"incidents"> | bigint | number
    created_at?: DateTimeFilter<"incidents"> | Date | string
    incident_type?: StringNullableFilter<"incidents"> | string | null
    source_device_id?: StringNullableFilter<"incidents"> | string | null
    data?: JsonNullableFilter<"incidents">
    is_cleared?: BoolNullableFilter<"incidents"> | boolean | null
  }

  export type incidentsOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    incident_type?: SortOrderInput | SortOrder
    source_device_id?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    is_cleared?: SortOrderInput | SortOrder
  }

  export type incidentsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: incidentsWhereInput | incidentsWhereInput[]
    OR?: incidentsWhereInput[]
    NOT?: incidentsWhereInput | incidentsWhereInput[]
    created_at?: DateTimeFilter<"incidents"> | Date | string
    incident_type?: StringNullableFilter<"incidents"> | string | null
    source_device_id?: StringNullableFilter<"incidents"> | string | null
    data?: JsonNullableFilter<"incidents">
    is_cleared?: BoolNullableFilter<"incidents"> | boolean | null
  }, "id">

  export type incidentsOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    incident_type?: SortOrderInput | SortOrder
    source_device_id?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    is_cleared?: SortOrderInput | SortOrder
    _count?: incidentsCountOrderByAggregateInput
    _avg?: incidentsAvgOrderByAggregateInput
    _max?: incidentsMaxOrderByAggregateInput
    _min?: incidentsMinOrderByAggregateInput
    _sum?: incidentsSumOrderByAggregateInput
  }

  export type incidentsScalarWhereWithAggregatesInput = {
    AND?: incidentsScalarWhereWithAggregatesInput | incidentsScalarWhereWithAggregatesInput[]
    OR?: incidentsScalarWhereWithAggregatesInput[]
    NOT?: incidentsScalarWhereWithAggregatesInput | incidentsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"incidents"> | bigint | number
    created_at?: DateTimeWithAggregatesFilter<"incidents"> | Date | string
    incident_type?: StringNullableWithAggregatesFilter<"incidents"> | string | null
    source_device_id?: StringNullableWithAggregatesFilter<"incidents"> | string | null
    data?: JsonNullableWithAggregatesFilter<"incidents">
    is_cleared?: BoolNullableWithAggregatesFilter<"incidents"> | boolean | null
  }

  export type devicesWhereInput = {
    AND?: devicesWhereInput | devicesWhereInput[]
    OR?: devicesWhereInput[]
    NOT?: devicesWhereInput | devicesWhereInput[]
    id?: StringFilter<"devices"> | string
    name?: StringFilter<"devices"> | string
    location_area?: StringFilter<"devices"> | string
    warehouse_id?: StringFilter<"devices"> | string
    status?: StringFilter<"devices"> | string
    last_seen?: DateTimeNullableFilter<"devices"> | Date | string | null
  }

  export type devicesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location_area?: SortOrder
    warehouse_id?: SortOrder
    status?: SortOrder
    last_seen?: SortOrderInput | SortOrder
  }

  export type devicesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: devicesWhereInput | devicesWhereInput[]
    OR?: devicesWhereInput[]
    NOT?: devicesWhereInput | devicesWhereInput[]
    name?: StringFilter<"devices"> | string
    location_area?: StringFilter<"devices"> | string
    warehouse_id?: StringFilter<"devices"> | string
    status?: StringFilter<"devices"> | string
    last_seen?: DateTimeNullableFilter<"devices"> | Date | string | null
  }, "id">

  export type devicesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location_area?: SortOrder
    warehouse_id?: SortOrder
    status?: SortOrder
    last_seen?: SortOrderInput | SortOrder
    _count?: devicesCountOrderByAggregateInput
    _max?: devicesMaxOrderByAggregateInput
    _min?: devicesMinOrderByAggregateInput
  }

  export type devicesScalarWhereWithAggregatesInput = {
    AND?: devicesScalarWhereWithAggregatesInput | devicesScalarWhereWithAggregatesInput[]
    OR?: devicesScalarWhereWithAggregatesInput[]
    NOT?: devicesScalarWhereWithAggregatesInput | devicesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"devices"> | string
    name?: StringWithAggregatesFilter<"devices"> | string
    location_area?: StringWithAggregatesFilter<"devices"> | string
    warehouse_id?: StringWithAggregatesFilter<"devices"> | string
    status?: StringWithAggregatesFilter<"devices"> | string
    last_seen?: DateTimeNullableWithAggregatesFilter<"devices"> | Date | string | null
  }

  export type warehousesWhereInput = {
    AND?: warehousesWhereInput | warehousesWhereInput[]
    OR?: warehousesWhereInput[]
    NOT?: warehousesWhereInput | warehousesWhereInput[]
    id?: StringFilter<"warehouses"> | string
    name?: StringFilter<"warehouses"> | string
    location?: StringNullableFilter<"warehouses"> | string | null
    created_at?: DateTimeFilter<"warehouses"> | Date | string
  }

  export type warehousesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    created_at?: SortOrder
  }

  export type warehousesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: warehousesWhereInput | warehousesWhereInput[]
    OR?: warehousesWhereInput[]
    NOT?: warehousesWhereInput | warehousesWhereInput[]
    name?: StringFilter<"warehouses"> | string
    location?: StringNullableFilter<"warehouses"> | string | null
    created_at?: DateTimeFilter<"warehouses"> | Date | string
  }, "id">

  export type warehousesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: warehousesCountOrderByAggregateInput
    _max?: warehousesMaxOrderByAggregateInput
    _min?: warehousesMinOrderByAggregateInput
  }

  export type warehousesScalarWhereWithAggregatesInput = {
    AND?: warehousesScalarWhereWithAggregatesInput | warehousesScalarWhereWithAggregatesInput[]
    OR?: warehousesScalarWhereWithAggregatesInput[]
    NOT?: warehousesScalarWhereWithAggregatesInput | warehousesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"warehouses"> | string
    name?: StringWithAggregatesFilter<"warehouses"> | string
    location?: StringNullableWithAggregatesFilter<"warehouses"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"warehouses"> | Date | string
  }

  export type incidentsCreateInput = {
    id?: bigint | number
    created_at?: Date | string
    incident_type?: string | null
    source_device_id?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    is_cleared?: boolean | null
  }

  export type incidentsUncheckedCreateInput = {
    id?: bigint | number
    created_at?: Date | string
    incident_type?: string | null
    source_device_id?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    is_cleared?: boolean | null
  }

  export type incidentsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    incident_type?: NullableStringFieldUpdateOperationsInput | string | null
    source_device_id?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    is_cleared?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type incidentsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    incident_type?: NullableStringFieldUpdateOperationsInput | string | null
    source_device_id?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    is_cleared?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type incidentsCreateManyInput = {
    id?: bigint | number
    created_at?: Date | string
    incident_type?: string | null
    source_device_id?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    is_cleared?: boolean | null
  }

  export type incidentsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    incident_type?: NullableStringFieldUpdateOperationsInput | string | null
    source_device_id?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    is_cleared?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type incidentsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    incident_type?: NullableStringFieldUpdateOperationsInput | string | null
    source_device_id?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    is_cleared?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type devicesCreateInput = {
    id: string
    name: string
    location_area: string
    warehouse_id: string
    status?: string
    last_seen?: Date | string | null
  }

  export type devicesUncheckedCreateInput = {
    id: string
    name: string
    location_area: string
    warehouse_id: string
    status?: string
    last_seen?: Date | string | null
  }

  export type devicesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location_area?: StringFieldUpdateOperationsInput | string
    warehouse_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    last_seen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type devicesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location_area?: StringFieldUpdateOperationsInput | string
    warehouse_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    last_seen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type devicesCreateManyInput = {
    id: string
    name: string
    location_area: string
    warehouse_id: string
    status?: string
    last_seen?: Date | string | null
  }

  export type devicesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location_area?: StringFieldUpdateOperationsInput | string
    warehouse_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    last_seen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type devicesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location_area?: StringFieldUpdateOperationsInput | string
    warehouse_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    last_seen?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type warehousesCreateInput = {
    id: string
    name: string
    location?: string | null
    created_at?: Date | string
  }

  export type warehousesUncheckedCreateInput = {
    id: string
    name: string
    location?: string | null
    created_at?: Date | string
  }

  export type warehousesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type warehousesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type warehousesCreateManyInput = {
    id: string
    name: string
    location?: string | null
    created_at?: Date | string
  }

  export type warehousesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type warehousesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type incidentsCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    incident_type?: SortOrder
    source_device_id?: SortOrder
    data?: SortOrder
    is_cleared?: SortOrder
  }

  export type incidentsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type incidentsMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    incident_type?: SortOrder
    source_device_id?: SortOrder
    is_cleared?: SortOrder
  }

  export type incidentsMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    incident_type?: SortOrder
    source_device_id?: SortOrder
    is_cleared?: SortOrder
  }

  export type incidentsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type devicesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location_area?: SortOrder
    warehouse_id?: SortOrder
    status?: SortOrder
    last_seen?: SortOrder
  }

  export type devicesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location_area?: SortOrder
    warehouse_id?: SortOrder
    status?: SortOrder
    last_seen?: SortOrder
  }

  export type devicesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location_area?: SortOrder
    warehouse_id?: SortOrder
    status?: SortOrder
    last_seen?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type warehousesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    created_at?: SortOrder
  }

  export type warehousesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    created_at?: SortOrder
  }

  export type warehousesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    created_at?: SortOrder
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}