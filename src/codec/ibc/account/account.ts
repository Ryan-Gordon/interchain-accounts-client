/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { BaseAccount } from "../../cosmos/auth/v1beta1/auth";

export const protobufPackage = "ibc.account";

/** IBCAccount defines an account to which other chains have privileges */
export interface IBCAccount {
  baseAccount?: BaseAccount;
  sourcePort: string;
  sourceChannel: string;
  destinationPort: string;
  destinationChannel: string;
}

const baseIBCAccount: object = {
  sourcePort: "",
  sourceChannel: "",
  destinationPort: "",
  destinationChannel: "",
};

export const IBCAccount = {
  encode(
    message: IBCAccount,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.baseAccount !== undefined) {
      BaseAccount.encode(
        message.baseAccount,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.sourcePort !== "") {
      writer.uint32(18).string(message.sourcePort);
    }
    if (message.sourceChannel !== "") {
      writer.uint32(26).string(message.sourceChannel);
    }
    if (message.destinationPort !== "") {
      writer.uint32(34).string(message.destinationPort);
    }
    if (message.destinationChannel !== "") {
      writer.uint32(42).string(message.destinationChannel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IBCAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseIBCAccount } as IBCAccount;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseAccount = BaseAccount.decode(reader, reader.uint32());
          break;
        case 2:
          message.sourcePort = reader.string();
          break;
        case 3:
          message.sourceChannel = reader.string();
          break;
        case 4:
          message.destinationPort = reader.string();
          break;
        case 5:
          message.destinationChannel = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IBCAccount {
    const message = { ...baseIBCAccount } as IBCAccount;
    if (object.baseAccount !== undefined && object.baseAccount !== null) {
      message.baseAccount = BaseAccount.fromJSON(object.baseAccount);
    } else {
      message.baseAccount = undefined;
    }
    if (object.sourcePort !== undefined && object.sourcePort !== null) {
      message.sourcePort = String(object.sourcePort);
    } else {
      message.sourcePort = "";
    }
    if (object.sourceChannel !== undefined && object.sourceChannel !== null) {
      message.sourceChannel = String(object.sourceChannel);
    } else {
      message.sourceChannel = "";
    }
    if (
      object.destinationPort !== undefined &&
      object.destinationPort !== null
    ) {
      message.destinationPort = String(object.destinationPort);
    } else {
      message.destinationPort = "";
    }
    if (
      object.destinationChannel !== undefined &&
      object.destinationChannel !== null
    ) {
      message.destinationChannel = String(object.destinationChannel);
    } else {
      message.destinationChannel = "";
    }
    return message;
  },

  toJSON(message: IBCAccount): unknown {
    const obj: any = {};
    message.baseAccount !== undefined &&
      (obj.baseAccount = message.baseAccount
        ? BaseAccount.toJSON(message.baseAccount)
        : undefined);
    message.sourcePort !== undefined && (obj.sourcePort = message.sourcePort);
    message.sourceChannel !== undefined &&
      (obj.sourceChannel = message.sourceChannel);
    message.destinationPort !== undefined &&
      (obj.destinationPort = message.destinationPort);
    message.destinationChannel !== undefined &&
      (obj.destinationChannel = message.destinationChannel);
    return obj;
  },

  fromPartial(object: DeepPartial<IBCAccount>): IBCAccount {
    const message = { ...baseIBCAccount } as IBCAccount;
    if (object.baseAccount !== undefined && object.baseAccount !== null) {
      message.baseAccount = BaseAccount.fromPartial(object.baseAccount);
    } else {
      message.baseAccount = undefined;
    }
    if (object.sourcePort !== undefined && object.sourcePort !== null) {
      message.sourcePort = object.sourcePort;
    } else {
      message.sourcePort = "";
    }
    if (object.sourceChannel !== undefined && object.sourceChannel !== null) {
      message.sourceChannel = object.sourceChannel;
    } else {
      message.sourceChannel = "";
    }
    if (
      object.destinationPort !== undefined &&
      object.destinationPort !== null
    ) {
      message.destinationPort = object.destinationPort;
    } else {
      message.destinationPort = "";
    }
    if (
      object.destinationChannel !== undefined &&
      object.destinationChannel !== null
    ) {
      message.destinationChannel = object.destinationChannel;
    } else {
      message.destinationChannel = "";
    }
    return message;
  },
};

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
