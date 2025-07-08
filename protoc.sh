grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:proto/ \
    --grpc_out=grpc_js:proto \
    --proto_path=./protos/comment ./protos/comment/*.proto