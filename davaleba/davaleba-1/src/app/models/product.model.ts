/**
 * Product Model based on Lecture 2 requirements
 */
export class Product {
  constructor(
    public sku: string,
    public name: string,
    public imageUrl: string,
    public department: string[],
    public price: number
  ) {}
}
