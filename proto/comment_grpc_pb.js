// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var comment_pb = require('./comment_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_comment_Comment(arg) {
  if (!(arg instanceof comment_pb.Comment)) {
    throw new Error('Expected argument of type comment.Comment');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_comment_Comment(buffer_arg) {
  return comment_pb.Comment.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_comment_ListComment(arg) {
  if (!(arg instanceof comment_pb.ListComment)) {
    throw new Error('Expected argument of type comment.ListComment');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_comment_ListComment(buffer_arg) {
  return comment_pb.ListComment.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_comment_ReadPagingRequest(arg) {
  if (!(arg instanceof comment_pb.ReadPagingRequest)) {
    throw new Error('Expected argument of type comment.ReadPagingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_comment_ReadPagingRequest(buffer_arg) {
  return comment_pb.ReadPagingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_comment_ReadPagingResponse(arg) {
  if (!(arg instanceof comment_pb.ReadPagingResponse)) {
    throw new Error('Expected argument of type comment.ReadPagingResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_comment_ReadPagingResponse(buffer_arg) {
  return comment_pb.ReadPagingResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_comment_SearchRequest(arg) {
  if (!(arg instanceof comment_pb.SearchRequest)) {
    throw new Error('Expected argument of type comment.SearchRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_comment_SearchRequest(buffer_arg) {
  return comment_pb.SearchRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_comment_SearchResponse(arg) {
  if (!(arg instanceof comment_pb.SearchResponse)) {
    throw new Error('Expected argument of type comment.SearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_comment_SearchResponse(buffer_arg) {
  return comment_pb.SearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var CommentSvcService = exports.CommentSvcService = {
  post: {
    path: '/comment.CommentSvc/post',
    requestStream: false,
    responseStream: false,
    requestType: comment_pb.Comment,
    responseType: comment_pb.Comment,
    requestSerialize: serialize_comment_Comment,
    requestDeserialize: deserialize_comment_Comment,
    responseSerialize: serialize_comment_Comment,
    responseDeserialize: deserialize_comment_Comment,
  },
  list: {
    path: '/comment.CommentSvc/list',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: comment_pb.ListComment,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_comment_ListComment,
    responseDeserialize: deserialize_comment_ListComment,
  },
  readPaging: {
    path: '/comment.CommentSvc/readPaging',
    requestStream: false,
    responseStream: false,
    requestType: comment_pb.ReadPagingRequest,
    responseType: comment_pb.ReadPagingResponse,
    requestSerialize: serialize_comment_ReadPagingRequest,
    requestDeserialize: deserialize_comment_ReadPagingRequest,
    responseSerialize: serialize_comment_ReadPagingResponse,
    responseDeserialize: deserialize_comment_ReadPagingResponse,
  },
  searching: {
    path: '/comment.CommentSvc/searching',
    requestStream: false,
    responseStream: false,
    requestType: comment_pb.SearchRequest,
    responseType: comment_pb.SearchResponse,
    requestSerialize: serialize_comment_SearchRequest,
    requestDeserialize: deserialize_comment_SearchRequest,
    responseSerialize: serialize_comment_SearchResponse,
    responseDeserialize: deserialize_comment_SearchResponse,
  },
};

exports.CommentSvcClient = grpc.makeGenericClientConstructor(CommentSvcService);
