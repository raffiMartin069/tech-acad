import bcrypt from 'bcryptjs';

export class BcryptHash {

    private readonly _saltRounds: number;

    constructor(saltRounds: number) {
        this._saltRounds = saltRounds;
    }

    public async Hash(value: string): Promise<string> {
        return await bcrypt.hash(value, this._saltRounds);
    }
}