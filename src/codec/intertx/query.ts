/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "intertx";

export interface QueryIBCAccountFromAddressRequest {
  port: string;
  channel: string;
  address: Uint8Array;
}

export interface QueryIBCAccountFromAddressResponse {
  address: Uint8Array;
}

const baseQueryIBCAccountFromAddressRequest: object = { port: "", channel: "" };

export const QueryIBCAccountFromAddressRequest = {
  encode(
    message: QueryIBCAccountFromAddressRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.port !== "") {
      writer.uint32(10).string(message.port);
    }
    if (message.channel !== "") {
      writer.uint32(18).string(message.channel);
    }
    if (message.address.length !== 0) {
      writer.uint32(26).bytes(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryIBCAccountFromAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryIBCAccountFromAddressRequest,
    } as QueryIBCAccountFromAddressRequest;
    message.address = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.port = reader.string();
          break;
        case 2:
          message.channel = reader.string();
          break;
        case 3:
          message.address = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryIBCAccountFromAddressRequest {
    const message = {
      ...baseQueryIBCAccountFromAddressRequest,
    } as QueryIBCAccountFromAddressRequest;
    message.address = new Uint8Array();
    if (object.port !== undefined && object.port !== null) {
      message.port = String(object.port);
    } else {
      message.port = "";
    }
    if (object.channel !== undefined && object.channel !== null) {
      message.channel = String(object.channel);
    } else {
      message.channel = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = bytesFromBase64(object.address);
    }
    return message;
  },

  toJSON(message: QueryIBCAccountFromAddressRequest): unknown {
    const obj: any = {};
    message.port !== undefined && (obj.port = message.port);
    message.channel !== undefined && (obj.channel = message.channel);
    message.address !== undefined &&
      (obj.address = base64FromBytes(
        message.address !== undefined ? message.address : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryIBCAccountFromAddressRequest>
  ): QueryIBCAccountFromAddressRequest {
    const message = {
      ...baseQueryIBCAccountFromAddressRequest,
    } as QueryIBCAccountFromAddressRequest;
    if (object.port !== undefined && object.port !== null) {
      message.port = object.port;
    } else {
      message.port = "";
    }
    if (object.channel !== undefined && object.channel !== null) {
      message.channel = object.channel;
    } else {
      message.channel = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = new Uint8Array();
    }
    return message;
  },
};

const baseQueryIBCAccountFromAddressResponse: object = {};

export const QueryIBCAccountFromAddressResponse = {
  encode(
    message: QueryIBCAccountFromAddressResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryIBCAccountFromAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryIBCAccountFromAddressResponse,
    } as QueryIBCAccountFromAddressResponse;
    message.address = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryIBCAccountFromAddressResponse {
    const message = {
      ...baseQueryIBCAccountFromAddressResponse,
    } as QueryIBCAccountFromAddressResponse;
    message.address = new Uint8Array();
    if (object.address !== undefined && object.address !== null) {
      message.address = bytesFromBase64(object.address);
    }
    return message;
  },

  toJSON(message: QueryIBCAccountFromAddressResponse): unknown {
    const obj: any = {};
    message.address !== undefined &&
      (obj.address = base64FromBytes(
        message.address !== undefined ? message.address : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryIBCAccountFromAddressResponse>
  ): QueryIBCAccountFromAddressResponse {
    const message = {
      ...baseQueryIBCAccountFromAddressResponse,
    } as QueryIBCAccountFromAddressResponse;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = new Uint8Array();
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  IBCAccountFromAddress(
    request: QueryIBCAccountFromAddressRequest
  ): Promise<QueryIBCAccountFromAddressResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  IBCAccountFromAddress(
    request: QueryIBCAccountFromAddressRequest
  ): Promise<QueryIBCAccountFromAddressResponse> {
    const data = QueryIBCAccountFromAddressRequest.encode(request).finish();
    const promise = this.rpc.request(
      "intertx.Query",
      "IBCAccountFromAddress",
      data
    );
    return promise.then((data) =>
      QueryIBCAccountFromAddressResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined
  | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
