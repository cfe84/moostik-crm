export interface MoostikEvent {
  sentDateTime: Date, 
  eventName: string,
  sessionId?: string,
  referralId?: string,
  username?: string,
  company?: string,
  password?: string,
  clue?: string,
  attemptCount?: number
}