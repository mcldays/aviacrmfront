

export class Field{
    constructor(key, name, {defaultValue=null, rules = [], fieldType = "input", fieldParams = {}, isNumber=false, isVisible = true} = {}) {
        this.key = key;
        this.name = name;
        this.defaultValue = defaultValue;
        this.required = rules.length !== 0;
        this.rules = rules;
        this.fieldType = fieldType;
        this.fieldParams = fieldParams;
        this.isNumber = isNumber;
        this.isVisible = isVisible;

    }
}

