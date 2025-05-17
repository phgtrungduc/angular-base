export interface Retailer {
  Id: string; // Corresponds to BsonId
  AddressId: number;
  IndustryId: number;
  Name: string;
  PhoneNumber: string;
  CreatedDate: Date;
  ModifiedDate?: Date | null;
  IsActive: boolean;
  ExpiryDate: Date | null;
  ContractType: number;
  ContractDate: Date | null;
  PurchasePlatform: string;
  Purchases: string;
  Note: string;
  OtpLockTime?: Date | null;
  AddressName : string;
  IndustryName : string;

  //Custom field
  NumberOrder? : number;
  DisplayExpiryDate : string;
  DisplayContractDate : string;

}

export interface RetailerResponsePaging {
  Data : Array<Retailer>;
  Total : number;
}
