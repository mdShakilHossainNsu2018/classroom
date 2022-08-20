import 'package:classroom_flutter/constants/constants.dart';
import 'package:classroom_flutter/models/courses_by_user_model.dart';
import 'package:classroom_flutter/providers/courses.dart';
import 'package:classroom_flutter/screens/course_screen.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CourseItem extends StatelessWidget {
  const CourseItem({
    Key? key,
    required int index,
    required List<CourseInfoModel> courseList,
  })  : _courseList = courseList,
        index = index,
        super(key: key);

  final List<CourseInfoModel> _courseList;
  final int index;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Provider.of<Courses>(context, listen: false)
            .setCurrentCourse(_courseList[index]);
        Navigator.pushNamed(context, CourseScreen.routeName);
      },
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15),
          image: DecorationImage(
            opacity: 0.1,
              image: NetworkImage(_courseList[index].coverImage ?? "https://static.vecteezy.com/system/resources/thumbnails/007/117/865/small/course-enrollment-abstract-concept-illustration-enroll-in-a-course-apply-for-degree-program-add-to-study-plan-online-enrollment-system-registration-form-new-student-abstract-metaphor-vector.jpg"),
              fit:BoxFit.cover
          ),
        ),
        child: Card(
          // elevation: 10,
          color: Colors.transparent,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
          shadowColor: Colors.grey,
          child: Column(
            children: [
              // Text("course"),
              ListTile(
                // contentPadding: EdgeInsets.zero,
                leading: Icon(
                  Icons.class_outlined,
                  color: Colors.lightBlueAccent,
                ),
                title: Text.rich(
                  TextSpan(
                    children: [
                      TextSpan(
                        text: _courseList[index].courseName,
                        style: TextStyle(
                          color: Colors.red.shade500,
                          fontSize: 22,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      TextSpan(
                        text: " (${_courseList[index].courseCode})",
                        style: TextStyle(
                          color: Colors.grey[400],
                          fontSize: 18,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              ListTile(
                title: Text(
                  "Section: ${_courseList[index].courseSection}",
                  style: KCourseContentTextStyle,
                ),
              ),
              ListTile(
                title: Text(
                  "Days: ${_courseList[index].classDays!.toUpperCase()}",
                  style: KCourseContentTextStyle,
                ),
              ),
              ListTile(
                title: Text(
                  "${_courseList[index].startTime!} - ${_courseList[index].endTime}",
                  style: KCourseContentTextStyle,
                ),
                leading: Icon(
                  Icons.access_time,
                  color: Colors.lightBlueAccent,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
