export class PersistMovementDto {
    userId: number;
    amount: number;
    walletTypeId: number;
    movementType: 'extraction' | 'deposit';
    walletId: number;
}