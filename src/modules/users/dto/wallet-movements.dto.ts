import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsPositive } from "class-validator";

export enum movementTypesEnum {
    extraction = 'extraction',
    deposit = 'deposit'
}

export class patchMovement {
    @ApiProperty({type:'enum', enum:movementTypesEnum})
    @IsEnum(movementTypesEnum)
    type!: 'extraction' | 'deposit';

    @IsNumber()
    @IsPositive()
    amount!: number;

    @IsNumber()
    walletId!: number;
}

export class patchResponse {
    message!:string;
    newBalance!: number;
    walletName!:string;
}

