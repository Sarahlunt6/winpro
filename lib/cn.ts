// Tiny class-name joiner — keeps us off clsx/classnames for one trivial helper.
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
