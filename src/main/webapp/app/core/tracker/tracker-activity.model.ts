export class TrackerActivity {
  constructor(public sessionId: string, public userLogin: string, public userLoginDest: string, public ipAddress: string, public message: string, public time: string, public deliveryTime: number) {}
}
