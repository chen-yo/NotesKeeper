package com.chen_yonati.notes_keeper.exception;

import java.util.HashMap;
import java.util.Map;

public class CustomValidationException extends RuntimeException{
    private Map<String, String> errorFields = new HashMap<>(2);

    public CustomValidationException(Map<String, String> errorFields) {
        super("Validation");
        this.errorFields.putAll(errorFields);
    }

    public CustomValidationException(String field, String error) {
        super("Validation");
        this.errorFields.put(field, error);
    }

    public Map<String, String> getErrorFields() {
        return errorFields;
    }
}
