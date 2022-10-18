export interface MoostikEvent {
  sentDateTime: Date, 
  eventType: string,
  sessionId?: string,
  referralId?: string,
  username?: string,
  name?: string,
  company?: string,
  password?: string,
  clue?: string,
  attemptCount?: number
}