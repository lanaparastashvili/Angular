export interface Order {
  id: number;
  teamMember: string;
  loading: 'High' | 'Medium' | 'Low';
  billable: string;
  efficiency: string;
}
