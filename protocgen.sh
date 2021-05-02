protoc \
  --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
  --ts_proto_out="./path/to/output/directory" \
  --proto_path="./path/to/definitions" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
  "./path/to/definitions/file.proto" \
  "./path/to/definitions/another.proto"

