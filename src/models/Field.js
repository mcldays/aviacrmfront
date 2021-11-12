

export class Field{
    constructor(key, name, defaultValue=null, required=false, rules = [], fieldType = "input", fieldParams = {}) {
        this.key = key;
        this.name = name;
        this.defaultValue = defaultValue;
        this.required = required;
        this.rules = rules;
        this.fieldType = fieldType;
        this.fieldParams = fieldParams;

    }
}

