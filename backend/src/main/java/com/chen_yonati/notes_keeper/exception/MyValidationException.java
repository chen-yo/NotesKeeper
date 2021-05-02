package com.chen_yonati.notes_keeper.exception;

import com.chen_yonati.notes_keeper.ErrorResponse;

import java.util.Map;

public class MyValidationException extends RuntimeException{
    private Map<String, String> errorFields;
    public MyValidationException(Map<String, String> errorFields) {
        super("Validation");
        this.errorFields = errorFields;
    }

    public Map<String, String> getErrorFields() {
        return errorFields;
    }
}
