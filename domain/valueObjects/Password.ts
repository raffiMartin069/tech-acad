export class Password {
    private readonly _value: string;

    constructor(value: string) {
        this._value = value;
    }
    
    get value(): string {
        return this._value;
    }

    public static Generate() {
        const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return new Password(password);
    }

}