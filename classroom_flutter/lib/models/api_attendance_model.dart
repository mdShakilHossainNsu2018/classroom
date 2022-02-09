///
/// Code generated by jsonToDartModel https://ashamp.github.io/jsonToDartModel/
///
class ApiAttendanceModel {
/*
{
  "id": 1,
  "is_attend": true,
  "created_at": "2021-08-06T17:25:07.988180Z",
  "updated_at": "2021-08-06T17:25:07.988222Z",
  "course": 1,
  "user": 2
} 
*/

  int? id;
  bool? isAttend;
  String? createdAt;
  String? updatedAt;
  int? course;
  int? user;

  ApiAttendanceModel({
    this.id,
    this.isAttend,
    this.createdAt,
    this.updatedAt,
    this.course,
    this.user,
  });
  ApiAttendanceModel.fromJson(Map<String, dynamic> json) {
    id = json["id"]?.toInt();
    isAttend = json["is_attend"];
    createdAt = json["created_at"]?.toString();
    updatedAt = json["updated_at"]?.toString();
    course = json["course"]?.toInt();
    user = json["user"]?.toInt();
  }
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();
    data["id"] = id;
    data["is_attend"] = isAttend;
    data["created_at"] = createdAt;
    data["updated_at"] = updatedAt;
    data["course"] = course;
    data["user"] = user;
    return data;
  }
}
