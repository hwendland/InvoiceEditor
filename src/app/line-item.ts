export class LineItem {

  constructor(
    public name: string = '',
    public description: string = '',
    public quantity: number = null,
    private priceCents: number = null,
  ) { }

  get priceEur() {
    return this.priceCents / 100;
  }

  set priceEur(priceEur: number) {
    this.priceCents = priceEur * 100;
  }

  static decode(obj: LineItem): LineItem {
    const item = Object.create(LineItem.prototype);
    return Object.assign(item, obj);
  }

  totalEur() {
    if (this.quantity && this.priceCents) {
      return this.quantity * this.priceEur;
    }
    return 0;
  }
}
