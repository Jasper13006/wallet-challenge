
export class ResponseUserDto {
    name!: string;
    lastName!: string;
    alias!: string;
    email!: string;
    wallets!:walletsToResponseDto[]
}

export class walletsToResponseDto {
    balance:number;
    walletName:string;
    text: string;
}
