export default class ScheduleResponse {
  public current!: Current;
  public previous!: Previous;
  public next!: Next;
}

export class Schedule {
  readonly id!: string;
  readonly discipline!: string;
  readonly notes?: string;
  readonly weekday?: string;
  readonly time!: string;
  readonly type?: string;
  readonly classroom?: string | number | null;
  readonly place?: string | number | null;
  readonly teacher_family?: string;
  readonly teacher_name?: string;
  readonly teacher_degree?: string;
  readonly group?: string;
  readonly course!: string;
  readonly speciality!: string;
  readonly date!: string;
}

export class Current {
  public data!: Schedule[];
  readonly begin!: string;
  readonly end!: string;
}

export class Previous {
  public data!: Schedule[];
  readonly begin!: string;
  readonly end!: string;
}

export class Next {
  public data!: Schedule[];
  readonly begin!: string;
  readonly end!: string;
}
