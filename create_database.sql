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

load data local infile 'C:/Users/Mohamed Ahmed/Documents/GitHub/course-selection-assistant/courses.csv' into table courses fields terminated by ',' enclosed by '"' lines terminated by '\n'(course,SEQ,CATALOG_TITLE,INSTR_TYPE,DAYS,START_TIME,END_TIME,ROOM_CAP);

