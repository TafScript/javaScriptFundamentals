// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

//console.log(LearnerSubmissions[3].learner_id)

function getLearnerData(course, ag, submissions) {
  // check if group course id belongs to course
  if (AssignmentGroup.course_id !== CourseInfo.id){
    throw new Error(`AssignmentGroup ${AssignmentGroup.id} does not belong to course ${CourseInfo.id}`);
  }

  // here, we would process this data to achieve the desired result.
  const result = [];
  
  try {
    const ids = getID(submissions);
    const uniqueIDs = checkUniqueID(ids);

    for (const id of uniqueIDs) {
      let totalScore = 0;
      let totalPoints = 0;

      const learnerObj = {id};

      for (const assignment of ag.assignments) {
        const submission = submissions.find(
          s => s.learner_id === id && s.assignment_id === assignment.id
        );

        if (!submission) continue;

        const dateDue = new Date(assignment.due_at);
        //const now = new Date("2023-12-31");
        const now = new Date("")
        // continue if date not due
        if (dateDue > now) continue; 
        // ensure data correct format for variales
        let score = Number(submission.submission.score);
        let points = Number(assignment.points_possible);
        //data valid data input check
        if (isNaN(score) || isNaN(points) || points <= 0) continue;
        
        const submittedDate = new Date(submission.submission.submitted_at);
        //checks for late condition penalty.
        if (submittedDate > dateDue){
          score -= points * 0.1;
        }
        if (score < 0) {
          score = 0;
        }

        totalScore += score;
        totalPoints += points;
      }

      learnerObj.avg = totalPoints > 0 ? ((totalScore / totalPoints) * 100) + "%" : "0%";

      result.push(learnerObj);
    }
  } catch (err) {
    console.error("Invalid data input.", err);
  }

  return result;

}



//console.log(result);

// This function removes the duplicate values in array
// to make working with the objects easier to be used in calculating weighted average.
function checkUniqueID(idArr){
    let trackArr = [];

    for (let i = 0; i < idArr.length; i++){
        //make a copy of array 
        trackArr.push(idArr[i]);
    }
    //development purposes
    console.log("Old array:" + trackArr)
    // this array holds only unique element entries from the original array
    let newArr = [];
    // compares array elements between newArr and trackArr and if it's not
    // in newArr, it adds it to newArr, else it just continues iteration 
    // ignoring duplicates.
    for (let i = 0; i < idArr.length; i++){
        let temp = trackArr[i];
        //add to array if index value isn't already in the array.
        if (newArr.indexOf(temp) === -1){
            newArr.push(temp);
        }
    }
    //Development purposes
    console.log("New array: " + newArr);
    console.log("=======================================")
    return newArr;
}

// This function gets all the IDs from learners.
function getID(LearnerSubmissions) {
    let idArr = [];
    for (const i in LearnerSubmissions) {
        idArr.push(LearnerSubmissions[i].learner_id)
    }
    return idArr
}

getID(LearnerSubmissions);

function getWeightedAvg(LearnerSubmissions, checkUniqueID, getID) {
    const ids = getID(LearnerSubmissions);
    const uniqueIDs = checkUniqueID(ids);

    console.log("Unique learner IDs:", uniqueIDs);

    let results = [];

    for (const id of uniqueIDs) {
        let totalScore = 0;
        let totalPoints = 0;

        // loop through submissions for this learner
        for (const submission of LearnerSubmissions) {
            if (submission.learner_id === id) {
                // find matching assignment info
                const assignment = AssignmentGroup.assignments.find(
                    (a) => a.id === submission.assignment_id
                );

                if (assignment) {
                    totalScore += submission.submission.score;
                    totalPoints += assignment.points_possible;
                }
            }
        }

        let avg;

        try {
            avg = totalPoints > 0 ? (totalScore / totalPoints) * 100 : "0%";
        } catch (err) {
            console.error("Invalid data input");
            avg = "0%"
        }
        

        results.push({
            id: id,
            avg: avg + "%"
        });
    }

    console.log("Weighted Averages Output 1:", results);
    return results;
}


// modify parameters later to include unique id function to make working/calculating
//easier
getWeightedAvg(LearnerSubmissions, checkUniqueID, getID)

let output = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log("Weighted Averages Output 2: ", output);




//checkUniqueID(getID(LearnerSubmissions));
//console.log("Test checking what function returns: " + checkUniqueID(getID(LearnerSubmissions)));
