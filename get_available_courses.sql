/*select courses where number of prequisites taken = number of prequisites required*/
select * 
from  



	/*count number of prequisites taken for those courses*/
	(select *, count(course) as numberOfPrereqsTaken 

		from 
		/*select courses where the user has completed a prequisite*/
		(select * 
			from prereqs
			inner join (select email, course as completedCourse, completion from registration where completion='completed' ) as completed_courses
			on prereqs.requires = completed_courses.completedCourse
		) as temp1 group by course
	) as temp1count

	inner join

	/*count number of prereqs a course has*/
	(select *, count(course) as numberOfPrereqsRequired 
		from prereqs 
		where requires is not NULL 
		group by course
	) as temp2count

	on temp1count.course = temp2count.course and temp1count.numberOfPrereqsTaken = temp2count.numberOfPrereqsRequired;