export default class User {
  static current: User;
  uuid: Int;
  email: String;
  password_MD5: String;
  displayedName: String;
  username: String;
  gender: Int;
  numberOfAttendedEvents = 0;
  favoritedEvents = [];
  interestedEvents = [];
  subscriptions = [];
  tags = [];
  interests: String;
  constructor(
    uuid,
    email,
    username,
    gender,
    favoritedEvents,
    interestedEvents
  ) {
    this.uuid = uuid;
    this.email = email;
    this.username = username;
    this.gender = gender;
    this.favoritedEvents = favoritedEvents;
    this.interestedEvents = interestedEvents;
  }
}
