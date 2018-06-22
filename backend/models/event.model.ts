export interface Event {
  id: string;
  companyName: string;
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
  statusOption: number;
}

