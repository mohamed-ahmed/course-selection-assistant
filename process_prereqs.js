var dataArray = [
	{ course : "ELEC 1908", prereq: "registration in the Engineering Physics program" },
	{ course : "ELEC 2501", prereq: "MATH 1005 and (PHYS 1004 or PHYS 1002)" },
	{ course : "ELEC 2507", prereq: "ELEC 2501" },
	{ course : "ELEC 2607", prereq: "(PHYS 1004 or PHYS 1002)" },
	{ course : "ELEC 3105", prereq: "MATH 2004 and (PHYS 1004 or  PHYS 1002)" },
	{ course : "ELEC 3500", prereq: "ELEC 2507 and ELEC 2607" },
	{ course : "ELEC 3508", prereq: "ELEC 2501 and ELEC 2507" },
	{ course : "ELEC 3509", prereq: "ELEC 2507" },
	{ course : "ELEC 3605", prereq: "MATH 1005 and (PHYS 1004 or  PHYS 1002)" },
	{ course : "ELEC 3907", prereq: "ELEC 2607, ELEC 2507 and ECOR 2606 and enrolment in the Electrical Engineering program" },
	{ course : "ELEC 3908", prereq: "ELEC 2507" },
	{ course : "ELEC 3909", prereq: "ELEC 3105" },
	{ course : "ELEC 4502", prereq: "ELEC 4503 may be taken concurrently" },
	{ course : "ELEC 4503", prereq: "ELEC 3909" },
	{ course : "ELEC 4504", prereq: "fourth-year status in Engineering" },
	{ course : "ELEC 4505", prereq: "ELEC 3509 and (SYSC 3501 or SYSC 3503)" },
	{ course : "ELEC 4506", prereq: "fourth-year status in Engineering" },
	{ course : "ELEC 4509", prereq: "fourth-year status in Engineering" },
	{ course : "ELEC 4600", prereq: "fourth-year status in Engineering" },
	{ course : "ELEC 4601", prereq: "ELEC 2607 and one of (SYSC 2003 or SYSC 3003 or SYSC 3006)" },
	{ course : "ELEC 4602", prereq: "fourth-year status in Engineering" },
	{ course : "ELEC 4609", prereq: "(ELEC 3500 or ELEC 3908)" },
	{ course : "ELEC 4700", prereq: "ELEC 3908" },
	{ course : "ELEC 4702", prereq: "ELEC 3908 and ELEC 3909" },
	{ course : "ELEC 4703", prereq: "ELEC 2501 and ELEC 2507 and fourth-year status in Sustainable and Renewable Energy Engineering, or ELEC 2501 and ELEC 2507 and fourth-year status in Engineering with permission of the instructor" },
	{ course : "ELEC 4704", prereq: "ELEC 3908" },
	{ course : "ELEC 4705", prereq: "fourth-year status in Engineering" },
	{ course : "ELEC 4706", prereq: "ELEC 3500" },
	{ course : "ELEC 4707", prereq: "ELEC 3509" },
	{ course : "ELEC 4708", prereq: "fourth-year status in Engineering and ELEC 3500)" },
	{ course : "ELEC 4709", prereq: "fourth-year status in Engineering" },
	{ course : "ELEC 4906", prereq: "fourth-year status in Engineering" },
	{ course : "ELEC 4907", prereq: "ELEC 3907, ECOR 4995 (may be taken concurrently) and fourth-year status in Engineering" },
	{ course : "ELEC 4908", prereq: "fourth-year status in Engineering and ECOR 4995 (may be taken concurrently)" },
	{ course : "SYSC 1005", prereq: "" },
	{ course : "SYSC 2001", prereq: "(ECOR 1606 or SYSC 1005)" },
	{ course : "SYSC 2003", prereq: "SYSC 2001 and (SYSC 2002 or SYSC 2006)" },
	{ course : "SYSC 2004", prereq: "(SYSC 2002 or SYSC 2006)" },
	{ course : "SYSC 2006", prereq: "(ECOR 1606 or SYSC 1005)" },
	{ course : "SYSC 2100", prereq: "(SYSC 1102 or SYSC 2006) and (SYSC 1101 or SYSC 2004)" },
	{ course : "SYSC 3006", prereq: "(SYSC 2002 or SYSC 2006) and ELEC 2607" },
	{ course : "SYSC 3010", prereq: "SYSC 2004 and SYSC 2100 and third-year status in Computer Systems Engineering" },
	{ course : "SYSC 3020", prereq: "SYSC 2004 and (SYSC 2006 or SYSC 2002)" },
	{ course : "SYSC 3101", prereq: "(SYSC 2004 or SYSC 2100)" },
	{ course : "SYSC 3110", prereq: "SYSC 2004 and SYSC 2100 and third-year status in Software Engineering" },
	{ course : "SYSC 3120", prereq: "SYSC 2004 and SYSC 2100 and third-year status in Software Engineering" },
	{ course : "SYSC 3200", prereq: "MATH 1004 and MATH 1104 and (ECOR 1606 or SYSC 1100)" },
	{ course : "SYSC 3203", prereq: "MATH 3705 and PHYS 1004 and enrolment in Biomedical and Electrical Engineering or Biomedical and Mechanical Engineering programs" },
	{ course : "SYSC 3303", prereq: "for students in the Faculty of Engineering and Design, SYSC 2003 and (SYSC 2004 or SYSC 2100) for students in Computer Science, (COMP 2003 or COMP 2401) and (COMP 2002 or COMP 2402)" },
	{ course : "SYSC 3500", prereq: "MATH 2004" },
	{ course : "SYSC 3501", prereq: "MATH 3705 and (SYSC 3600 or SYSC 3610)" },
	{ course : "SYSC 3503", prereq: "SYSC 3500 and STAT 2605" },
	{ course : "SYSC 3600", prereq: "MATH 1005 and (ECOR 1101 or PHYS 1001)" },
	{ course : "SYSC 3601", prereq: "ELEC 2607 and SYSC 2003" },
	{ course : "SYSC 3610", prereq: "MATH 3705 and ECOR 1101 and enrolment in Biomedical and Electrical Engineering program or in Biomedical and Mechanical Engineering programs" },
	{ course : "SYSC 4001", prereq: "(SYSC 2002 or  SYSC 2100) and (SYSC 2003 or SYSC 3006)" },
	{ course : "SYSC 4005", prereq: "(STAT 2605 or STAT 3502) and fourth-year status in Engineering" },
	{ course : "SYSC 4101", prereq: "(SYSC 3100 or SYSC 3120 or SYSC 3020)" },
	{ course : "SYSC 4102", prereq: "STAT 3502 and (SYSC 3001 or SYSC 4001)" },
	{ course : "SYSC 4105", prereq: "fourth-year status in Engineering" },
	{ course : "SYSC 4106", prereq: "SYSC 3100 or SYSC 3020 or SYSC 3120 (SYSC 3020 and SYSC 3120 can be taken concurrently) or COMP 3004" },
	{ course : "SYSC 4107", prereq: "fourth-year status in Engineering or Computer Science" },
	{ course : "SYSC 4120", prereq: "(SYSC 3120 or SYSC 3100)" },
	{ course : "SYSC 4201", prereq: "(ELEC 3605 or SYSC 3203)" },
	{ course : "SYSC 4202", prereq: "fourth-year status in Biomedical and Electrical or Biomedical and Mechanical Engineering" },
	{ course : "SYSC 4203", prereq: "(SYSC 3600 or SYSC 3500 or SYSC 3610) and (ELEC 2507 or ELEC 3605 or SYSC 3203) and fourth-year status in Biomedical and Electrical Engineering or fourth-year status in Biomedical and Mechanical Engineering" },
	{ course : "SYSC 4205", prereq: "MATH 3705 and fourth-year status in Engineering" },
	{ course : "SYSC 4405", prereq: "(SYSC 3500 or SYSC 3600 or SYSC 3610)" },
	{ course : "SYSC 4502", prereq: "SYSC 4602 and (SYSC 2004 or SYSC 2100) and fourth year status in Electrical Engineering, Computer Systems Engineering, or Software Engineering, or third year status in Communications Engineering" },
	{ course : "SYSC 4504", prereq: "(SYSC 2004 or SYSC 2100)" },
	{ course : "SYSC 4505", prereq: "MATH 2004 and (SYSC 3500 or SYSC 3600 or SYSC 3610)" },
	{ course : "SYSC 4507", prereq: "ELEC 2607 and (SYSC 2001 or  SYSC 3006)" },
	{ course : "SYSC 4600", prereq: "SYSC 3501 and STAT 3502" },
	{ course : "SYSC 4602", prereq: "(STAT 2605 or STAT 3502) (may be taken concurrently) and fourth-year status in Biomedical and Electrical, Electrical, Computer Systems, Software, or Sustainable and Renewable Energy Engineering, or third-year status in Communications Engineering" },
	{ course : "SYSC 4604", prereq: "SYSC 3503" },
	{ course : "SYSC 4607", prereq: "(SYSC 3501 or SYSC 3503)" },
	{ course : "SYSC 4700", prereq: "fourth-year status in Electrical, Computer Systems or Communications Engineering and (SYSC 3501 or SYSC 3503)" },
	{ course : "SYSC 4701", prereq: "fourth-year status in Communications Engineering" },
	{ course : "SYSC 4805", prereq: "SYSC 3303 and (SYSC 3020 or SYSC 4800) and fourth-year status in Computer Systems Engineering" },
	{ course : "SYSC 4806", prereq: "(SYSC 4800 or SYSC 4120) and fourth-year status in Software Engineering" },
	{ course : "SYSC 4906", prereq: "" },
	{ course : "SYSC 4907", prereq: "fourth-year status in Engineering and ECOR 4995 (may be taken concurrently)" },
	{ course : "SYSC 4917", prereq: "fourth-year standing in Biomedical and Electrical Engineering and ECOR 4995 (may be taken concurrently)" },
	{ course : "SYSC 4927", prereq: "fourth-year status in Software Engineering and ECOR 4995 (may be taken concurrently)" },
	{ course : "SYSC 4937", prereq: "fourth-year status in Communications Engineering and ECOR 4995 (may be taken concurrently)ECOR 1010" },
	{ course : "ECOR 1010", prereq: "" },
	{ course : "ECOR 1101", prereq: "MATH 1004 and MATH 1104" },
	{ course : "ECOR 1606", prereq: "" },
	{ course : "ECOR 2606", prereq: "MATH 1005 and (ECOR 1606 or SYSC 1005) and (ECOR 1010 or ELEC 1908)" },
	{ course : "ECOR 3800", prereq: "third-year status in Engineering" },
	{ course : "ECOR 4995", prereq: "fourth-year status in Engineering" }
];

var resultArray = [];

dataArray.forEach(function (elem){
	var courseObj = {};

	var prereqObj = {};
	courseObj.name = elem.course;

	if( elem.prereq.indexOf("fourth-year status") >= 0 ){
		prereqObj.yearStatus = 4;
	}
	else if( elem.prereq.indexOf("third-year status") >= 0 ){
		prereqObj.yearStatus = 3;
	}

	var regExp = /\(([^)]+)\)/;

	var strArray = elem.prereq.split(regExp);




	courseObj.name = elem.course;
	courseObj.prereqObj = prereqObj;

	resultArray.push(courseObj);

});

function isOrSequence(str){
	var strArray = str.split(" or ");
	for (var i = 0; i < strArray.length; i++) {
		if(!isCourse(strArray[i].trim()) && strArray[i].trim()){
			return false;
		}
	}
	return true;
}

function isCourse(str){
	return /^[A-Za-z]{4} \d{4}$/.test(str);
}