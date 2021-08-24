import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { Transform } from 'class-transformer';

export enum movementTypesEnum {
    extraction = 'extraction',
    deposit = 'deposit'
}

export enum walletTypeEnum {
    BTC = 'BTC',
    ARS = 'ARS',
    USDT = 'USDT'
}

export class PersistMovementDto {
    userId: number;
    amount: number;
    walletTypeId: number;
    movementType: 'extraction' | 'deposit';
    walletId: number;
}

export class QueryListMovementDto {
    @ApiPropertyOptional({ type: 'enum', enum: movementTypesEnum })
    @IsEnum(movementTypesEnum)
    @IsOptional()
    movementType: 'extraction' | 'deposit';
    @ApiPropertyOptional({ type: 'enum', enum: walletTypeEnum })
    @IsEnum(walletTypeEnum)
    @IsString()
    @IsOptional()
    walletType: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    limit: number = 10 ;
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    offset: number = 0;
}

export class ServiceListMovementDto{
    userId:number;
    movementType: 'extraction' | 'deposit';
    walletType: string;
    limit: number = 10 ;
    offset: number = 0;
}

export class patchMovement {
    @ApiProperty({ type: 'enum', enum: movementTypesEnum })
    @IsEnum(movementTypesEnum)
    type!: 'extraction' | 'deposit';

    @IsNumber()
    @IsPositive()
    amount!: number;

    @IsNumber()
    walletId!: number;
}

export class patchResponse {
    message!: string;
    newBalance!: number;
    walletName!: string;
}

