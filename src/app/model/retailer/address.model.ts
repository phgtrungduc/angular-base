export interface Address {
  KvId: number;
  Name: string;
  NameEn: string;
  Type: string;
  FullName: string;
  UnitCode: string;
  CountryId: number;
  Position: number;
  ParentId: string | null;
  Level: number;
  ModifiedDate: string; // ISO 8601 date string
  CreatedDate: string; // ISO 8601 date string
  Id: string;
}
