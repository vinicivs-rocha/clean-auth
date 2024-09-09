export class Entity<TProps extends NonNullable<any>> {
  protected constructor(private props: TProps) {}
}