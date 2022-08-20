class CourseInfoModel {
  int? id;
  String? url;
  String? courseName;
  String? coverImage;
  int? courseSection;
  String? courseCode;
  String? classDays;
  String? startTime;
  String? endTime;
  String? createdAt;
  String? updatedAt;
  List<String>? users;

  CourseInfoModel(
      {this.id,
      this.url,
      this.courseName,
        this.coverImage,
      this.courseSection,
      this.courseCode,
      this.classDays,
      this.startTime,
      this.endTime,
      this.createdAt,
      this.updatedAt,
      this.users});

  CourseInfoModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    url = json['url'];
    courseName = json['course_name'];
    coverImage = json['cover_image'];
    courseSection = json['course_section'];
    courseCode = json['course_code'];
    classDays = json['class_days'];
    startTime = json['start_time'];
    endTime = json['end_time'];
    createdAt = json['created_at'];
    updatedAt = json['updated_at'];
    users = json['users'].cast<String>();
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['url'] = url;
    data['course_name'] = courseName;
    data['cover_image'] = coverImage;
    data['course_section'] = courseSection;
    data['course_code'] = courseCode;
    data['class_days'] = classDays;
    data['start_time'] = startTime;
    data['end_time'] = endTime;
    data['created_at'] = createdAt;
    data['updated_at'] = updatedAt;
    data['users'] = users;
    return data;
  }
}


