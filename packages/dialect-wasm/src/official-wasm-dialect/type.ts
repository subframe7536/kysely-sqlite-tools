export interface OfficialWasmDB {

  /** Returns true if the database handle is open, else false. */
  isOpen: () => boolean

  /** Throws if the given DB has been closed. */
  affirmOpen: () => this

  /**
   * Finalizes all still-open statements which were opened by this object and
   * closes this database connection. This is a no-op if the db has already been
   * closed. After calling `close()`, {@link pointer} will resolve to
   * `undefined`, so that can be used to check whether the db instance is still
   * opened.
   *
   * If {@link onclose.before} is a function then it is called before any
   * close-related cleanup. If {@link onclose.after} is a function then it is
   * called after the db is closed but before auxiliary state like this.filename
   * is cleared.
   *
   * Both onclose handlers are passed this object as their only argument. If
   * this db is not opened, neither of the handlers are called. Any exceptions
   * the handlers throw are ignored because "destructors must not throw."
   *
   * Note that garbage collection of a db handle, if it happens at all, will
   * never trigger `close()`, so {@link onclose} handlers are not a reliable way
   * to implement close-time cleanup or maintenance of a db.
   */
  close: () => void // ✓

  /**
   * Returns the number of changes, as per `sqlite3_changes()` (if the first
   * argument is `false`) or `sqlite3_total_changes()` (if it's `true`). If the
   * 2nd argument is `true`, it uses `sqlite3_changes64()` or
   * `sqlite3_total_changes64()`, which will trigger an exception if this build
   * does not have `BigInt` support enabled.
   */
  changes: (total?: boolean, sixtyFour?: boolean) => number

  /**
   * Prepares the given SQL, `step()`s it one time, and returns an array
   * containing the values of the first result row. If it has no results,
   * `undefined` is returned. If passed a second argument other than
   * `undefined`, it is treated like an argument to
   * {@link PreparedStatement#bind}, so may be any type supported by that
   * function. Throws on error.
   */
  selectArray: (sql: string, bind?: any[]) => any[] | undefined

  /**
   * Works identically to {@link Database#selectArrays} except that each value in
   * the returned array is an object, as per the `"object"` rowMode option to
   * {@link Database#exec}.
   */
  selectObjects: (
    sql: string,
    bind?: any[],
  ) => { [columnName: string]: any }[]

}
