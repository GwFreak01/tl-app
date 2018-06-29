export interface Event {
  _id: string;
  companyName: string;
  companyId: string;
  eventType: string;
  eventDate: string;
  tlPartNumber: string;
  purchaseOrderNumber: string;
  lotNumber: string;
  carNumber: string;
  quantityReject: number;
  requiredDate: string;
  actualDate: string;
  rootCause: string;
  statusOption: string;
}

