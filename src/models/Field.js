

export class Field{
    constructor(key, name, defaultValue=null, required=false, rules = []) {
        this.key = key;
        this.name = name;
        this.defaultValue = defaultValue;
        this.required = required;
        this.rules = rules;
    }
}

