import type { Duration, URI } from '../types'

export const STOP_METHODS = ['pause', 'stop', 'kill'] as const
export type StopMethod = (typeof STOP_METHODS)[number]

export const STOP_SIGNALS = [
  '',
  'SIGINT',
  'SIGTERM',
  'SIGKILL',
  'SIGHUP',
  'SIGQUIT',
  'INT',
  'TERM',
  'KILL',
  'HUP',
  'QUIT',
] as const
export type Signal = (typeof STOP_SIGNALS)[number]

export const IDLEWATCHER_NOTIFY_EVENTS = [
  'sleep',
  'wake',
  'ready',
  'error',
  'sleep_failed',
  'all',
] as const
export type IdleWatcherNotifyEvent = (typeof IDLEWATCHER_NOTIFY_EVENTS)[number]

export type IdleWatcherNotifyConfig = {
  /** Send sleep/wake notifications for this route
   *
   * Naming providers in `to` is enough to opt in. Set this explicitly to notify
   * every configured provider without naming them, or to opt out of
   * `defaults.idlewatcher.notify`.
   */
  enabled?: boolean
  /** Notification provider names, as configured under `providers.notification`
   *
   * Omit to send to every configured provider.
   */
  to?: string[]
  /** Transitions to notify on
   *
   * @default ["sleep","wake"]
   */
  events?: IdleWatcherNotifyEvent[]
}

export type IdleWatcherConfig = {
  /** Idle timeout */
  idle_timeout?: Duration
  /** Wake timeout
   *
   * @default 30s
   */
  wake_timeout?: Duration
  /** Stop timeout
   *
   * @default 30s
   */
  stop_timeout?: Duration
  /** Stop method
   *
   * @default stop
   */
  stop_method?: StopMethod
  /** Stop signal */
  stop_signal?: Signal
  /** Start endpoint (any path can wake the container if not specified)
   *
   * @title Start Endpoint
   */
  start_endpoint?: URI
  /** Send sleep/wake notifications for this container
   *
   * Docker label: `proxy.idle_notify`
   */
  idle_notify?: boolean
  /** Notification provider names, comma separated
   *
   * Docker label: `proxy.idle_notify_to`
   */
  idle_notify_to?: string
  /** Transitions to notify on, comma separated
   *
   * Docker label: `proxy.idle_notify_events`
   */
  idle_notify_events?: string
}
