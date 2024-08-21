package com.zanwix.exception;

public class ResponseNotFound extends RuntimeException {
    public ResponseNotFound(String msg) {
        super (msg);
    }
}
