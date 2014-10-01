create table if not exists courses(
	course varchar(20), 
	seq varchar(20),
	catalog_title varchar(20),
	instr_type varchar(20),
	days varchar(20),
	start_time int,
	end_time int,
	room_cap int
);

load data local infile 'C:/xampp/htdocs/course-selection-assistant/courses.csv' into table courses fields terminated by ',' enclosed by '"' lines terminated by '\n'(course,SEQ,CATALOG_TITLE,INSTR_TYPE,DAYS,START_TIME,END_TIME,ROOM_CAP);

create table if not exists prereqs(
	course varchar(20),
	requires varchar(20),
	optional varchar(20)
);

load data local infile 'C:/xampp/htdocs/course-selection-assistant/prereqs.csv' into table prereqs fields terminated by ',' enclosed by '"' lines terminated by '\n'(course, requires, optional);


create table if not exists registration(
	email varchar(40),
	course varchar(20),
	completion varchar(20)
);

load data local infile 'C:/xampp/htdocs/course-selection-assistant/registration.csv' into table registration fields terminated by ',' enclosed by '"' lines terminated by '\n'(email, course, completion);
