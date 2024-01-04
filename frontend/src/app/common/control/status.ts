export class Status {
  constructor(
    public clicked: boolean = false,
    public hovered: boolean = false,
    public occupied: boolean = false,
    public selected: boolean = false,
    public invisible: boolean = false,
    public error: boolean = false,
    public ok: boolean = false,
    public targetable: boolean = false,
    public preview: boolean = false,
    public loading: boolean = false,
    public spawned: boolean = false,
    public mirror: boolean = false
  ) {}

  reset() {
    Object.assign(this, new Status());
  }
}
