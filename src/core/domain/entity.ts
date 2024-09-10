export class Entity<TProps extends NonNullable<any>> {
  protected constructor(protected props: TProps) {}
}
