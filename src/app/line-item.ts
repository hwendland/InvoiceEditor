export class LineItem {

  constructor(
    public name: string = '',
    public description: string = '',
    public quantity: number = null,
    public priceCents: number = null,
  ) { }

  static decode(obj: LineItem): LineItem {
    const item = Object.create(LineItem.prototype);
    return Object.assign(item, obj);
  }

  totalEur() {
    if (this.quantity && this.priceCents) {
      return this.quantity * this.priceCents / 100;
    }
    return 0;
  }
}
